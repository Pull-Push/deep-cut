const LASTFM_TOKEN = process.env.LASTFM_TOKEN

export async function getArtist(artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
    
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Failed to get artist info from Last.FM', error)
        return null
    }
}