import { Camera, Pdf, Profile, ProfilePlaceholder } from "@/assets/images";
import { getDistanceFromLatLonInKm } from "@/components/functions/getDistance";
import { color, height, smallIconSize, width } from "@/components/global";
import ImagePreview from "@/components/ImagePreview";
import Agent from "@/components/TabsComponent/HomeComponents/SingleHouse/Agent";
import {
  categoryInterface,
  FeatureInterface,
  proximityInterface,
  useGetAdditionalFeaturesQuery,
  useGetCategoriesQuery,
  useGetProximilityQuery,
  useUploadHouseMutation,
} from "@/redux/Slice/houseSlice";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ChevronDown, Search, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddHouse() {
  const inset = useSafeAreaInsets();
  interface location {
    latitude: number;
    longitude: number;
    address?: string;
  }
  const [featureCategory, setFeatureCategory] = useState<any>();
  const [choosenPuporse, setChoosenPurpose] = useState<string>("");
  const [status, setChoosenStatus] = useState<string>("");
  const [showchoosepurpose, setShowChoosePurple] = useState(false);
  const [showchooseStatus, setShowChooseStatus] = useState(false);
  const [turnonLocation, setTurnonLocation] = useState(false);
  const [price, setPrice] = useState<string>("");
  const [previewThumb, setPreviewThumb] = useState(false);
  const [location, setUserLocation] = useState<location>();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: additionalFeatures, isLoading: featureLoading } =
    useGetAdditionalFeaturesQuery();
  const { data: proximity } = useGetProximilityQuery();
  //   console.log(additionalFeatures);
  const categorized = {
    featureWithNumber: [] as FeatureInterface[],
    featureWithPhoto: [] as FeatureInterface[],
    featureWithPhotoandNumber: [] as FeatureInterface[],
    featureWithNothing: [] as FeatureInterface[],
  };
  function categorizeFeature(additionalFeatures: FeatureInterface[]) {
    if (!additionalFeatures || !Array.isArray(additionalFeatures))
      return categorized;

    for (const feature of additionalFeatures) {
      const { add_available_number, is_additional_image_required } = feature;

      if (add_available_number && is_additional_image_required) {
        categorized.featureWithPhotoandNumber.push(feature);
      } else if (add_available_number) {
        categorized.featureWithNumber.push(feature);
      } else if (is_additional_image_required) {
        categorized.featureWithPhoto.push(feature);
      } else {
        categorized.featureWithNothing.push(feature);
      }
    }

    return categorized;
  }

  useEffect(() => {
    if (additionalFeatures) {
      const result = categorizeFeature(additionalFeatures);
      setFeatureCategory(result);
      //   console.log(result);
    }
  }, [additionalFeatures]);
  const purpose = ["Rent", "Sell"];
  const agent_status = ["owner", "blocker"];
  type HouseDataType = {
    category: string;
    thumbnail: { uri: string; type: string; name: string };
    additionalFeatures: Record<
      string,
      {
        number?: string;
        image?: {
          uri: string;
          type: string;
          name: string;
        };
      }
    >;
    proximity: string[];
    purpose: string;
    price: string;
    agent: {
      name: string;
      status: string;
      id: string; // ID number
      upi: string; // UPI code
      phone: string;
      otherphone: string;
      description: string;
      photo?: { uri: string; type: string; name: string }; // optional profile photo
    };
  };

  const [houseData, setHouseData] = useState<HouseDataType>({
    category: "",
    thumbnail: {
      uri: "",
      name: "",
      type: "",
    },
    additionalFeatures: {},
    proximity: [],
    purpose: "",
    price: "",
    agent: {
      name: "",
      status: "",
      id: "",
      upi: "",
      description: "",
      phone: "",
      otherphone: "",
      photo: {
        uri: "",
        type: "",
        name: "",
      },
    },
  });

  const setValue = (key: any, value: any) =>
    setHouseData((prev) => ({ ...prev, [key]: value }));
  // Update Feature
  const updateFeatureInput = (
    featureId: string,
    field: "number" | "image",
    value: any
  ) => {
    setHouseData((prev) => ({
      ...prev,
      additionalFeatures: {
        ...prev.additionalFeatures,
        [featureId]: {
          ...prev.additionalFeatures[featureId],
          [field]: value,
        },
      },
    }));
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const [uploadHouse, { isLoading:uploadLoading, isSuccess, isError, error }] = useUploadHouseMutation();

const handleUpload = async () => {
  try {
    await uploadHouse(houseData).unwrap();
    console.log("House uploaded successfully!");
  } catch (err) {
    console.error("Upload failed:", err);
  }
};


  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <View
        style={{ width: width }}
        className="bg-white pt-20 pb-2 px-7 rounded-b-2xl z-50 flex flex-row items-center justify-between w-[100%]"
      >
        <Text className="font-bold text-xl text-border">House Details</Text>
        <TouchableOpacity
          onPress={() => handleUpload()}
          className="w-[30%] flex flex-col items-center justify-center py-2 bg-black rounded-full"
        >
          <Text className="text-white font-bold">Upload</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        className="w-[95%] mx-auto"
        contentContainerStyle={{
          paddingBottom: height * 0.02,
        }}
      >
        <View className="rounded-2xl bg-[#F6F1F1] my-2 flex flex-col border border-border/30 p-2">
          <Text className="text-border font-semibold">Category</Text>
          <View className="flex flex-row items-center flex-wrap">
            {categories?.map((category: categoryInterface, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => setValue("category", category?.id)}
                  className={`${houseData?.category == category.id ? "bg-black" : "bg-white "} mx-1 my-1 rounded-full px-4 py-2`}
                  key={index}
                >
                  <Text
                    className={`${houseData?.category == category.id ? "text-white font-bold" : "text-black "}`}
                  >
                    {category?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="my-2 text-border text-lg font-bold">
              House Thumbnail
            </Text>
            <TouchableOpacity>
              {!houseData?.thumbnail?.uri ? (
                <TouchableOpacity
                  onPress={async () => {
                    let result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: "images",

                      allowsEditing: true,
                      quality: 1,
                    });
                    if (!result?.canceled) {
                      const asset = result?.assets[0];
                      setHouseData((prev) => ({
                        ...prev,
                        thumbnail: {
                          uri: asset.uri,
                          name: `House ${houseData?.agent?.name}`,
                          type: asset.mimeType || "image/jpeg",
                        },
                      }));
                    }
                  }}
                >
                  <Camera
                    width={smallIconSize.width * 1.2}
                    height={smallIconSize.height * 1.2}
                  />
                </TouchableOpacity>
              ) : (
                <View className="flex flex-row items-center gap-x-2">
                  <TouchableOpacity
                    className=""
                    onPress={() => setPreviewThumb(true)}
                  >
                    <Text className="text-blue-700 text-lg font-bold">
                      {houseData?.thumbnail?.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="rounded-full"
                    onPress={() =>
                      setHouseData((prev) => ({
                        ...prev,
                        thumbnail: {
                          uri: "",
                          name: "",
                          type: "",
                        }, // clear thumbnail completely
                      }))
                    }
                    style={{
                      backgroundColor: "white",

                      padding: 2,
                      borderWidth: 1,
                      borderColor: "red",
                    }}
                  >
                    <X
                      color="red"
                      width={smallIconSize.width * 0.5}
                      height={smallIconSize.width * 0.5}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            {previewThumb && houseData?.thumbnail?.uri && (
              <View
                className="absolute z-50 w-full"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 20,
                  height: height * 2,
                  width: width,
                }}
              >
                <ImagePreview
                  image={houseData.thumbnail}
                  onDelete={() => setPreviewThumb(false)}
                  size={width * 0.8} // larger for preview
                />

                {/* Optional: close overlay by tapping outside */}
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  onPress={() => setPreviewThumb(false)}
                />
              </View>
            )}
          </View>
          <Text className="my-2 text-border text-lg font-bold">
            Addition House Features
          </Text>
          {/* Additional with Both Features */}
          <View className="flex flex-col">
            {featureCategory?.featureWithPhotoandNumber?.map(
              (feature: FeatureInterface, index: number) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row items-center justify-between py-2"
                  >
                    <Text>{feature.name}</Text>
                    {feature?.add_available_number && (
                      <TextInput
                        placeholder="number"
                        keyboardType="numeric"
                        className="bg-white rounded-full px-4"
                        value={
                          houseData.additionalFeatures[feature.id]?.number || ""
                        }
                        onChangeText={(text) =>
                          updateFeatureInput(feature.id, "number", text)
                        }
                      />
                    )}
                    {feature?.is_additional_image_required && (
                      <View className="flex flex-row items-center gap-x-2">
                        <Text className="text-border font-bold text-sm">
                          Add Image
                        </Text>
                        <TouchableOpacity
                          onPress={async () => {
                            let result =
                              await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: "images",

                                allowsEditing: true,
                                quality: 1,
                              });
                            if (!result.canceled) {
                              const asset = result.assets[0];
                              updateFeatureInput(feature.id, "image", {
                                uri: asset.uri,
                                type: asset.mimeType || "image/jpeg",
                                name:
                                  asset.fileName || `feature-${feature.id}.jpg`,
                              });
                            }
                          }}
                          className="flex flex-row items-center bg-white px-2 py-2 rounded-full"
                        >
                          <Camera width={width * 0.09} height={height * 0.02} />
                          <Text className="text-border font-bold text-sm">
                            {houseData.additionalFeatures[feature.id]?.image
                              ? "Change"
                              : "Upload"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              }
            )}
          </View>
          {/* Additional with Image */}
          <View className="flex flex-col">
            {featureCategory?.featureWithPhoto?.map(
              (feature: FeatureInterface, index: number) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row items-center justify-between py-2"
                  >
                    <Text>{feature.name}</Text>
                    {feature?.add_available_number && (
                      <TextInput
                        placeholder="number"
                        keyboardType="numeric"
                        className="bg-white rounded-full px-4 "
                      />
                    )}
                    {feature?.is_additional_image_required && (
                      <View className="flex flex-row items-center gap-x-2">
                        <Text className="text-border font-bold text-sm">
                          Add Image
                        </Text>
                        <TouchableOpacity
                          onPress={async () => {
                            let result =
                              await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: "images",

                                allowsEditing: true,
                                quality: 1,
                              });
                            if (!result.canceled) {
                              const asset = result.assets[0];
                              updateFeatureInput(feature.id, "image", {
                                uri: asset.uri,
                                type: asset.mimeType || "image/jpeg",
                                name:
                                  asset.fileName || `feature-${feature.id}.jpg`,
                              });
                            }
                          }}
                          className="flex flex-row items-center bg-white px-2 py-2 rounded-full"
                        >
                          <Camera width={width * 0.09} height={height * 0.02} />
                          <Text className="text-border font-bold text-sm">
                            {houseData.additionalFeatures[feature.id]?.image
                              ? "Change"
                              : "Upload"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              }
            )}
          </View>
          {/* Additional with Number */}
          <View className="flex flex-col">
            {featureCategory?.featureWithNumber?.map(
              (feature: FeatureInterface, index: number) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row items-center justify-between py-2"
                  >
                    <Text>{feature.name}</Text>
                    {feature?.add_available_number && (
                      <TextInput
                        placeholder="number"
                        keyboardType="numeric"
                        className="bg-white rounded-full px-4 "
                        value={
                          houseData.additionalFeatures[feature.id]?.number || ""
                        }
                        onChangeText={(text) =>
                          updateFeatureInput(feature.id, "number", text)
                        }
                      />
                    )}
                  </View>
                );
              }
            )}
          </View>
          {/* Feature With Nothing */}
          <View className="flex flex-row flex-wrap items-center justify-start">
            {featureCategory?.featureWithNumber?.map(
              (feature: FeatureInterface, index: number) => {
                const isSelected = !!houseData.additionalFeatures[feature.id];
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(houseData);

                      setHouseData((prev) => {
                        const newFeatureInputs = { ...prev.additionalFeatures };
                        if (isSelected) {
                          // unselect
                          delete newFeatureInputs[feature.id];
                        } else {
                          // select
                          newFeatureInputs[feature.id] = {};
                        }
                        return {
                          ...prev,
                          additionalFeatures: newFeatureInputs,
                        };
                      });
                    }}
                    key={index}
                    // className="rounded-full border gap-x-2 flex flex-row-reverse items-center justify-center border-border/40 px-4 py-2"
                    className={`rounded-full border px-4 py-2 mx-1 my-1 flex flex-row-reverse gap-x-1 items-center justify-center ${
                      isSelected
                        ? "bg-blue-200 border-blue-400"
                        : "bg-white border-border/40"
                    }`}
                  >
                    <Text>{feature?.name}</Text>
                    <Image
                      source={{ uri: feature?.icon }}
                      className="w-5 h-5"
                    />
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>
        <Text className="text-border font-bold text-lg">Proximity</Text>
        <View className="rounded-2xl  bg-[#F6F1F1] my-2 flex flex-col border border-border/30 p-2">
          <View className="flex flex-row justify-between w-[100%] items-center">
            <View className="rounded-full border border-border/30 bg-white items-center justify-center px-2 w-[40%] flex flex-row gap-x-2">
              <Search />
              <TextInput className="flex-1 py-2" />
            </View>
            <View className=" items-center justify-center px-2 w-[40%] flex flex-row gap-x-2">
              <Text className="text-border/80 font-bold text-sm">
                Turn On Location
              </Text>
              <Switch
                value={turnonLocation}
                onChange={() => {
                  getLocation();
                  setTurnonLocation(!turnonLocation);
                }}
              />
            </View>
          </View>
          <View className="flex  flex-row items-start flex-wrap">
            {proximity?.map((item: proximityInterface, index: number) => {
              const isSelected = houseData.proximity.includes(item.id);

              let distance;
              if (location) {
                distance = getDistanceFromLatLonInKm(
                  location?.latitude,
                  location?.longitude,
                  parseFloat(item?.latitude),
                  parseFloat(item?.longitude)
                );
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    setHouseData((prev) => {
                      let newIds = [...prev.proximity];
                      if (isSelected) {
                        newIds = newIds.filter((id) => id !== item.id);
                      } else {
                        newIds.push(item.id);
                      }
                      return { ...prev, proximity: newIds };
                    });
                  }}
                  key={index}
                  className={`w-[20vw] h-[17vh] flex-1 flex mr-2 flex-wrap flex-col items-center justify-center rounded-lg ${
                    isSelected ? "bg-blue-200" : "bg-white"
                  }`}
                  // className="w-[20vw] h-[17vh] flex-1 flex mr-2 flex-wrap flex-col items-center justify-center"
                >
                  <View className="flex flex-col items-center justify-center ">
                    <View className="w-[15vw] border border-border/50 rounded-full h-[15vw] bg-white flex flex-col items-center justify-center ">
                      <Image
                        source={{ uri: item?.icon }}
                        className="w-[7vw] h-[7vw]"
                      />
                    </View>
                    <Text className="text-center text-sm text-border font-bold">
                      {item?.name}
                    </Text>
                  </View>
                  <Text className="flex-end mt-auto">
                    {distance?.toFixed(2)}km
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center relative gap-x-2">
            <Text>Purpose</Text>
            <TouchableOpacity
              onPress={() => setShowChoosePurple(!showchoosepurpose)}
              className="bg-white border border-border/40 w-[30vw] px-3 py-2 rounded-full flex flex-row items-center justify-between"
            >
              <Text>{choosenPuporse}</Text>
              <ChevronDown color={color.border} />
            </TouchableOpacity>
            {showchoosepurpose && (
              <TouchableOpacity
                className="border border-border/20 flex flex-col absolute -right-[5vw] bg-white gap-y-2 px-4 rounded-lg top-[3vh]"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 10, height: 5 },
                  shadowRadius: 2,
                  elevation: 20,
                  zIndex: 10,
                }}
              >
                {purpose?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      className="px-3"
                      onPress={() => {
                        setChoosenPurpose(item);
                        setValue("purpose", item);
                        setShowChoosePurple(!choosenPuporse);
                      }}
                      key={index}
                    >
                      <Text className="text-lg capitalize font-bold text-border">
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </TouchableOpacity>
            )}
          </View>
          <View className="flex flex-row items-center gap-x-2 w-[40%]">
            <Text>Price</Text>
            <TextInput
              value={houseData.price}
              // value={price} // fallback to empty string
              onChangeText={(text) =>
                setHouseData((prev) => ({ ...prev, price: text }))
              }
              keyboardType="numeric"
              className="bg-white rounded-full border border-border/30 py-2 px-2 flex-1 "
            />
          </View>
        </View>
        <Text className="font-bold text-lg text-border">Agent Details</Text>
        <View className="rounded-2xl  bg-[#F6F1F1] my-2 flex flex-col border border-border/30 p-2">
          <TouchableOpacity
            className="flex flex-col self-start items-center"
            onPress={async () => {
              // Pick image using expo-image-picker or react-native-image-picker

              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",

                allowsEditing: true,
                quality: 1,
              });
              if (!result?.canceled) {
                setHouseData((prev) => ({
                  ...prev,
                  agent: {
                    ...prev.agent,
                    photo: {
                      uri: result.assets[0]?.uri,
                      name: `${Agent?.name}-profile`,
                      type: result.assets[0].mimeType || "image/jpeg",
                    },
                  },
                }));
              }
            }}
          >
            {houseData.agent.photo?.uri ? (
              <Image
                source={{ uri: houseData.agent.photo.uri }}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <ProfilePlaceholder
                width={smallIconSize.width * 1.6}
                height={smallIconSize.height * 1.6}
              />
            )}
            <Text className="text-border font-bold">Add Photo</Text>
          </TouchableOpacity>

          <View className="flex flex-row items-center justify-between ">
            <View className="bg-white w-[60%] flex flex-row items-center gap-x-2 rounded-full my-2 px-3">
              <Profile
                width={smallIconSize.width * 0.6}
                height={smallIconSize.height * 0.6}
              />
              <TextInput
                className="px-2 flex-1"
                placeholder="Enter Full Name"
                placeholderTextColor={color.border}
                value={houseData.agent.name}
                onChangeText={(text) =>
                  setHouseData((prev) => ({
                    ...prev,
                    agent: { ...prev.agent, name: text },
                  }))
                }
              />
            </View>
            <View className="flex flex-row items-center relative gap-x-2">
              <TouchableOpacity
                onPress={() => setShowChooseStatus(!showchooseStatus)}
                className="bg-white border border-border/40  w-[30vw] px-3 py-2 rounded-full flex flex-row items-center justify-between"
              >
                <Profile />
                <Text>{status || "Status"}</Text>
                <ChevronDown color={color.border} />
              </TouchableOpacity>
              {showchooseStatus && (
                <TouchableOpacity
                  className="border border-border/20 flex flex-col absolute -right-[5vw] bg-white gap-y-2 px-4 rounded-lg top-[3vh]"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 10, height: 5 },
                    shadowRadius: 2,
                    elevation: 20,
                    zIndex: 10,
                  }}
                >
                  {agent_status?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        className="px-3"
                        onPress={() => {
                          setHouseData((prev) => ({
                            ...prev,
                            agent: { ...prev.agent, status: item },
                          }));
                          setChoosenStatus(item);
                          setShowChooseStatus(false);
                        }}
                        key={index}
                      >
                        <Text className="text-lg capitalize font-bold text-border">
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="flex flex-row items-center justify-between ">
            <View className="bg-white w-[60%] flex flex-row items-center gap-x-2 rounded-full my-2 px-3">
              <Pdf
                width={smallIconSize.width * 0.6}
                height={smallIconSize.height * 0.6}
              />
              <TextInput
                className="px-2 flex-1"
                placeholder="ID"
                keyboardType="numeric"
                placeholderTextColor={color.border}
                value={houseData.agent.id}
                onChangeText={(text) =>
                  setHouseData((prev) => ({
                    ...prev,
                    agent: { ...prev.agent, id: text },
                  }))
                }
              />
            </View>
            <View className="flex flex-row items-center relative gap-x-2">
              <View className="bg-white w-[30vw] flex flex-row items-center gap-x-2 rounded-full my-2 px-3">
                <Pdf
                  width={smallIconSize.width * 0.2}
                  height={smallIconSize.height * 0.5}
                />
                <TextInput
                  className="px-2 text-start flex-1"
                  placeholder="UPI"
                  placeholderTextColor={color.border}
                  value={houseData.agent.upi}
                  onChangeText={(text) =>
                    setHouseData((prev) => ({
                      ...prev,
                      agent: { ...prev.agent, upi: text },
                    }))
                  }
                />
              </View>
            </View>
          </View>
          <View className="flex flex-row items-center justify-between ">
            <View className="bg-white w-[60%] flex flex-row items-center gap-x-2 rounded-3xl my-2 px-3">
              <TextInput
                className="px-2 flex-1 h-[15vh] text-start max-h-[20vh]"
                placeholder="Comment"
                multiline
                style={{ textAlignVertical: "top" }}
                placeholderTextColor={color.border}
                value={houseData.agent.description}
                onChangeText={(text) =>
                  setHouseData((prev) => ({
                    ...prev,
                    agent: { ...prev.agent, description: text },
                  }))
                }
              />
            </View>
            <View>
              <View className="flex flex-row items-center relative gap-x-2">
                <View className="bg-white w-[35vw] flex flex-row items-center gap-x-2 rounded-full my-2 px-3">
                  <Pdf
                    width={smallIconSize.width * 0.2}
                    height={smallIconSize.height * 0.5}
                  />
                  <TextInput
                    className="px-2 text-start flex-1 py-3"
                    placeholder="phone number"
                    placeholderTextColor={color.border}
                    value={houseData.agent.phone}
                    onChangeText={(text) =>
                      setHouseData((prev) => ({
                        ...prev,
                        agent: { ...prev.agent, phone: text },
                      }))
                    }
                  />
                </View>
              </View>
              <View className="flex flex-row items-center relative gap-x-2">
                <View className="bg-white w-[35vw] flex flex-row items-center gap-x-2 rounded-full my-2 px-3">
                  <Pdf
                    width={smallIconSize.width * 0.2}
                    height={smallIconSize.height * 0.5}
                  />
                  <TextInput
                    className="px-2 text-start py-3 flex-1"
                    placeholder="Other phone"
                    placeholderTextColor={color.border}
                    value={houseData.agent.otherphone}
                    onChangeText={(text) =>
                      setHouseData((prev) => ({
                        ...prev,
                        agent: { ...prev.agent, otherphone: text },
                      }))
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
