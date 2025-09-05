'use client'
import { use, useEffect, useState } from "react";
import { parseArticle } from "../parseArticle.js";
import { parseDate } from "../../utils.js";
export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const [blogData, setBlogData] = useState();
    const { id } = use(params);  // unwraps the promise

    function wordCount(articleArray: string[]) {
        let counter = 0;
        articleArray.forEach(element => {
            counter += element.split(' ').length;
        });
        return counter;
    }
    useEffect(() => {
        document.title = 'Andrew Brown Blog';
        fetch('https://localhost:9000/database/' + id)
            .then(response => response.json())
            .then(data => setBlogData(data));
    }, []);
    //

    if (blogData) {
        const { title, article, image_url, date_created, imageCaption } = blogData;
        const words = wordCount(article);
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <h3 className=' fs-1'>{title}</h3>
                        <p className='card-title'>{parseDate(date_created)}</p>
                        <p>Author - Andrew Brown</p>
                        <p>Length: {words} words ({Math.round(words / 200)} mins)</p>
                    </div>
                    <figure className='col-12 col-md-6'>
                        <img className='img-fluid rounded' src={image_url} alt='Post' />
                        <figcaption className='d-block fst-italic '>{imageCaption}</figcaption>
                    </figure>
                </div>
                <article>
                    <div className='row'>
                        <br />
                        {parseArticle(article)}
                    </div>
                </article >
            </div>
        )
    }
}