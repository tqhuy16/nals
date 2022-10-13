import { Button, Form, Input, Upload, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadFile, UploadProps } from 'antd/es/upload/interface'

import { createBlog } from '../../store/blogs/actions'
import { useAppDispatch } from '../../store'
import SkeletonPage from '../../components/skeleton'

const { Title } = Typography

const CreateBlog: React.FC = () => {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const propsImage: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])

      return false
    },
    fileList,
  }

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true)
      await dispatch(createBlog(values.title, values.content, fileList))
      navigate('/')
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      {isLoading ? (
        <SkeletonPage />
      ) : (
        <>
          <Title style={{ textAlign: 'center' }}>Create New Blog</Title>
          <Form onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter entry title" />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter entry content" />
            </Form.Item>
            <Upload {...propsImage} listType="picture" maxCount={1} defaultFileList={[...fileList]}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
            <Form.Item style={{ marginTop: '24px' }}>
              <Button style={{ marginRight: '8px' }} onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  )
}

export default CreateBlog
