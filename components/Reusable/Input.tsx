import React from "react";
import { StyleProp, TextInput, TextInputProps, View, ViewStyle } from "react-native";

type InputFieldProps = {
  icon?: React.ReactNode;
   style?: StyleProp<ViewStyle>; 
   inputStyle?:StyleProp<TextInputProps>; // pass any icon component
} & TextInputProps;

export default function InputField({ icon,style,inputStyle, ...props }: InputFieldProps) {
  return (
    <View style={style} className="bg-white  px-3 rounded-2xl border border-border/40 flex flex-row items-center gap-x-2">
      {icon && icon}
      <View className=" py-2 flex flex-col flex-1">
        {/* <Text className="text-gray-900 font-bold">Email</Text> */}
        <TextInput
          {...props}
          className="text-black py-2 font-bold"
          placeholderTextColor="#999"
         style={[{ flex: 1, paddingVertical: 8 }, inputStyle]}
        />
      </View>
    </View>
  );
}
