import axios from 'axios'
import { blogsActions } from './slices'
export const fetchBlogsData = (page: number = 1, offset: number = 20) => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const respone = await axios.get(
        `https://api-placeholder.herokuapp.com/api/v2/blogs?page=${page}&offset=${offset}`,
      )
      return respone?.data
    }
    try {
      const blogsData = await fetchData()

      dispatch(
        blogsActions.fetchBlogsData({
          items: blogsData?.data?.items || [],
          totalItems: blogsData?.pagination?.count,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}
