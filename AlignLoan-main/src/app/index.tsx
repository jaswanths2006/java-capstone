import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs } from "../components/loan-ui";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#090D16] px-5 py-5">
      <StatusBar barStyle="light-content" />
      <NeonBackgroundOrbs />

      <View className="flex-1 items-center justify-center">
        {/* Cyber-Neon Glassmorphic Hero Container */}
        <View
          className="w-full max-w-md flex-1 items-center justify-center overflow-hidden rounded-[36px] px-7"
          style={{
            background:
              "linear-gradient(145deg, rgba(6, 78, 59, 0.85) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(6, 95, 70, 0.85) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.35)",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 255, 135, 0.12)",
          }}
        >
          {/* Luminous Neon Floating Backdrops */}
          <View
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 220,
              height: 220,
              borderRadius: 110,
              backgroundColor: "#00F5FF",
              opacity: 0.3,
              filter: "blur(50px)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -60,
              left: -50,
              width: 240,
              height: 240,
              borderRadius: 120,
              backgroundColor: "#00FF87",
              opacity: 0.28,
              filter: "blur(55px)",
            }}
          />

          <View className="flex-1 items-center justify-center">
            {/* Neon Chip Tag */}
            <View
              className="mb-6 flex-row items-center gap-1.5 rounded-full px-4 py-1.5"
              style={{
                backgroundColor: "rgba(0, 255, 135, 0.15)",
                borderWidth: 1,
                borderColor: "rgba(0, 255, 135, 0.5)",
                boxShadow: "0 0 15px rgba(0, 255, 135, 0.3)",
              }}
            >
              <Text className="text-xs font-bold text-[#00FF87]">⚡</Text>
              <Text className="text-[11px] font-extrabold tracking-wider text-[#00FF87]">
                NEXT-GEN AI LENDING
              </Text>
            </View>

            {/* AlignLoan Logo with Neon Glass Frame */}
            <View
              className="mb-6 h-32 w-32 items-center justify-center overflow-hidden rounded-[30px]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderWidth: 2,
                borderColor: "rgba(0, 255, 135, 0.6)",
                boxShadow:
                  "0 0 35px rgba(0, 255, 135, 0.45), 0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Image
                source={require("../../assets/images/alignloan-logo.jpg")}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                }}
              />
            </View>

            <Text
              className="text-center text-4xl font-black tracking-[4px] text-white"
              style={{
                textShadowColor: "rgba(0, 255, 135, 0.6)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 15,
              }}
            >
              ALIGNLOAN
            </Text>

            <Text className="mt-3 text-center text-base font-bold text-[#A7F3D0]">
              Your Goals. Our Support.
            </Text>

            <Text className="mt-8 max-w-xs text-center text-sm leading-6 text-slate-300">
              Fast, smart & flexible loans powered by Gemini AI verification.
            </Text>
          </View>

          {/* Neon Gradient Action Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue to the loan app"
            className="mb-10 h-14 w-full items-center justify-center rounded-2xl active:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, #00FF87 0%, #00F5FF 100%)",
              boxShadow:
                "0 0 25px rgba(0, 255, 135, 0.5), 0 8px 20px rgba(0, 245, 255, 0.4)",
            }}
            onPress={() => router.replace("/onboarding")}
          >
            <Text className="text-base font-black tracking-wide text-slate-950">
              Get Started →
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
