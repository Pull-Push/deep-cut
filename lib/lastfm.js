const LASTFM_TOKEN = process.env.LASTFM_TOKEN


export async function getArtist(artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
    
        const data = await response.json();

        if(data.error){
            console.error("getArtist Last.fm error", data.message);
            return null
        }
        return data

    } catch (error) {
        console.error('Failed to get artist info from Last.FM', error)
        return null
    }
}

export async function searchArtist(artist){
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error("searchArtist Last.fm error", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('Failed to search artist', error)
        return null
        
    }
}


export async function searchAlbum(album){
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(album)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error("searchAlbum Last.fm error", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('Failed to search album', error)
        return null
        
    }
}

export async function getAlbumInfo(artist, album) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_TOKEN}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error("searchAlbumInfo Last.fm error", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error("Failed to get album info", error)
        return null
    }
}

export async function getSimilarArtists(artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error("getSimiarArtist last.fm error", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error("failed to get similar artists", error)
        return null
    }
}

export async function getTopTracks(artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error("getTopTracks last.fm error", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('Failed to get artist top tracks', error)
        return null
    }
}

export async function getArtistTags(artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error("getArtistTags last.fm error", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('Failed to get artist tags', error)
        return null
    }
}

export async function searchTrack(track) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(track)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error('searchTrack last.fm error', data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('failed to search track', error)
        return null
    }
}

export async function getTrackInfo(artist, track) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_TOKEN}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error('getTrackInfo last.fm error', data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('failed to get track info', error)
        return null
    }
}

export async function getArtistTopAlbums(artist) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error('getArtistTopAlbums last.fm error', data.message)
            return null
        }
        return data
    } catch (error) {
        console.error('Failed to get artist top albums', error)
        return null
    }
}

export async function getTagTopArtists(genre) {
    try{
        const encodedGenre = genre.trim().toLowerCase().replace(/\s+/g, '+');
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${encodedGenre}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error('getTagTopArtists last.fm error', data.message)
            return null
        }
        return data
    } catch(error){
        console.error('Failed to get top tag artists', error)
        return null
    }
}

export async function getTagTopAlbums(genre) {
    try{
        const encodedGenre = genre.trim().toLowerCase().replace(/\s+/g, '+');
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${encodedGenre}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error('getTagTopAlbums last.fm error', data.message)
            return null
        }
        return data
    } catch(error){
        console.error('Failed to get top tag albums', error)
        return null
    }
}

export async function getTagInfo(genre) {
    try{
        const encodedGenre = genre.trim().toLowerCase().replace(/\s+/g, '+');
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${encodedGenre}&api_key=${LASTFM_TOKEN}&format=json`)
        const data = await response.json()

        if(data.error){
            console.error('getTagInfo last.fm error', data.message)
            return null
        }
        return data
    } catch(error){
        console.error('Failed to get tag info', error)
        return null
    }
}