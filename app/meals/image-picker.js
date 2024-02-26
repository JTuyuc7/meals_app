'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
  const [preview, setPreview] = useState(null)
  const imageInputRef = useRef()
  function handlePickImage() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = imageInputRef.current.files[0];
    if(!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>

        <div className={classes.controls}>
          <div className={classes.preview}>
            {!preview ? (
            <p>No image chosen</p>
          ) : (
            <Image 
              className={classes.preview}
              src={preview}
                alt="Preview Image"
                fill
            />
          )}
          </div>
          <input
            className={classes.input}
            type="file"
            id={name}
            accept=".jpg,.png,.jpeg"
            max={1}
            name={name}
            ref={imageInputRef}
            onChange={handleImageChange}
            required
          />
          <div className={classes.gridButtons}>
            <button
              onClick={handlePickImage}
              className={classes.button}
              type="button"
            >
              Pick an Image
            </button>
            {preview && (
              <button
                onClick={() => setPreview(null)}
                className={classes.button}
                type="button"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
