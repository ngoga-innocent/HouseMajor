import LottieView from "lottie-react-native";
import { X } from "lucide-react-native";
import { SafeAreaView, Text, View } from "react-native";
import { width } from "../global";
export default function Error() {
  return (
    <SafeAreaView
      className="flex flex-row items-center gap-x-2 w-[90%] mx-auto  bg-white py-2 relative "
      style={{
        borderRadius:10,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 }, // iOS shadow
        elevation: 5, // Android shadow
        
      }}
    >
      <LottieView
        source={require("@/assets/Animations/Error.json")}
        autoPlay
        loop
        style={{ width: width * 0.12, height: width * 0.12 }}
      />
      <Text className="text-border font-bold">Unexpected Error</Text>
      <View className="bg-red-700 z-10 rounded-full p-1" style={{
        position:'absolute',
        top:-3,
        right:-2
      }}>
        <X  color='white'/>
      </View>
    </SafeAreaView>
  );
}
