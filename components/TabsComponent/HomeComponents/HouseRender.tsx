import Booked from "@/assets/images/booked.svg";
import { height, smallIconSize, width } from "@/components/global";
import { house, useGetHousesQuery } from "@/redux/Slice/houseSlice";
// import { RootState } from "@reduxjs/toolkit/query";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
const HouseRender = () => {
  const router = useRouter()
  const { house_category } = useSelector((state: RootState) => state?.states);
  const {
    data: houses,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetHousesQuery();
  const filtered_houses = houses?.filter((filtered_house: house) => {
    if (house_category) {
      return filtered_house?.house_category?.id === house_category;
    } else return houses;
  });


  const renderHouse = ({
    item: house,
    index,
  }: { item: house, index: number }) => {
    return (
      <TouchableOpacity onPress={() => router.push({
        pathname: "/(tabs)/home/[id]",
        params: { id: house.id },
      })
      } style={{
        position: 'relative',
        overflow: 'visible'
      }} className="flex flex-col flex-1">
        {house?.is_booked && <View className="z-30 absolute -top-[0.5vh] -right-[7vw]">
          <Booked width={smallIconSize.width} height={smallIconSize.height} />
        </View>}
        <View
          className="overflow-hidden"
          style={{
            width: width * 0.43,
            height: height * 0.18,
            borderRadius: width * 0.06,
          }}
        >
          <Image
            style={{
              width: width * 0.43,
              height: height * 0.18,
            }}
            resizeMode="cover"
            // className="w-[100%] h-[100%]"
            source={{
              uri: house?.thumbnail,
            }}
          />
        </View>
        <View className="flex flex-col px-[4vw]">
          <View className="row">
            <Text className="text font-bold">
              {house?.currency ? house?.currency : "RWF"} {house?.price}
            </Text>
            <Text className="text text-sm">For {house?.payment_category}</Text>
          </View>
          <Text className="text">{house?.address}</Text>
        </View>
      </TouchableOpacity>

    );
  };
  return (
    <View className="flex flex-col w-[90vw] mx-auto overflow-visible z-10">
      <Spinner
        size={width * 0.2}
        visible={isLoading}
        overlayColor="rgba(0,0,0,0.6)"
        textContent="House Major ..."
      // customIndicator={<LoadingComponent />}
      />
      <FlatList
        numColumns={2}
        columnWrapperStyle={{
          columnGap: width * 0.02,
        }}
        contentContainerClassName="gap-x-2"
        contentContainerStyle={{
          gap: width * 0.06,
          paddingBottom: height * 0.127, // optional spacing at bottom
        }}
        keyExtractor={(item) => item.id.toString()}
        data={filtered_houses}
        renderItem={renderHouse}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};
export default HouseRender;
