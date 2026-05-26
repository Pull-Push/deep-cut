import { getTagInfo, getTagTopArtists, getTagTopAlbums } from "@/lib/lastfm";

export default async function GenrePage({ params }) {
    const { name } = await params;
    
    const [tagInfo, topArtists, topAlbums] = await Promise.all([
        getTagInfo(name),
        getTagTopArtists(name),
        getTagTopAlbums(name),
    ]);

    // console.log("tagInfo", tagInfo?.tag);
    // console.log("topArtists", topArtists?.topartists?.artist?.[0]);
    // console.log("topAlbums", topAlbums?.topalbums?.album?.[0]);
    // console.log('topAlbums raw', topAlbums)
    console.log('album sample',  topAlbums?.albums?.album?.[0])

    return (
        <div className="pt-28 px-6 text-white">
            <p>Genre: {name}</p>
        </div>
    );
}