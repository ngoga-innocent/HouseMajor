import { width } from "@/components/global";
import { HouseFeatureAssignment } from "@/redux/Slice/houseSlice";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Features({ features }: any) {
  

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: width * 0.9,
        alignSelf: "center",
        paddingVertical: 16,
        rowGap: 20,
      }}
    >
      {features.map((feature: HouseFeatureAssignment, index: number) => (
        <TouchableOpacity
          key={index}
          style={{
            width: `${100 / 3 - 4}%`, // approx 30% width with space-between
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 9999,
            paddingVertical: 12,
            paddingHorizontal: 10,
            gap: 8,
          }}
        >
          <Image
            source={{ uri: feature?.feature?.icon }}
            style={{ width: width * 0.06, height: width * 0.06 }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "column" }}>
            {feature?.feature?.show_name_only && (
              <Text>{feature?.feature?.name}</Text>
            )}
            {feature?.available_number && (
              <Text>{feature?.available_number}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
