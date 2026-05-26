"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrackRow({ track, index }) {
    const router = useRouter()
    const artistName = typeof track.artist === 'object' ? track.artist.name : track.artist
    const[loading, setLoading] = useState(false)

    async function handlePlay(e) {
    e.stopPropagation();
    setLoading(true)
    const response = await fetch(
        `/api/spotify/play?track=${encodeURIComponent(track.name)}&artist=${encodeURIComponent(artistName)}`
    );
    
    if (!response.ok) {
        setLoading(false)
        return;
    }
    
    const data = await response.json();
    setLoading(false)
    
if (data.uri) {
    const trackId = data.uri.split(':')[2];
    const webUrl = `https://open.spotify.com/track/${trackId}`;
    window.open(webUrl, 'spotify-player');
}
}

    return(
        <div onClick={() => router.push(`/track?artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(track.name)}`)} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <span className="text-zinc-500 text-sm w-4 text-right">{index+1}</span>
            <Image src={"/placeholder.png"} alt={track.name} width={48} height={48} className="rounded-md"/>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{track.name}</p>
                <p className="text-xs text-zinc-400 truncate">{artistName}</p>
            </div>
                <button
    onClick={handlePlay}
    disabled={loading}
    className="text-xs bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white px-3 py-1 rounded-full transition-colors flex-shrink-0"
>
    {loading ? '...' : '▶ Spotify'}
</button>
        </div>
    )
}