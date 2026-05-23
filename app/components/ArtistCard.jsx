"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ArtistCard({ artist }){

    const router = useRouter()
    return(
        <div onClick={() => router.push(`/artist/${artist.id}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <Image src={artist.cover_image?.includes('spacer') ? "/placeholder.png" : artist.cover_image} alt={artist.title} width={300} height={300} className="w-full aspect-square object-cover rounded-xl"/>
            <p className="text-sm text-white font-medium text-center truncate w-full"> {artist.title.replace(/\s*\(\d+\)$/, '')} </p>
        </div>
    )
}