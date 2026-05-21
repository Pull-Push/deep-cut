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
    const data = await response.json()
    return data.results 
    } catch (error) {
        console.error('Failed to search Discogs', error)
        return null
    }
    
}