import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("spotify_access_token")

    if(!token){
        return Response.json({error: "Not Authenticated"}, {status: 401})
    }

    return Response.json({accessToken: token.value})
}