import { getSpotifyTrackURI } from "@/lib/spotify";

export async function GET(request) {
    const url = new URL(request.url);
    const track = url.searchParams.get("track");
    const artist = url.searchParams.get("artist");

    if (!track || !artist) {
        return Response.json({ error: "Missing track or artist" }, { status: 400 });
    }

    const uri = await getSpotifyTrackURI(track, artist);

    if (!uri) {
        return Response.json({ error: "Track not found on Spotify" }, { status: 404 });
    }

    return Response.json({ uri });
}