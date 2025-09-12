'use client'
import { useFormik } from 'formik';
import { useState } from 'react';
export default function Home() {
    const [images, setImages] = useState([]);
    const [imageNames, setImageNames] = useState([]);
    const formatArticle = (article) => {
        const articleArray = article.split('\n');
        return articleArray;
    }
    const uploadImages = () => {
        // Upload images to server on 
        console.log('Uploading images:', images);
        images.forEach((image, index) => {
            //set image name to imageNames[index]

            const formData = new FormData();
            formData.append('image', image);
            //formData.append('image_name', imageNames[index] || `image_${Date.now()}.jpg`);
            fetch('https://images.andrewb.site/upload?api_key=' + process.env.NEXT_PUBLIC_IMAGES_API_KEY, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
    const {
        values,
        errors,
        touched,
        getFieldProps,
        handleSubmit,
    } = useFormik({
        initialValues: {
            title: '',
            id: '',
            img_src: '',
            caption: '',
            article: '',
        },
        onSubmit: (values) => {
            const artObj = {
                id: values.id,
                title: values.title,
                image_url: 'none',
                image_caption: values.caption,
                article: formatArticle(values.article),
            };
            fetch('https://backend.andrewb.site/new-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artObj),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response;
                })
                .then(data => {
                    alert('Article submitted successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error submitting article');
                });

        },
    });
    return (
        <div>
            <form className="container">
                <div className='row'>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" {...getFieldProps('title')} />
                </div>
                <div className='row'>
                    <label htmlFor="id">ID:</label>
                    <input type="text" id="id" {...getFieldProps('id')} />
                </div>
                <div className='row'>
                    <label htmlFor="caption">Image Caption:</label>
                    <input type="text" id="caption" {...getFieldProps('caption')} />
                </div>
                <div className='row'>
                    <label htmlFor="article">Article:</label>
                    <textarea rows={50} id="article" {...getFieldProps('article')} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

            <input type="file" multiple onChange={(e) => {
                const files = e.target.files;
                const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
                setImages((prevImages) => prevImages.concat(fileArray));
                Array.from(files).map(
                    (file) => URL.revokeObjectURL(file) // avoid memory leak
                );
            }} />
            <div className="container row row-cols-3">
                {images.map((image, index) => (
                    <div key={index} className='col card'>
                        <input type="text" placeholder='image-ref' value={imageNames[index] || ''} onChange={(e) => {
                            const newNames = [...imageNames];
                            newNames[index] = e.target.value;
                            setImageNames(newNames);
                        }} />
                        <img className='card-img' src={image} alt={`Image ${index}`} />
                        <button onClick={() => {
                            setImages((prevImages) => prevImages.filter((_, i) => i !== index));
                        }}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={uploadImages}>Upload Images</button>
        </div >
    );
}
