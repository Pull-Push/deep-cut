"use client";

import { useRouter } from "next/navigation";

export default function SignInButton(){
    const router = useRouter()

    function handleSignIn(){
        router.push("/api/auth/login")
    }

    return (
        <button onClick={handleSignIn} className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black hover:bg-green-400 transition-colors">
            Sign in with Spotify
        </button>
    )
}