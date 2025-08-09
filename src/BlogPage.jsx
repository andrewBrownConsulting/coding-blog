import { Link } from 'react-router'
import data from './assets/blog-db.json'
export default function BlogPage() {
    let url = window.location.href;
    const foundId = url.split('id=')[1];
    const { title, date, image, article } = data.blogEntries.find((entry) => entry.id == foundId);
    if (data)
        return (
            <article className='container'>
                <div className='row text-center'>
                    < img className='img-fluid' src={"/landscape.png"} alt='Post Image' />
                </div>
                <div className='row'>
                    <p className='card-title'>April 9 2025</p>
                    <h3>{title}</h3>
                    {article?.map(sect => {
                        return <p>{sect}</p>
                    })}
                    <p></p>
                </div>
            </article >
        )
}