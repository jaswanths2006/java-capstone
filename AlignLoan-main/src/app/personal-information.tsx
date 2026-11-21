import { useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApplicationField } from "../components/application-flow";
import { NeonBackgroundOrbs, PrimaryButton, ScreenHeader, glassCardStyle } from "../components/loan-ui";

export default function PersonalInformationScreen() {
  const [name, setName] = useState("Blessing Okafor");
  const [email, setEmail] = useState("blessing.okafor@example.com");
  const [phone, setPhone] = useState("+234 800 000 0000");

  return (
    <SafeAreaView className="flex-1 bg-[#F4F6FB] px-5" edges={["top", "bottom"]}>
      <NeonBackgroundOrbs />
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Personal Information" />
      <View className="flex-1">
        <View style={[glassCardStyle, { padding: 18, gap: 16 }]}>
          <ApplicationField
            label="Full name"
            onChangeText={setName}
            placeholder="Enter your name"
            value={name}
          />
          <ApplicationField
            label="Email address"
            onChangeText={setEmail}
            placeholder="Enter your email"
            value={email}
          />
          <ApplicationField
            keyboardType="phone-pad"
            label="Phone number"
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            value={phone}
          />
        </View>
        <View className="mt-auto pb-5 pt-6">
          <PrimaryButton
            title="Save Changes"
            onPress={() =>
              Alert.alert(
                "Profile Updated",
                "Your information has been simulated successfully.",
              )
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
