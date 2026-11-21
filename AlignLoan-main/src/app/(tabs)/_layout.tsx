import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tabItems = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    name: "loans",
    title: "Loans",
    icon: "wallet-outline",
    activeIcon: "wallet",
  },
  {
    name: "activity",
    title: "Activity",
    icon: "receipt-outline",
    activeIcon: "receipt",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-circle-outline",
    activeIcon: "person-circle",
  },
] as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0B6623",
        tabBarInactiveTintColor: "#64748B",
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "800",
          marginTop: 2,
          letterSpacing: 0.3,
        },
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 18 : 8,
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 -8px 30px rgba(0, 0, 0, 0.04), 0 0 20px rgba(0, 230, 118, 0.08)",
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      {tabItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 32,
                  borderRadius: 14,
                  backgroundColor: focused
                    ? "rgba(0, 230, 118, 0.16)"
                    : "transparent",
                  borderWidth: focused ? 1 : 0,
                  borderColor: focused
                    ? "rgba(0, 230, 118, 0.45)"
                    : "transparent",
                  boxShadow: focused
                    ? "0 0 14px rgba(0, 230, 118, 0.3)"
                    : "none",
                  transform: [{ translateY: -1 }],
                }}
              >
                <Ionicons
                  name={focused ? item.activeIcon : item.icon}
                  size={21}
                  color={focused ? "#0B6623" : (color as string)}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
