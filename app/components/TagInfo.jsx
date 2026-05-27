"use client"
import { useState } from "react"

function formatContent(text) {
    if (!text) return '';
    return text
        .replace(/<a[^>]*last\.fm[^>]*>.*?<\/a>\.?/gi, '')  // strip the "Read more on Last.fm" link
        .replace(/User-contributed text.*$/i, '')           // strip the trailing license notice
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n/g, '<br/>')
        .replace(/<a /g, '<a class="text-purple-400 hover:text-purple-300 underline" ')
        .trim();
}

export default function TagInfo({ summary, content }) {
    const [expanded, setExpanded] = useState(false)
    console.log(content)
    return (
        <div className="w-full">
            <div 
                className="text-zinc-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ 
                    __html: expanded 
                        ? `<p class="mb-4">${formatContent(content)}</p>`
                        : `${formatContent(summary)}...`
                }} 
            />
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-purple-400 hover:text-purple-300 text-xs mt-2 transition-colors"
            >
                {expanded ? 'Show Less' : 'Show More'}
            </button>
        </div>
    )
}