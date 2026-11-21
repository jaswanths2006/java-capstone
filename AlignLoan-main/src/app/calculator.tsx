import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader } from "../components/loan-ui";

const MIN_AMOUNT = 50_000;
const MAX_AMOUNT = 1_000_000;
const AMOUNT_STEP = 50_000;

function formatNaira(value: number) {
  return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
}

export default function CalculatorScreen() {
  const [amount, setAmount] = useState(300_000);
  const [tenure, setTenure] = useState(6);
  const monthlyEstimate = Math.round((amount * 1.12) / tenure);
  const progress = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />
      <ScreenHeader title="Loan Calculator" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-3xl font-black text-[#0F172A]">
          Loan Calculator
        </Text>

        {/* Loan Amount Glass Card */}
        <View
          className="rounded-[30px] p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Loan Amount
            </Text>
            <View
              className="rounded-full px-2.5 py-0.5"
              style={{
                backgroundColor: "rgba(0, 230, 118, 0.12)",
                borderWidth: 1,
                borderColor: "rgba(0, 230, 118, 0.35)",
              }}
            >
              <Text className="text-[10px] font-bold text-[#00C853]">
                Flexible
              </Text>
            </View>
          </View>

          <Text
            className="mt-2 text-3xl font-black text-[#0F172A]"
            style={{
              textShadowColor: "rgba(0, 230, 118, 0.2)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 8,
            }}
          >
            {formatNaira(amount)}
          </Text>

          {/* Neon Gradient Progress Bar */}
          <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#E2E8F0]">
            <View
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #00FF87 0%, #00F5FF 100%)",
                boxShadow: "0 0 10px rgba(0, 255, 135, 0.5)",
              }}
            />
          </View>

          <View className="mt-3.5 flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#94A3B8]">
              {formatNaira(MIN_AMOUNT)}
            </Text>
            <View className="flex-row gap-2.5">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Decrease loan amount"
                className="h-10 w-10 items-center justify-center rounded-2xl active:scale-95"
                style={{
                  backgroundColor: "rgba(0, 230, 118, 0.12)",
                  borderWidth: 1,
                  borderColor: "rgba(0, 230, 118, 0.3)",
                }}
                onPress={() =>
                  setAmount((current) =>
                    Math.max(MIN_AMOUNT, current - AMOUNT_STEP),
                  )
                }
              >
                <Text className="text-xl font-black text-[#00C853]">−</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Increase loan amount"
                className="h-10 w-10 items-center justify-center rounded-2xl active:scale-95"
                style={{
                  backgroundColor: "rgba(0, 230, 118, 0.12)",
                  borderWidth: 1,
                  borderColor: "rgba(0, 230, 118, 0.3)",
                }}
                onPress={() =>
                  setAmount((current) =>
                    Math.min(MAX_AMOUNT, current + AMOUNT_STEP),
                  )
                }
              >
                <Text className="text-xl font-black text-[#00C853]">+</Text>
              </Pressable>
            </View>
            <Text className="text-xs font-semibold text-[#94A3B8]">
              {formatNaira(MAX_AMOUNT)}
            </Text>
          </View>
        </View>

        {/* Tenure Glass Card */}
        <View
          className="mt-4 rounded-[30px] p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Repayment Tenure
            </Text>
            <View
              className="rounded-full px-2.5 py-0.5"
              style={{
                backgroundColor: "rgba(0, 245, 255, 0.12)",
                borderWidth: 1,
                borderColor: "rgba(0, 245, 255, 0.35)",
              }}
            >
              <Text className="text-[10px] font-bold text-[#0284C7]">
                Months
              </Text>
            </View>
          </View>

          <Text className="mt-2 text-3xl font-black text-[#0F172A]">
            {tenure} months
          </Text>

          {/* Neon Gradient Progress Bar */}
          <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#E2E8F0]">
            <View
              className="h-full rounded-full"
              style={{
                width: `${((tenure - 3) / 21) * 100}%`,
                background:
                  "linear-gradient(90deg, #00F5FF 0%, #A855F7 100%)",
                boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
              }}
            />
          </View>

          <View className="mt-3.5 flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#94A3B8]">3 mos</Text>
            <View className="flex-row gap-2.5">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Decrease loan tenure"
                className="h-10 w-10 items-center justify-center rounded-2xl active:scale-95"
                style={{
                  backgroundColor: "rgba(0, 245, 255, 0.12)",
                  borderWidth: 1,
                  borderColor: "rgba(0, 245, 255, 0.3)",
                }}
                onPress={() => setTenure((current) => Math.max(3, current - 3))}
              >
                <Text className="text-xl font-black text-[#0284C7]">−</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Increase loan tenure"
                className="h-10 w-10 items-center justify-center rounded-2xl active:scale-95"
                style={{
                  backgroundColor: "rgba(0, 245, 255, 0.12)",
                  borderWidth: 1,
                  borderColor: "rgba(0, 245, 255, 0.3)",
                }}
                onPress={() => setTenure((current) => Math.min(24, current + 3))}
              >
                <Text className="text-xl font-black text-[#0284C7]">+</Text>
              </Pressable>
            </View>
            <Text className="text-xs font-semibold text-[#94A3B8]">24 mos</Text>
          </View>
        </View>

        {/* Cyber-Glass Monthly Installment Card */}
        <View
          className="mt-4 overflow-hidden rounded-[30px] p-5"
          style={{
            background:
              "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f172a 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.4)",
            boxShadow: "0 15px 35px rgba(6, 78, 59, 0.3)",
          }}
        >
          <Text className="text-xs font-bold uppercase tracking-wider text-[#A7F3D0]">
            Estimated Monthly Installment
          </Text>
          <Text
            className="mt-2 text-3xl font-black text-white"
            style={{
              textShadowColor: "rgba(0, 255, 135, 0.5)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            {formatNaira(monthlyEstimate)}
          </Text>
          <Text className="mt-2 text-xs leading-5 text-emerald-200/80">
            Estimate only. Gemini AI evaluates affordability during review.
          </Text>
        </View>

        <View className="mt-6">
          <PrimaryButton
            title="Continue to Select Loan →"
            onPress={() =>
              router.push({
                pathname: "/select-loan",
                params: { amount: String(amount), tenure: String(tenure) },
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
