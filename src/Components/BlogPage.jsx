import { useEffect, useState } from "react";
import { parseArticle } from "../parseArticle";

export default function BlogPage() {
    const [blogId, setBlogId] = useState();
    const [blogData, setBlogData] = useState();
    useEffect(
        () => {
            const blogId = window.location.href.split('id=')[1]
            setBlogId(blogId);
            fetch('/blog-db.json')
                .then(response => response.json())
                .then(data => data.blogEntries.find((entry) => entry.id === blogId))
                .then(blogEntry => { setBlogData(blogEntry); document.title = blogEntry.title })
                .catch((error) => console.log(error))
        }, []
    )
    function wordCount(articleArray) {
        let counter = 0;
        articleArray.forEach(element => {
            counter += element.split(' ').length;
        });
        return counter;
    }
    if (blogData) {
        const { title, article, image, date, imageCaption } = blogData;
        const words = wordCount(article);
        return (
            <article  >
                <div className="container">
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <h3 className=' fs-1'>{title}</h3>
                            <p className='card-title'>{date}</p>
                            <p>Author - Andrew Brown</p>
                            <p>Length: {words} words ({Math.round(words / 200)} mins)</p>
                        </div>
                        <figure className='col-12 col-md-6'>
                            < img className='img-fluid rounded' src={image} alt='Post' />
                            <figcaption className='d-block fst-italic text-center'>{imageCaption}</figcaption>
                        </figure>
                    </div>
                    <div className='row'>
                        <br />
                        {parseArticle(article)}
                    </div>
                </div>
            </article >
        )
    }
}