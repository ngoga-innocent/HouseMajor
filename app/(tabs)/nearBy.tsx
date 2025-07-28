import { HouseMarker } from "@/assets/images";
import { color, smallIconSize, width } from "@/components/global";
import {
  house,
  HouseFeatureAssignment,
  useGetHousesQuery,
} from "@/redux/Slice/houseSlice";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function NearBy() {
  const { data: houses, isLoading } = useGetHousesQuery();
  const router=useRouter()
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  function getDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in KM

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  const defaultLat = parseFloat(houses[0]?.latitude || "-1.9501");
  const defaultLng = parseFloat(houses[0]?.longitude || "30.0588");
  

  // Nearest House to the user function
  const nearestHouses:house[] =
    userLocation &&
    houses
      ?.filter((house: any) => house.latitude && house.longitude) // only valid coords
      .map((house: house) => ({
        ...house,
        distance: getDistance(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(house.latitude),
          parseFloat(house.longitude)
        ),
      }))
      .sort((a: any, b: any) => a.distance - b.distance);
  const renderNearestHouseFeature = ({
    item: feature,
    index,
  }: {
    item: HouseFeatureAssignment;
    index: number;
  }) => {
    return (
      <View className="flex flex-row items-center rounded-full gap-x-2 border border-border/50 py-1 px-2">
        <Image source={{ uri: feature?.feature?.icon }} className="w-5 h-5" />
        <Text>{feature?.available_number}</Text>
      </View>
    );
  };
  const renderNearestHouse = ({
    item: nearestHouse,
    index: number,
  }: {
    item: house;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={{
          shadowColor: "#000",
          shadowOffset: { height: 10, width: 10 },
          shadowRadius: 10,
          elevation:10
        }}
        className=" mx-3 bg-white rounded-2xl p-2 flex w-[80vw] flex-row gap-x-2"
      >
        <View className="w-[40vw] h-[100%] overflow-hidden rounded-xl">
          <Image
            source={{ uri: nearestHouse?.thumbnail }}
            className="h-[100%] w-[40vw]"
            resizeMode="cover"
          />
        </View>
        <View className="flex flex-col flex-1">
          <View className="flex-1">
            <Text className="font-bold text-lg text-border">
              {nearestHouse?.name ||
                `${nearestHouse?.house_category?.name} For ${nearestHouse?.payment_category}`}
            </Text>
          </View>
          <View className="flex flex-col py-2">
            <Text className="text-border font-bold ">
              {nearestHouse?.currency || "RWF"} {nearestHouse?.price}
            </Text>
            <Text className="text-border text-sm">{nearestHouse?.address}</Text>
          </View>
          <FlatList
            numColumns={3}
            data={nearestHouse?.feature_assignments}
            renderItem={renderNearestHouseFeature}
          />
          <TouchableOpacity onPress={()=>router?.push(`/(tabs)/home/${nearestHouse?.id}`)} className="bg-black rounded-full self-start px-3 py-2">
            <Text className="text-white font-bold">View Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  // console.log("nearest house", nearestHouses);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>router?.canGoBack()?router.back():router?.navigate("/(tabs)/home")} className="rounded-full p-3 border-border bg-white absolute top-[6vh] left-[2vw] z-50">
        <ArrowLeft width={smallIconSize.width * 0.5} height={smallIconSize.width  * 0.5} color={color?.border} />
      </TouchableOpacity>
      <MapView
        initialRegion={{
          latitude: defaultLat, // Example: Kigali
          longitude: defaultLng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
      >
        {houses?.map((house: house, index: number) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(house?.latitude),
                longitude: parseFloat(house?.longitude),
              }}
              title={`${house?.house_category?.name}-${house?.price}`}
              description={`${house?.description?.slice(0, 100)}`}
              // image={require('@/assets/images/House.png')}
            >
              <HouseMarker width={width * 0.08} height={width * 0.1} />
            </Marker>
          );
        })}
      </MapView>
      <View className="absolute bottom-8 h-[23vh]">
        <FlatList
        showsHorizontalScrollIndicator={false}
          horizontal
          data={nearestHouses}
          renderItem={renderNearestHouse}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
});
