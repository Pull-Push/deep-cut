"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AlbumCard({ album }){

    const router = useRouter()
    return(
        <div onClick={() => router.push(`/discover?q=${album.name}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <Image src={album.images[1]?.url ?? "/placeholder.png"} alt={album.name} width={300} height={300} className="w-full aspect-square object-cover rounded-lg"/>
            <p className="text-sm text-white font-medium text-center"> {album.name} </p>
            <p className="text-xs text-zinc-400">{album.artists[0].name}</p>
            <p className="text-xs text-zinc-500">{album.release_date.slice(0, 4)}</p>
        </div>
    )
}