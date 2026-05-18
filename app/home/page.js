import Image from "next/image";
import { getUserProfile, getUserTopArtists, getUserTopTracks, getRecentlyPlayed, getUserPlaylists } from "@/lib/spotify";
import TopArtists from '@/app/components/TopArtists';
import TopTracks from '@/app/components/TopTracks';

export default async function HomePage() {
    const [profile, topArtists, topTracks, recentlyPlayed, playlists ] = await Promise.all([
        getUserProfile(),
        getUserTopArtists(),
        getUserTopTracks(),
        getRecentlyPlayed(),
        getUserPlaylists(),
    ]);

    if(!profile){
        return(
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-400">Please sign in to view your profile</p>
            </div>
        )
    }

    return(
        <div className="min-h-screen px-6 pt-24 pb-32" style={{ backgroundImage: "url('/bg-blank.PNG')", backgroundSize: "cover", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>
            {/* PROFILE CARD */}
            <div className="flex items-center gap-6 mb-6">
                {profile.images[0] && (
                    <Image src={profile.images[0].url} alt={profile.display_name}  width={80} height={80} className="rounded-full"/>
                )}
                <div>
                    <h1 className="text-3xl font-bold text-white">{profile.display_name}</h1>
                    <p className="text-zinc-400 text-sm mt-1">{profile.followers.total.toLocaleString()} followers - {profile.product === "premium" ? "Premium" : "Free"}</p>
                </div>
            </div>
            {/* TOP ARTISTS */}
                <section className="mb-12">
                    <TopArtists initialData = {topArtists} />
                </section>
            {/* TOP TRACKS */}
                <section className="mb-12">
                    <TopTracks initialData={topTracks} />
                </section>
            {/* RECENTLY PLAYED */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Recently Played</h2>
                    {recentlyPlayed ? (
                        <div className="flex flex-col gap-2">
                            {recentlyPlayed.items.map((item, index) => (
                                <div key={`${item.track.id}-${index}`} className="flex items-center gap-4 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer">
                                    <Image src={item.track.album.images[1]?.url ?? "/placeholder.png"} alt={item.track.name} width={48} height={48} className="rounded-md"/>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <p className="text-sm text-white font-medium truncate">{item.track.name}</p>
                                        <p className="text-xs text-zinc-400 truncate">{item.track.artists[0].name} - {item.track.album.name}</p>
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        {new Date(item.played_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ):(
                        <p className="text-zinc-500 text-sm">No recently played tracks found</p>
                        )
                    }
                </section>
                {/* PLAYLISTS */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-300 mb-4">Your Playlists</h2>
                    {playlists ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {playlists.items.map((playlist) => (
                                <div key={playlist.id} className="flex flex-col gap-2 p-3 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer">
                                    <Image src={playlist.images[0]?.url ?? "/placeholder.png"} alt={playlist.name} width={300} height={300} className="w-full aspect-square object-cover rounded-lg"/>
                                    <p className="text-sm text-white font-medium truncate">{playlist.name}</p>
                                    <p className="text-xs text-zinc-400">{playlist.items.total} tracks</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-500 text-sm">No playlists found</p>
                    )
                }
                </section>
        </div>
    )
}