import { Link } from 'react-router'
export default function BlogCard({ entry }) {
    return (
        <div className="col" key={entry.id} >
            <article className='card p-3'>
                <Link className='link-dark' to={'/blog?id=' + entry.id}>
                    <img className='card-img' src={entry.image} alt='Post' ></img>
                    <div className='card-body'>
                        <p className='date'>{entry.date}</p>

                        <h3 className='card-title'>{entry.title}</h3>
                        <button className="btn btn-secondary">Read Article</button>
                    </div>
                </Link>
            </article >
        </div >
    )
}