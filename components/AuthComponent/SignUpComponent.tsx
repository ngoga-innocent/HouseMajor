import {
  FaceBookIcon,
  GoogleIcon,
  MailIcon,
  PasswordIcon,
  Phone1,
  Profile,
} from "@/assets/images";
import { useRegisterUserMutation } from "@/redux/Slice/userSlice";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { width } from "../global";
import InputField from "../Reusable/Input";
import Loading from "../Reusable/Loading";
export default function SignUpComponent() {
  const socialMeadias = [
    { name: "Google", icon: GoogleIcon, href: "/" },
    { name: "Facebook", icon: FaceBookIcon, href: "/" },
  ];
  const [full_name, setFullName] = useState<string>();
  const [phone_number, setPhonenumber] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [account_type, setType] = useState("owner");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const SignupFunction = async () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "❌ Password Mismatch",
        "Both password fields must match. Please check and try again.",
        [{ text: "Got it", style: "default" }]
      );
      return; // stop execution
    }

    try {
      // unwrap() returns the actual data or throws an error for catch
      const result = await registerUser({
        full_name,
        phone_number,
        email,
        password,
        account_type,
      }).unwrap();
      console.log(result);
      Alert.alert(
        "✅ Registration Successful",
        `Welcome ${result.user.full_name}`
      );
      
      
      // you might want to navigate to login or home screen here
    } catch (error: any) {
      console.log("Registration Error", error);
      let message = "Something went wrong. Please try again.";

      // Handle server-side validation errors
      if (error?.data) {
        if (typeof error.data === "string") {
          message = error.data;
        } else if (error.data?.email) {
          message = error.data.email.join(", ");
        } else if (error.data?.phone_number) {
          message = error.data.phone_number.join(", ");
        }
      }

      Alert.alert("❌ Registration Failed", message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View>
      <View className="flex flex-col flex-1 py-3 gap-y-2">
        <InputField
          icon={<Profile />}
          placeholder="Full Name"
          value={full_name}
          onChangeText={(e: string) => setFullName(e)}
        />
        <View className="flex flex-row flex-1 justify-between items-center gap-x-2">
          <InputField
            icon={<Phone1 />}
            value={phone_number}
            onChangeText={(e: string) => setPhonenumber(e)}
            placeholder="Phone Number"
            style={{
              width: width * 0.4,
            }}
          />
          <InputField
            icon={<MailIcon />}
            value={email}
            onChangeText={(e: string) => setEmail(e)}
            placeholder="email"
            style={{
              width: width * 0.4,
            }}
          />
        </View>
        <View className="flex flex-row flex-1 justify-between items-center gap-x-2">
          <InputField
            value={password}
            onChangeText={(e: string) => setPassword(e)}
            icon={<PasswordIcon />}
            placeholder="Password"
            style={{
              width: width * 0.4,
            }}
          />
          <InputField
            icon={<PasswordIcon />}
            value={confirmPassword}
            onChangeText={(e: string) => setConfirmPassword(e)}
            placeholder="Confirm Password"
            // style={{ width: width * 0.4 }}
            style={{
              width: width * 0.4,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => SignupFunction()}
        className="rounded-full py-3 px-4 bg-black w-[60%] my-3 self-center flex flex-col items-center justify-center"
      >
        <Text className="text-white font-bold text-lg">Sign Up</Text>
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-x-2 py-2">
        <View className="h-[1px] flex-1 bg-border/40" />
        <Text className="text-black font-bold text-sm">Or Sign Up With</Text>
        <View className="h-[1px] flex-1 bg-border/40" />
      </View>
      <View className="flex flex-row items-center justify-between">
        {socialMeadias?.map((socialMedia, index) => {
          const Icon = socialMedia?.icon;
          return (
            <TouchableOpacity
              key={index}
              className="flex flex-row bg-white gap-x-2 py-3 border border-border/40 px-3 rounded-full w-[35%]"
            >
              <Icon />
              <Text className="font-bold">{socialMedia?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
