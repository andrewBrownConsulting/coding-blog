import Image from 'next/image'
const imagesURL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL ? process.env.NEXT_PUBLIC_IMAGES_BASE_URL : 'https://blog-images-s3-andrewb.s3.us-east-1.amazonaws.com/';
const apiURL = "http://backend:9001/api/"
const useMock = false; //process.env.USE_MOCK == "true";
const mockData = [{ id: 'test', title: 'test', article: 'test', date_created: 'test', image_caption: 'test' }]

export const dynamic = "force-dynamic";

export function parseDate(dateString) {
  return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
export async function fetchAllBlogData() {
  if (useMock)
    return mockData;
  const blogRes = await fetch(apiURL + "database")
  const data = await blogRes.json();
  return data;
}
export async function fetchLatestBlog() {
  if (useMock)
    return mockData[0];
  const blogRes = await fetch(apiURL + 'latest');
  const blogData = await blogRes.json();
  return blogData;
}
export async function fetchBlogWithId(id) {
  const blogRes = await fetch(apiURL + 'database/' + id);
  const blogData = await blogRes.json();
  return blogData;
}
export function getLogo(id) {
  return <div>
    <Image
      className={'img-fluid rounded'}
      src={imagesURL + id + '.png'}
      width={100}
      height={100}
      alt='Logo'
    />
  </div>
}
export function getImageFromId(id, card = false) {
  return (
    <Image
      className={'img-fluid rounded ' + (card ? 'card-img' : '')}
      src={imagesURL + id + '.png'}
      width={500}
      height={300}
      alt='Post'
      key={id}
    />
  )
}
