import Link from "next/link"
import Image from "next/image"
import { getTrackInfo } from "@/lib/lastfm"
    

function formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default async function TrackPage({searchParams}){
    const resolved = await searchParams
    const [single, artist] = [resolved.track, resolved.artist]



    if(!artist || !single){
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

    const trackInfo = await getTrackInfo(artist, single)
    
    
    if(!trackInfo){
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
        <div className="flex flex-col sm:flex-row items-start gap-8 mb-12">
            <Image
                src={trackInfo.track.album.image?.[3]?.['#text'] || "/placeholder.png"}
                alt={trackInfo.track.album.title}
                width={200}
                height={200}
                className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-3 flex-1">
                <h1 className="text-4xl font-bold text-white">{trackInfo.track.name}</h1>
                <Link href={`/discover?q=${encodeURIComponent(typeof trackInfo.track.artist === 'object' ? trackInfo.track.artist.name : trackInfo.track.album.artist)}`}>
                    <h2 className="text-2xl font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                        {typeof trackInfo.track.album.artist === 'object'
                            ? trackInfo.track.artist.name
                            : trackInfo.track.album.artist}
                    </h2>
                </Link>
                    <h2>{formatDuration(parseInt(trackInfo.track.duration))}</h2>
                <div className="flex gap-4 text-sm text-zinc-400">
                    <span>{parseInt(trackInfo.track.listeners).toLocaleString()} listeners</span>
                    <span>{parseInt(trackInfo.track.playcount).toLocaleString()} plays</span>
                </div>
                {trackInfo.track.toptags?.tag?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {trackInfo.track.toptags.tag.slice(0, 5).map((tag, index) => (
                            <span key={index} className="text-xs bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>

{trackInfo.track.album?.title && (
    <section className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">From the album</h2>
        <Link href={`/album?artist=${encodeURIComponent(trackInfo.track.artist.name)}&album=${encodeURIComponent(trackInfo.track.album.title)}`}>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors">
                <Image src={trackInfo.track.album.image?.[3]?.['#text'] || "/placeholder.png"} alt={trackInfo.track.album.title} width={48} height={48} className="rounded-md"/>
                <p className="text-white text-sm">{trackInfo.track.album.title}</p>
            </div>
        </Link>
    </section>
)}
    </div>
)
}