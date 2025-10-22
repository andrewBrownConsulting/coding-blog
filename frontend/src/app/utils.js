import Image from 'next/image'
const imagesURL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

export function parseDate(dateString) {
  return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
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
