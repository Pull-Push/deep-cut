import Link from "next/link";
import Image from "next/image";
import { getDiscogsRelease } from "@/lib/discogs";
import TrackRow from "@/app/components/TrackRow";
export default async function ReleasePage({ params }) {
        
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
    const release = await getDiscogsRelease(id)
    if(!release){
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
        {/* Release Header */}
        <div className="flex flex-col sm:flex-row items-start gap-8 mb-12">
            <Image
                src={release.images?.[0]?.uri || "/placeholder.png"}
                alt={release.title}
                width={250}
                height={250}
                className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold text-white">{release.title}</h1>
                <div className="flex gap-2">
                    {release.artists.map((artist) => (
                        <Link key={artist.id} href={`/artist/${artist.id}`}>
                            <span className="text-xl text-purple-400 hover:text-purple-300">{artist.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                    {release.labels.map((label) => (
                        <Link key={label.id} href={`/label/${label.id}`}>
                            <span className="text-sm text-zinc-300 hover:text-white">{label.name}</span>
                        </Link>
                    ))}
                </div>
                <p className="text-zinc-400 text-sm">{release.released_formatted} · {release.genres?.join(', ')} · {release.styles?.join(', ')}</p>
                <div className="flex gap-2 flex-wrap">
                    {release.formats.map((format, index) => (
                        <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                            {format.name} {format.descriptions?.join(', ')}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 text-sm text-zinc-400">
                    <span>{release.community?.have} have</span>
                    <span>{release.community?.want} want</span>
                    {release.community?.rating?.count > 0 && (
                        <span>★ {release.community.rating.average.toFixed(1)}</span>
                    )}
                </div>
            </div>
        </div>

        {/* Tracklist */}
        <section className="mb-12">
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Tracklist</h2>
            <div className="flex flex-col gap-1">
                {release.tracklist
                    .filter(track => track.type_ === 'track').map((track, index) => (
                        <TrackRow key={index} track={{name: track.title, artist: release.artists[0]?.name ?? '',}}index={index}/>
                    ))}
                </div>
            </section>
        {/* Notes */}
        {release.notes && (
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Notes</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl whitespace-pre-line">
                    {release.notes}
                </p>
            </section>
        )}

        {/* Videos */}
        {release.videos?.length > 0 && (
            <section className="mb-12">
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">Videos</h2>
                <div className="flex flex-col gap-2">
                    {release.videos.map((video, index) => (
                        <Link key={index} href={video.uri} target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors">
                                <span className="text-purple-400 text-sm">▶</span>
                                <span className="text-white text-sm">{video.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        )}
    </div>
)
}