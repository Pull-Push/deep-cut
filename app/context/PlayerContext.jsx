"use client"

import { createContext, useContext, useState } from "react"

const PlayerContext = createContext(null)

export function PlayerProvider({children}){
    const [ deviceId, setDeviceId ] = useState(null)
    const [ currentTrack, setCurrentTrack ] = useState(null)
    const [ isPaused, setIsPaused ] = useState(true)
    
    async function playTrack(uri, uris=null, offset=0) {
        if(!deviceId) return;

        const body = uris
            ? { uris, offset: { position: offset } }
            : { uris: [uri] };

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        
        method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${await getToken()}`
            },
            body: JSON.stringify(body),
        });
    }

    async function getToken(){
        const response = await fetch('/api/token')
        const data = await response.json()
        return data.accessToken
    }

    return(
        <PlayerContext.Provider
        value={{
            deviceId,
            setDeviceId,
            currentTrack,
            setCurrentTrack,
            isPaused,
            setIsPaused,
            playTrack
        }}
        >{children}
        </PlayerContext.Provider>
    )
}

export function usePlayer(){
    return useContext(PlayerContext)
}
