"use client"

import { useState } from "react"
import Image from "next/image"

export default function TopArtists({ initialData }){
    
    const[ timeRange, setTimeRange ] = useState("medium_term")
    const [artists, setArtists ] = useState(initialData?.items ?? [])
    const [loading, setLoading ] = useState(false)

    async function handleTimeRange(range) {
        if(range === timeRange ) return

        setLoading(true)
        setTimeRange(range)

        const response = await fetch(`/api/top-artists?time_range=${range}`)
        const data = await response.json();

        setArtists(data.items ?? [])
        setLoading(false)
    }
    return (
        <div>
            {/* HEADER WITH TOGGLE BUTTONS */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-zinc-300">Top Artists</h2>
                    <div className="flex gap-2">
                        {[
                            {label: "4 Weeks", value:'short_term'},
                            {label: "6 Months", value:'medium_term'},
                            {label: "All Time", value:'long_term'},
                        ].map((option) => (
                            <button key={option.value} onClick={() => handleTimeRange(option.value)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${timeRange === option.value ? "bg-purple-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>{option.label}</button>
                        ))}
                    </div>
                </div>
            {/* Artist Grid */}
            {loading ? (
                <div className="flex items-center justify-center h-48">
                    <p className="text-zinc-500 text-sm">Loading...</p>
                </div>
            ):(
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {artists.map((artist) => (
                        <div key={artist.id} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer">
                            <Image src={artist.images[1]?.url ?? "/placeholder.png"} alt={artist.name} width={300} height={300} className="w-full aspect-square object-cover rounded-full"/>
                            <p className="text-sm text-white font-medium text-center truncate w-full">{artist.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}