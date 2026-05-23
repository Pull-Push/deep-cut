import { getDiscogsArtist } from "@/lib/discogs";
import { getArtist, getSimilarArtists, getArtistTags } from "@/lib/lastfm";


export default async function ArtistPage({ params }) {
    const { id } = await params;
    const discogsArtist = await getDiscogsArtist(id);
    const [lastfmArtist, similarArtists, tags] = await Promise.all([getArtist(discogsArtist.name), getSimilarArtists(discogsArtist.name), getArtistTags(discogsArtist.name)])

    console.log('lastFm Artist', lastfmArtist?.artist?.bio?.summary)
    console.log('similar', similarArtists?.similarartists?.artist?.slice(0,3))
    console.log('tags', tags?.toptags?.tag?.slice(0,5))

    return (
        <div className="pt-28 px-6 text-white">
            <p>Artist: {discogsArtist.name}</p>
        </div>
    );
}