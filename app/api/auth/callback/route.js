import { getAccessToken } from "@/lib/spotify";
import { cookies } from "next/headers";

export async function GET(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const data = await getAccessToken(code)

    const cookieStore = await cookies();

    cookieStore.set("spotify_access_token", data.access_token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        path: "/",
    });

    cookieStore.set("spotify_refresh_token", data.refresh_token, {
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path:"/",
    });

    return Response.redirect(new URL("/", request.url))
}