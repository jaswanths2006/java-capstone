import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader } from "./loan-ui";

export type LoanApplicationData = {
  amount?: string;
  tenure?: string;
  purpose?: string;
  employmentType?: string;
  employer?: string;
  jobTitle?: string;
  income?: string;
  workAddress?: string;
  bank?: string;
  accountNumber?: string;
  accountLastFour?: string;
  accountName?: string;
};

export function getApplicationParams(data: LoanApplicationData) {
  return Object.fromEntries(
    Object.entries(data).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  ) as Record<string, string>;
}

export function ApplicationStep({
  step,
  title,
  subtitle,
  children,
  buttonTitle = "Continue →",
  onContinue,
}: {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  buttonTitle?: string;
  onContinue: () => void;
}) {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScreenHeader title={title} />
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow pb-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Step {step} of 5
              </Text>
              <View
                className="rounded-full px-2.5 py-0.5"
                style={{
                  backgroundColor: "rgba(0, 230, 118, 0.15)",
                  borderWidth: 1,
                  borderColor: "rgba(0, 230, 118, 0.4)",
                }}
              >
                <Text className="text-[11px] font-black text-[#00C853]">
                  {step * 20}%
                </Text>
              </View>
            </View>

            {/* Neon Progress Bar */}
            <View className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${step * 20}%`,
                  background:
                    "linear-gradient(90deg, #00FF87 0%, #00F5FF 100%)",
                  boxShadow: "0 0 10px rgba(0, 255, 135, 0.5)",
                }}
              />
            </View>

            <Text className="mt-5 text-3xl font-black text-[#0F172A]">
              {title}
            </Text>
            <Text className="mt-1.5 text-sm font-medium leading-5 text-[#64748B]">
              {subtitle}
            </Text>
          </View>

          <View className="gap-4">{children}</View>

          <View className="mt-auto pt-8">
            <PrimaryButton title={buttonTitle} onPress={onContinue} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function ApplicationField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "number-pad" | "phone-pad";
}) {
  return (
    <View>
      <Text className="mb-2 text-sm font-bold text-[#334155]">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className="h-13 rounded-2xl px-4 text-sm font-medium text-[#1E293B]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderWidth: 1.5,
          borderColor: "rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
        }}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
      />
    </View>
  );
}

export function ApplicationChoices({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View>
      <Text className="mb-2 text-sm font-bold text-[#334155]">{label}</Text>
      <View className="flex-row flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = value === option;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              className="rounded-2xl px-4 py-2.5 active:scale-95"
              style={
                selected
                  ? {
                      backgroundColor: "rgba(0, 230, 118, 0.15)",
                      borderWidth: 1.5,
                      borderColor: "#00E676",
                      boxShadow: "0 0 15px rgba(0, 230, 118, 0.3)",
                    }
                  : {
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(12px)",
                      borderWidth: 1,
                      borderColor: "rgba(226, 232, 240, 0.8)",
                    }
              }
              key={option}
              onPress={() => onChange(option)}
            >
              <Text
                className={`text-xs font-bold ${
                  selected ? "text-[#0B6623]" : "text-[#64748B]"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-start justify-between border-b border-[#F1F5F9] py-3.5">
      <Text className="mr-3 text-sm font-medium text-[#64748B]">{label}</Text>
      <Text className="flex-1 text-right text-sm font-extrabold text-[#0F172A]">
        {value}
      </Text>
    </View>
  );
}
