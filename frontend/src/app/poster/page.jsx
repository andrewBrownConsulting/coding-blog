'use client'
import { useFormik } from 'formik';
export default function Home() {
  const formatArticle = (article) => {
    const articleArray = article.split('\n');
    return articleArray;
  }
  const {
    getFieldProps,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: '',
      id: '',
      img_src: '',
      caption: '',
      article: '',
    },
    onSubmit: (values) => {
      const jsonObj =
      {
        title: values.title,
        id: values.id,
        image_url: "N/A",
        image_caption: values.caption,
        article: formatArticle(values.article),
      }
      fetch('http://localhost:9001/new-article', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonObj),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response;
        })
        .then(() => {
          alert('Article submitted successfully!');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error submitting article');
        });
    },
  });
  return (
    <div>
      <form className="container">
        <div className='row'>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" {...getFieldProps('title')} />
        </div>
        <div className='row'>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" {...getFieldProps('id')} />
        </div>
        <div className='row'>
          <label htmlFor="caption">Image Caption:</label>
          <input type="text" id="caption" {...getFieldProps('caption')} />
        </div>
        <div className='row'>
          <label htmlFor="article">Article:</label>
          <textarea rows={50} id="article" {...getFieldProps('article')} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div >
  );
}
