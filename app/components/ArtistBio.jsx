"use client"
import { useState } from "react"

function cleanBio(text) {
    if (!text) return '';
    return text.replace(/<a[^>]*>.*?<\/a>/gi, '').trim();
}

export default function ArtistBio({ summary, content }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="w-full">
            <p className="text-zinc-300 text-sm leading-relaxed">
                {expanded ? cleanBio(content) : `${cleanBio(summary)}...`}
            </p>
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-purple-400 hover:text-purple-300 text-xs mt-2 transition-colors"
            >
                {expanded ? 'Show Less' : 'Show More'}
            </button>
        </div>
    )
}