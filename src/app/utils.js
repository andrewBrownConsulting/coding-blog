import dotenv from 'dotenv';
export function parseDate(dateString) {
    return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
export function getImageFromId(id, card = false) {
    return (<img
        className={'img-fluid rounded' + (card ? ' card-img' : '')}
        src={'https://images.andrewb.site/images/' + id + '.png' + '?api_key' + '=' + process.env.NEXT_PUBLIC_IMAGES_API_KEY}
        alt='Post'
    />)
}