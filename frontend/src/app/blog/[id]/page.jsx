import { parseArticle } from "../parseArticle.js";
import { parseDate, getImageFromId, fetchBlogWithId } from "../../utils.js";

export const dynamic = "force-dynamic";

export let metadata = {
  title: "Andrew Brown Blog", // static
};
export default async function BlogPage({ params }) {
  const { id } = await params;
  const blogData = await fetchBlogWithId(id);
  function wordCount(articleArray) {
    let counter = 0;
    articleArray.forEach(element => {
      counter += element.split(' ').length;
    });
    return counter;
  }

  if (blogData) {
    const { id, title, article, date_created, image_caption } = blogData;
    const words = wordCount(article);
    metadata.title = title;
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
