import {
    useGetCategoriesQuery,
    useGetHousesQuery
} from "@/redux/Slice/houseSlice";
 
export const {
  data: houses,
  isLoading: houseLoading,
  isError: houseError
} = useGetHousesQuery();
