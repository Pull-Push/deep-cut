"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SearchBar(){
    const router = useRouter();
    const [ query, setQuery ] = useState("");

    function handleSearch(e){
        e.preventDefault();
        if(!query.trim()) return;
        router.push(`/discover?q=${encodeURIComponent(query)}`);
    }


    return (
    <form onSubmit={handleSearch} className="w-full flex items-center">
        <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an artist, album, or label..."
            className="w-full rounded-l-full border border-purple-300 bg-black/50 px-6 py-2 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
        />
        <button 
            type="submit"
            className="rounded-r-full border border-l-0 border-purple-300 bg-black/50 px-5 py-2 text-white hover:text-purple-400 hover:bg-black/70 transition-colors cursor-pointer flex-shrink-0"
        >
            Search
        </button>
    </form>
);
}