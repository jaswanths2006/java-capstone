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

export default function CreateAccountScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function createAccount() {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
      Alert.alert("Missing information", "Please complete all fields to continue.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Check your email", "Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Password too short", "Use at least 8 characters.");
      return;
    }

    if (Platform.OS === "web") {
      router.replace("/(tabs)");
      return;
    }

    Alert.alert(
      "Demo account",
      "Account creation is not connected yet. Continue to preview the loan dashboard?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: () => router.replace("/(tabs)") },
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
          {/* Logo with Glass Frame */}
          <View className="items-center pt-4">
            <View
              className="rounded-2xl p-2.5"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(16px)",
                borderWidth: 1,
                borderColor: "rgba(0, 230, 118, 0.35)",
                boxShadow: "0 6px 20px rgba(0, 230, 118, 0.2)",
              }}
            >
              <Image
                source={require("../../assets/images/alignloan-logo.jpg")}
                style={{
                  width: 64,
                  height: 64,
                  resizeMode: "contain",
                  borderRadius: 14,
                }}
              />
            </View>
          </View>

          <View className="mb-5 mt-4 items-center">
            <Text className="text-3xl font-black text-[#0F172A]">
              Create Account
            </Text>
            <Text className="mt-1 text-sm font-medium text-[#64748B]">
              Join ALIGNLOAN and get started today.
            </Text>
          </View>

          {/* Frosted Glass Form Card */}
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
            <View className="gap-4">
              <FormField
                autoCapitalize="words"
                icon="A"
                label="Full Name"
                onChangeText={setFullName}
                placeholder="Enter your full name"
                value={fullName}
              />
              <FormField
                icon="@"
                keyboardType="email-address"
                label="Email Address"
                onChangeText={setEmail}
                placeholder="Enter your email"
                value={email}
              />
              <FormField
                icon="#"
                keyboardType="phone-pad"
                label="Phone Number"
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                value={phone}
              />
              <FormField
                icon="•"
                label="Password"
                onChangeText={setPassword}
                onToggleSecure={() => setShowPassword((visible) => !visible)}
                placeholder="Create a password"
                secureTextEntry={!showPassword}
                value={password}
              />
            </View>

            <View className="mt-7">
              <PrimaryButton title="Create Account →" onPress={createAccount} />
            </View>
          </View>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
