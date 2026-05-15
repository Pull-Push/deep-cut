import Image from "next/image";
import { searchSpotify } from "@/lib/spotify";

function formatDuration(ms){
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms%60000) /1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export default async function SearchPage({ searchParams}) {
    const resolved = await searchParams;
    const query = resolved.q
    if(!query){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Enter a search term to get started</p>
            </div>
        )
    }
    const results = await searchSpotify(query);
    if(!results){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Something went wrong. Please try again.</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen px-6 pt-28 pb-32">
            <h1 className="text-2xl font-bold text-white mb-8">
                Results for <span className="text-purple-400"> &quot;{query}&quot; </span>
            </h1>

            {/* ARTISTS */}
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.artists.items.map((artist) =>(
                            <div key={artist.id} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
                                <Image src={artist.images[1]?.url ?? "/placeholder.png"} alt={artist.name} width={300} height={300} className="w-full aspect-square object-cover rounded-full"/>
                                <p className="text-sm text-white font-medium text-center"> {artist.name} </p>
                            </div>
                    ))}
                </div>
            </section>
            {/* ALBUMS */}
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grind-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.albums.items.map((album) => (
                        <div key={album.id} className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
                            <Image src={album.images[1]?.url ?? "/placeholder.png"} alt={album.name} width={300} height={300} className="w-full aspect-square object-cover rounded-lg"/>
                            <p className="text-sm text-white font-medium">{album.name}</p>
                            <p className="text-xs text-zinc-400">{album.artists[0].name}</p>
                            <p className="text-xs text-zinc-500">{album.release_date.slice(0,4)}</p>
                        </div>
                    ))}
                </div>
                {/* TRACKS */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Tracks</h2>
                    <div className="flex flex-col gap-2">
                        {results.tracks.items.map((track, index) =>(
                            <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
                                {/* Track Number */}
                                <span className="tetx-zinc-500 text-sm w-4 text-right">{index+1}</span>
                                {/*  Album Art */}
                                <Image src={track.album.images[1]?.url ?? "/placeholder.png"} alt={track.album.name} width={48} height={48} className="rounded-md"/>
                                {/* Track Info */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium truncate">{track.name}</p>
                                    <p className="text-xs text-zinc-400 truncate">{track.artists[0].name} · {track.album.name}</p>
                                </div>
                                {/* Explicit Badge */}
                                {track.explicit && (
                                    <span className="text-xs text-zinc-400 bg-zinc-700 px-1.5 py-0.5 rounded">E</span>
                                )}
                                {/* Duration */}
                                <span className="text-xs text-zinc-400">{formatDuration(track.duration_ms)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    )

}