import { useState } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BrandLogo,
  NeonBackgroundOrbs,
  OnboardingArtwork,
  PrimaryButton,
} from "../components/loan-ui";

const slides = [
  {
    kind: "funds" as const,
    title: "Get the Funds\nYou Need",
    description:
      "Fast, secure and flexible loans to help you achieve your goals.",
  },
  {
    kind: "repayment" as const,
    title: "Flexible Repayment\nPlans",
    description:
      "Choose a repayment plan that works for you and your budget.",
  },
  {
    kind: "secure" as const,
    title: "Safe & Secure",
    description:
      "Your data and money are always protected with industry-leading security.",
  },
];

export default function OnboardingScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  const isLastSlide = activeSlide === slides.length - 1;

  function continueOnboarding() {
    if (isLastSlide) {
      router.replace("/create-account");
      return;
    }

    setActiveSlide((current) => current + 1);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-6" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />

      {/* Header with Frosted Glass Badge */}
      <View className="flex-row items-center justify-between pt-2">
        <BrandLogo size="small" />
        <Pressable
          accessibilityRole="button"
          className="rounded-full px-3 py-1.5 active:bg-gray-100"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.8)",
          }}
          onPress={() => router.replace("/create-account")}
        >
          <Text className="text-xs font-bold text-[#64748B]">Skip</Text>
        </Pressable>
      </View>

      {/* Main Glass Card Area */}
      <View className="flex-1 justify-center">
        <View
          className="items-center rounded-[36px] py-10 px-6"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderWidth: 1.5,
            borderColor: "rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 20px 45px rgba(0, 0, 0, 0.05), 0 0 25px rgba(0, 230, 118, 0.08)",
          }}
        >
          <OnboardingArtwork kind={slide.kind} />
          <View className="mt-5 items-center">
            <Text className="text-center text-3xl font-black leading-9 text-[#0F172A]">
              {slide.title}
            </Text>
            <Text className="mt-3 max-w-[290px] text-center text-sm leading-6 text-[#64748B]">
              {slide.description}
            </Text>
          </View>
        </View>
      </View>

      <View className="pb-6">
        {/* Neon Indicator Pills */}
        <View className="mb-6 flex-row justify-center gap-2">
          {slides.map((item, index) => (
            <View
              className={`h-2.5 rounded-full ${
                index === activeSlide ? "w-8" : "w-2.5"
              }`}
              style={
                index === activeSlide
                  ? {
                      background:
                        "linear-gradient(90deg, #00FF87 0%, #00F5FF 100%)",
                      boxShadow: "0 0 10px rgba(0, 255, 135, 0.6)",
                    }
                  : {
                      backgroundColor: "rgba(148, 163, 184, 0.35)",
                    }
              }
              key={item.kind}
            />
          ))}
        </View>

        <PrimaryButton
          title={isLastSlide ? "Get Started →" : "Continue →"}
          onPress={continueOnboarding}
        />

        <Pressable
          accessibilityRole="button"
          className="mt-5 items-center"
          onPress={() => router.replace("/login")}
        >
          <Text className="text-sm font-medium text-[#64748B]">
            Already have an account?{" "}
            <Text className="font-extrabold text-[#00C853]">Log in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
