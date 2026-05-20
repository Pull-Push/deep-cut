const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN

export async function searchDiscogsLabel(query) {
    const response = await fetch(`https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=label&token=${DISCOGS_TOKEN}`,
    {
        headers: {
            "User-Agent": "DeepCut/1.0 +https://github.com/pull-push/deep-cut",
        },
            cache: "no-store",
    },
)
if(!response.ok) return null
const data = await response.json();
return data
}

export async function getDiscogsLabelRoster(labelId){
    const response = await fetch(`https://api.discogs.com/labels/${labelId}/releases?per_page=50&sort=year&sort_order=desc`,
        {
            headers:{
                "User-Agent": "DeepCut/1.0 +https://github.com/pull-push/deep-cut"
            },
            cache:"no-store"
        }
    )
    if(!response.ok) return null
    const data = await response.json()
    return data
}