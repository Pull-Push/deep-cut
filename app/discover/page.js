import Link from "next/link";
import AlbumCard from "@/app/components/AlbumCard";
import ArtistCard from "@/app/components/ArtistCard";
import TrackRow from "@/app/components/TrackRow";
import LabelCard from "@/app/components/LabelCard";
import {searchAlbum, searchTrack, searchArtist } from "@/lib/lastfm";
import { searchDiscogsLabel, searchDiscogsArtist } from "@/lib/discogs";

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

    const [artists, albums, tracks, labels, lastFmArtists] = await Promise.all([searchDiscogsArtist(query), searchAlbum(query), searchTrack(query), searchDiscogsLabel(query), searchArtist(query)])
    const artistSuggestion = artists?.length === 0 ? lastFmArtists?.results?.artistmatches?.artist?.[0]?.name ?? null : null;
    if(!artists && !albums && !tracks && !labels){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Something went wrong. Please try again</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen px-6 pt-28 pb-32" style={{ backgroundImage: "url('/bg-blank.PNG')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <h1 className="text-2xl font-bold text-white mb-8">
                Results for <span className="text-purple-400"> &quot;{query}&quot; </span>
            </h1>
            {artists && artists.length === 0 && artistSuggestion && (
                <p className="text-zinc-400 text-sm">
                    No artists found. Did you mean{" "}
                        <Link href={`/discover?q=${encodeURIComponent(artistSuggestion)}`} className="text-purple-400 hover:text-purple-300 transition-colors">
            {artistSuggestion}
        </Link>
        ?
    </p>
)}
            {/* ARTISTS */}
            {artists && (
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Artists</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {artists.slice(0, 10).map((artist) =>(
                            <ArtistCard key={artist.id} artist={artist} />
                        ))}
                    </div>
                </section>
            )}
            {/* ALBUMS */}
            {albums && (
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {albums.results.albummatches.album.slice(0,10).map((album) =>(
                            <AlbumCard key={album.url} album={album} />
                        ))}
                    </div>
                </section>
            )}
            {/* TRACKS */}
            {tracks && (
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Tracks</h2>
                    <div className="flex flex-col gap-2">
                    {tracks.results.trackmatches.track.slice(0, 10).map((track, index) => (
                        <TrackRow key={track.url} track={track} index={index} />
                    ))}
                    </div>
                </section>
            )}
            {/* LABELS */}
            {labels && (
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Labels</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {labels.slice(0,10).map((label) => (
                            <LabelCard key={label.id} label={label} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}