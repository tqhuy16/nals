import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blogsSlice from './blogs/slices'

const store = configureStore({
  reducer: { blogs: blogsSlice.reducer },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
