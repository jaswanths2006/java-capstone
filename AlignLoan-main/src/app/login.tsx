import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormField, NeonBackgroundOrbs, PrimaryButton } from "../components/loan-ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function logIn() {
    if (!email.trim() || !password) {
      Alert.alert(
        "Missing information",
        "Enter your email and password to continue.",
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Check your email", "Enter a valid email address.");
      return;
    }

    if (Platform.OS === "web") {
      router.replace("/(tabs)");
      return;
    }

    Alert.alert(
      "Demo sign-in",
      "Authentication is not connected yet. Continue to preview the loan dashboard?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)"),
        },
      ],
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB]" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 pb-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ALIGNLOAN LOGO WITH GLASS GLOW */}
          <View className="items-center pt-8">
            <View
              className="rounded-3xl p-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(16px)",
                borderWidth: 1,
                borderColor: "rgba(0, 230, 118, 0.4)",
                boxShadow: "0 8px 30px rgba(0, 230, 118, 0.25)",
              }}
            >
              <Image
                source={require("../../assets/images/alignloan-logo.jpg")}
                style={{
                  width: 160,
                  height: 90,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>

          {/* PAGE TITLE */}
          <View className="mb-6 mt-8 items-center">
            <Text className="text-3xl font-black text-[#0F172A]">
              Welcome Back!
            </Text>
            <Text className="mt-1.5 text-sm font-medium text-[#64748B]">
              Log in to your ALIGNLOAN account
            </Text>
          </View>

          {/* FROSTED GLASS LOGIN CARD */}
          <View
            className="rounded-[32px] p-6"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderWidth: 1.5,
              borderColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 15px 45px rgba(0, 0, 0, 0.05)",
            }}
          >
            <View className="gap-5">
              <FormField
                icon="@"
                keyboardType="email-address"
                label="Email"
                onChangeText={setEmail}
                placeholder="Enter your email"
                value={email}
              />

              <FormField
                icon="•"
                label="Password"
                onChangeText={setPassword}
                onToggleSecure={() => setShowPassword((visible) => !visible)}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
              />
            </View>

            {/* FORGOT PASSWORD */}
            <Pressable
              accessibilityRole="button"
              className="mt-4 self-end"
              onPress={() =>
                Alert.alert(
                  "Password reset",
                  "Password reset will be available when authentication is connected.",
                )
              }
            >
              <Text className="text-xs font-bold text-[#00C853]">
                Forgot Password?
              </Text>
            </Pressable>

            {/* LOGIN BUTTON */}
            <View className="mt-7">
              <PrimaryButton title="Log In →" onPress={logIn} />
            </View>
          </View>

          {/* SIGN UP */}
          <Pressable
            accessibilityRole="button"
            className="mt-6 items-center"
            onPress={() => router.replace("/create-account")}
          >
            <Text className="text-sm font-medium text-[#64748B]">
              Don&apos;t have an account?{" "}
              <Text className="font-extrabold text-[#00C853]">Sign Up</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
