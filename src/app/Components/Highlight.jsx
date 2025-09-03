import { useEffect, useState } from 'react';
import Link from "next/link";
export default function Highlight() {
    const [blogData, setBlogData] = useState()
    useEffect(
        () => {
            fetch('/blog-db.json')
                .then(response => response.json())
                .then(data => setBlogData(data))
                .catch((error) => console.log(error))
        }, []
    )
    if (blogData) {
        const { image, title, date, id } = blogData.blogEntries[0];
        return (
            <div className='col-12 col-md-6 highlight rounded pt-3'>
                <Link className='link-dark' href={'/blog?id=' + id}>
                    <img className='img-fluid rounded ' src={image} />
                    <h1 >{title} </h1>
                    <p>{date}</p>
                </Link >
            </div>
        );
    }
    else
        return (
            <div className='col-12 col-md-6'>
                Loading...
            </div>)
}