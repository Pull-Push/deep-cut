import Image from "next/image";
import { searchSpotify } from "@/lib/spotify";
import TrackRow from "@/app/components/TrackRow";

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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.albums.items.map((album) => (
                        <div key={album.id} className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer">
                            <Image src={album.images[1]?.url ?? "/placeholder.png"} alt={album.name} width={300} height={300} className="w-full aspect-square object-cover rounded-lg"/>
                            <p className="text-sm text-white font-medium">{album.name}</p>
                            <p className="text-xs text-zinc-400">{album.artists[0].name}</p>
                            <p className="text-xs text-zinc-500">{album.release_date.slice(0,4)}</p>
                        </div>
                    ))}
                </div>
            </section>
                {/* TRACKS */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Tracks</h2>
                    <div className="flex flex-col gap-2">
                        {results.tracks.items.map((track, index) => (
                            <TrackRow 
                                key={track.id} 
                                track={track} 
                                index={index}
                                allTracks={results.tracks.items}
                            />
                        ))}
                    </div>
                </section>
        </div>
    )
}