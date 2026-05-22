"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LabelCard({ label }){

    const router = useRouter()
    return(
        <div onClick={() => router.push(`/label/${label.id}`)} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
            <Image src={label.cover_image?.includes('spacer') ?  "/placeholder.png" : label.cover_image || "/placeholder.png"} alt={label.title} width={150} height={150} className="w-36 h-36 object-cover rounded-lg"/>
            <p className="text-sm text-white font-medium text-center truncate w-full">{label.title}</p>
        </div>
    )
}