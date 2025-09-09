export function parseDate(dateString) {
    return new Date(Date.parse(dateString)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
export function getImageFromId(id) {
    return (<img
        className='img-fluid rounded'
        src={'http://localhost:9002/images/' + id + '.png'}
        alt='Post'
    />)
}