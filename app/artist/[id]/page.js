import Link from "next/link";
import Image from "next/image";
import { getDiscogsArtist } from "@/lib/discogs";
import { getArtist, getSimilarArtists, getArtistTags, getArtistTopAlbums } from "@/lib/lastfm";
import ArtistBio from "@/app/components/ArtistBio";

function deduplicateAlbums(albums) {
    const seen = new Set();
    return albums.filter((album) => {
        const normalized = album.name
            .toLowerCase()
            .replace(/&amp;/g, 'and')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\s]/g, '')
            .trim();
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
    });
}

export default async function ArtistPage({ params }) {
    const { id } = await params;

    if(!id){
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
    const discogsArtist = await getDiscogsArtist(id);
    const [lastfmArtist, similarArtists, tags, topAlbums] = await Promise.all([getArtist(discogsArtist.name), getSimilarArtists(discogsArtist.name), getArtistTags(discogsArtist.name), getArtistTopAlbums(discogsArtist.name)])

    if(!discogsArtist || !lastfmArtist){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Something went wrong. Please try again</p>
            </div>
        )
    }
const activeMembers = discogsArtist.members?.filter((member) => member.active === true) ?? []
const pastMembers = discogsArtist.members?.filter((member) => member.active === false) ?? []

    return (
    <div className="min-h-screen px-6 pt-28 pb-32" style={{
        backgroundImage: "url('/bg-blank.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}>
        {/* Artist Header */}
        <div className="flex items-start gap-8 mb-12">
            <Image
                src={discogsArtist.images?.[0]?.uri || "/placeholder.png"}
                alt={discogsArtist.name}
                width={200}
                height={200}
                className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-3 flex-1">
                <h1 className="text-4xl font-bold text-white">{discogsArtist.name}</h1>
                <div className="flex gap-4 text-sm text-zinc-400">
                    <span>{parseInt(lastfmArtist.artist?.stats?.listeners).toLocaleString()} listeners</span>
                    <span>{parseInt(lastfmArtist.artist?.stats?.playcount).toLocaleString()} plays</span>
                    {lastfmArtist.artist?.ontour === 1 && (
                        <span className="text-green-400">● On Tour</span>
                    )}
                </div>
                {tags?.toptags?.tag?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.toptags.tag.slice(0, 5).map((tag, index) => (
                            <Link key={index} href={`/genre/${encodeURIComponent(tag.name)}`}>
                                <span key={index} className="text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                                    {tag.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
                <ArtistBio summary={lastfmArtist.artist.bio.summary} content={lastfmArtist.artist.bio.content}/>
                {discogsArtist.urls?.[0] && (
                    <Link href={discogsArtist.urls[0]} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-purple-300">
                        Official Website ↗
                    </Link>
                )}
            </div>
        </div>

{/* Similar Artists + Members */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    {/* Similar Artists */}
    {similarArtists?.similarartists?.artist?.length > 0 && (
        <section>
            <h2 className="text-lg font-semibold text-zinc-300 mb-3">Similar Artists</h2>
            <div className="flex flex-wrap gap-2">
                {similarArtists.similarartists.artist.slice(0, 8).map((similar) => (
                    <Link key={similar.url} href={`/discover?q=${encodeURIComponent(similar.name)}`}>
                        <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors">
                            {similar.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )}

    {/* Members */}
    {(activeMembers.length > 0 || pastMembers.length > 0) && (
        <section>
            {activeMembers.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold text-zinc-300 mb-3">Current Members</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {activeMembers.map((member) => (
                            <Link key={member.id} href={`/artist/${member.id}`}>
                                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors">
                                    {member.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
            {pastMembers.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold text-zinc-300 mb-3">Past Members</h2>
                    <div className="flex flex-wrap gap-2">
                        {pastMembers.map((member) => (
                            <Link key={member.id} href={`/artist/${member.id}`}>
                                <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full hover:bg-zinc-700 transition-colors">
                                    {member.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </section>
    )}
</div>

        {/* Albums */}
        <section>
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {deduplicateAlbums(topAlbums?.topalbums?.album ?? []).map((album) => (
                    <Link
                        key={album.url}
                        href={`/album?artist=${encodeURIComponent(album.artist.name)}&album=${encodeURIComponent(album.name)}`}
                    >
                        <div className="flex flex-col gap-2 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer">
                            <Image
                                src={album.image[3]?.['#text'] || "/placeholder.png"}
                                alt={album.name}
                                width={200}
                                height={200}
                                className="w-full aspect-square object-cover rounded-lg"
                            />
                            <p className="text-sm text-white font-medium truncate">{album.name}</p>
                            <p className="text-xs text-zinc-400">{parseInt(album.playcount)?.toLocaleString()} plays</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    </div>
)
}