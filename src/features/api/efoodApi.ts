import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Restaurant, CheckoutBody } from './types'

export const efoodApi = createApi({
  reducerPath: 'efoodApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-ebac.vercel.app/api/efood/' }),
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({ query: () => 'restaurantes' }),
    getRestaurantById: builder.query<Restaurant | undefined, number>({
      query: () => 'restaurantes',
      transformResponse: (response: Restaurant[], _meta, id) =>
        response.find((r) => r.id === id)
    }),
    checkout: builder.mutation<any, CheckoutBody>({
      query: (body) => ({ url: 'checkout', method: 'POST', body })
    })
  })
})

export const { useGetRestaurantsQuery, useGetRestaurantByIdQuery, useCheckoutMutation } = efoodApi
