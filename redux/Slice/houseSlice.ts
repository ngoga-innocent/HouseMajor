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
export interface FeatureInterface {
    id: string;
    name: string;
    icon: string;
    add_available_number: boolean;
    is_additional_image_required: boolean;
    show_available_number: boolean;
    show_icon_only: boolean;
    show_name_only: boolean;
  }

  export interface HouseFeatureAssignment {
    id: string;
    available_number: string | null;
    images: string[];
    feature: FeatureInterface;
  }
export interface house{
  id:string,
  thumbnail:string,
  house_category:houseCategory,
  payment_category:string[],
  name:string,
  address:string,
  latitude:string,
  longitude:string,
  price:number,
  currency:string,
  description:string,
  feature_assignments:HouseFeatureAssignment[],
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
