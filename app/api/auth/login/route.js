import { getAuthURL } from "@/lib/spotify";

export function GET() {
    const url = getAuthURL();
    return Response.redirect(url);
}