import { useState } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, ScreenHeader, glassCardStyle } from "../components/loan-ui";

const settingOptions = [
  { title: "Repayment reminders", detail: "Due dates and payment updates" },
  { title: "Loan updates", detail: "Application and loan status changes" },
  { title: "Product news", detail: "Tips, offers and service announcements" },
];

export default function NotificationSettingsScreen() {
  const [enabled, setEnabled] = useState([true, true, false]);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Notification Settings" />
      <Text className="mb-2 text-2xl font-black text-[#0F172A]">
        Notification Settings
      </Text>
      <Text className="mb-5 text-sm leading-5 text-[#64748B]">
        Choose the updates you want to see in this preview.
      </Text>
      <View style={[glassCardStyle, { paddingHorizontal: 16 }]}>
        {settingOptions.map((option, index) => (
          <View
            className={`flex-row items-center py-4 ${
              index > 0 ? "border-t border-[#F0EFF5]/60" : ""
            }`}
            key={option.title}
          >
            <View className="flex-1 pr-3">
              <Text className="text-sm font-bold text-[#0F172A]">
                {option.title}
              </Text>
              <Text className="mt-1 text-xs text-[#64748B]">
                {option.detail}
              </Text>
            </View>
            <Pressable
              accessibilityRole="switch"
              accessibilityState={{ checked: enabled[index] }}
              accessibilityLabel={option.title}
              style={{
                height: 28,
                width: 48,
                borderRadius: 14,
                paddingHorizontal: 2,
                justifyContent: "center",
                backgroundColor: enabled[index] ? "#00FF87" : "#CBD5E1",
                boxShadow: enabled[index] ? "0 0 10px rgba(0, 255, 135, 0.4)" : "none",
              }}
              onPress={() =>
                setEnabled((current) =>
                  current.map((value, item) =>
                    item === index ? !value : value,
                  ),
                )
              }
            >
              <View
                style={{
                  height: 22,
                  width: 22,
                  borderRadius: 11,
                  backgroundColor: "#FFFFFF",
                  alignSelf: enabled[index] ? "flex-end" : "flex-start",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            </Pressable>
          </View>
        ))}
      </View>
      <View
        style={{
          marginTop: 18,
          borderRadius: 16,
          backgroundColor: "rgba(0, 245, 255, 0.1)",
          borderColor: "rgba(0, 245, 255, 0.3)",
          borderWidth: 1,
          padding: 12,
        }}
      >
        <Text className="text-xs leading-5 text-[#0284C7]">
          Preferences are temporary in this frontend demo and reset on reload.
        </Text>
      </View>
    </SafeAreaView>
  );
}
