import Image from "next/image";
import Link from "next/link";
import { getDiscogsLabelRoster, getDiscogsLabelInfo } from "@/lib/discogs";

function cleanDiscogsText(text) {
    if (!text) return '';
    return text
        .replace(/\[a=([^\]]+)\]/g, '$1')      // [a=Name] → Name
        .replace(/\[l=([^\]]+)\]/g, '$1')      // [l=Name] → Name
        .replace(/\[url=[^\]]+\]([^\[]+)\[\/url\]/g, '$1')  // [url=...]text[/url] → text
        .replace(/\[[^\]]+\]/g, '')            // catch any remaining brackets
        .trim();
}

function deduplicateReleases(releases){
    const seen = new Set();
    return releases.filter((release) => {
        const key = release.title + release.artist;
        if(seen.has(key)) return false;
        seen.add(key);
        return true
    });
}

export default async function LabelPage({ params }) {
    const { id } = await params
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
    const [labelInfo, releases] = await Promise.all([getDiscogsLabelInfo(id), getDiscogsLabelRoster(id)])

    if(!releases || !labelInfo){
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
        {/* Label Header */}
        <div className="flex items-start gap-8 mb-12">
            <Image
                src={labelInfo.images[0]?.uri || "/placeholder.png"}
                alt={labelInfo.name}
                width={200}
                height={200}
                className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold text-white">{labelInfo.name}</h1>
                {labelInfo.parent_label && (
                    <p className="text-zinc-400 text-sm">
                        Part of <span className="text-purple-400">{labelInfo.parent_label.name}</span>
                    </p>
                )}
                <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
                    {cleanDiscogsText(labelInfo.profile)}
                </p>
                {labelInfo.sublabels?.length > 0 && (
                    <div>
                        <p className="text-zinc-500 text-xs mb-2">Sublabels</p>
                        <div className="flex flex-wrap gap-2">
                            {labelInfo.sublabels.map((sub) => (
                                <span key={sub.id} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                                    {sub.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Releases */}
        <section>
            <h2 className="text-lg font-semibold text-zinc-300 mb-4">Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {deduplicateReleases(releases).map((album) => (
                    <Link href={`/release/${album.id}`} key={album.id}>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer">
                        <Image
                            src={album.thumb?.includes('spacer') ? "/placeholder.png" : album.thumb || "/placeholder.png"}
                            alt={album.title}
                            width={150}
                            height={150}
                            className="aspect-square object-cover rounded-lg"
                        />
                        <p className="text-sm text-white font-medium truncate">{album.title}</p>
                        <p className="text-xs text-zinc-400">{album.artist} · {album.year}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    </div>
)
}