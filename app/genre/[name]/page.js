import Image from "next/image";
import Link from "next/link";
import { getTagInfo, getTagTopArtists, getTagTopAlbums, getSimilarTags } from "@/lib/lastfm";
import TagInfo from "@/app/components/TagInfo"
export default async function GenrePage({ params }) {
    const { name } = await params;
    
    if(!name){
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

    const [tagInfo, similarTags,topArtists, topAlbums] = await Promise.all([
        getTagInfo(name),
        getSimilarTags(name),
        getTagTopArtists(name),
        getTagTopAlbums(name),
    ]);

    if(!tagInfo){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Something went wrong. Please try again</p>
            </div>
        )
    }

    return (
<div className="min-h-screen px-6 pt-28 pb-32" style={{
        backgroundImage: "url('/bg-blank.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}>
        {/* Artist Header */}
        <div className="flex items-start gap-8 mb-12">
            <div className="flex flex-col gap-3 flex-1">
                <h1 className="text-4xl font-bold text-white">{tagInfo.tag.name}</h1>
                <div className="flex gap-4 text-sm text-zinc-400">
                    <span>{parseInt(tagInfo.tag?.total? tagInfo.tag.total : 0).toLocaleString()} total listeners</span>
                    <span>{parseInt(tagInfo.tag?.reach? tagInfo.tag.reach : 0).toLocaleString()} total reach</span>
                </div>
                <TagInfo summary={tagInfo.tag.wiki.summary} content={tagInfo.tag.wiki.content}/>
            </div>
        </div>

{/* Top Artists + Albums */}
<div className="flex flex-col gap-12 mb-12">
    {/* Top Artists */}
    {topArtists?.topartists?.artist?.length > 0 && (
    <section className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">Top Artists</h2>
        <div className="flex flex-wrap gap-2">
            {topArtists.topartists.artist.map((artist) => (
                <Link key={artist.url} href={`/discover?q=${encodeURIComponent(artist.name)}`}>
                    <span className="text-sm bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors">
                        {artist.name}
                    </span>
                </Link>
            ))}
        </div>
    </section>
)}
    {/* Top Albums */}
    {topAlbums?.albums?.album?.length > 0 && (
    <section className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">Top Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topAlbums.albums.album.map((album) => (
                <Link key={album.url} href={`/album?artist=${encodeURIComponent(album.artist.name)}&album=${encodeURIComponent(album.name)}`}>
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
</div>
    );
}