"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrackRow({ track, index }) {
    const router = useRouter()
    const artistName = typeof track.artist === 'object' ? track.artist.name : track.artist
    const [isLoading, setIsLoading] = useState(false)

    async function handleSpotify(e) {
        e.stopPropagation();
        setIsLoading(true);
        const response = await fetch(
            `/api/spotify/play?track=${encodeURIComponent(track.name)}&artist=${encodeURIComponent(artistName)}`
        );
        setIsLoading(false);
        if (!response.ok) return;
        const data = await response.json();
        if (data.uri) {
            const trackId = data.uri.split(':')[2];
            window.open(`https://open.spotify.com/track/${trackId}`, 'spotify-player');
        }
    }

    function handleApple(e) {
        e.stopPropagation();
        window.open(`https://music.apple.com/search?term=${encodeURIComponent(`${artistName} ${track.name}`)}`, 'apple-music');
    }

    function handleYouTube(e) {
        e.stopPropagation();
        window.open(`https://music.youtube.com/search?q=${encodeURIComponent(`${artistName} ${track.name}`)}`, 'youtube-music');
    }

    function handleAmazon(e) {
        e.stopPropagation();
        window.open(`https://music.amazon.com/search/${encodeURIComponent(`${artistName} ${track.name}`)}`, 'amazon-music');
    }

    return (
    <div onClick={() => router.push(`/track?artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(track.name)}`)} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
        {/* Track info row */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className="text-zinc-500 text-sm w-4 text-right flex-shrink-0">{index+1}</span>
            <Image src={"/placeholder.png"} alt={track.name} width={48} height={48} className="rounded-md flex-shrink-0"/>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{track.name}</p>
                <p className="text-xs text-zinc-400 truncate">{artistName}</p>
            </div>
        </div>
        {/* Platform buttons row */}
        <div className="flex items-center gap-2 flex-shrink-0 pl-14 sm:pl-0">
            <button onClick={handleSpotify} disabled={isLoading} className="text-xs bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white px-3 py-1 rounded-full transition-colors">
                {isLoading ? '...' : 'Spotify'}
            </button>
            <button onClick={handleApple} className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-full transition-colors">
                Apple
            </button>
            <button onClick={handleYouTube} className="text-xs bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-colors">
                YT Music
            </button>
            <button onClick={handleAmazon} className="text-xs bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors">
                Amazon
            </button>
        </div>
    </div>
)
}