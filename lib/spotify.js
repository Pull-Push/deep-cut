import { cookies } from "next/headers";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export function getAuthURL(){
    const scopes = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-library-read",
        "user-library-modify"
    ];

    const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: scopes.join(" "),
        show_dialog: "true",
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(code) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method:"POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
            "Basic " +
            Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: SPOTIFY_REDIRECT_URI
        }),
    });
    const data = await response.json();
    return data;
}

export async function refreshAccessToken(refreshToken) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            Authorization:
            "Basic " + 
            Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
    });

    const data = await response.json()
    return data
}

export async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("spotify_access_token");

    if(!token){
        return null;
    }

    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token.value}`
        },
        cache: "no-store"
    });

    if(!response.ok){
        return null;
    }

    const data = await response.json();
    return data
}

export async function searchSpotify(query) {
    const cookieStore = await cookies();
    const token = cookieStore.get("spotify_access_token")

    if(!token){
        return null
    }

    const params = new URLSearchParams({
        q:query,
        type:"track,artist,album",
        limit:'10'
    });

    const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token.value}`,
        },
    });
    if(!response.ok){
        return null;
    }
    const data = await response.json();
    return data
}