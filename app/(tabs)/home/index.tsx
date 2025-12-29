import { color, height, smallIconSize, width } from "@/components/global";
// import { category } from "@/components/ReduxState";
import { Logo } from "@/assets/images";
import {
  categoryInterface,
  useGetCategoriesQuery,
} from "@/redux/Slice/houseSlice";
import { setCategory } from "@/redux/Slice/StateSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "expo-router";
import {
  Plus,
  RefreshCcwIcon,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import HouseRender from "../../../components/TabsComponent/HomeComponents/HouseRender";
// import HouseRender from "../../components/_(TabsComponent)/_HomeComponents/HouseRender";
// import HouseRender from "@/components/TabsComponent/HomeComponents/HouseRender";

export default function Home() {
  // states
  const dispatch = useDispatch<AppDispatch>();
  const handleCategoryPress = async (index: number, id: string) => {
    setActiveCategory(index);
    dispatch(setCategory(id));
  };
  const router = useRouter();
  // const filteredhouses  = useSelector((state: RootState) => state.filteredHouses?.houses);

  const [Activecategory, setActiveCategory] = useState<number>(0);
  const inset = useSafeAreaInsets();
  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
    refetch: CategoryRefresh,
    isFetching: categoryFetching,
  } = useGetCategoriesQuery();
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? inset.top : null,
      }}
      className="flex flex-1 bg-white flex-col px-[2vw]"
    >
      <View className="flex  flex-row items-center w-[90vw] gap-x-3 mx-auto">
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/home/addhouse")}
          className="rounded-btn w-[10vw] h-[10vw]"
        >
          <Plus color="#7A7575" />
        </TouchableOpacity>
        <View className="flex-1 flex flex-row rounded-btn px-2">
          <Search color="#7A7575" />
          <TextInput
            className="flex-1"
            style={{
              paddingVertical: Platform.OS == "ios" ? height * 0.014 : null,
            }}
            placeholder="Search"
            placeholderTextColor="#7A7575"
          />
        </View>
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/home/filter")}
          className="rounded-btn w-[10vw] h-[10vw]"
        >
          <SlidersHorizontal color="#7A7575" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col">
        {categoryError && (
          <View className="flex flex-row items-center w-full justify-center space-x-2">
            <Logo width={smallIconSize.width} height={smallIconSize.height} />
            <Text className="font-bold text-error">
              Error Fetching Category
            </Text>
            <TouchableOpacity
              className="mx-3"
              onPress={() => CategoryRefresh()}
            >
              <RefreshCcwIcon
                color={color.border}
                size={smallIconSize.width * 0.35}
              />
            </TouchableOpacity>
          </View>
        )}

        {(categoryLoading || categoryFetching) && (
          <ActivityIndicator
            color={color.loading}
            size={smallIconSize.width * 0.35}
          />
        )}

        {category && (
          <View
            className="py-2"
            style={{
              paddingHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              // flex: 1,
              gap: width * 0.02,
            }}
          >
            {category?.map((item: categoryInterface, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryPress(index, item?.id)}
                  className={`px-[4vw] btn ${Activecategory == index ? "bg-black text-white" : null}`}
                >
                  <Text
                    className={`text-bold ${Activecategory == index ? "text-white " : "text-border"} font-bold`}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <View className="py-5 overflow-visible">
        <HouseRender />
      </View>
    </SafeAreaView>
  );
}
