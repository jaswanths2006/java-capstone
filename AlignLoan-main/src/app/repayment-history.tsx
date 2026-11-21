import { router } from "expo-router";
import { Alert, Platform, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader, glassCardStyle } from "../components/loan-ui";

const installments = [
  { date: "15 Nov 2026", amount: "₦56,000", status: "Upcoming", badge: "rgba(0, 245, 255, 0.2)", badgeColor: "#0284C7" },
  { date: "15 Oct 2026", amount: "₦56,000", status: "Preview", badge: "rgba(168, 85, 247, 0.15)", badgeColor: "#7C3AED" },
  { date: "15 Sep 2026", amount: "₦56,000", status: "Preview", badge: "rgba(168, 85, 247, 0.15)", badgeColor: "#7C3AED" },
  { date: "15 Aug 2026", amount: "₦56,000", status: "Preview", badge: "rgba(168, 85, 247, 0.15)", badgeColor: "#7C3AED" },
];

export default function RepaymentHistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Repayment History" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 245, 255, 0.1)",
            borderColor: "rgba(0, 245, 255, 0.3)",
            borderWidth: 1,
            borderRadius: 16,
            padding: 12,
            marginBottom: 16,
          }}
        >
          <Text className="text-xs font-semibold leading-5 text-[#0284C7]">
            ⚡ Sample schedule only. No installments have been paid or scheduled.
          </Text>
        </View>

        <View style={[glassCardStyle, { marginBottom: 18, padding: 18 }]}>
          <Text className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Preview Loan</Text>
          <Text className="mt-1 text-2xl font-black text-[#0F172A]">
            ₦300,000
          </Text>
          <Text className="mt-1 text-xs text-[#64748B]">
            Installment estimate · <Text className="font-bold text-[#059669]">₦56,000 / mo</Text>
          </Text>
        </View>

        <Text className="mb-3 text-base font-bold text-[#0F172A]">
          Installment Schedule
        </Text>
        <View style={[glassCardStyle, { paddingHorizontal: 16 }]}>
          {installments.map((installment, index) => (
            <View
              className={`flex-row items-center py-4 ${
                index > 0 ? "border-t border-[#F0EFF5]/60" : ""
              }`}
              key={installment.date}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  backgroundColor: installment.badge,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ color: installment.badgeColor, fontWeight: "bold", fontSize: 16 }}>₦</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0F172A]">
                  {installment.date}
                </Text>
                <Text className="mt-0.5 text-xs text-[#64748B]">
                  {installment.status}
                </Text>
              </View>
              <Text className="text-sm font-extrabold text-[#0F172A]">
                {installment.amount}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-6">
          <PrimaryButton
            title="Pay Now"
            onPress={() => {
              if (Platform.OS === "web") {
                router.push("/repayment");
                return;
              }
              Alert.alert(
                "Payments not connected",
                "This repayment preview cannot make or record a payment.",
                [
                  { text: "OK", style: "cancel" },
                  { text: "Repayment options", onPress: () => router.push("/repayment") },
                ],
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
