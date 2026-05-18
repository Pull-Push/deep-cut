import { getUserTopTracks } from "@/lib/spotify";

export async function GET(request) {
    const url = new URL(request.url);
    const timeRange = url.searchParams.get("time_range") ?? "medium_term"

    const data = await getUserTopTracks(timeRange)

    if(!data) {
        return Response.json({error: "Failed to fetch top tracks"}, {status:500})
    }

    return Response.json(data)
}