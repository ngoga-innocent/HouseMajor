import { Call, Check, Message } from "@/assets/images";
import { width } from "@/components/global";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";

export default function Agent() {
  return (
    <View className="flex flex-col w-[90%]  mx-auto">
        <Text className="px-2 text-lg text-border font-bold">Agent</Text>
        <View className="flex flex-row items-center bg-border/50 justify-between rounded-2xl py-2 px-2  gap-x-2">
      <View className="flex flex-row items-center gap-x-3">
        <Avatar
        size="medium"
        rounded
        source={require("@/assets/images/icon.png")}
        containerStyle={{
          borderWidth: 1,
          borderColor: "#fff",
        }}
      />
      <View className="flex flex-col">
        <Text className="font-bold text-xl">Janvier UWIMANA</Text>
        <View className="flex flex-row  items-center">
          <Text>Owner</Text>
          <Check width={width * 0.08} height={width * 0.04} />
        </View>
      </View>
      </View>
      <View className="flex flex-row items-center gap-x-2">
        <TouchableOpacity className="bg-white rounded-full p-3">
            <Call width={width * 0.05} height={width * 0.05} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-full p-3">
            <Message width={width * 0.05} height={width * 0.05} />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}
