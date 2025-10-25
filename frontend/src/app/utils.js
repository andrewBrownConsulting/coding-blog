import Image from 'next/image'
const imagesURL = "https://localhost/images/" //process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

export function parseDate(dateString) {
  return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
export function formatArticle(article) {
  const articleArray = article.split('\n');
  return articleArray;
}
export function getLogo(id) {
  return <div>
    <Image
      className={'img-fluid rounded'}
      src={imagesURL + id + '.png'}
      width={100}
      height={100}
      alt='Logo'
      unoptimized
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
      alt={id}
      key={id}
      unoptimized
    />
  )
}
export function getImageFromFilename(filename, card = false) {
  return (
    <Image
      className={'img-fluid rounded ' + (card ? 'card-img' : '')}
      src={imagesURL + filename}
      width={500}
      height={300}
      alt={filename}
      key={filename}
      unoptimized
    />
  )
}
