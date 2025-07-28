import AppleIcon from "@/assets/images/Apple.svg";
import FacebookIcon from "@/assets/images/Facebook.svg";
import GoogleIcon from "@/assets/images/Google.svg";
import { height, isSmallScreen, width } from "@/components/global";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export interface socialMedia {
  name: string;
  href: string | any;
  icon: any;
}
export default function Index() {
  const [activeLogin, setActiveLogin] = useState(0);
  const SocialMedias: socialMedia[] = [
    { name: "Google", icon: GoogleIcon, href: "/" },
    { name: "Facebook", icon: FacebookIcon, href: "/" },
    { name: "Apple", icon: AppleIcon, href: "/" }
  ];

  const LoginButton = [
    {
      name: "Login",
      href: "/"
    },
    {
      name: "Sign Up",
      href: "/"
    }
  ];
  const router=useRouter()



  return (
    <View className="flex-1 flex flex-col">
      <ImageBackground
        source={require("@/assets/images/header.png")}
        className="flex flex-col w-screen h-[60vh]"
      >
        <View className="flex-1 flex flex-col items-start justify-end w-[90vw] mx-auto py-5">
          <Text
            style={{
              fontFamily: "Inter"
            }}
            className={`${isSmallScreen ? "text-4xl" : "text-4xl"} font-semiBold text-white`}
          >
            Your Next Place
          </Text>
          <Text
            className={`${isSmallScreen ? "text-4xl" : "text-4xl"} font-semiBold text-white`}
          >
            which is a better one
          </Text>
        </View>
      </ImageBackground>
      <View className="flex flex-row items-center gap-x-4 justify-center w-[90vw] mx-auto py-4">
        {LoginButton?.map((button: any, index: number) => {
          return (
            <TouchableOpacity onPress={()=>{
                setActiveLogin(index)
                router.replace("/(tabs)/home")
            }} 
              key={index}
            //   href={button?.href}
              className={`btn flex flex-col items-center justify-center w-[40%] ${activeLogin == index && "bg-black text-white"} font-bold `}
            >
              <Text className={`${activeLogin==index && 'text-white'} font-bold`}>{button?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex flex-row items-center w-[90vw] mx-auto gap-x-2">
        <View className="line" />
        <Text className=""> {activeLogin==0?'or Login With':'or Sign up with'}</Text>
        <View className="line" />
      </View>
      {/* Social Media Login  */}
      <View className="flex flex-col gap-y-3 py-5 ">
        {SocialMedias?.map((socialMedia: socialMedia, index: number) => {
          const Icon = socialMedia?.icon;
          return (
            <TouchableOpacity
              key={index}
              //   href={socialMedia?.href}
              className="btn py-4 flex flex-row items-center justify-center w-[90%] mx-auto  relative"
            >
              <View className="absolute left-0">
                <Icon width={width * 0.1} height={height * 0.03} />
              </View>
              <Text className="font-bold ">
                Continue with {socialMedia?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
