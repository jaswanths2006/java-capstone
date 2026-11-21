import type { KeyboardTypeOptions } from "react-native";
import { Image, Platform, Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

// Background Neon Glow Orbs for Glassmorphism
export function NeonBackgroundOrbs() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      {/* Neon Cyan Orb */}
      <View
        style={{
          position: "absolute",
          top: -40,
          left: -40,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "#00F5FF",
          opacity: 0.18,
          filter: "blur(60px)",
        }}
      />
      {/* Neon Emerald Orb */}
      <View
        style={{
          position: "absolute",
          top: 120,
          right: -50,
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: "#00FF87",
          opacity: 0.16,
          filter: "blur(70px)",
        }}
      />
      {/* Electric Purple Orb */}
      <View
        style={{
          position: "absolute",
          bottom: 100,
          left: 30,
          width: 240,
          height: 240,
          borderRadius: 120,
          backgroundColor: "#8B5CF6",
          opacity: 0.14,
          filter: "blur(80px)",
        }}
      />
      {/* Neon Lime Orb */}
      <View
        style={{
          position: "absolute",
          bottom: -60,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: "#10B981",
          opacity: 0.15,
          filter: "blur(65px)",
        }}
      />
    </View>
  );
}

// Glass Container Style Helper
export const glassCardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
  shadowColor: "#00E676",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
};

export function BrandLogo({
  light = false,
  size = "small",
}: {
  light?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const dimensions = {
    small: { width: 48, height: 48 },
    medium: { width: 80, height: 80 },
    large: { width: 140, height: 140 },
  };
  const { width, height } = dimensions[size];
  return (
    <View
      className="items-center"
      style={{
        boxShadow: "0 4px 20px rgba(0, 230, 118, 0.2)",
      }}
    >
      <Image
        source={require("../../assets/images/alignloan-logo.jpg")}
        style={{
          width,
          height,
          resizeMode: "contain",
          borderRadius: size === "small" ? 12 : size === "medium" ? 18 : 28,
        }}
      />
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      className="h-14 items-center justify-center rounded-2xl active:opacity-90"
      style={{
        background: "linear-gradient(135deg, #00E676 0%, #0B6623 55%, #00B0FF 100%)",
        boxShadow: "0 8px 25px rgba(0, 230, 118, 0.4), 0 2px 8px rgba(0, 176, 255, 0.3)",
      }}
      onPress={onPress}
    >
      <Text
        className="text-base font-extrabold tracking-wide text-white"
        style={{
          textShadowColor: "rgba(0, 0, 0, 0.3)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 3,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export function ScreenHeader({
  title,
  showLogo = false,
}: {
  title: string;
  showLogo?: boolean;
}) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-10 w-10 items-center justify-center rounded-full active:scale-95"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        }}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/(tabs)");
          }
        }}
      >
        <Text className="text-xl font-bold text-[#1E293B]">‹</Text>
      </Pressable>
      {showLogo ? (
        <BrandLogo />
      ) : (
        <Text className="text-base font-extrabold text-[#1E293B]">{title}</Text>
      )}
      <View className="h-10 w-10" />
    </View>
  );
}

type FormFieldProps = {
  label: string;
  placeholder: string;
  icon: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
};

export function FormField({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
  secureTextEntry = false,
  onToggleSecure,
}: FormFieldProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-bold text-[#334155]">{label}</Text>
      <View
        className="h-14 flex-row items-center rounded-2xl px-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderWidth: 1.5,
          borderColor: "rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
        }}
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            backgroundColor: "#E8F5E9",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          <Text className="text-center text-sm font-bold text-[#0B6623]">
            {icon}
          </Text>
        </View>
        <TextInput
          accessibilityLabel={label}
          autoCapitalize={autoCapitalize}
          className="h-full flex-1 text-sm font-medium text-[#1E293B]"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={secureTextEntry}
          value={value}
        />
        {onToggleSecure ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={secureTextEntry ? "Show password" : "Hide password"}
            className="pl-2"
            onPress={onToggleSecure}
          >
            <Text className="text-xs font-bold text-[#00C853]">
              {secureTextEntry ? "Show" : "Hide"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

type ArtworkKind = "funds" | "repayment" | "secure";

export function OnboardingArtwork({ kind }: { kind: ArtworkKind }) {
  return (
    <View className="h-56 w-full items-center justify-center">
      {/* Glowing Neon Backing Circle */}
      <View
        style={{
          position: "absolute",
          width: 190,
          height: 190,
          borderRadius: 95,
          backgroundColor: "#00FF87",
          opacity: 0.22,
          filter: "blur(40px)",
        }}
      />
      {kind === "funds" ? (
        <View
          className="h-32 w-44 rotate-[-6deg] items-center justify-center rounded-3xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderWidth: 1.5,
            borderColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 12px 35px rgba(0, 230, 118, 0.28)",
          }}
        >
          <View
            className="absolute -left-3 top-5 h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #00E676 0%, #0B6623 100%)",
              boxShadow: "0 6px 18px rgba(0, 230, 118, 0.4)",
            }}
          >
            <Text className="text-2xl font-black text-white">₦</Text>
          </View>
          <View className="ml-8 w-20">
            <View className="mb-2 h-2.5 w-14 rounded-full bg-[#00E676]" />
            <View className="h-2 w-20 rounded-full bg-[#A7F3D0]" />
          </View>
          <View
            className="absolute -right-3 -top-3 h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)",
            }}
          >
            <Text className="text-lg font-black text-white">+</Text>
          </View>
        </View>
      ) : null}
      {kind === "repayment" ? (
        <View
          className="w-40 overflow-hidden rounded-3xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderWidth: 1.5,
            borderColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 12px 35px rgba(0, 245, 255, 0.25)",
          }}
        >
          <View
            className="h-11 items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00E5FF 0%, #0B6623 100%)",
            }}
          >
            <Text className="text-xs font-black tracking-wider text-white">
              PAYMENT PLAN
            </Text>
          </View>
          <View className="flex-row flex-wrap justify-center gap-2 p-4">
            {["M", "T", "W", "T", "F", "S"].map((day, index) => (
              <View
                className={`h-7 w-7 items-center justify-center rounded-full ${
                  index === 3 ? "bg-[#FFD700]" : "bg-[#E8F5E9]"
                }`}
                key={`${day}-${index}`}
                style={
                  index === 3
                    ? { boxShadow: "0 2px 8px rgba(255, 215, 0, 0.5)" }
                    : {}
                }
              >
                <Text
                  className={`text-[10px] font-bold ${
                    index === 3 ? "text-slate-900" : "text-[#0B6623]"
                  }`}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
          <View className="mx-auto mb-4 h-2 w-16 rounded-full bg-[#00E676]" />
        </View>
      ) : null}
      {kind === "secure" ? (
        <View
          className="h-32 w-28 items-center justify-center rounded-[38px]"
          style={{
            background: "linear-gradient(135deg, #00E676 0%, #0B6623 100%)",
            boxShadow: "0 12px 35px rgba(0, 230, 118, 0.35)",
          }}
        >
          <View
            className="absolute -top-3 h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)",
            }}
          >
            <Text className="text-lg font-black text-white">✓</Text>
          </View>
          <Text className="text-6xl font-black text-white">✓</Text>
          <View
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
            style={{
              backgroundColor: "#00F5FF",
              boxShadow: "0 2px 10px rgba(0, 245, 255, 0.5)",
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
