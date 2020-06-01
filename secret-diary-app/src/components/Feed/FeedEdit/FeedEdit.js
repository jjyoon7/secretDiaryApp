import React, { useState, useEffect, Fragment } from 'react'

import Backdrop from '../../Backdrop/Backdrop'
import Modal from '../../Modal/Modal'
import Input from '../../Form/Input/Input'
import FilePicker from '../../Form/Input/FilePicker'
import Image from '../../Image/Image'
import { required, length } from '../../../util/validators'
import { generateBase64FromImage } from '../../../util/image'

const POST_FORM = {
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

export default function FeedEdit(props) {
  const [ postForm, setPostForm ] = useState(POST_FORM)
  const [ formIsValid, setFormIsValid ] = useState(false)
  const [ imagePreview, setImagePreview ] = useState(null)
  const [ isValid, setIsValid ] = useState(false)

  useEffect(() => {
    if (
      props.editing &&
      prevProps.editing !== props.editing &&
      prevProps.selectedPost !== props.selectedPost
    ) {
      const postForm = {
        title: {
          ...title,
          value: props.selectedPost.title,
          valid: true
        },
        image: {
          ...image,
          value: props.selectedPost.imagePath,
          valid: true
        },
        content: {
          ...content,
          value: props.selectedPost.content,
          valid: true
        }
      }
      setPostForm(postForm)
      setFormIsValid(true)
    }
  }, [{props}])

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
    setState(prevState => {
      for (const validator of prevpostForm[input].validators) {
        isValid = isValid && validator(value)
      }
      const updatedForm = {
        ...prevpostForm,
        [input]: {
          ...prevpostForm[input],
          valid: isValid,
          value: files ? files[0] : value
        }
      }
      let formIsValid = true
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid
      }
      return {
        postForm: updatedForm,
        formIsValid: formIsValid
      }
    })
  }

  const inputBlurHandler = input => {
    const updatedFormDate = POST_FORM[input]
    setPostForm(updatedFormDate)
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
    setPostForm(POST_FORM)
    setFormIsValid(false)
    onCancelEdit()
  }

  const acceptPostChangeHandler = () => {
    const post = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value
    }
    onFinishEdit(post)
    setPostForm(POST_FORM)
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
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'title')}
            valid={postForm['title'].valid}
            touched={postForm['title'].touched}
            value={postForm['title'].value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'image')}
            valid={postForm['image'].valid}
            touched={postForm['image'].touched}
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
            valid={postForm['content'].valid}
            touched={postForm['content'].touched}
            value={postForm['content'].value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null
  
}

