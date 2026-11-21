import { router } from "expo-router";
import { Image, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NeonBackgroundOrbs } from "../../components/loan-ui";

const activityItems = [
  {
    title: "Loan disbursement",
    detail: "Preview loan · ₦300,000",
    date: "Today",
    icon: "₦",
    color: "#00FF87",
    bg: "rgba(0, 255, 135, 0.14)",
    route: "/loan-details" as const,
  },
  {
    title: "Repayment history",
    detail: "View installments and due dates",
    date: "",
    icon: "↻",
    color: "#00F5FF",
    bg: "rgba(0, 245, 255, 0.14)",
    route: "/repayment-history" as const,
  },
];

export default function ActivityTab() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <NeonBackgroundOrbs />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 mt-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
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
            <View>
              <Text className="text-2xl font-black text-[#0F172A]">
                Activity
              </Text>
              <Text className="mt-0.5 text-xs text-[#64748B]">
                Your loan updates and payments
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

        <View
          className="mb-4 rounded-2xl p-3"
          style={{
            backgroundColor: "rgba(0, 255, 135, 0.1)",
            borderWidth: 1,
            borderColor: "rgba(0, 255, 135, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Text className="text-xs font-semibold leading-5 text-[#065F46]">
            Preview activity only. No real loan or payment has been processed.
          </Text>
        </View>

        <Text className="mb-3 text-base font-extrabold text-[#0F172A]">
          Recent Activity
        </Text>

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
          {activityItems.map((item, index) => (
            <Pressable
              accessibilityRole="button"
              className={`flex-row items-center py-4 ${
                index > 0 ? "border-t border-[#F1F5F9]" : ""
              }`}
              key={item.title}
              onPress={() => router.push(item.route)}
            >
              <View
                className="mr-3.5 h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: item.bg,
                }}
              >
                <Text
                  className="text-xl font-black"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0F172A]">
                  {item.title}
                </Text>
                <Text className="mt-0.5 text-xs text-[#64748B]">
                  {item.detail}
                </Text>
              </View>
              <View className="items-end">
                {item.date ? (
                  <Text className="text-[11px] font-semibold text-[#94A3B8]">
                    {item.date}
                  </Text>
                ) : null}
                <Text className="mt-1 text-xl font-bold text-[#94A3B8]">›</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          className="mt-4 flex-row items-center justify-between rounded-[26px] p-4 active:scale-98"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.04)",
          }}
          onPress={() => router.push("/repayment-history")}
        >
          <Text className="text-sm font-bold text-[#0F172A]">
            See all repayment history
          </Text>
          <Text className="text-xl font-bold text-[#94A3B8]">›</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
