import Link from "next/link";
import Image from "next/image";
import { getAlbumInfo } from "@/lib/lastfm";
import TrackRow from "@/app/components/TrackRow";

export default async function AlbumPage({searchParams}){
    const resolved = await searchParams
    const [album, artist] = [resolved.album, resolved.artist]

        if(!album || !artist ){
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

    
    const albumInfo = await getAlbumInfo(artist, album)

        if(!albumInfo){
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
        {/* Album Header */}
        <div className="flex items-start gap-8 mb-12">
            <Image
                src={albumInfo.album.image?.[3]?.['#text'] || "/placeholder.png"}
                alt={albumInfo.album.name}
                width={200}
                height={200}
                className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-3 flex-1">
                <h1 className="text-4xl font-bold text-white">{albumInfo.album.name}</h1>
                <Link href={`/discover?q=${encodeURIComponent(typeof albumInfo.album.artist === 'object' ? albumInfo.album.artist.name : albumInfo.album.artist)}`}>
                    <h2 className="text-2xl font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                        {typeof albumInfo.album.artist === 'object'
                            ? albumInfo.album.artist.name
                            : albumInfo.album.artist}
                    </h2>
                </Link>
                <div className="flex gap-4 text-sm text-zinc-400">
                    <span>{parseInt(albumInfo.album.listeners).toLocaleString()} listeners</span>
                    <span>{parseInt(albumInfo.album.playcount).toLocaleString()} plays</span>
                </div>
                {albumInfo.album.tags?.tag?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {albumInfo.album.tags.tag.slice(0, 5).map((tag, index) => (
                            <span key={index} className="text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Tracklist */}
        {albumInfo.album.tracks?.track?.length > 0 && (
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Tracklist</h2>
                <div className="flex flex-col gap-2">
                    {albumInfo.album.tracks.track.map((track, index) => (
                        <TrackRow key={track.url} track={track} index={index} />
                    ))}
                </div>
            </section>
        )}
    </div>
)
}