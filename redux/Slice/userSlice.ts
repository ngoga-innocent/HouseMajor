import { url } from "@/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authapi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register/",
        method: "POST",
        body: userData,
      }),
    }),
    loginUsers:builder.mutation({
      query:(userData)=>({
        url:"login/",
        method:"POST",
        body:userData
      })
    }),
    forgotPassword:builder.mutation({
      query:(email)=>({
        url:"forgot-password/",
        method:"POST",
        body:email
      })
    })
  }),
});
export const { useRegisterUserMutation,useLoginUsersMutation,useForgotPasswordMutation } = authapi;
