"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AlbumCard({ album }){

    const router = useRouter()
    return(
        <div onClick={() => router.push(`/album?artist=${album.artist}&album=${album.name}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <Image src={album.image[3]['#text'] || "/placeholder.png"} alt={album.name} width={300} height={300} className="w-full aspect-square object-cover rounded-lg"/>
            <p className="text-sm text-white font-medium text-center"> {album.name} - {album.artist} </p>
        </div>
    )
}