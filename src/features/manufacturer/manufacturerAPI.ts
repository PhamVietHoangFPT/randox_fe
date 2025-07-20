/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../../apis/apiSlice'

export const manufacturerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllManufacturers: builder.query<any, void>({
      query: () => 'Manufacturer',
    }),
  }),
})

export const { useGetAllManufacturersQuery } = manufacturerAPI
