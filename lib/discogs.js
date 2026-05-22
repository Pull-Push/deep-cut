const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN


export async function searchDiscogsLabel(query) {
    try {
        const response = await fetch(`https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=label&token=${DISCOGS_TOKEN}`,
    {
        headers: {
            "User-Agent": "DeepCut/1.0 +https://github.com/pull-push/deep-cut",
        },
            cache: "no-store",
    },
)

    if(!response.ok){
        console.error('Error searching discogs artist', response.status)
        return null
    }
    const data = await response.json()
    return data.results 
    } catch (error) {
        console.error('Failed to search Discogs', error)
        return null
    }
    
}

export async function searchDiscogsArtist(query) {
    try {
        const response = await fetch(`https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=artist&token=${DISCOGS_TOKEN}`,
    {
        headers:{
            "User-Agent": "DeepCut/1.0 +https://github.com/pull-push/deep-cut",
        },
        cache: "no-store",
    },
)   
    if(!response.ok){
        console.error('Error searching discogs artist', response.status)
        return null
    }
    const data = await response.json()
    return data.results
    } catch (error) {
        console.error("Failed to search discogs artists", error)
        return null
    }
}

export async function searchDiscogsAlbum(query) {
    try {
        const response = await fetch(`https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&token=${DISCOGS_TOKEN}`,
    {
        headers:{
            "User-Agent": "DeepCut/1.0 +https://github.com/pull-push/deep-cut",
        },
        cache: "no-store",
    },
)   
    if(!response.ok){
        console.error('Error searching discogs albums', response.status)
        return null
    }
    const data = await response.json()
    return data.results
    } catch (error) {
        console.error("Failed to search discogs albums", error)
        return null
    }
}