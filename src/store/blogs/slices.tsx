import { createSlice } from '@reduxjs/toolkit'
import { blogType } from '../../type/blogs-type'
const blogsSlice = createSlice({
  name: 'blogsList',
  initialState: {
    blogs: [],
    totalBlogs: 0,
  },
  reducers: {
    fetchBlogsData(state, actions) {
      state.blogs = actions?.payload?.items
      state.totalBlogs = actions?.payload?.totalItems
    },
    editBlog(state, actions) {
      const elementUpdated = actions?.payload?.items
      state.blogs.map((bl: blogType) => (bl?.id !== elementUpdated.id ? bl : elementUpdated))
    },
    cretateBlog(state, actions) {
      console.log('actions', actions)
    },
  },
})

export const blogsActions = blogsSlice.actions

export default blogsSlice
