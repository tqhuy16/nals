import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Modal, Input, Form, Button, Upload } from 'antd'
import type { UploadProps } from 'antd'
// import { blogType } from '../../type/blogs-type'
import type { UploadFile } from 'antd/es/upload/interface'
import { updateBlog } from '../../store/blogs/actions'
import { useAppDispatch } from '../../store'

const EditBlog = (props: {
  isEditBlog: boolean
  setIsEditBlog: Dispatch<SetStateAction<boolean>>
  inforBlogEdit: any
}) => {
  console.log('inforBlogEdit', props.inforBlogEdit)
  const dispatch = useAppDispatch()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  //   const fileList: UploadFile[] = [
  //     {
  //       uid: Math.random().toString(),
  //       status: 'done',
  //       name:
  //         props?.inforBlogEdit?.image?.url.split('/').pop() === 'default.png'
  //           ? 'no image'
  //           : props?.inforBlogEdit?.image?.url.split('/').pop(),
  //       url: props?.inforBlogEdit?.image?.url,
  //       thumbUrl: props?.inforBlogEdit?.image?.url,
  //     },
  //   ]

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

  const handleSubmit = (values: any) => {
    dispatch(updateBlog(props.inforBlogEdit.id, values.title, values.content))
    props.setIsEditBlog(false)
  }

  const handleCancel = () => {
    props.setIsEditBlog(false)
  }

  return (
    <>
      <Modal
        title={`Edit: ${props?.inforBlogEdit?.title}`}
        open={props.isEditBlog}
        footer={null}
        onCancel={handleCancel}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            initialValue={props?.inforBlogEdit?.title}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter entry title" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            initialValue={props?.inforBlogEdit?.content}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter entry content" />
          </Form.Item>
          <Upload
            {...propsImage}
            //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // name="image"
            listType="picture"
            maxCount={1}
            defaultFileList={[...fileList]}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
          <Form.Item style={{ marginTop: '24px' }}>
            <Button style={{ marginRight: '8px' }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditBlog
