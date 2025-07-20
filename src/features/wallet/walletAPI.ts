// src/features/voucher/voucherAPI.ts
import { apiSlice } from '../../apis/apiSlice'

export const walletAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWalletBalance: builder.query({
      query: () => ({
        url: '/Wallet/wallet',
        method: 'GET',
      }),
      transformResponse: (res) => res,
      providesTags: ['wallets'],
    }),
    depositWallet: builder.mutation({
      query: ({ totalAmount }) => ({
        url: `/Wallet/deposit-order?totalAmount=${totalAmount}`,
        method: 'POST',
      }),
      transformResponse: (res) => res,
      invalidatesTags: ['wallets'],
    }),
  }),
})

export const { useGetWalletBalanceQuery, useDepositWalletMutation } = walletAPI
