"use client"

import Image from "next/image"
import { usePlayer } from "@/app/context/PlayerContext"
import { useRouter } from "next/navigation";

export default function TrackRow({ track, index }) {
    const { playTrack } = usePlayer();
    const router = useRouter()


    return(
        <div onClick={() => router.push(`/track?artist=${track.artist}&track=${track.name}`)} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <span className="text-zinc-500 text-sm w-4 text-right">{index+1}</span>
            <Image src={"/placeholder.png"} alt={track.name} width={48} height={48} className="rounded-md"/>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{track.name}</p>
                <p className="text-xs text-zinc-400 truncate">{track.artist}</p>
            </div>
            <div>
                <button onClick={(e) => {e.stopPropagation()}}>Play</button>
            </div>
                
        </div>
    )
}