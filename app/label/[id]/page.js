import Image from "next/image";
import Link from "next/link";
import { getDiscogsLabelRoster, getDiscogsLabelInfo } from "@/lib/discogs";
import LabelRoster from "@/app/components/LabelRoster";
export const dynamic = 'force-dynamic'

function cleanDiscogsText(text) {
    if (!text) return '';
    return text
        .replace(/\[a=([^\]]+)\]/g, '$1')      // [a=Name] → Name
        .replace(/\[l=([^\]]+)\]/g, '$1')      // [l=Name] → Name
        .replace(/\[url=[^\]]+\]([^\[]+)\[\/url\]/g, '$1')  // [url=...]text[/url] → text
        .replace(/\[[^\]]+\]/g, '')            // catch any remaining brackets
        .trim();
}

function normalizeFormat(format) {
    if (!format) return 'Other';
    if (/LP|12"|10"|7"/.test(format)) return 'Vinyl';
    if (/CD/.test(format)) return 'CD';
    if (/File|AAC|FLAC|MP3|WAV/.test(format)) return 'Digital';
    if (/Cass/.test(format)) return 'Cassette';
    return 'Other';
}

export default async function LabelPage({ params, searchParams }) {
    const { id } = await params
    const resolved = await searchParams
    const page = parseInt(resolved.page) || 1



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
    const [labelInfo, rosterData] = await Promise.all([getDiscogsLabelInfo(id), getDiscogsLabelRoster(id, page)])
    const releases = rosterData?.releases ?? []
    const pagination = rosterData?.pagination

    const formats = [...new Set(releases.map(r => r.format).filter(Boolean))];
    console.log('formats', formats);


    if(!releases || !labelInfo){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Something went wrong. Please try again</p>
            </div>
        )
    }


    return (
    <div key={`label-${id}-page-${page}`} className="min-h-screen px-6 pt-28 pb-32" style={{
        backgroundImage: "url('/bg-blank.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}>
        {/* Label Header */}
        <div className="flex items-start gap-8 mb-12">
            <Image
                src={labelInfo.images?.[0]?.uri || "/placeholder.png"}
                alt={labelInfo.name}
                width={200}
                height={200}
                className="rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold text-white">{labelInfo.name}</h1>
                {labelInfo.parent_label && (
                    <p className="text-zinc-400 text-sm">
                        <Link key={labelInfo.parent_label.id} href={`/label/${labelInfo.parent_label.id}`}>
                        Part of <span className="text-purple-400">{labelInfo.parent_label.name}</span>
                        </Link>
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
                                <Link key={sub.id} href={`/label/${sub.id}`}>
                                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                                    {sub.name}
                                </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
                <LabelRoster releases={releases} page={page} id={id} pagination={pagination}/>
    </div>
)
}