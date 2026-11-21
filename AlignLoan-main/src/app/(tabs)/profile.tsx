import { router } from "expo-router";
import { Alert, Image, Platform, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs } from "../../components/loan-ui";

const profileItems = [
  {
    title: "Personal Information",
    icon: "♙",
    route: "/personal-information" as const,
    color: "#00FF87",
    bg: "rgba(0, 255, 135, 0.12)",
  },
  {
    title: "Change Password",
    icon: "⌑",
    route: "/change-password" as const,
    color: "#00F5FF",
    bg: "rgba(0, 245, 255, 0.12)",
  },
  {
    title: "Notification Settings",
    icon: "🔔",
    route: "/notification-settings" as const,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.12)",
  },
  {
    title: "Help & Support (AI Chat)",
    icon: "🤖",
    route: "/help-support" as const,
    color: "#A855F7",
    bg: "rgba(168, 85, 247, 0.12)",
  },
];

export default function ProfileTab() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with logo */}
        <View className="mb-6 mt-4 flex-row items-center">
          <Image
            source={require("../../../assets/images/alignloan-logo.jpg")}
            style={{
              width: 38,
              height: 38,
              resizeMode: "contain",
              borderRadius: 10,
              marginRight: 12,
              boxShadow: "0 4px 15px rgba(0, 230, 118, 0.25)",
            }}
          />
          <Text className="text-2xl font-black text-[#0F172A]">Profile</Text>
        </View>

        {/* User Profile Glass Card */}
        <View
          className="mb-5 flex-row items-center rounded-[30px] p-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1.5,
            borderColor: "rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.04), 0 0 20px rgba(0, 230, 118, 0.08)",
          }}
        >
          <View
            className="mr-3.5 h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #00FF87 0%, #0B6623 100%)",
              boxShadow: "0 6px 18px rgba(0, 230, 118, 0.35)",
            }}
          >
            <Text className="text-xl font-black text-white">BO</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-black text-[#0F172A]">
              Blessing Okafor
            </Text>
            <Text className="mt-0.5 text-xs font-medium text-[#64748B]">
              blessing.okafor@example.com
            </Text>
            <View
              className="mt-2 self-start rounded-full px-2.5 py-0.5"
              style={{
                backgroundColor: "rgba(0, 255, 135, 0.15)",
                borderWidth: 1,
                borderColor: "rgba(0, 255, 135, 0.4)",
              }}
            >
              <Text className="text-[10px] font-black text-[#00C853]">
                ✓ AI Verified Borrower
              </Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-[#94A3B8]">›</Text>
        </View>

        {/* Menu Items Glass Container */}
        <View
          className="rounded-[30px] px-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          {profileItems.map((item, index) => (
            <Pressable
              accessibilityRole="button"
              className={`flex-row items-center py-4 ${
                index > 0 ? "border-t border-[#F1F5F9]" : ""
              }`}
              key={item.title}
              onPress={() => router.push(item.route)}
            >
              <View
                className="mr-3.5 h-10 w-10 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: item.bg,
                }}
              >
                <Text
                  className="text-base font-bold"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </Text>
              </View>
              <Text className="flex-1 text-sm font-bold text-[#1E293B]">
                {item.title}
              </Text>
              <Text className="text-xl font-bold text-[#94A3B8]">›</Text>
            </Pressable>
          ))}
        </View>

        {/* Log Out Glass Button */}
        <Pressable
          accessibilityRole="button"
          className="mt-4 flex-row items-center rounded-[26px] p-4 active:scale-98"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(254, 202, 202, 0.6)",
            boxShadow: "0 6px 20px rgba(239, 68, 68, 0.08)",
          }}
          onPress={() => {
            if (Platform.OS === "web") {
              router.replace("/login");
              return;
            }
            Alert.alert(
              "Demo mode",
              "No account is signed in. Authentication and sign-out will be available when connected.",
              [{ text: "OK" }, { text: "Go to login", onPress: () => router.replace("/login") }],
            );
          }}
        >
          <View
            className="mr-3.5 h-10 w-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.12)",
            }}
          >
            <Text className="text-lg font-bold text-[#EF4444]">↪</Text>
          </View>
          <Text className="flex-1 text-sm font-extrabold text-[#EF4444]">
            Log Out
          </Text>
          <Text className="text-xl font-bold text-[#FCA5A5]">›</Text>
        </Pressable>

        {/* Footer logo */}
        <View className="mt-8 items-center">
          <Image
            source={require("../../../assets/images/alignloan-logo.jpg")}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              borderRadius: 14,
              opacity: 0.7,
              boxShadow: "0 4px 15px rgba(0, 230, 118, 0.2)",
            }}
          />
          <Text className="mt-2 text-center text-xs font-semibold text-[#94A3B8]">
            ALIGNLOAN · Neon Glass Edition
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
