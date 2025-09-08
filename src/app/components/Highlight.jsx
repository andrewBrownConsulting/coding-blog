'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
export default function Highlight() {
    const [blogData, setBlogData] = useState();
    useEffect(
        () => {
            document.title = 'Andrew Brown Blog'
            fetch('https://localhost:9000/database')
                .then(response => response.json())
                .then(data => setBlogData(data[0]))
        }, []
    )
    if (blogData) {
        const { image_url, title, date_created, id } = blogData;
        return (
            <div className='col-12 col-md-6 highlight rounded pt-3'>
                <Link className='link-dark' href={'/blog/' + id}>
                    <Image
                        className='img-fluid rounded'
                        src={image_url}
                        alt='Post'
                        width={600}
                        height={400}
                    />

                    <h1 >{title} </h1>
                    <p>{ }</p>
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