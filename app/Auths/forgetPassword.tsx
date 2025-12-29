import { AuthHeader, MailIcon } from "@/assets/images";
import { color, width } from "@/components/global";
import InputField from "@/components/Reusable/Input";
import { useForgotPasswordMutation } from "@/redux/Slice/userSlice";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
export default function forgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = useState(false);
  const router=useRouter()
  async function sendEmail() {
    setEmailSent(false);
    if (!email) {
      return Alert.alert(
        "Email is required",
        "Add Email to reset your Password"
      );
    }
    try {
      const result = await forgotPassword({ email }).unwrap();
      console.log(result);
      setEmailSent(true);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <Spinner visible={isLoading} color={color.loading} textContent="Sending Email..." overlayColor="rgba(0,0,0,0.6)" />
      <ScrollView
        className="flex-1 flex flex-col"
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader />
        <View
          className="bg-[#F6F1F1] flex-1 flex flex-col gap-y-5 items-center justify-center -top-20 px-[8%] py-[4%]"
          style={{
            borderRadius: width * 0.09,
          }}
        >
          <Text className="text-xl font-bold text-border">Reset Password</Text>
          {emailSent && <View className="flex flex-row items-center gap-x-2">
            <LottieView
            source={require("@/assets/Animations/Mailsent.json")}
            autoPlay
            loop
            style={{ width: width * 0.12, height: width * 0.12 }}
          />
          <Text className="text-green-900 font-bold text-center w-[50%]">Check your Email inbox to reset password</Text>
          </View>}
          <InputField
            value={email}
            onChangeText={(e: string) => setEmail(e)}
            icon={<MailIcon />}
            placeholder="Enter your Email"
          />
          <TouchableOpacity onPress={sendEmail} className="px-3 py-3 bg-black rounded-2xl w-[60%] my-4 flex flex-col items-center justify-center">
            <Text className="text-white font-bold text-lg">Send request</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>router.navigate("/(tabs)/home")} className="flex flex-row items-center gap-x-2">
            <Text className="text-gray-500 font-bold">Continue </Text>
            <ArrowRight />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
