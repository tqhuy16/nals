import { Avatar, Comment, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Title from 'antd/lib/typography/Title'
import moment from 'moment'

import { blogType } from '../../type/blogs-type'
import SkeletonPage from '../../components/skeleton'
import { domain } from '../../constant'

const BlogDetail = () => {
  const params = useParams()
  const [blogInfo, setBlogInfo] = useState<blogType>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const blogDetail = async () => {
      try {
        const dataBlogDeail = await axios.get(`${domain}/${params.id}`)
        setBlogInfo(dataBlogDeail?.data?.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    blogDetail()
  }, [])

  const actions = [<span key="comment-basic-reply-to">comment: {blogInfo?.comments_count}</span>]

  return (
    <>
      {isLoading ? (
        <SkeletonPage />
      ) : (
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
      )}
    </>
  )
}

export default BlogDetail
