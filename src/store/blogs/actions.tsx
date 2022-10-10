import axios from 'axios'
import { blogsActions } from './slices'
export const fetchBlogsData = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const respone = await axios.get('https://api-placeholder.herokuapp.com/api/v2/blogs')
      // console.log('respone', respone)
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
