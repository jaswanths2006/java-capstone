import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import {
  ApplicationStep,
  ReviewRow,
  type LoanApplicationData,
} from "../components/application-flow";
import { glassCardStyle } from "../components/loan-ui";

export default function ReviewApplicationScreen() {
  const params = useLocalSearchParams<LoanApplicationData>();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const amount = Number(params.amount) || 300_000;

  function submitApplication() {
    if (!acceptedTerms) {
      Alert.alert(
        "Confirm your application",
        "Please confirm that you have reviewed the application details.",
      );
      return;
    }

    router.replace("/application-success");
  }

  return (
    <ApplicationStep
      step={5}
      title="Review Application"
      subtitle="Please check your details before continuing."
      buttonTitle="Submit Application"
      onContinue={submitApplication}
    >
      <View style={[glassCardStyle, { paddingHorizontal: 16 }]}>
        <Text className="pt-4 text-base font-bold text-[#0F172A]">
          Loan Details
        </Text>
        <ReviewRow
          label="Loan amount"
          value={`₦${new Intl.NumberFormat("en-NG").format(amount)}`}
        />
        <ReviewRow label="Loan purpose" value={params.purpose || "Business"} />
        <ReviewRow label="Tenure" value={`${params.tenure || "6"} months`} />
      </View>

      <View style={[glassCardStyle, { paddingHorizontal: 16 }]}>
        <Text className="pt-4 text-base font-bold text-[#0F172A]">
          Employment
        </Text>
        <ReviewRow
          label="Employment type"
          value={params.employmentType || "Employed"}
        />
        <ReviewRow label="Employer" value={params.employer || "Acme Tech Ltd"} />
        <ReviewRow label="Monthly income" value={params.income || "₦450,000"} />
      </View>

      <View style={[glassCardStyle, { paddingHorizontal: 16 }]}>
        <Text className="pt-4 text-base font-bold text-[#0F172A]">
          Bank Account
        </Text>
        <ReviewRow label="Bank" value={params.bank || "Access Bank"} />
        <ReviewRow
          label="Account number"
          value={
            params.accountLastFour
              ? `••••••${params.accountLastFour}`
              : "••••••4821"
          }
        />
        <ReviewRow
          label="Account name"
          value={params.accountName || "Blessing Okafor"}
        />
      </View>

      <View
        style={[
          glassCardStyle,
          {
            paddingHorizontal: 16,
            borderColor: "rgba(0, 255, 135, 0.4)",
            backgroundColor: "rgba(0, 255, 135, 0.06)",
          },
        ]}
      >
        <Text className="pt-4 text-base font-bold text-[#059669]">
          ⚡ Uploaded Documents (Gemini AI Verified)
        </Text>
        <ReviewRow
          label="Government ID"
          value="✓ Verified (NIN Card)"
        />
        <ReviewRow
          label="Proof of Income"
          value="✓ Verified (Salary Slip)"
        />
        <ReviewRow
          label="Bank Statement"
          value="✓ Verified (6 Months)"
        />
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: acceptedTerms }}
        className="flex-row items-start px-1 py-2"
        onPress={() => setAcceptedTerms((checked) => !checked)}
      >
        <View
          style={{
            marginRight: 12,
            marginTop: 2,
            height: 22,
            width: 22,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 7,
            backgroundColor: acceptedTerms ? "#00FF87" : "#FFFFFF",
            borderWidth: 1.5,
            borderColor: acceptedTerms ? "#00FF87" : "#CBD5E1",
            boxShadow: acceptedTerms ? "0 0 8px rgba(0, 255, 135, 0.5)" : "none",
          }}
        >
          {acceptedTerms ? (
            <Text style={{ fontSize: 13, fontWeight: "900", color: "#022c22" }}>✓</Text>
          ) : null}
        </View>
        <Text className="flex-1 text-xs leading-5 text-[#64748B]">
          I confirm that I have reviewed these details. Documents verified with Gemini AI.
        </Text>
      </Pressable>
    </ApplicationStep>
  );
}
