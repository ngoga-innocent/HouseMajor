import HouseMajor from "@/assets/images/housemajorIcon.svg";
import Logo from "@/assets/images/icon.svg";
import { height, width } from "@/components/global";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Text, View } from "react-native";

// import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
export default function Index() {
  const [fontsLoaded] = useFonts({
    "Inter": require("@/assets/fonts/Inter.ttf")
  });
  const router=useRouter()
  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        router.replace("/auths"); // Navigate to /home or any screen
      }, 2000); // delay for visual feedback if needed
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return (
      <View className="flex flex-col items-center justify-center bg-white">
        <Text >Loading fonts...</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View className="flex-1 flex flex-col items-center justify-center">
        <Logo width={width * 0.7} height={height * 0.7} />
      </View>
      <HouseMajor width={width * 0.6} height={height * 0.12} />
    </View>
  );
}
