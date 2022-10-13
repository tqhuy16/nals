import { Avatar, Comment, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Title from 'antd/lib/typography/Title'
import moment from 'moment'

import { blogType } from '../../type/blogs-type'

const BlogDetail = () => {
  const params = useParams()
  const [blogInfo, setBlogInfo] = useState<blogType>()

  useEffect(() => {
    const blogDetail = async () => {
      const dataBlogDeail = await axios.get(`https://api-placeholder.herokuapp.com/api/v2/blogs/${params.id}`)
      console.log('dataBlogDeail', dataBlogDeail?.data?.data)
      setBlogInfo(dataBlogDeail?.data?.data)
    }
    blogDetail()
  }, [])

  const actions = [<span key="comment-basic-reply-to">comment: {blogInfo?.comments_count}</span>]

  return (
    <>
      <Title style={{ textAlign: 'center' }}>Detail Blog</Title>
      <Comment
        actions={actions}
        author={<div style={{ fontWeight: 'bold', color: 'black' }}>{blogInfo?.title}</div>}
        avatar={<Avatar src={blogInfo?.image?.url} alt="Han Solo" />}
        content={blogInfo?.content}
        datetime={
          <Tooltip title={moment(blogInfo?.created_at).format('DD/MM/YYYY')}>
            <span> - {moment(blogInfo?.created_at).fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  )
}

export default BlogDetail
