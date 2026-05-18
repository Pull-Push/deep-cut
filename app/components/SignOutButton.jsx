"use client"

import { useRouter } from "next/navigation";

export default function SignOutButton(){
    const router = useRouter()

    function handleSignOut(){
        window.location.href = "/api/auth/logout"
    }

    return (
        <button onClick={handleSignOut} className="rounded-full bg-zinc-700 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-600 transition-colors">
            Log Out
        </button>
    )
}