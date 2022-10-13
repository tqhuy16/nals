import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
import { fetchBlogsData, deleteBlogById } from '../../store/blogs/actions'
import EditBlog from '../Blogs/edit-blog'
import { blogType } from '../../type/blogs-type'
import { Button, Select, Input, Avatar, List, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import SkeletonPage from '../../components/skeleton'
const { confirm } = Modal
const { Option } = Select

const Index: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const blogsInfo = useSelector((state: any) => state?.blogs)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchKey, setSearchKey] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [sortDerection, setSortDerection] = useState<string>('desc')
  const [isEditBlog, setIsEditBlog] = useState<boolean>(false)
  const [inforBlogEdit, setInforBlogEdit] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const optionsSortDirection = [
    { label: 'ASC', value: 'asc' },
    { label: 'DESC', value: 'desc' },
  ]

  const optionsSortBy = [
    { label: 'Id', value: 'id' },
    { label: 'Title', value: 'title' },
    { label: 'Content', value: 'content' },
    { label: 'Create At', value: 'created_at' },
    { label: 'Updated At', value: 'updated_at' },
  ]
  const handleSearchKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
  }

  const handleCreateNewBlog = () => {
    navigate('/blog/create')
  }

  const handleEditBlog = (item: blogType) => {
    setIsEditBlog(true)
    setInforBlogEdit({ ...item })
  }

  const handleChangeSortDirection = (value: string) => {
    setSortDerection(value)
  }

  const handleChangeSortBy = (value: string) => {
    setSortBy(value)
  }

  const onSearchBlog = () => {
    dispatch(fetchBlogsData(currentPage, pageSize, searchKey, sortBy, sortDerection))
  }

  const showDeleteConfirm = (item: blogType) => {
    confirm({
      title: 'Are you sure delete this blog?',
      icon: <ExclamationCircleOutlined />,
      content: `${item?.title}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteBlogById(item?.id))
      },
    })
  }

  const handleRedirectDetailBlog = (id: number) => {
    navigate(`/blog/detail/${id}`)
  }

  useEffect(() => {
    try {
      setIsLoading(true)
      dispatch(fetchBlogsData(currentPage, pageSize))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, pageSize, dispatch])

  return (
    <>
      {isLoading ? (
        <SkeletonPage />
      ) : (
        <>
          <List
            header={
              <div
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <div>
                  <Button
                    type="primary"
                    style={{
                      float: 'right',
                      marginBottom: '10px',
                    }}
                    onClick={handleCreateNewBlog}
                  >
                    New Blog
                  </Button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                  }}
                >
                  <div>
                    <div>search</div>
                    <Input placeholder="Search Key" value={searchKey} onChange={handleSearchKeyChange} />
                  </div>
                  <div>
                    <div>Sort By</div>
                    <Select defaultValue={sortBy} onChange={handleChangeSortBy}>
                      {optionsSortBy.map((op, idx) => (
                        <Option key={idx} value={op.value}>
                          {op.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <div>Sort Direction</div>
                    <Select defaultValue={sortDerection} onChange={handleChangeSortDirection}>
                      {optionsSortDirection.map((op, idx) => (
                        <Option key={idx} value={op.value}>
                          {op.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Button type="primary" onClick={onSearchBlog}>
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            }
            itemLayout="horizontal"
            dataSource={blogsInfo?.blogs}
            pagination={{
              defaultCurrent: 1,
              current: currentPage,
              pageSize,
              total: blogsInfo?.totalBlogs,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: (page, pageSize) => {
                setPageSize(pageSize)
                setCurrentPage(page)
              },
            }}
            renderItem={(item: blogType) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item?.image?.url}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRedirectDetailBlog(item?.id)}
                    />
                  }
                  title={item?.title}
                  description={item?.content}
                />
                <span
                  style={{ cursor: 'pointer', color: '#1890ff', marginRight: '8px' }}
                  onClick={() => handleEditBlog(item)}
                >
                  Edit
                </span>
                <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => showDeleteConfirm(item)}>
                  Delete
                </span>
              </List.Item>
            )}
          />
          {isEditBlog && (
            <EditBlog inforBlogEdit={inforBlogEdit} isEditBlog={isEditBlog} setIsEditBlog={setIsEditBlog} />
          )}
        </>
      )}
    </>
  )
}

export default Index
