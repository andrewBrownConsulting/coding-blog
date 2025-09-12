'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { getImageFromId, parseDate } from "../utils.js";
export default function Highlight() {
    const [blogData, setBlogData] = useState();
    useEffect(
        () => {
            document.title = 'Andrew Brown Blog'
            fetch('https://backend.andrewb.site/latest')
                .then(response => response.json())
                .then(data => setBlogData(data))
        }, []
    )
    if (blogData) {
        const { image_url, title, date_created, id } = blogData;
        return (
            <div className='col-12 col-md-6 highlight rounded pt-3'>
                <Link className='link-dark' href={'/blog/' + id}>
                    {getImageFromId(id)}
                    <h1 >{title} </h1>
                    <p>{parseDate(date_created)}</p>
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