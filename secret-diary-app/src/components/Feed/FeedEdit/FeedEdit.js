import React, { useState, useEffect, Fragment } from 'react'

import Backdrop from '../../Backdrop/Backdrop'
import Modal from '../../Modal/Modal'
import Input from '../../Form/Input/Input'
import FilePicker from '../../Form/Input/FilePicker'
import Image from '../../Image/Image'
import { required, length } from '../../../util/validators'
import { generateBase64FromImage } from '../../../util/image'

const postForm = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  image: {
    value: '',
    valid: false,
    touched: false,
    validators: [required]
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  }
}

export default function FeedEdit({editing, selectedPost, loading, onCancelEdit, onFinishEdit}) {
  const [ postFormObj, setPostForm ] = useState(postForm)
  const [ formIsValid, setFormIsValid ] = useState(false)
  const [ imagePreview, setImagePreview ] = useState(null)
  const [ isValid, setIsValid ] = useState(false)
  
  //
  const [ prevEditing, setPrevEditing ] = useState(editing)
  const [ prevSelectedPost, setPrevSelectedPost ] = useState(selectedPost)

  useEffect(() => {
    console.log('postFormObj.title', postFormObj.title)
    if (
      editing &&
      //check if the logic here is correct
      prevEditing !== editing &&
      prevSelectedPost !== selectedPost
    ) {
      const updatedPostForm = {
        title: {
          ...postForm.title,
          value: selectedPost.title,
          valid: true
        },
        image: {
          ...postForm.image,
          value: selectedPost.imagePath,
          valid: true
        },
        content: {
          ...postForm.content,
          value: selectedPost.content,
          valid: true
        }
      }
      setPostForm(updatedPostForm)
      setFormIsValid(true)
    }
  }, [editing, selectedPost])

  const postInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          setImagePreview(b64)
        })
        .catch(e => {
          setImagePreview(null)
        })
    }
    setIsValid(true)

    for (let inputName in postFormObj[input]) {
      setIsValid(isValid && updatedForm[inputName].validator(value))
    }

    const updatedForm = {
      ...postFormObj,
      [input]: {
        ...postFormObj[input],
        valid: isValid,
        value: files ? files[0] : value
      }
    }

    for (let inputName in updatedForm) {
      setFormIsValid(formIsValid && updatedForm[inputName].valid)
    }
    setPostForm(updatedForm)
  }

  const inputBlurHandler = input => {
    const updatedFormDate = postFormObj[input]
    // setPostForm(updatedFormDate)
    // setState(prevState => {
    //   return {
    //     postForm: {
    //       ...prevpostForm,
    //       [input]: {
    //         ...prevpostForm[input],
    //         touched: true
    //       }
    //     }
    //   }
    // })
  }

  const cancelPostChangeHandler = () => {
    // setPostForm(postForm)
    setFormIsValid(false)
    onCancelEdit()
  }

  const acceptPostChangeHandler = () => {
    const post = {
      title: postFormObj.title.value,
      image: postFormObj.image.value,
      content: postFormObj.content.value
    }
    onFinishEdit(post)
    setPostForm(postForm)
    setFormIsValid(false)
    setImagePreview(null)
  }


  return editing ? (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}
      >
          {console.log('postformobj in return render state', postFormObj)}
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            // onBlur={inputBlurHandler.bind(this, 'title')}
            valid={postFormObj.title.valid}
            touched={postFormObj.title.touched}
            value={postFormObj.title.value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'image')}
            valid={postFormObj.image.valid}
            touched={postFormObj.image.touched}
          />
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && (
              <Image imageUrl={imagePreview} contain left />
            )}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'content')}
            valid={postFormObj.content.valid}
            touched={postFormObj.content.touched}
            value={postFormObj.content.value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null
  
}

