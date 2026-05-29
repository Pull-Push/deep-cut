import Link from "next/link";
import Image from "next/image";
import AlbumCard from "@/app/components/AlbumCard";
import ArtistCard from "@/app/components/ArtistCard";
import TrackRow from "@/app/components/TrackRow";
import LabelCard from "@/app/components/LabelCard";
import { searchDiscogsLabel, searchDiscogsArtist } from "@/lib/discogs";
import { searchAlbum, searchTrack, searchArtist, getTagTopArtists, getTagTopAlbums } from "@/lib/lastfm";

export const dynamic = 'force-dynamic';
const featuredGenres = ['punk rock', 'indie', 'hip-hop', 'jazz', 'metal', 'alternative', 'electronic', 'folk', 'r&b', 'hardcore', 'pop punk', 'post-hardcore', 'classic rock', 'blues', 'reggae'];
function getRandomGenre() {
    return featuredGenres[Math.floor(Math.random() * featuredGenres.length)];
}


export default async function DiscoverPage({ searchParams}) {
    const resolved = await searchParams;
    const query = resolved.q
    const randomGenre = getRandomGenre()
    
if(!query){
    const [topArtists, topAlbums] = await Promise.all([
        getTagTopArtists(randomGenre),
        getTagTopAlbums(randomGenre),
    ]);

    return (
        <div className="min-h-screen px-6 pt-28 pb-32" style={{
            backgroundImage: "url('/bg-blank.PNG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <h1 className="text-2xl font-bold text-white mb-2">
                Featured Genre: <span className="text-purple-400 capitalize">{randomGenre}</span>
            </h1>
            <p className="text-zinc-400 text-sm mb-8">Use the search bar to discover artists, albums, tracks and labels</p>

            {/* Featured Artists */}
            {topArtists?.topartists?.artist?.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Top Artists</h2>
                    <div className="flex flex-wrap gap-3">
                        {topArtists.topartists.artist.slice(0, 15).map((artist) => (
                            <Link key={artist.url} href={`/discover?q=${encodeURIComponent(artist.name)}`}>
                                <span className="text-sm bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors">
                                    {artist.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Albums */}
            {topAlbums?.albums?.album?.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Top Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {topAlbums.albums.album.slice(0, 10).map((album) => (
                            <Link
                                key={album.url}
                                href={`/album?artist=${encodeURIComponent(album.artist.name)}&album=${encodeURIComponent(album.name)}`}
                            >
                                <div className="flex flex-col gap-2 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer">
                                    <Image
                                        src={album.image?.[3]?.['#text'] || "/placeholder.png"}
                                        alt={album.name}
                                        width={200}
                                        height={200}
                                        className="w-full aspect-square object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-white font-medium truncate">{album.name}</p>
                                    <p className="text-xs text-zinc-400">{album.artist.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
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