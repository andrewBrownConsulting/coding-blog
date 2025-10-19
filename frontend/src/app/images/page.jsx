'use client'
import { useState, useEffect } from 'react';
export default function Home() {
    const [name, setName] = useState('')
    const [imageFile, setImageFile] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [allImages, setAllImages] = useState([]);
    useEffect(() => {
        fetch('https://images.andrewb.site/all-images?api_key=' + process.env.NEXT_PUBLIC_IMAGES_API_KEY)
            .then(response => response.json())
            .then(imageData => { setAllImages(imageData.images); console.log(imageData.images) });
    }, [])
    const uploadImage = () => {
        if (!imageFile)
            alert("Upload an image first")

        const formData = new FormData();
        formData.append("image", imageFile);

        console.log('https://images.andrewb.site/upload?filename=' + name + '&api_key=' + process.env.NEXT_PUBLIC_IMAGES_API_KEY);
        fetch('https://images.andrewb.site/upload?filename=' + name + '&api_key=' + process.env.NEXT_PUBLIC_IMAGES_API_KEY, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Success, image uploaded')
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Image failed to upload :(')
            });
    }
    return (
        <div>

            <input type="text" placeholder='Image Name' onChange={(e) => setName(e.target.value)} />
            <br />
            <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                if (file)
                    setImagePreview(URL.createObjectURL(file));
            }} />
            <div className="container row row-cols-3">
                <div className='col card'>
                    {name && <h1>{name}</h1>}
                    {imagePreview && <img className='img-fluid ' src={imagePreview} alt={`Image`} />}
                    <button onClick={uploadImage}>Upload</button>
                </div>
            </div>
            {allImages}
            <div className="container row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                {allImages && allImages.map(((imageFile) => {
                    return (<div className='card' key={imageFile}>
                        <h3 className='card-title'>{imageFile}</h3>
                        <img className='img-fluid card-img' src={'https://images.andrewb.site/images/' + imageFile + '?api_key=' + process.env.NEXT_PUBLIC_IMAGES_API_KEY} />
                    </div>)
                }))}
            </div>
        </div>
    );
}