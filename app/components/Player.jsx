"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Script from "next/script"
import { usePlayer } from "@/app/context/PlayerContext"

export default function Player(){
    const [player, setPlayer] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [accessToken, setAccessToken] = useState(null)
    const {deviceId, setDeviceId, currentTrack, setCurrentTrack, isPaused, setIsPaused } = usePlayer();


    useEffect(() =>{
        async function fetchToken() {
            const response = await fetch("/api/token")
    
            if(!response.ok){
                return
            }
    
            const data = await response.json()
            setAccessToken(data.accessToken)
        }
        fetchToken()
    },[])

    useEffect(() =>{
        if(!accessToken) return;

        const initializePlayer = ()=> {
            const spotifyPlayer = new window.Spotify.Player({
                name: "Deep Cut",
                getOAuthToken: (cb) => cb(accessToken),
                volume:0.5,
            });
        
        spotifyPlayer.addListener("ready", ({device_id}) => {
            console.log('Ready with device ID', device_id);
            setPlayer(spotifyPlayer);
            setDeviceId(device_id)
        });

        spotifyPlayer.addListener("not_ready", ({device_id}) =>{
            console.log('Device ID has gone offline', device_id);
        });

        spotifyPlayer.addListener("player_state_changed", (state) =>{
            if(!state) return;
            setCurrentTrack(state.track_window.current_track);
            setIsPaused(state.paused);
            setIsActive(true)
        });

        spotifyPlayer.connect();
        }

        if(window.Spotify){
            initializePlayer();
        }else{
            window.onSpotifyWebPlaybackSDKReady = initializePlayer;
        }
    },[accessToken])

    return(
        <>
            <Script src="https://sdk.scdn.co/spotify-player.js" strategy="afterInteractive" />
            <div className="flex items-center justify-between w-full">
                {/* Left - Track Info */}
                <div className="flex items-center gap-3 w-1/3">
                {currentTrack? (
                    <>
                    <Image src={currentTrack.album.images[0].url} alt={currentTrack.name} width={48} height={48} className="rounded-md"/>
                    <div className="flex flex-col min-w-0">
                        <p className="text-sm text-white font-medium truncate">{currentTrack.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{currentTrack.artists[0].name}</p>
                    </div>
                    </>
                ):(
                    <p className="text-zinc-500 text-sm">No Track Playing</p>
                )}
                </div>
                {/* Center - Playback Controls */}
                <div className="flex items-center gap-4">
                    <button onClick={() => player?.previousTrack()} className="text-zinc-400 hover:text-white transition-colors">⏮</button>
                    <button onClick={() => player?.togglePlay()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform">
                        {isPaused? "▶" : "⏸"}
                    </button>
                    <button onClick={() => player?.nextTrack()} className="text-zinc-400 hover:text-white transition-colors">⏭</button>
                </div>
                {/* Right - Volume Controls - later... */}
                <div className="w-1/3">

                </div>
            </div>
        </>
    )
}