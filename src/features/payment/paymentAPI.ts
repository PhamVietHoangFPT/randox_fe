import { apiSlice } from '../../apis/apiSlice'

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Tạo URL thanh toán dành cho service case
    createPayment: builder.mutation({
      query: ({ orderId }) => ({
        url: `/Transaction/payos/create?orderId=${orderId}`,
        method: 'POST',
      }),
      transformResponse: (res) => res?.redirectUrl || res, // Điều chỉnh dựa trên phản hồi
    }),
    createPurchasePaymentHistory: builder.mutation({
      query: (params) => {
        // Ép kiểu tất cả về string, đặc biệt boolean -> "true"/"false"
        const stringifiedParams = Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
        return {
          url: `/Transaction/payment-success?${new URLSearchParams(stringifiedParams).toString()}`,
          method: 'POST',
        }
      },
    })
  }),
})

export const {
  useCreatePaymentMutation,
  useCreatePurchasePaymentHistoryMutation,
} = paymentApi
