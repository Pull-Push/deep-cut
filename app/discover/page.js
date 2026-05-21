import Image from "next/image";
import { searchSpotify } from "@/lib/spotify";
import AlbumCard from "@/app/components/AlbumCard";
import ArtistCard from "@/app/components/ArtistCard";
import TrackRow from "@/app/components/TrackRow";
import { searchDiscogs, searchDiscogsLabel } from "@/lib/discogs";
import { getArtist } from "@/lib/lastfm";

export default async function DiscoverPage({ searchParams}) {
    const resolved = await searchParams;
    const query = resolved.q
    if(!query){
        return(
            <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{
                backgroundImage: "url('/bg-blank.PNG')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <p className="text-zinc-400 text-lg">Search for an artist, album, or label to get started</p>
            </div>
        ) 
    }
    // const results = await searchSpotify(query);
    const discogResults = await searchDiscogsLabel(query);
    console.log(discogResults)
    // console.log('discog results', discogResults.results)
    
    // const lastfmResults = await getArtist(query)
    // console.log('lastfm results', lastfmResults.artist.tags)

    // if(!lastfmResults){
    //     return(
    //         <div className="flex min-h-screen items-center justify-center">
    //             <p className="text-zinc-400">Something went wrong. Please try again.</p>
    //         </div>
    //     )
    // }

    return(
        <div className="min-h-screen px-6 pt-28 pb-32" style={{ backgroundImage: "url('/bg-blank.PNG')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <h1 className="text-2xl font-bold text-white mb-8">
                Results for <span className="text-purple-400"> &quot;{query}&quot; </span>
            </h1>
            <div className="">
                {discogResults.map((result, index) =>(
                    <div key={index}>
                        <h2>{result.title}</h2>
                        <p>{result.type}</p>
                        {result.thumb ? (

                            <Image src={"" ? "/placeholder.png" : result.thumb} alt={result.title} width={100} height={100}></Image>
                        ):(
                            <Image src={"/placeholder.png"} alt={result.title} width={100} height={100}></Image>

                        )
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}