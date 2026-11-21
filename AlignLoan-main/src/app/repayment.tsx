import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader } from "../components/loan-ui";

const repaymentOptions = [
  {
    title: "Payment Reminder",
    detail: "Due in 3 days",
    icon: "◷",
    color: "#00F5FF",
    bg: "rgba(0, 245, 255, 0.12)",
  },
  {
    title: "Loan Repayment",
    detail: "Due in 5 days",
    icon: "₦",
    color: "#00FF87",
    bg: "rgba(0, 255, 135, 0.12)",
  },
  {
    title: "Monthly Payment",
    detail: "Due in 5 days",
    icon: "↻",
    color: "#A855F7",
    bg: "rgba(168, 85, 247, 0.12)",
  },
];

export default function RepaymentScreen() {
  const params = useLocalSearchParams<{ amount?: string; tenure?: string }>();
  const [selectedOption, setSelectedOption] = useState(1);
  const amount = Number(params.amount) || 300_000;

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />
      <ScreenHeader title="Make Repayment" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-3xl font-black text-[#0F172A]">
          Make Repayment
        </Text>
        <Text className="text-sm font-medium text-[#64748B]">
          Choose a payment schedule option
        </Text>

        <View className="mt-6 gap-3.5">
          {repaymentOptions.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                className="flex-row items-center rounded-3xl p-4 active:scale-98"
                style={
                  isSelected
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(20px)",
                        borderWidth: 1.5,
                        borderColor: "#00E676",
                        boxShadow:
                          "0 10px 30px rgba(0, 230, 118, 0.18), 0 0 15px rgba(0, 230, 118, 0.15)",
                      }
                    : {
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                        backdropFilter: "blur(16px)",
                        borderWidth: 1,
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
                      }
                }
                key={option.title}
                onPress={() => setSelectedOption(index)}
              >
                <View
                  className="mr-3.5 h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: option.bg,
                  }}
                >
                  <Text
                    className="text-xl font-black"
                    style={{ color: option.color }}
                  >
                    {option.icon}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-extrabold text-[#0F172A]">
                    {option.title}
                  </Text>
                  <Text className="mt-0.5 text-xs text-[#64748B]">
                    {option.detail}
                  </Text>
                </View>
                <View
                  className="h-6 w-6 items-center justify-center rounded-full"
                  style={
                    isSelected
                      ? {
                          backgroundColor: "#00E676",
                          boxShadow: "0 0 10px rgba(0, 230, 118, 0.6)",
                        }
                      : {
                          borderWidth: 1.5,
                          borderColor: "#CBD5E1",
                        }
                  }
                >
                  {isSelected ? (
                    <Text className="text-xs font-black text-white">✓</Text>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Selected Amount Glass Card */}
        <View
          className="mt-6 rounded-3xl p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Text className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Selected Loan Amount
          </Text>
          <Text
            className="mt-1 text-2xl font-black text-[#0F172A]"
            style={{
              textShadowColor: "rgba(0, 230, 118, 0.2)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 8,
            }}
          >
            ₦{new Intl.NumberFormat("en-NG").format(amount)}
          </Text>
        </View>

        <View className="mt-auto pt-8">
          <PrimaryButton
            title="Continue to Application Form →"
            onPress={() =>
              router.push({
                pathname: "/application-form",
                params: {
                  amount: String(amount),
                  tenure: params.tenure || "6",
                  repaymentOption: repaymentOptions[selectedOption].title,
                },
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
