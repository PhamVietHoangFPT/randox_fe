import { apiSlice } from '../../apis/apiSlice'
import { login, logout } from './authSlice'
export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { data: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/Account/Login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(login({ token: data.data }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => ({ data: undefined }),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout())
        } catch (error) {
          console.log(error)
        }
      },
    }),
    register: builder.mutation<
      { token: string },
      {
        email: string
        password: string
        dob: string
        phoneNumber: string
        roleId: string
        fullname: string
      }
    >({
      query: (credentials) => ({
        url: '/Account/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ password, newPassword }) => ({
        url: `/authentication/update-password?password=${password}&newPassword=${newPassword}`,
        method: 'POST',
      }),
      invalidatesTags: ['account'],
    }),
    updateEmail: builder.mutation({
      query: ({ email }) => ({
        url: `/authentication/update-email?newEmail=${email}`,
        method: 'POST',
      }),
      invalidatesTags: ['account'],
    }),

    forgetPassowrd: builder.mutation({
      query: ({ email }) => ({
        url: `/authentication/forget-password?email=${email}`,
        method: 'POST',
      }),
      invalidatesTags: ['account'],
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: `/authentication/reset-password?token=${token}&newPassword=${newPassword}`,
        method: 'POST',
      }),
      invalidatesTags: ['account'],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useUpdateEmailMutation,
  useForgetPassowrdMutation,
  useResetPasswordMutation,
} = authAPI
