import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  ApplicationStep,
  getApplicationParams,
  type LoanApplicationData,
} from "../components/application-flow";
import { verifyDocumentWithAI } from "../services/gemini";

type DocumentItem = {
  title: string;
  description: string;
  paramKey: string;
};

const requiredDocuments: DocumentItem[] = [
  {
    title: "Government-issued ID",
    description: "National ID, passport or driver's licence",
    paramKey: "idDocument",
  },
  {
    title: "Proof of income",
    description: "Recent payslip or business income record",
    paramKey: "incomeDocument",
  },
  {
    title: "Bank statement",
    description: "Your recent account statement",
    paramKey: "statementDocument",
  },
];

type UploadedDocState = {
  fileName: string;
  fileSize: string;
  aiMessage: string;
};

export default function DocumentUploadScreen() {
  const params = useLocalSearchParams<LoanApplicationData>();
  const [uploads, setUploads] = useState<Record<string, UploadedDocState>>({});
  const [loadingDoc, setLoadingDoc] = useState<string | null>(null);

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleFileSelect(docTitle: string) {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,application/pdf";
      input.onchange = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoadingDoc(docTitle);
        const reader = new FileReader();

        reader.onload = async () => {
          const base64Data = reader.result as string;
          const aiResult = await verifyDocumentWithAI(
            docTitle,
            file.name,
            base64Data,
            file.type || "image/jpeg",
          );

          setUploads((prev) => ({
            ...prev,
            [docTitle]: {
              fileName: file.name,
              fileSize: formatBytes(file.size),
              aiMessage: aiResult.message,
            },
          }));
          setLoadingDoc(null);
        };

        reader.onerror = () => {
          setLoadingDoc(null);
        };

        reader.readAsDataURL(file);
      };

      input.click();
    } else {
      // Demo fallback for native simulators
      setLoadingDoc(docTitle);
      setTimeout(async () => {
        const sampleName = `${docTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_sample.jpg`;
        const aiResult = await verifyDocumentWithAI(docTitle, sampleName);
        setUploads((prev) => ({
          ...prev,
          [docTitle]: {
            fileName: sampleName,
            fileSize: "450 KB",
            aiMessage: aiResult.message,
          },
        }));
        setLoadingDoc(null);
      }, 800);
    }
  }

  function handleRemove(docTitle: string) {
    setUploads((prev) => {
      const next = { ...prev };
      delete next[docTitle];
      return next;
    });
  }

  return (
    <ApplicationStep
      step={4}
      title="Documents Upload"
      subtitle="Upload your documents for instant AI verification."
      buttonTitle="Review Application"
      onContinue={() => {
        const docParams: Record<string, string> = {};
        for (const doc of requiredDocuments) {
          if (uploads[doc.title]) {
            docParams[doc.paramKey] = uploads[doc.title].fileName;
          }
        }
        router.push({
          pathname: "/review-application",
          params: getApplicationParams({ ...params, ...docParams }),
        });
      }}
    >
      {requiredDocuments.map((document) => {
        const uploaded = uploads[document.title];
        const isLoading = loadingDoc === document.title;

        return (
          <View
            className={`rounded-2xl bg-white p-4 ${
              uploaded ? "border border-[#0B6623]" : ""
            }`}
            key={document.title}
          >
            <View className="flex-row items-center">
              <View
                className={`mr-3 h-11 w-11 items-center justify-center rounded-xl ${
                  uploaded ? "bg-[#E8F5E9]" : "bg-[#F1F0FF]"
                }`}
              >
                <Text
                  className={`text-xl font-bold ${
                    uploaded ? "text-[#0B6623]" : "text-[#5B45E7]"
                  }`}
                >
                  {uploaded ? "✓" : "⇧"}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#34334C]">
                  {document.title}
                </Text>
                <Text className="mt-1 text-xs leading-4 text-[#77758D]">
                  {document.description}
                </Text>
              </View>
              {uploaded ? (
                <View className="rounded-full bg-[#E8F5E9] px-2.5 py-1">
                  <Text className="text-[10px] font-bold text-[#0B6623]">
                    Uploaded
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Loading State */}
            {isLoading ? (
              <View className="mt-3 flex-row items-center justify-center gap-2 rounded-xl bg-[#F4F3FC] py-3">
                <ActivityIndicator size="small" color="#0B6623" />
                <Text className="text-xs font-semibold text-[#0B6623]">
                  Verifying document with Gemini AI...
                </Text>
              </View>
            ) : uploaded ? (
              /* Uploaded Details & AI Assessment */
              <View className="mt-3 rounded-xl bg-[#F8F9FA] p-3">
                <View className="flex-row items-center justify-between">
                  <Text
                    className="max-w-[200px] text-xs font-semibold text-[#25234A]"
                    numberOfLines={1}
                  >
                    📄 {uploaded.fileName}
                  </Text>
                  <Text className="text-[11px] text-[#77758D]">
                    {uploaded.fileSize}
                  </Text>
                </View>

                {uploaded.aiMessage ? (
                  <View className="mt-2.5 rounded-lg border border-[#C8E6C9] bg-[#E8F5E9] p-2.5">
                    <Text className="text-[11px] font-bold text-[#0B6623]">
                      🤖 Gemini AI Analysis
                    </Text>
                    <Text className="mt-1 text-xs leading-4 text-[#2C5E3B]">
                      {uploaded.aiMessage}
                    </Text>
                  </View>
                ) : null}

                <View className="mt-2.5 flex-row justify-end gap-3">
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => handleFileSelect(document.title)}
                  >
                    <Text className="text-xs font-semibold text-[#0B6623]">
                      Change file
                    </Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => handleRemove(document.title)}
                  >
                    <Text className="text-xs font-semibold text-[#E45656]">
                      Remove
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              /* Select Document Button */
              <Pressable
                accessibilityRole="button"
                className="mt-4 h-10 items-center justify-center rounded-xl border border-[#E6E4F3] active:bg-[#F9F8FD]"
                onPress={() => handleFileSelect(document.title)}
              >
                <Text className="text-sm font-semibold text-[#5B45E7]">
                  Select document
                </Text>
              </Pressable>
            )}
          </View>
        );
      })}

      <View className="rounded-xl bg-[#E8F5E9] p-3">
        <Text className="text-xs leading-5 text-[#0B6623]">
          ✓ Real-time AI verification active. Uploaded documents are analyzed with
          Google Gemini for automated compliance check.
        </Text>
      </View>
    </ApplicationStep>
  );
}
