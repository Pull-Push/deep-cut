"use client"

import Image from "next/image"
import { usePlayer } from "@/app/context/PlayerContext"

export default function TrackRow({ track, index, allTracks }) {
    const { playTrack } = usePlayer();

    function formatDuration(ms){
        const minutes = Math.floor(ms /60000);
        const seconds = Math.floor((ms%60000) /1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return(
        <div onClick={() => playTrack(track.uri, allTracks.map(t => t.uri), index)} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <span className="text-zinc-500 text-sm w-4 text-right">{index+1}</span>
            <Image src={track.album.images[1]?.url ?? "/placeholder.png"} alt={track.album.name} width={48} height={48} className="rounded-md"/>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{track.name}</p>
                <p className="text-xs text-zinc-400 truncate">{track.artists[0].name} - {track.album.name}</p>
            </div>
                {track.explicit && (
                    <span className="text-xs text-zinc-400 bg-zinc-700 px-1.5 py-0.5 rounded">E</span>
                )}
                <span className="text-xs text-zinc-400">{formatDuration(track.duration_ms)}</span>
        </div>
    )
}