import { router } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader, glassCardStyle } from "../components/loan-ui";

export default function LoanDisbursementScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Disbursement Preview" />
      <View className="flex-1">
        <View
          style={{
            backgroundColor: "rgba(0, 255, 135, 0.1)",
            borderColor: "rgba(0, 255, 135, 0.3)",
            borderWidth: 1,
            borderRadius: 16,
            padding: 12,
            marginBottom: 16,
          }}
        >
          <Text className="text-xs font-semibold leading-5 text-[#059669]">
            ⚡ Sample receipt for UI preview, not a real financial transaction.
          </Text>
        </View>

        {/* Glass Receipt Card */}
        <View style={[glassCardStyle, { alignItems: "center", paddingVertical: 28, paddingHorizontal: 20 }]}>
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: "rgba(0, 255, 135, 0.2)",
              borderWidth: 2,
              borderColor: "#00FF87",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              boxShadow: "0 0 25px rgba(0, 255, 135, 0.4)",
            }}
          >
            <Text className="text-3xl font-extrabold text-[#00FF87]">✓</Text>
          </View>
          <Text className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Disbursement Amount
          </Text>
          <Text className="mt-2 text-3xl font-black text-[#0F172A]">
            ₦300,000
          </Text>
          <View
            style={{
              marginTop: 12,
              borderRadius: 9999,
              backgroundColor: "rgba(0, 255, 135, 0.15)",
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderWidth: 1,
              borderColor: "rgba(0, 255, 135, 0.4)",
            }}
          >
            <Text className="text-xs font-bold text-[#059669]">
              ● Preview Successful
            </Text>
          </View>
        </View>

        <View style={[glassCardStyle, { marginTop: 16, paddingHorizontal: 16 }]}>
          <View className="flex-row justify-between border-b border-[#F0EFF5]/60 py-4">
            <Text className="text-sm text-[#64748B]">Transaction reference</Text>
            <Text className="text-sm font-bold text-[#0F172A]">DEMO-000001</Text>
          </View>
          <View className="flex-row justify-between py-4">
            <Text className="text-sm text-[#64748B]">Transaction status</Text>
            <Text className="text-sm font-bold text-[#059669]">Simulated / Ready</Text>
          </View>
        </View>

        <View className="mt-auto pb-5 pt-6">
          <PrimaryButton
            title="Done"
            onPress={() => router.replace("/(tabs)/loans")}
          />
          <Pressable
            accessibilityRole="button"
            className="mt-4 items-center py-2"
            onPress={() => router.push("/loan-details")}
          >
            <Text className="text-sm font-bold text-[#059669]">
              View loan preview
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
