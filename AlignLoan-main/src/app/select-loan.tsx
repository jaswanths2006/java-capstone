import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader } from "../components/loan-ui";

const loanOptions = [100_000, 200_000, 300_000];

function formatNaira(value: number) {
  return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
}

export default function SelectLoanScreen() {
  const params = useLocalSearchParams<{ amount?: string; tenure?: string }>();
  const requestedAmount = Number(params.amount);
  const initialAmount =
    Number.isFinite(requestedAmount) && requestedAmount >= 50_000
      ? requestedAmount
      : 300_000;
  const [amount, setAmount] = useState(initialAmount);
  const [tenure] = useState(Number(params.tenure) || 6);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />
      <ScreenHeader title="Select Loan Amount" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-3xl font-black text-[#0F172A]">
          Select Loan Amount
        </Text>
        <Text className="text-sm font-medium text-[#64748B]">
          How much funding do you need?
        </Text>

        {/* Selected Amount Frosted Glass Hero Card */}
        <View
          className="mt-8 items-center rounded-[36px] px-6 py-10"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.4)",
            boxShadow:
              "0 20px 45px rgba(0, 0, 0, 0.05), 0 0 30px rgba(0, 230, 118, 0.12)",
          }}
        >
          <View
            className="rounded-full px-3 py-1"
            style={{
              backgroundColor: "rgba(0, 230, 118, 0.14)",
              borderWidth: 1,
              borderColor: "rgba(0, 230, 118, 0.4)",
            }}
          >
            <Text className="text-[11px] font-black text-[#00C853]">
              ⚡ SELECTED OFFER
            </Text>
          </View>

          <Text
            className="mt-4 text-4xl font-black text-[#0F172A]"
            style={{
              textShadowColor: "rgba(0, 230, 118, 0.3)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            {formatNaira(amount)}
          </Text>

          {/* Quick Amount Options with Neon Highlights */}
          <View className="mt-8 flex-row gap-3">
            {loanOptions.map((option) => {
              const isSelected = amount === option;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  className="rounded-2xl px-4 py-3 active:scale-95"
                  style={
                    isSelected
                      ? {
                          backgroundColor: "rgba(0, 230, 118, 0.16)",
                          borderWidth: 1.5,
                          borderColor: "#00E676",
                          boxShadow: "0 0 16px rgba(0, 230, 118, 0.35)",
                        }
                      : {
                          backgroundColor: "rgba(255, 255, 255, 0.75)",
                          backdropFilter: "blur(12px)",
                          borderWidth: 1,
                          borderColor: "rgba(226, 232, 240, 0.8)",
                        }
                  }
                  key={option}
                  onPress={() => setAmount(option)}
                >
                  <Text
                    className={`text-xs font-black ${
                      isSelected ? "text-[#0B6623]" : "text-[#64748B]"
                    }`}
                  >
                    {formatNaira(option)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="mt-auto pt-8">
          <PrimaryButton
            title="Continue to Repayment →"
            onPress={() =>
              router.push({
                pathname: "/repayment",
                params: { amount: String(amount), tenure: String(tenure) },
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
