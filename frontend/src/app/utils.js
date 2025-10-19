export function parseDate(dateString) {
    return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
export function getImageFromId(id, card = false) {
    return (<img
        className={'img-fluid rounded' + (card ? ' card-img' : '')}
        src={process.env.NEXT_PUBLIC_IMAGES_BASE_URL + id + '.png'}
        alt='Post'
    />)
}
