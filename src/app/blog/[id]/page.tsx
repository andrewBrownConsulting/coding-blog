'use client'
import { use, useEffect, useState } from "react";
import { parseArticle } from "../parseArticle.js";
import { parseDate, getImageFromId } from "../../utils.js";
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
        fetch('https://backend.andrewb.site/database/' + id)
            .then(response => response.json())
            .then(data => setBlogData(data));
    }, []);
    //

    if (blogData) {
        const { id, title, article, date_created, image_caption } = blogData;
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
                        {getImageFromId(id)}
                        <figcaption className='d-block fst-italic '>{image_caption}</figcaption>
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