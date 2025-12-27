export async function getAllData(id) {
    return await import('./posts.json').then(module => module.default.posts);
}

export async function getLimitedData(id) {
    const data = await import('./posts.json').then(module => module.default.posts);
    //return first 6 entries
    return data.slice(0, 6);
}

export async function getDataForId(id) {
    const data = await import('./posts.json').then(module => module.default.posts);
    return data.filter(i => i.id == id);
}