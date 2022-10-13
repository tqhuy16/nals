import { createSlice } from '@reduxjs/toolkit'
import { blogType } from '../../type/blogs-type'
export interface TypeState {
  blogs: blogType[]
  totalBlogs: number
}

const initialState: TypeState = {
  blogs: [],
  totalBlogs: 0,
}

const blogsSlice = createSlice({
  name: 'blogsList',
  initialState,
  reducers: {
    fetchBlogsData(state, actions) {
      state.blogs = actions?.payload?.items
      state.totalBlogs = actions?.payload?.totalItems
    },
    editBlog(state, actions) {
      const elementUpdated = actions?.payload?.items
      state.blogs = state.blogs.map((bl: blogType) => (bl?.id !== elementUpdated.id ? bl : elementUpdated))
    },
    deleteBlog(state, actions) {
      const idElementDeleted = actions?.payload?.idDelete
      state.blogs = state.blogs.filter((bl: blogType) => bl?.id !== idElementDeleted)
    },
    createBlog(state, actions) {
      const elementCreated = actions?.payload?.item
      state.blogs.unshift(elementCreated)
    },
  },
})

export const blogsActions = blogsSlice.actions

export default blogsSlice
