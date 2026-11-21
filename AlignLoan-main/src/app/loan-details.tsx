import { router } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader, glassCardStyle } from "../components/loan-ui";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between border-b border-[#F0EFF5]/60 py-3">
      <Text className="text-sm text-[#77758D]">{label}</Text>
      <Text className="text-sm font-semibold text-[#0F172A]">{value}</Text>
    </View>
  );
}

export default function LoanDetailsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Loan Details" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 255, 135, 0.12)",
            borderColor: "rgba(0, 255, 135, 0.35)",
            borderWidth: 1,
            borderRadius: 16,
            padding: 12,
            marginBottom: 16,
          }}
        >
          <Text className="text-xs font-semibold leading-5 text-[#059669]">
            ⚡ Live demo preview. No loan has been approved or disbursed.
          </Text>
        </View>

        {/* Cyber Neon Hero Card */}
        <View
          style={{
            background: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f172a 100%)",
            borderRadius: 24,
            padding: 22,
            borderWidth: 1,
            borderColor: "rgba(0, 255, 135, 0.4)",
            boxShadow: "0 10px 30px rgba(0, 255, 135, 0.18)",
          }}
        >
          <Text className="text-xs font-bold uppercase tracking-wider text-[#00FF87]">
            Active Preview Limit
          </Text>
          <Text className="mt-2 text-3xl font-extrabold text-white">₦300,000</Text>
          <View
            style={{
              marginTop: 14,
              alignSelf: "flex-start",
              borderRadius: 9999,
              backgroundColor: "rgba(0, 255, 135, 0.2)",
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderWidth: 1,
              borderColor: "rgba(0, 255, 135, 0.5)",
            }}
          >
            <Text className="text-xs font-bold text-[#00FF87]">● Preview Active</Text>
          </View>
        </View>

        {/* Glass Loan Summary */}
        <View style={[glassCardStyle, { marginTop: 16, padding: 16 }]}>
          <Text className="text-base font-bold text-[#0F172A]">Loan Summary</Text>
          <DetailRow label="Loan amount" value="₦300,000" />
          <DetailRow label="Monthly installment" value="₦56,000" />
          <DetailRow label="Repayment term" value="6 months" />
          <DetailRow label="Next due date" value="15 Nov 2026" />
          <DetailRow label="Status" value="Demo preview" />
        </View>

        {/* Glass Schedule Link */}
        <Pressable
          accessibilityRole="button"
          style={[glassCardStyle, { marginTop: 14, padding: 16, flexDirection: "row", alignItems: "center" }]}
          onPress={() => router.push("/repayment-history")}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: "rgba(0, 245, 255, 0.15)",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <Text className="text-lg font-bold text-[#00F5FF]">↻</Text>
          </View>
          <Text className="flex-1 font-bold text-[#0F172A]">Repayment schedule</Text>
          <Text className="text-xl text-[#94A3B8]">›</Text>
        </Pressable>

        <View className="mt-6">
          <PrimaryButton
            title="View disbursement receipt"
            onPress={() => router.push("/loan-disbursement")}
          />
        </View>
        <Pressable
          accessibilityRole="button"
          style={{
            marginTop: 14,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
          onPress={() => router.push("/repayment")}
        >
          <Text className="font-bold text-[#059669]">Explore repayment options</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
