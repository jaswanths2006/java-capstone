import { router } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton } from "../components/loan-ui";

export default function ApplicationSuccessScreen() {
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-[#F4F6FB] px-7"
      edges={["top", "bottom"]}
    >
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          marginBottom: 32,
          height: 140,
          width: 140,
          borderRadius: 70,
          backgroundColor: "rgba(0, 255, 135, 0.15)",
          borderWidth: 2,
          borderColor: "rgba(0, 255, 135, 0.4)",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 35px rgba(0, 255, 135, 0.35)",
        }}
      >
        <View
          style={{
            height: 96,
            width: 96,
            borderRadius: 48,
            backgroundColor: "#00FF87",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(0, 255, 135, 0.6)",
          }}
        >
          <Text className="text-5xl font-extrabold text-[#022c22]">✓</Text>
        </View>
      </View>
      <Text className="text-center text-2xl font-black text-[#0F172A]">
        Application Preview Complete!
      </Text>
      <Text className="mt-3 max-w-[320px] text-center text-sm leading-6 text-[#64748B]">
        Your loan application has passed AI Document Verification and is ready for disbursement.
      </Text>
      <View className="mt-8 w-full">
        <PrimaryButton
          title="Back to Dashboard"
          onPress={() => router.replace("/(tabs)")}
        />
      </View>
      <Pressable
        accessibilityRole="button"
        className="mt-5"
        onPress={() => router.replace("/calculator")}
      >
        <Text className="text-sm font-bold text-[#059669]">
          Start another application preview →
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
