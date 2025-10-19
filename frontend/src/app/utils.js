export function parseDate(dateString) {
    return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
const imagesURL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL?? process.env.NEXT_PUBLIC_IMAGES_BASE_URL: 'https://blog-images-s3-andrewb.s3.us-east-1.amazonaws.com/'
export function getImageFromId(id, card = false) {
    return (<img
        className={'img-fluid rounded' + (card ? ' card-img' : '')}
        src={imagesURL + id + '.png'}
        alt='Post'
    />)
}
