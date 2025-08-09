import BlogCard from './BlogCard';
import Abstract from './Abstract';
import data from './assets/blog-db.json'

export default function HomePage() {
    return (
        <div className='container mb-0'>
            <main className='container mb-3'>
                <Abstract />
                <div className='flex-bar'>
                    <h1 className=''>Most Recent Posts</h1>
                    <button className='btn btn-alert'>View all Posts</button>
                </div>
                <section id='recent posts' className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2'>
                    {data &&
                        data.blogEntries.map(
                            entry => {
                                return <BlogCard key={entry.id} entry={entry} />
                            }
                        )
                    }
                </section>
            </main>
        </div >
    )
}