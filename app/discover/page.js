import Image from "next/image";
import { searchSpotify } from "@/lib/spotify";
import AlbumCard from "@/app/components/AlbumCard";
import ArtistCard from "@/app/components/ArtistCard";
import TrackRow from "@/app/components/TrackRow";

export default async function DiscoverPage({ searchParams}) {
    const resolved = await searchParams;
    const query = resolved.q
    if(!query){
        return(
            <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{
                backgroundImage: "url('/bg-blank.PNG')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <p className="text-zinc-400 text-lg">Search for an artist, album, or label to get started</p>
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
        <div className="min-h-screen px-6 pt-28 pb-32" style={{ backgroundImage: "url('/bg-blank.PNG')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <h1 className="text-2xl font-bold text-white mb-8">
                Results for <span className="text-purple-400"> &quot;{query}&quot; </span>
            </h1>

            {/* ARTISTS */}
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.artists.items.map((artist) =>(
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>
            </section>
            {/* ALBUMS */}
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.albums.items.map((album) => (
                        <AlbumCard key={album.id} album={album} />
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