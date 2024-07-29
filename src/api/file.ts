import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryInterceptor, getAuthHeaders } from './base'

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: baseQueryInterceptor({ baseUrl: 'http://localhost:7878/api' }),
  tagTypes: ['FolderStructure'],
  endpoints: (builder) => ({
    getFolderStructure: builder.query({
      query: () => ({
        url: '/files',
        method: 'GET',
        headers: getAuthHeaders(),
      }),
      providesTags: ['FolderStructure'],
    }),
    addFile: builder.mutation({
      query: (body) => ({
        url: '/files',
        method: 'POST',
        body,
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ['FolderStructure'],
    }),
    updateFile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/files/${id}`,
        method: 'PUT',
        body,
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ['FolderStructure'],
    }),
    deleteFile: builder.mutation({
      query: (body) => ({
        url: '/files',
        method: 'DELETE',
        body,
        headers: getAuthHeaders(),
      }),
      invalidatesTags: ['FolderStructure'],
    }),
  }),
})

export const {
  useGetFolderStructureQuery,
  useAddFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = fileApi
