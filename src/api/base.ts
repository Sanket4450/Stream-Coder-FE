import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryArgs,
} from '@reduxjs/toolkit/query/react'
import { CONSTANTS } from '../helper/constants'
import { getItem, removeItem } from '../utils'

export const baseQueryInterceptor = (args: FetchBaseQueryArgs) => {
  const baseQuery = fetchBaseQuery(args)
  return async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === CONSTANTS.CODES.UNAUTHORIZED) {
      removeItem(CONSTANTS.AUTH_TOKEN)
      location.replace('/login')
    }
    return result
  }
}

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getItem(CONSTANTS.AUTH_TOKEN)}`,
})
