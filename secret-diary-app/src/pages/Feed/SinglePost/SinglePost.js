import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import Image from '../../../components/Image/Image'
import './SinglePost.css'

export default function SinglePost() {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ date, setDate ] = useState('')
  const [ image, setImage ] = useState('')
  const [ content, setContent ] = useState('')
  const { postId } = useParams()

  useEffect(() => {
    
    // const postId = this.props.match.params.postId
    fetch('URL')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status')
        }
        return res.json()
      })
      .then(resData => {
        setTitle(resData.post.title)
        setAuthor(resData.post.creator.name)

        const updatedDate = new Date(resData.post.createdAt).toLocaleDateString('en-US')
        setDate(updatedDate)

        setContent(resData.post.content)

      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <section className="single-post">
      <h1>{title}</h1>
      <h2>
        Created by {author} on {date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={image} />
      </div>
      <p>{content}</p>
    </section>
  )

}
