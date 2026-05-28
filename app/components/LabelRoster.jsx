'use client'

import Image from "next/image"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function normalizeFormat(format) {
    if (!format) return 'Other';
    if (/LP|12"|10"|7"/.test(format)) return 'Vinyl';
    if (/CD/.test(format)) return 'CD';
    if (/File|AAC|FLAC|MP3|WAV/.test(format)) return 'Digital';
    if (/Cass/.test(format)) return 'Cassette';
    return 'Other';
}

export default function LabelRoster({ releases, page, id, pagination }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const formatFromUrl = searchParams.get('format')?.split(',') ?? ['All'];
    const [filterFormat, setFilterFormat] = useState(formatFromUrl);

    function toggleFormat(format) {
        let newFormats;
        if (format === 'All') {
            newFormats = ['All'];
        } else {
            const withoutAll = filterFormat.filter(f => f !== 'All');
            newFormats = withoutAll.includes(format)
                ? withoutAll.filter(f => f !== format)
                : [...withoutAll, format];
            if (newFormats.length === 0) newFormats = ['All'];
        }
        setFilterFormat(newFormats);
        const params = new URLSearchParams(searchParams);
        if (newFormats.includes('All')) {
            params.delete('format');
        } else {
            params.set('format', newFormats.join(','));
        }
        params.set('page', '1'); // reset to page 1 on filter change
        router.push(`/label/${id}?${params.toString()}`);
    }

    function filterFormats(releases) {
        if (filterFormat.includes('All')) return releases;
        return releases.filter(
            (release) => filterFormat.includes(normalizeFormat(release.format))
        );
    }

    const visibleReleases = filterFormats(releases);

    return (
        <div>
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 mb-6">
                {['All', 'Vinyl', 'CD', 'Cassette', 'Digital', 'Other'].map((format) => (
                    <button
                        key={format}
                        onClick={() => toggleFormat(format)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                            filterFormat.includes(format)
                                ? 'bg-purple-600 text-white'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                    >
                        {format}
                    </button>
                ))}
            </div>

            {/* Releases */}
            <section>
                <h2 className="text-lg font-semibold text-zinc-300 mb-4">
                    Releases {!filterFormat.includes('All') && `— ${filterFormat.join(', ')}`}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {visibleReleases.map((album, index) => (
                        <Link href={`/release/${album.id}`} key={`${page}-${index}`}>
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
                                <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">{normalizeFormat(album.format)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                    {page > 1 && (
                        <Link href={`/label/${id}?page=${page - 1}&${searchParams.get('format') ? `format=${searchParams.get('format')}` : ''}`} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm">
                            ← Prev
                        </Link>
                    )}
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === pagination.pages || Math.abs(p - page) <= 2)
                        .map((p, idx, arr) => (
                            <div key={p} className="flex items-center gap-2">
                                {idx > 0 && arr[idx - 1] !== p - 1 && (
                                    <span className="text-zinc-500 px-2">...</span>
                                )}
                                <Link
                                    href={`/label/${id}?page=${p}&${searchParams.get('format') ? `format=${searchParams.get('format')}` : ''}`}
                                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                        p === page
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                    }`}
                                >
                                    {p}
                                </Link>
                            </div>
                        ))
                    }
                    {page < pagination.pages && (
                        <Link href={`/label/${id}?page=${page + 1}&${searchParams.get('format') ? `format=${searchParams.get('format')}` : ''}`} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm">
                            Next →
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}