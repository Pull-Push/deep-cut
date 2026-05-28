# Deep Cut 🎵

**Discover music by label, genre, and beyond.**

[Live Demo](https://deep-cut-chi.vercel.app) · Built with Next.js 15 · Deployed on Vercel

---

## What is Deep Cut?

Deep Cut is a full-stack music discovery web app that lets you explore music the way collectors do — by record label, genre, and release history. Search for an artist, album, track, or label and dig deep into the catalog. Click through from a label to its full roster, from an artist to their discography, from a genre tag to its top albums.

Built as a portfolio project while learning Next.js, shipped in one month.

---

## Features

- **Four-lane search** — Artists, Albums, Tracks, and Labels in one query
- **Fuzzy search suggestion** — "Did you mean Lagwagon?" when results come up empty
- **Artist pages** — Bio, discography, band members, similar artists, genre tags
- **Album pages** — Full tracklist, listener stats, genre tags
- **Track pages** — Duration, album link, multi-platform playback
- **Label pages** — Full roster with pagination and format filtering (Vinyl, CD, Digital, Cassette)
- **Release pages** — Pressing details, tracklist, YouTube videos, community stats
- **Genre pages** — Wiki description, top artists, top albums
- **Multi-platform playback** — One-click links to Spotify, Apple Music, YouTube Music, and Amazon Music
- **Random featured genre** — Discover page surfaces a different genre on every visit
- **Mobile responsive** — Works across all screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Music Metadata | Discogs API |
| Music Discovery | Last.fm API |
| Playback Matching | Spotify Web API (Client Credentials) |

---

## Data Architecture

Deep Cut stitches together three separate APIs into a unified experience:

- **Discogs** — Label rosters, artist profiles, release details, pressing information. The only API that supports label-level browsing and treats every pressing as a distinct catalog item.
- **Last.fm** — Artist bios, album tracklists, genre tags, similar artists, listener stats, and genre wikis. Better fuzzy search matching than Discogs.
- **Spotify** — Used exclusively for track URI matching via the Client Credentials flow (no user OAuth required). When a user clicks a platform button, the app fetches a Spotify URI server-side and generates a direct playback link.

### Why no Spotify OAuth?

Spotify restricted Web Playback SDK access to organizations with 250k+ MAU as of May 2025. Deep Cut uses direct platform deep links instead — no OAuth, no Premium requirement, no user cap. The app is publicly usable by anyone.

---

## Local Setup

### Prerequisites

- Node.js 18+
- Accounts and API keys for Discogs, Last.fm, and Spotify

### Installation

```bash
git clone https://github.com/pull-push/deep-cut
cd deep-cut
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/auth/callback
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_APP_URL=http://127.0.0.1:3000
DISCOGS_TOKEN=your_discogs_personal_access_token
LASTFM_TOKEN=your_lastfm_api_key
```

### Running Locally

```bash
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) — note: use `127.0.0.1` not `localhost` as Spotify rejects the latter.

---

## Project Structure

```
app/
  api/
    spotify/play/    → Server-side Spotify URI lookup
    auth/            → OAuth flow (kept for future use)
  artist/[id]/       → Artist detail page
  album/             → Album detail page
  track/             → Track detail page
  label/[id]/        → Label detail page with pagination + filtering
  release/[id]/      → Release detail page
  genre/[name]/      → Genre tag page
  discover/          → Main search page
  components/        → Shared UI components
lib/
  discogs.js         → Discogs API functions
  lastfm.js          → Last.fm API functions
  spotify.js         → Spotify API functions
```

---

## Key Engineering Decisions

**Server Components by default** — All data fetching happens server-side using Next.js App Router. Client components are used only where interactivity is required (search bar, play buttons, filter controls).

**Parallel data fetching** — `Promise.all()` used throughout to fetch from multiple APIs simultaneously, minimizing page load time.

**Graceful degradation** — Every API call has try/catch error handling. Missing images fall back to placeholders. Missing Last.fm data doesn't break the Discogs experience and vice versa.

**On-demand Spotify matching** — Track URIs are fetched only when a user clicks a play button, via a `/api/spotify/play` route. This avoids making Spotify API calls for every track rendered on the page.

**Disambiguation handling** — Discogs appends numbered suffixes to artist names (e.g. "Epitaph (2)"). These are stripped before display and before passing artist names to Last.fm, which doesn't recognize the suffixes.

---

## Deployment

Deployed on Vercel with zero configuration. Push to `main` triggers automatic deployment.

Production environment variables are set in the Vercel dashboard.

---

## Roadmap

- [ ] User accounts — saved labels, artists, and releases
- [ ] Search history
- [ ] Re-enable Spotify OAuth if API restrictions are lifted
- [ ] Pagination on discover page lanes
- [ ] Collection tracking

---

## License

MIT