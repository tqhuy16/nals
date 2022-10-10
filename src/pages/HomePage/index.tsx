import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch } from '../../store'
import { fetchBlogsData } from '../../store/blogs/actions'
import WrapBodyPage from '../../components/wrap-body-page'

interface blogType {
  id: number
  title: string
  content: string
  image: { url: string }
  created_at: string
  updated_at: string
  comments_count: number
}

const Index = () => {
  const pageSize = 10
  const dispatch = useAppDispatch()
  const blogsInfo = useSelector((state: any) => state?.blogs)
  const [currentPage, setCurrentPage] = useState<number>(1)
  useEffect(() => {
    dispatch(fetchBlogsData())
  }, [])

  const handleClickCurrentPage = (pageClicked: number) => {
    setCurrentPage(pageClicked)
  }
  const numberPage = Math.floor(blogsInfo?.totalBlogs / 10) + 1
  var itemList = new Array(numberPage).fill(0).map((zero, index) => (
    <li
      key={index}
      className={`page-item + ${index + 1 === currentPage ? 'active' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => handleClickCurrentPage(index + 1)}
    >
      <span className="page-link">{index + 1}</span>
    </li>
  ))
  return (
    <WrapBodyPage>
      <ul className="list-unstyled">
        {blogsInfo?.blogs?.map((blog: blogType) => (
          <li className="media d-flex my-2" key={blog?.id}>
            <img
              src={blog?.image?.url}
              alt="avatar"
              style={{ width: '64px', height: '64px', marginRight: '0.75rem' }}
            />
            <div className="media-body">
              <h5 className="mt-0 mb-1">{blog?.title}</h5>
              {blog?.content}
            </div>
          </li>
        ))}
      </ul>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
          {itemList}
          <li className="page-item">
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </WrapBodyPage>
  )
}

export default Index
