import { url } from "@/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface houseCategory{
  id:string,
  name:string
}
export interface house_imagesinterface{
  id:string,
  image:string
}
export interface house{
  id:string,
  thumbnail:string,
  house_category:houseCategory,
  payment_category:string[],
  address:string,
  latitude:string,
  longitude:string,
  price:number,
  currency:string,
  description:string,
  feature_assignments:string[],
  is_booked:boolean,
  house_images:house_imagesinterface[]
}
export interface categoryInterface{
    id:string,
    name:string
}
export interface proximityInterface{
  id:string,
  name:string,
  latitude:string,
  longitude:string
}
export const HouseApi = createApi({
  reducerPath: "HouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/`
  }),
  endpoints: (builder) => ({
    getHouses: builder.query<any, void>({
      query: () => "houses/"
    }),
    getSingleHouse:builder.query<any,string,void>({
      query:(id)=>`houses/${id}`
    }),
    getCategories:builder.query<categoryInterface[],void>({
        query:()=>"categories/"
    }),
    getProximility:builder.query<proximityInterface[],void>({
      query:()=>'proximity/'
    })

  })
});
export const { useGetHousesQuery,useGetCategoriesQuery,useGetSingleHouseQuery,useGetProximilityQuery } = HouseApi;
