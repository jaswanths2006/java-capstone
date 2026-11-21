import { router } from "expo-router";
import { Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs } from "../../components/loan-ui";

const quickActions = [
  {
    title: "Calculator",
    icon: "⌗",
    route: "/calculator" as const,
    color: "#00F5FF",
    bg: "rgba(0, 245, 255, 0.12)",
    border: "rgba(0, 245, 255, 0.35)",
  },
  {
    title: "My Loans",
    icon: "₦",
    route: "/(tabs)/loans" as const,
    color: "#00FF87",
    bg: "rgba(0, 255, 135, 0.12)",
    border: "rgba(0, 255, 135, 0.35)",
  },
  {
    title: "AI Support",
    icon: "🤖",
    route: "/help-support" as const,
    color: "#A855F7",
    bg: "rgba(168, 85, 247, 0.12)",
    border: "rgba(168, 85, 247, 0.35)",
  },
];

export default function HomeTab() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Glass Card & Logo */}
        <View
          className="mb-6 mt-3 flex-row items-center justify-between rounded-2xl p-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          <View className="flex-row items-center">
            <Image
              source={require("../../../assets/images/alignloan-logo.jpg")}
              style={{
                width: 44,
                height: 44,
                resizeMode: "contain",
                borderRadius: 12,
                marginRight: 12,
                boxShadow: "0 4px 15px rgba(0, 230, 118, 0.25)",
              }}
            />
            <View>
              <Text className="text-xs font-semibold text-[#64748B]">Hello, Blessing 👋</Text>
              <Text className="text-lg font-black text-[#0F172A]">
                Welcome back
              </Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open notifications"
            className="h-11 w-11 items-center justify-center rounded-full active:scale-95"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderWidth: 1,
              borderColor: "rgba(0, 230, 118, 0.3)",
              boxShadow: "0 0 15px rgba(0, 230, 118, 0.2)",
            }}
            onPress={() => router.push("/notifications")}
          >
            <Text className="text-base text-[#0B6623]">🔔</Text>
          </Pressable>
        </View>

        {/* Hero Cyber-Glass Loan Limit Card */}
        <View
          className="overflow-hidden rounded-[32px] p-6"
          style={{
            background:
              "linear-gradient(135deg, #022c22 0%, #064e3b 45%, #0f172a 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.4)",
            boxShadow:
              "0 20px 45px rgba(6, 78, 59, 0.35), inset 0 0 25px rgba(0, 255, 135, 0.15)",
          }}
        >
          {/* Internal neon ambient glows */}
          <View
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 150,
              height: 150,
              borderRadius: 75,
              backgroundColor: "#00F5FF",
              opacity: 0.35,
              filter: "blur(40px)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 140,
              height: 140,
              borderRadius: 70,
              backgroundColor: "#00FF87",
              opacity: 0.3,
              filter: "blur(35px)",
            }}
          />

          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#A7F3D0]">
              Sample Loan Limit
            </Text>
            <View
              className="rounded-full px-3 py-1"
              style={{
                backgroundColor: "rgba(0, 255, 135, 0.15)",
                borderWidth: 1,
                borderColor: "rgba(0, 255, 135, 0.5)",
                boxShadow: "0 0 10px rgba(0, 255, 135, 0.3)",
              }}
            >
              <Text className="text-[10px] font-black text-[#00FF87]">
                ⚡ INSTANT DECISION
              </Text>
            </View>
          </View>

          <Text
            className="mt-3 text-4xl font-black text-white"
            style={{
              textShadowColor: "rgba(0, 255, 135, 0.4)",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 12,
            }}
          >
            ₦500,000
          </Text>
          <Text className="mt-1 text-xs text-[#94A3B8]">
            Demo preview · Gemini AI Verification Active
          </Text>

          <Pressable
            accessibilityRole="button"
            className="mt-5 self-start rounded-2xl px-6 py-3.5 active:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, #00FF87 0%, #00F5FF 100%)",
              boxShadow:
                "0 6px 20px rgba(0, 255, 135, 0.45), 0 2px 10px rgba(0, 245, 255, 0.3)",
            }}
            onPress={() => router.push("/calculator")}
          >
            <Text className="text-sm font-black text-slate-950">
              Apply for Loan →
            </Text>
          </Pressable>
        </View>

        {/* Quick Actions Header */}
        <View className="mt-7 flex-row items-center justify-between">
          <Text className="text-base font-extrabold text-[#0F172A]">
            Quick Actions
          </Text>
        </View>

        {/* Quick Actions Frosted Glass Grid */}
        <View className="mt-3 flex-row justify-between gap-3">
          {quickActions.map((action) => (
            <Pressable
              accessibilityRole="button"
              className="flex-1 items-center rounded-3xl p-4 active:scale-95"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderWidth: 1,
                borderColor: action.border,
                boxShadow: `0 8px 25px rgba(0, 0, 0, 0.04), 0 0 15px ${action.bg}`,
              }}
              key={action.title}
              onPress={() => router.push(action.route)}
            >
              <View
                className="mb-2.5 h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: action.bg,
                  borderWidth: 1,
                  borderColor: action.border,
                  boxShadow: `0 0 15px ${action.bg}`,
                }}
              >
                <Text
                  className="text-xl font-bold"
                  style={{ color: action.color }}
                >
                  {action.icon}
                </Text>
              </View>
              <Text className="text-xs font-bold text-[#1E293B]">
                {action.title}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Verify Identity Glass Card */}
        <Pressable
          accessibilityRole="button"
          className="mt-6 flex-row items-center rounded-3xl p-4 active:scale-98"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1.5,
            borderColor: "rgba(0, 255, 135, 0.4)",
            boxShadow:
              "0 8px 30px rgba(0, 230, 118, 0.12), inset 0 0 20px rgba(0, 255, 135, 0.05)",
          }}
          onPress={() => router.push("/identity-verification")}
        >
          <View
            className="mr-3.5 h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "rgba(0, 255, 135, 0.15)",
              borderWidth: 1,
              borderColor: "rgba(0, 255, 135, 0.5)",
              boxShadow: "0 0 15px rgba(0, 255, 135, 0.3)",
            }}
          >
            <Text className="text-xl font-black text-[#00E676]">✓</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="font-extrabold text-[#0F172A]">
                Verify your identity
              </Text>
              <View
                className="rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: "rgba(0, 245, 255, 0.15)",
                  borderWidth: 1,
                  borderColor: "rgba(0, 245, 255, 0.4)",
                }}
              >
                <Text className="text-[9px] font-bold text-[#0284C7]">
                  AI Powered
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-xs text-[#64748B]">
              Upload ID with instant Gemini verification
            </Text>
          </View>
          <Text className="text-xl font-bold text-[#94A3B8]">›</Text>
        </Pressable>

        {/* Recent Activity Section */}
        <View className="mb-3 mt-7 flex-row items-center justify-between">
          <Text className="text-base font-extrabold text-[#0F172A]">
            Recent Activity
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(tabs)/activity")}
          >
            <Text className="text-sm font-bold text-[#00C853]">See all</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          className="rounded-3xl p-4 active:scale-98"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
          }}
          onPress={() => router.push("/loan-details")}
        >
          <View className="h-12 flex-row items-center">
            <View
              className="mr-3.5 h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: "rgba(0, 255, 135, 0.12)",
                borderWidth: 1,
                borderColor: "rgba(0, 255, 135, 0.3)",
              }}
            >
              <Text className="text-lg font-black text-[#00E676]">₦</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#0F172A]">
                Loan preview
              </Text>
              <Text className="mt-0.5 text-xs text-[#64748B]">
                View sample loan details · ₦300,000
              </Text>
            </View>
            <Text className="text-xl font-bold text-[#94A3B8]">›</Text>
          </View>
        </Pressable>

        {/* Brand Logo Footer */}
        <View className="mt-8 items-center">
          <Image
            source={require("../../../assets/images/alignloan-logo.jpg")}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              borderRadius: 14,
              opacity: 0.8,
              boxShadow: "0 4px 15px rgba(0, 230, 118, 0.2)",
            }}
          />
          <Text className="mt-2 text-[10px] font-black tracking-[3px] text-[#94A3B8]">
            ALIGNLOAN · AI POWERED
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
