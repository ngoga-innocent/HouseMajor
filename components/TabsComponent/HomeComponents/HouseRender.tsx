import Booked from "@/assets/images/booked.svg";
import { height, smallIconSize, width } from "@/components/global";
import { house, useGetHousesQuery } from "@/redux/Slice/houseSlice";
// import { RootState } from "@reduxjs/toolkit/query";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
const HouseRender = () => {
  const router = useRouter();

  const { house_category } = useSelector((state: RootState) => state?.states);
  const {
    data: houses,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useGetHousesQuery();
  const allhouses = houses ?? [];
  const filteredhouses = useSelector(
    (state: RootState) => state.filteredHouses?.houses ?? []
  );
  // const [displayedHouses, setDisplayedHouses] = useState([]);
  // let displayedHouses: house[] = [];
  // console.log("house category",house_category);

  // useEffect(() => {
  //   let results = allhouses;

  //   // 1️⃣ Apply server-filtered houses first if they exist
  //   if (filteredhouses?.length > 0) {
  //     results = filteredhouses;
  //   }

  //   // 2️⃣ Apply category filter on top
  //   if (house_category) {
  //     results = results.filter(
  //       (h: any) => h?.house_category?.id === house_category
  //     );
  //   }

  //   setDisplayedHouses(results);
  // }, [filteredhouses, house_category, allhouses]);
  const displayedHouses = React.useMemo(() => {
  let results = allhouses ?? [];

  if (filteredhouses?.length > 0) {
    results = filteredhouses;
  }

  if (house_category) {
    results = results.filter(
      (h: any) => h?.house_category?.id === house_category
    );
  }

  return results;
}, [allhouses, filteredhouses, house_category]);


  const renderHouse = ({
    item: house,
    index,
  }: {
    item: house;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(tabs)/home/[id]",
            params: { id: house.id },
          })
        }
        style={{
          position: "relative",
          overflow: "visible",
          width: width * 0.45,
        }}
        className="flex flex-col"
      >
        {house?.is_booked && (
          <View className="z-30 absolute -top-[0.5vh] -right-[7vw]">
            <Booked width={smallIconSize.width} height={smallIconSize.height} />
          </View>
        )}
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
      {displayedHouses?.length >0 ? (
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
          data={displayedHouses}
          renderItem={renderHouse}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex flex-col items-center justify-center ">
          <LottieView
            source={require("@/assets/Animations/NoResult.json")}
            autoPlay
            loop
             style={{ width: width * 0.5, height: width * 0.5 }}
          />
          <Text className="text-center font-bold">No House Available at the moment please try again Later</Text>
        </View>
      )}
    </View>
  );
};
export default HouseRender;
