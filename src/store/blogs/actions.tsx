import axios from 'axios'
import { blogsActions } from './slices'
export const fetchBlogsData = (
  page: number = 1,
  offset: number = 20,
  searchKey: string = '',
  sortBy: string = 'created_at',
  sortDerection: string = 'desc',
) => {
  return async (dispatch: any) => {
    let urlGetBlogs = ''
    if (searchKey === '') {
      urlGetBlogs = `https://api-placeholder.herokuapp.com/api/v2/blogs?page=${page}&offset=${offset}&sort_by=${sortBy}&sort_direction=${sortDerection}`
    } else {
      urlGetBlogs = `https://api-placeholder.herokuapp.com/api/v2/blogs?page=${page}&offset=${offset}&search=${searchKey}&sort_by=${sortBy}&sort_direction=${sortDerection}`
    }
    const fetchData = async () => {
      const respone = await axios.get(urlGetBlogs)
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

export const updateBlog = (id: number, title: string, content: string) => {
  return async (dispatch: any) => {
    const update = async () => {
      const respone = await axios.put(`https://api-placeholder.herokuapp.com/api/v2/blogs/${id}`, {
        blog: { title, content },
      })
      return respone?.data
    }
    try {
      const dataUpdate = await update()
      dispatch(
        blogsActions.editBlog({
          items: dataUpdate?.data,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}

export const createBlog = (title: string, content: string, fileList: any) => {
  console.log(fileList)
  return async () => {
    const create = async () => {
      const respone = await axios.post(`https://api-placeholder.herokuapp.com/api/v2/blogs/`, {
        blog: { title, content, image: fileList },
      })
      return respone?.data
    }
    try {
      await create()
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteBlogById = (id: number) => {
  return async (dispatch: any) => {
    const deleteBlog = async () => {
      const respone = await axios.delete(`https://api-placeholder.herokuapp.com/api/v2/blogs/${id}`)
      return respone?.data
    }
    try {
      await deleteBlog()
      dispatch(
        blogsActions.deleteBlog({
          idDelete: id,
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }
}
