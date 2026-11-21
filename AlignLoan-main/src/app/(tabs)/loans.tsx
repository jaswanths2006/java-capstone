import { router } from "expo-router";
import { Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs } from "../../components/loan-ui";

export default function LoansTab() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with glass frame */}
        <View className="mb-6 mt-4 flex-row items-center">
          <Image
            source={require("../../../assets/images/alignloan-logo.jpg")}
            style={{
              width: 38,
              height: 38,
              resizeMode: "contain",
              borderRadius: 10,
              marginRight: 12,
              boxShadow: "0 4px 15px rgba(0, 230, 118, 0.25)",
            }}
          />
          <View>
            <Text className="text-2xl font-black text-[#0F172A]">My Loans</Text>
            <Text className="mt-0.5 text-xs text-[#64748B]">
              Loan details and repayment schedule
            </Text>
          </View>
        </View>

        {/* AI Notice Badge */}
        <View
          className="mb-4 rounded-2xl p-3"
          style={{
            backgroundColor: "rgba(0, 255, 135, 0.1)",
            borderWidth: 1,
            borderColor: "rgba(0, 255, 135, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Text className="text-xs font-semibold leading-5 text-[#065F46]">
            ⚡ Preview loan active · Verified with Google Gemini AI
          </Text>
        </View>

        {/* Cyber-Glass Loan Card */}
        <Pressable
          accessibilityRole="button"
          className="overflow-hidden rounded-[32px] p-6 active:scale-98"
          style={{
            background:
              "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f172a 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.45)",
            boxShadow:
              "0 20px 45px rgba(6, 78, 59, 0.35), inset 0 0 25px rgba(0, 255, 135, 0.15)",
          }}
          onPress={() => router.push("/loan-details")}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#A7F3D0]">
              Preview Loan
            </Text>
            <View
              className="rounded-full px-3 py-1"
              style={{
                backgroundColor: "rgba(0, 255, 135, 0.2)",
                borderWidth: 1,
                borderColor: "rgba(0, 255, 135, 0.5)",
              }}
            >
              <Text className="text-[10px] font-black text-[#00FF87]">Sample</Text>
            </View>
          </View>

          <Text
            className="mt-4 text-4xl font-black text-white"
            style={{
              textShadowColor: "rgba(0, 255, 135, 0.4)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            ₦300,000
          </Text>

          <View className="mt-5 flex-row items-center justify-between border-t border-white/20 pt-4">
            <View>
              <Text className="text-xs font-medium text-[#A7F3D0]">Next payment</Text>
              <Text className="mt-1 text-base font-extrabold text-white">₦56,000</Text>
            </View>
            <Text className="text-2xl font-bold text-[#00FF87]">›</Text>
          </View>
        </Pressable>

        {/* Repayment History Glass Card */}
        <Pressable
          accessibilityRole="button"
          className="mt-4 flex-row items-center rounded-3xl p-4 active:scale-98"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
          }}
          onPress={() => router.push("/repayment-history")}
        >
          <View
            className="mr-3.5 h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "rgba(0, 245, 255, 0.12)",
              borderWidth: 1,
              borderColor: "rgba(0, 245, 255, 0.35)",
              boxShadow: "0 0 15px rgba(0, 245, 255, 0.2)",
            }}
          >
            <Text className="text-xl font-black text-[#0284C7]">↻</Text>
          </View>
          <Text className="flex-1 text-sm font-extrabold text-[#0F172A]">
            Repayment History
          </Text>
          <Text className="text-xl font-bold text-[#94A3B8]">›</Text>
        </Pressable>

        {/* Calculate Another Loan Glass Button */}
        <Pressable
          accessibilityRole="button"
          className="mt-4 h-14 items-center justify-center rounded-2xl active:opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 255, 135, 0.15) 0%, rgba(0, 245, 255, 0.15) 100%)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 230, 118, 0.4)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 20px rgba(0, 230, 118, 0.15)",
          }}
          onPress={() => router.push("/calculator")}
        >
          <Text className="text-sm font-black text-[#0B6623]">
            Calculate Another Loan →
          </Text>
        </Pressable>

        {/* Disbursement Receipt Preview Button */}
        <Pressable
          accessibilityRole="button"
          className="mt-3 items-center py-3"
          onPress={() => router.push("/loan-disbursement")}
        >
          <Text className="text-xs font-bold text-[#64748B]">
            View disbursement receipt preview
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
