import { X } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

type ImagePreviewProps = {
  image?: { uri: string; type?: string; name?: string };
  onDelete: () => void;
  size?: number;
  border?: boolean;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onDelete,
  size = 80,
  border = true,
}) => {
  if (!image?.uri) return null;

  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <Image
        source={{ uri: image.uri }}
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          borderWidth: border ? 1 : 0,
          borderColor: "#ccc",
        }}
      />
      <TouchableOpacity
        onPress={onDelete}
        style={{
          position: "absolute",
          top: -8,
          right: -8,
          backgroundColor: "white",
          borderRadius: 12,
          padding: 2,
          borderWidth: 1,
          borderColor: "red",
        }}
      >
        <X color="red" width={size * 0.2} height={size * 0.2} />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreview;
