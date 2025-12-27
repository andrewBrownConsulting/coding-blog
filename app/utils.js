export async function getAllData(id) {
    const data = await import('./posts.json').then(module => module.default.posts);
    const sortedData = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return sortedData;
}

export async function getLimitedData(id) {
    const sortedData = await getAllData(id);
    //return first 6 entries
    return sortedData.slice(0, 6);
}

export async function getDataForId(id) {
    const data = await import('./posts.json').then(module => module.default.posts);
    return data.filter(i => i.id == id);
}

export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}