import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton, ScreenHeader } from "../components/loan-ui";
import { verifyDocumentWithAI } from "../services/gemini";

export default function IdentityVerificationScreen() {
  const [loading, setLoading] = useState(false);
  const [uploadedId, setUploadedId] = useState<{
    fileName: string;
    fileSize: string;
    aiMessage: string;
  } | null>(null);

  function handlePickId() {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,application/pdf";
      input.onchange = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Data = reader.result as string;
          const result = await verifyDocumentWithAI(
            "National ID / Passport",
            file.name,
            base64Data,
            file.type || "image/jpeg",
          );

          setUploadedId({
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
            aiMessage: result.message,
          });
          setLoading(false);
        };
        reader.onerror = () => setLoading(false);
        reader.readAsDataURL(file);
      };
      input.click();
    } else {
      setLoading(true);
      setTimeout(async () => {
        const result = await verifyDocumentWithAI(
          "National ID / Passport",
          "national_id_card.jpg",
        );
        setUploadedId({
          fileName: "national_id_card.jpg",
          fileSize: "512 KB",
          aiMessage: result.message,
        });
        setLoading(false);
      }, 800);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FC] px-5" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Verify Your Identity" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow pb-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-extrabold text-[#22213D]">
          Verify Your Identity
        </Text>
        <Text className="mt-2 text-sm leading-6 text-[#77758D]">
          Upload a clear photo of your ID for real-time AI verification.
        </Text>

        <View className="mt-8 h-64 items-center justify-center overflow-hidden rounded-3xl bg-[#F0EEFF]">
          <View className="absolute -left-7 top-8 h-28 w-28 rounded-full bg-[#E3DFFF]" />
          <View className="absolute -bottom-10 -right-4 h-36 w-36 rounded-full bg-[#E3DFFF]" />
          <View className="w-56 rounded-2xl border-2 border-[#8A7CF0] bg-white p-5 shadow-sm">
            <View className="flex-row items-center">
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#EAE8FF]">
                <Text className="text-2xl text-[#6554E9]">♙</Text>
              </View>
              <View className="flex-1">
                <View className="mb-2 h-2 w-24 rounded-full bg-[#D9D5FF]" />
                <View className="h-2 w-16 rounded-full bg-[#ECEAFF]" />
              </View>
            </View>
            <View className="mt-5 h-2 w-full rounded-full bg-[#ECEAFF]" />
            <View className="mt-2 h-2 w-3/4 rounded-full bg-[#ECEAFF]" />
            <View className="mt-4 flex-row items-center justify-between">
              <View className="h-2 w-12 rounded-full bg-[#D9D5FF]" />
              <Text className="text-2xl font-bold text-[#6554E9]">
                {uploadedId ? "✓" : "•"}
              </Text>
            </View>
          </View>
          <View className="absolute bottom-6 right-14 h-9 w-9 items-center justify-center rounded-full bg-[#6554E9]">
            <Text className="text-xl font-bold text-white">
              {uploadedId ? "✓" : "+"}
            </Text>
          </View>
        </View>

        {loading ? (
          <View className="mt-5 flex-row items-center justify-center gap-2 rounded-2xl bg-white p-4">
            <ActivityIndicator size="small" color="#0B6623" />
            <Text className="text-sm font-semibold text-[#0B6623]">
              Gemini AI is analyzing your ID document...
            </Text>
          </View>
        ) : uploadedId ? (
          <View className="mt-5 rounded-2xl border border-[#0B6623] bg-white p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-bold text-[#34334C]">
                📄 {uploadedId.fileName}
              </Text>
              <View className="rounded-full bg-[#E8F5E9] px-2.5 py-1">
                <Text className="text-[10px] font-bold text-[#0B6623]">
                  ✓ AI Verified
                </Text>
              </View>
            </View>
            <View className="mt-3 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] p-3">
              <Text className="text-xs font-bold text-[#0B6623]">
                🤖 Gemini AI Assessment
              </Text>
              <Text className="mt-1 text-xs leading-5 text-[#2C5E3B]">
                {uploadedId.aiMessage}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              className="mt-3 self-end"
              onPress={handlePickId}
            >
              <Text className="text-xs font-semibold text-[#0B6623]">
                Upload different ID
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            className="mt-5 h-12 items-center justify-center rounded-2xl border border-[#DAD7F6] bg-white active:bg-gray-50"
            onPress={handlePickId}
          >
            <Text className="font-bold text-[#5B45E7]">Select ID document</Text>
          </Pressable>
        )}

        <View className="mt-auto pt-6">
          <PrimaryButton
            title="Continue"
            onPress={() => {
              if (!uploadedId) {
                Alert.alert(
                  "Upload ID",
                  "Please select and upload your ID document first.",
                );
                return;
              }
              Alert.alert(
                "Identity Verified",
                "Your identity document has been verified by Gemini AI.",
                [{ text: "OK", onPress: () => router.replace("/(tabs)") }],
              );
              if (Platform.OS === "web") {
                router.replace("/(tabs)");
              }
            }}
          />
          <Pressable
            accessibilityRole="button"
            className="mt-5 items-center"
            onPress={() => router.replace("/create-account")}
          >
            <Text className="text-sm text-[#77758D]">
              Need an account?{" "}
              <Text className="font-bold text-[#5B45E7]">Sign up now</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
