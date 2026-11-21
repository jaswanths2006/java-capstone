import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs, ScreenHeader, glassCardStyle } from "../components/loan-ui";

const noticeItems = [
  {
    title: "Repayment reminder",
    detail: "Your sample installment is due on 15 Nov 2026.",
    icon: "◷",
    iconBg: "rgba(0, 245, 255, 0.15)",
    iconColor: "#0284C7",
    route: "/repayment-history" as const,
  },
  {
    title: "Loan application",
    detail: "Continue your application preview from where you left off.",
    icon: "₦",
    iconBg: "rgba(0, 255, 135, 0.15)",
    iconColor: "#059669",
    route: "/(tabs)/loans" as const,
  },
  {
    title: "Welcome to ALIGNLOAN",
    detail: "Explore the loan screens in this interactive neon demo.",
    icon: "⚡",
    iconBg: "rgba(168, 85, 247, 0.15)",
    iconColor: "#7C3AED",
    route: "/(tabs)" as const,
  },
];

export default function NotificationsScreen() {
  const [unread, setUnread] = useState([true, true, false]);

  function openNotice(index: number) {
    setUnread((current) => current.map((isUnread, item) => item === index ? false : isUnread));
    router.push(noticeItems[index].route);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Notifications" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="text-2xl font-black text-[#0F172A]">
            Notifications
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setUnread([false, false, false])}
          >
            <Text className="text-xs font-bold text-[#059669]">
              Mark all read
            </Text>
          </Pressable>
        </View>

        <View style={[glassCardStyle, { paddingHorizontal: 16 }]}>
          {noticeItems.map((notice, index) => (
            <Pressable
              accessibilityRole="button"
              className={`flex-row items-start py-4 ${
                index > 0 ? "border-t border-[#F0EFF5]/60" : ""
              }`}
              key={notice.title}
              onPress={() => openNotice(index)}
            >
              <View
                style={{
                  marginRight: 14,
                  height: 42,
                  width: 42,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                  backgroundColor: notice.iconBg,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold", color: notice.iconColor }}>
                  {notice.icon}
                </Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="flex-1 text-sm font-bold text-[#0F172A]">
                    {notice.title}
                  </Text>
                  {unread[index] ? (
                    <View
                      style={{
                        marginLeft: 8,
                        height: 8,
                        width: 8,
                        borderRadius: 4,
                        backgroundColor: "#00FF87",
                        boxShadow: "0 0 8px #00FF87",
                      }}
                    />
                  ) : null}
                </View>
                <Text className="mt-1 text-xs leading-5 text-[#64748B]">
                  {notice.detail}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          className="mt-5 items-center py-3"
          onPress={() => router.push("/notification-settings")}
        >
          <Text className="text-sm font-bold text-[#059669]">
            Notification settings →
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
