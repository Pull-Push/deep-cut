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


    return(
        <form onSubmit={handleSearch} className="w-full">
            <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an artist, album, or label..."
            className="w-full rounded-full bg-black/50 px-6 py-4 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
            />
        </form>
    );
}