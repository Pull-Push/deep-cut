import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();

    cookieStore.delete("spotify_access_token")
    cookieStore.delete("spotify_refresh_token")

    return Response.redirect(new URL(process.env.NEXT_PUBLIC_APP_URL))
}