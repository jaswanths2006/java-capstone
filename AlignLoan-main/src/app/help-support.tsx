import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/loan-ui";
import { askLoanAdvisor } from "../services/gemini";

const defaultQuestions = [
  {
    question: "How do I apply for a loan?",
    answer: "Use the loan calculator on the dashboard to preview an application and upload your documents.",
  },
  {
    question: "What documents do I need?",
    answer: "A valid government-issued ID, recent proof of income (payslip), and your recent bank statement.",
  },
  {
    question: "Can I make a repayment in this app?",
    answer: "You can explore flexible repayment plans and installment schedules in the My Loans tab.",
  },
];

type Message = {
  role: "user" | "model";
  text: string;
};

export default function HelpSupportScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am your ALIGNLOAN AI Assistant powered by Google Gemini. How can I assist you with your loans or application today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");

    const newHistory: Message[] = [...messages, { role: "user", text: userMsg }];
    setMessages(newHistory);
    setLoading(true);

    try {
      const response = await askLoanAdvisor(userMsg, messages);
      setMessages([...newHistory, { role: "model", text: response }]);
    } catch (err: any) {
      setMessages([
        ...newHistory,
        {
          role: "model",
          text: "I'm having trouble connecting right now. Please check your network or try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FC] px-5" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <ScreenHeader title="Help & Support" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-6"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-2 text-2xl font-extrabold text-[#22213D]">
            Help & Support
          </Text>
          <Text className="mb-5 text-sm text-[#77758D]">
            AI Assistant & Frequently Asked Questions
          </Text>

          {/* AI CHATBOT CARD */}
          <View className="mb-6 rounded-3xl border border-[#C8E6C9] bg-white p-4 shadow-sm">
            <View className="mb-3 flex-row items-center justify-between border-b border-[#F0EFF5] pb-3">
              <View className="flex-row items-center">
                <View className="mr-2.5 h-8 w-8 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <Text className="text-sm font-bold text-[#0B6623]">🤖</Text>
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#22213D]">
                    ALIGNLOAN AI Assistant
                  </Text>
                  <Text className="text-[10px] font-semibold text-[#0B6623]">
                    ● Online (Gemini Connected)
                  </Text>
                </View>
              </View>
            </View>

            {/* CHAT MESSAGES */}
            <View className="max-h-64 gap-2.5 overflow-hidden py-1">
              {messages.map((msg, index) => (
                <View
                  key={index}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                    msg.role === "user"
                      ? "self-end bg-[#0B6623]"
                      : "self-start bg-[#F4F3FC]"
                  }`}
                >
                  <Text
                    className={`text-xs leading-5 ${
                      msg.role === "user" ? "text-white" : "text-[#34334C]"
                    }`}
                  >
                    {msg.text}
                  </Text>
                </View>
              ))}
              {loading ? (
                <View className="self-start rounded-2xl bg-[#F4F3FC] px-3.5 py-2.5">
                  <ActivityIndicator size="small" color="#0B6623" />
                </View>
              ) : null}
            </View>

            {/* CHAT INPUT */}
            <View className="mt-3 flex-row items-center rounded-2xl border border-[#E8E7F1] bg-[#F8F9FA] px-3 py-1">
              <TextInput
                className="flex-1 py-2 text-xs text-[#22213D]"
                placeholder="Ask anything about loans or requirements..."
                placeholderTextColor="#A6A4B7"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
              />
              <Pressable
                accessibilityRole="button"
                className="ml-2 rounded-xl bg-[#0B6623] px-3 py-1.5"
                onPress={handleSend}
              >
                <Text className="text-xs font-bold text-white">Send</Text>
              </Pressable>
            </View>
          </View>

          {/* FAQS SECTION */}
          <Text className="mb-3 text-base font-bold text-[#22213D]">
            Common Questions
          </Text>
          <View className="rounded-2xl bg-white px-4">
            {defaultQuestions.map((item, index) => (
              <View
                className={`py-4 ${
                  index > 0 ? "border-t border-[#F0EFF5]" : ""
                }`}
                key={item.question}
              >
                <Text className="text-sm font-bold text-[#34334C]">
                  {item.question}
                </Text>
                <Text className="mt-1.5 text-xs leading-5 text-[#77758D]">
                  {item.answer}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
