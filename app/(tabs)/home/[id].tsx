import {
    getDistanceFromLatLonInKm,
    getTime,
} from "@/components/functions/getDistance";
import { color, height, width } from "@/components/global";
import Error from "@/components/Reusable/Error";
import Loading from "@/components/Reusable/Loading";
import Agent from "@/components/TabsComponent/HomeComponents/SingleHouse/Agent";
import Features from "@/components/TabsComponent/HomeComponents/SingleHouse/HouseFeature";
import {
    proximityInterface,
    useGetProximilityQuery,
    useGetSingleHouseQuery,
} from "@/redux/Slice/houseSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    runOnJS,
    SlideInRight,
    SlideOutRight,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function SingleHouse() {
  const { id }: any = useLocalSearchParams();

  const inset = useSafeAreaInsets();
  const {
    data: proximity,
    isError: proximityError,
    isLoading: proximityLoading,
  } = useGetProximilityQuery();
  const [choosenProximity, setChoosenProximity] =
    useState<proximityInterface | null>(proximity ? proximity[0] : null);
  const [chooseProximity, setChooseProximity] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
   const [nextIndex, setNextIndex] = useState<number | null>(null);
  const translateX = useSharedValue(0);
  const fade = useSharedValue(1);
  const {
    data: house,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetSingleHouseQuery(id);
  const houseImages = [
    ...(house?.house_images || []),
    { images: house?.thumbnail },
    // Flatten all feature images into objects with `images: <url>`
    ...(house?.features || []).flatMap((f: any) =>
      (f?.images || []).map((img: string) => ({ images: img }))
    ),
  ];

  //   Function to update Image index
  // Animated style
  const slideImage = (direction: "next" | "prev") => {
    if (houseImages.length <= 1) return;

    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % houseImages.length
        : (currentIndex - 1 + houseImages.length) % houseImages.length;

    setNextIndex(newIndex);
    translateX.value = direction === "next" ? width : -width;

    // Animate to center
    translateX.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setCurrentIndex)(newIndex);
      runOnJS(setNextIndex)(null);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (isError) {
    return (
      <View className="py-6 ">
        <Error />
      </View>
    );
  }
  //   Proximity Distance
  //   console.log(chooseProximity);
  const distance = getDistanceFromLatLonInKm(
    parseFloat(choosenProximity?.latitude || "0"),
    parseFloat(choosenProximity?.longitude || "0"),
    parseFloat(house?.latitude || "0"),
    parseFloat(house?.longitude || "0")
  );
  //   console.log(`Distance: ${distance.toFixed(2)} km`);

  if (isLoading) {
    return (
      <View className="flex-1 flex flex-col items-center justify-center relative">
        {/* <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          className="flex flex-1 absolute  h-[100%] w-[100%]"
        ></View> */}
        <Loading />
      </View>
    );
  }
  //   console.log(house?.images);
  const router = useRouter();
  return (
    <View className="bg-white flex-1">
        <ScrollView
      contentContainerStyle={{
        paddingBottom: height * 0.04,
      }}
      className="flex flex-col flex-1 bg-white relative"
      style={
        {
          // paddingVertical:Platform.OS=='android'?inset.top:null
        }
      }
    >
      <View>
        {houseImages.length > 0 && (
          <Animated.View
            style={[{ width, height: height * 0.5 }, animatedStyle]}
          >
            <ImageBackground
              source={{ uri: houseImages[currentIndex]?.images }}
              style={{ width: "100%", height: "100%" }}
              className="flex flex-col items-center justify-center"
            >
              {/* Top back arrow */}
              <TouchableOpacity
                className="absolute z-20 left-[2vw] top-[7vh] rounded-full bg-border p-2"
                onPress={() =>
                  router?.canGoBack()
                    ? router.back()
                    : router.navigate("/(tabs)/home")
                }
              >
                <ArrowLeft color="white" />
              </TouchableOpacity>

              {/* Prev / Next Arrows */}
              <View className="absolute top-[40%] w-[98%] mx-auto flex flex-row justify-between">
                <TouchableOpacity
                  className="rounded-full bg-border p-2"
                  onPress={() => slideImage("prev")}
                >
                  <ArrowLeft color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="rounded-full bg-border p-2"
                  onPress={() => slideImage("next")}
                >
                  <ArrowRight color="white" />
                </TouchableOpacity>
              </View>

              {/* Dots */}
              <View className="absolute bottom-10 flex-row items-center justify-center w-full gap-2">
                {houseImages.map((_, idx) => (
                  <View
                    key={idx}
                    style={{
                      width: currentIndex === idx ? 10 : 6,
                      height: currentIndex === idx ? 10 : 6,
                      borderRadius: 5,
                      backgroundColor:
                        currentIndex === idx
                          ? color.loading
                          : "rgba(255,255,255,0.5)",
                      marginHorizontal: 4,
                    }}
                  />
                ))}
              </View>
            </ImageBackground>
          </Animated.View>
        )}
      </View>
      <View
        style={{
          alignSelf: "center",
          marginTop: -height * 0.025,
        }}
        className="flex flex-col bg-border rounded-full   py-3 items-center justify-center px-4"
      >
        <Text className="font-bold">{house?.address}</Text>
      </View>
      {/* Pricing and Approximity */}
      <View className="flex z-10 relative flex-row items-start justify-between w-[90%] mx-auto my-2">
        <View className="flex flex-col py-4">
          <Text className="font-bold text-border">
            {house?.currenct || "RWF"} {house?.price}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-2">
          <Text
            className="text-border"
            style={{
              position: "fixed",
            }}
          >
            Proximity
          </Text>
          <View className="flex flex-col relative">
            <TouchableOpacity
              onPress={() => setChooseProximity(!chooseProximity)}
              className="flex flex-col"
            >
              <View className="border border-border flex flex-row items-center rounded-lg py-2 px-2">
                <Text className="text-border">{choosenProximity?.name}</Text>
                <ChevronDown color={color.border} />
              </View>
              {chooseProximity && (
                <Animated.View
                  entering={SlideInRight.duration(500)}
                  exiting={SlideOutRight.duration(500)}
                  className="absolute top-full left-0 w-full bg-white z px-2 py-2 gap-y-2 divide-x rounded-lg z-50"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                    zIndex: 100,
                  }}
                >
                  {proximity?.map(
                    (proximityItem: proximityInterface, index: number) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setChoosenProximity(proximityItem);
                            setChooseProximity(false);
                          }}
                          key={index}
                        >
                          <Text className="text-border">
                            {proximityItem?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  )}
                </Animated.View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Monthly and Distance */}
      <View className="flex flex-row items-center justify-between w-[90%] mx-auto">
        <Text className="text-border">
          {house?.payment_category == "Rent" ? "Monthly" : null}
        </Text>
        <View className="flex flex-row gap-x-1">
          <Text className="text-border">
            {isLoading ? "loading ..." : `${distance?.toFixed(2)}km`}
          </Text>
          <Text className="text-border">|</Text>
          <Text className="text-border">{getTime(distance, 40)}</Text>
        </View>
      </View>
      {/* FEATURES AND Description */}
      <Features features={house?.feature_assignments} />
      <Agent />
      <View className="flex flex-col w-[90%] mx-auto">
        <Text className="font-bold text-border text-lg py-2 pb-4">
          Description
        </Text>
        <Text>{house?.description}</Text>
      </View>
     
    </ScrollView>
     <TouchableOpacity style={{
        position:'sticky'
      }} className="bg-black rounded-full px-9 my-4  w-[40vw] flex flex-col items-center justify-center py-2 self-center">
        <Text className="text-white font-bold text-lg">Book</Text>
      </TouchableOpacity>
    </View>
  );
}
