import LottieView from "lottie-react-native";
import { Text, View } from "react-native";
import { width } from "../global";
export default function Loading() {
  return (
    <View className="flex-1 flex flex-row-reverse gap-x-2 items-center justify-center ">
      <LottieView
        source={require("@/assets/Animations/loading.json")}
        autoPlay
        loop
        style={{ width: width * 0.12, height: width * 0.12 }}
      />
      <Text className="text-border font-bold">Loading</Text>
    </View>
  );
}
