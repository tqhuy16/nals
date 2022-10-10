import { createSlice } from '@reduxjs/toolkit'
const blogsSlice = createSlice({
  name: 'blogsList',
  initialState: {
    blogs: [],
    totalBlogs: 0,
  },
  reducers: {
    fetchBlogsData(state, actions) {
      //   console.log('actions', actions)
      state.blogs = actions?.payload?.items
      state.totalBlogs = actions?.payload?.totalItems
    },
  },
})

export const blogsActions = blogsSlice.actions

export default blogsSlice
