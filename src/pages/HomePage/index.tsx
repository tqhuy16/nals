import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch } from '../../store'
import { fetchBlogsData } from '../../store/blogs/actions'

import { Avatar, List } from 'antd'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Menu, message, Space, Input } from 'antd'
import { DownOutlined } from '@ant-design/icons'
const { Search } = Input

interface blogType {
  id: number
  title: string
  content: string
  image: { url: string }
  created_at: string
  updated_at: string
  comments_count: number
}

const Index: React.FC = () => {
  const dispatch = useAppDispatch()
  const blogsInfo = useSelector((state: any) => state?.blogs)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchKey, setSearchKey] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDerection, setSortDerection] = useState<string | null>(null)

  const handleSortByClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.')
    console.log('click', e)
  }

  const optionsSortBy = (
    <Menu
      onClick={handleSortByClick}
      items={[
        {
          label: 'id',
          key: '1',
        },
        {
          label: 'title',
          key: '2',
        },
        {
          label: 'created_at',
          key: '3',
        },
        {
          label: 'updated_at',
          key: '4',
        },
      ]}
    />
  )

  const handleSortDerectionClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.')
    console.log('click', e)
  }
  const optionsSortDerection = (
    <Menu
      onClick={handleSortDerectionClick}
      items={[
        {
          label: 'asc',
          key: '1',
        },
        {
          label: 'desc',
          key: '2',
        },
      ]}
    />
  )
  const onSearch = (value: string) => {
    setSearchKey(value)
  }

  useEffect(() => {
    dispatch(fetchBlogsData(currentPage, pageSize))
  }, [currentPage, pageSize])

  return (
    <List
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div>search</div>
            <Space direction="vertical">
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: '100%' }} />
            </Space>
          </div>
          <div>
            <div>Sort By</div>
            <Dropdown overlay={optionsSortBy}>
              <Button>
                <Space>
                  Choose a value
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div>
            <div>Sort Direction</div>
            <Dropdown overlay={optionsSortDerection}>
              <Button>
                <Space>
                  Choose a value
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
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
          <List.Item.Meta avatar={<Avatar src={item?.image?.url} />} title={item?.title} description={item?.content} />
        </List.Item>
      )}
    />
  )
}

export default Index
