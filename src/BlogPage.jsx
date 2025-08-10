import data from './assets/blog-db.json'
export default function BlogPage() {
    let url = window.location.href;
    const foundId = url.split('id=')[1];
    const { title, article, image, date, imageCaption } = data.blogEntries.find((entry) => entry.id === foundId);
    function wordCount(articleArray) {
        let counter = 0;
        articleArray.forEach(element => {
            counter += element.split(' ').length;
        });
        return counter;
    }
    if (data) {
        document.title = title ? title : 'test';
        const words = wordCount(article);
        return (
            <article className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <h3 className=' fs-1'>{title}</h3>
                        <p className='card-title'>{date}</p>
                        <p>Author - Andrew Brown</p>
                        <p>Length: {words} words ({Math.round(words / 200)} mins)</p>
                    </div>
                    <div className='col-6'>
                        < img className='img-fluid rounded' src={image} alt='Post' />
                        <caption className='d-block fst-italic text-center'>{imageCaption}</caption>
                    </div>
                </div>
                <div className='row'>
                    <br />
                    {article?.map((sect, index) => {
                        return <p key={index}>{sect}</p>
                    })}
                    <p></p>
                </div>
            </article >
        )
    }
}