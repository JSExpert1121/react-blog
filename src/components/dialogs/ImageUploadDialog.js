import React from 'react'

// 3rd party
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import Avatar from 'components/avatar/Avatar'

const ImageUploadDialog = props => {

    const { imageUrl, handleSave, title, name, message } = props
    const [busy, setBusy] = React.useState(false)
    const [url, setURL] = React.useState(imageUrl)
    const [status, setStatus] = React.useState('ready')

    const [crop, setCrop] = React.useState({
        unit: '%',
        height: 100,
        aspect: 1
    })

    const imageRef = React.useRef()
    const fileRef = React.useRef()
    const croppedRef = React.useRef()

    React.useEffect(() => {
        imageRef.current = null
        fileRef.current = null
        croppedRef.current = null
        setStatus('ready')
        setURL(imageUrl)
    }, [imageUrl])

    const handleFileOpened = React.useCallback(e => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setURL(reader.result)
            setStatus('loaded')
        })

        reader.readAsDataURL(e.target.files[0])
    }, [])

    const onImageLoaded = React.useCallback(image => {
        imageRef.current = image;
    }, [])

    const getCroppedImg = React.useCallback((image, crop) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                blob.lastModifiedDate = new Date()
                blob.name = 'avatar.png'
                fileRef.current = blob
                resolve(fileRef.current)
            }, "image/png")
        });
    }, [])

    const makeClientCrop = React.useCallback(async crop => {
        if (imageRef.current && crop.width && crop.height) {
            setBusy(true)
            const croppedImage = await getCroppedImg(
                imageRef.current,
                crop,
                "new_image.jpeg"
            );

            croppedRef.current = croppedImage;
            setBusy(false)
        }
    }, [getCroppedImg])

    const onCropComplete = React.useCallback(async crop => {
        await makeClientCrop(crop);
    }, [makeClientCrop])

    const onCropChange = React.useCallback(crop => {
        setCrop(crop)
    }, [])

    const onSave = React.useCallback(() => {
        handleSave(croppedRef.current)
    }, [handleSave])

    return (
        <div className='modal fade' id='image-upload-dialog' tabIndex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLongTitle'>{title}</h5>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        {message && <p>{message}</p>}
                        <div
                            id='image-upload-dialog-preview'
                            className='d-flex justify-content-center my-4'
                            style={{ height: 240 }}
                        >
                            {status === 'ready' && !!url && (
                                <img
                                    alt='cropped-avatar'
                                    src={url}
                                    style={{
                                        width: 240,
                                        height: 240,
                                        backgroundColor: '#AAA',
                                        color: '#EEE',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                />
                            )}
                            {status === 'loaded' && !!url && (
                                <ReactCrop
                                    src={url}
                                    crop={crop}
                                    style={{ overflowY: 'scroll' }}
                                    onImageLoaded={onImageLoaded}
                                    onComplete={onCropComplete}
                                    onChange={onCropChange}
                                />
                            )}
                            {!url && (
                                <Avatar name={name} size={240} />
                            )}
                        </div>
                        <div id='image-upload-dialog-upload'>
                            <input
                                accept="image/*"
                                id="upload-file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileOpened}
                                disabled={busy}
                            />
                            <label htmlFor="upload-file" style={{ display: 'inline' }}>
                                <span className='btn btn-primary'>
                                    <i className='fa fa-upload' />
                                    &nbsp;&nbsp;Upload a different photo
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={onSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUploadDialog
