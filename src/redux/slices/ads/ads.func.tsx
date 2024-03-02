import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAd, IComment, IRequestNewAd } from '@interface/';

import { apiBaseSlice } from '../api-base-reauth';


export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Ads', 'Ad', 'Comments'],
  endpoints: (builder) => ({
    getAllAds: builder.query<IAd[], void>({
      query: () => '/ads',
      providesTags: ['Ads'],
    }),
    getAdById: builder.query<IAd, string>({
      query: (id: string) => `/ads/${id}`,
      providesTags: ['Ad'],
    }),
    getCommentsById: builder.query<IComment[], number>({
      query: (id: number) => `/ads/${id}/comments`,
      providesTags: ['Comments'],
    }),
    getSellerAdsByUserId: builder.query<IAd[], string>({
      query: (userId: string) => `/ads?user_id=${userId}`,
      providesTags: ['Ads'],
    }),
  }),
});

export const adsProtectedApi = apiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUserAds: builder.query<IAd[], void>({
      query: () => '/ads/me',
      providesTags: ['Ads'],
    }),
    createNewAd: builder.mutation({
      query: ({ body }: { body: IRequestNewAd }) => ({
        url: '/adstext',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Ad'],
    }),
    changeCurrentAd: builder.mutation({
      query: (args: { body: IRequestNewAd; id: number }) => ({
        url: `/ads/${args.id}`,
        method: 'PATCH',
        body: args.body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Ad'],
    }),
    addImageToAdv: builder.mutation({
      query: (args: { formData: object; id: number }) => ({
        url: `/ads/${args.id}/image`,
        method: 'POST',
        body: args.formData,
      }),
      invalidatesTags: ['Ad'],
    }),
    deleteCurrentAd: builder.mutation({
      query: (id: number) => ({
        url: `/ads/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Ad'],
    }),
    deleteImageFromAdv: builder.mutation({
      query: (args: { url: string; id: number }) => ({
        url: `/ads/${args.id}/image?file_url=${args.url}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Ad'],
    }),
    addNewComment: builder.mutation({
      query: (args: { body: { text: string }; id: number }) => ({
        url: `/ads/${args.id}/comments`,
        method: 'POST',
        body: args.body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useGetAdByIdQuery,
  useGetCommentsByIdQuery,
  useGetSellerAdsByUserIdQuery,
} = adsApi;

export const {
  useGetCurrentUserAdsQuery,
  useCreateNewAdMutation,
  useChangeCurrentAdMutation,
  useAddImageToAdvMutation,
  useDeleteCurrentAdMutation,
  useDeleteImageFromAdvMutation,
  useAddNewCommentMutation,
} = adsProtectedApi;
