import { Geist, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SignInButton from "@/app/components/SignInButton";
import SignOutButton from "@/app/components/SignOutButton";
import SearchBar from "@/app/components/SearchBar";
import { getUser } from "@/lib/spotify";
import { PlayerProvider } from "@/app/context/PlayerContext";
import Player from "@/app/components/Player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets:["latin"],
  weight:["700", "800"]
});


export const metadata = {
  title: "Deep Cut",
  description: "Discover music by label, genre, and beyond",
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html lang="en" className={`${geistSans.variable} ${barlowCondensed.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        <PlayerProvider>
          {/* NAV BAR - ONLY WHEN USER IS LOGGED IN*/}
      {user && (
        <nav className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md">
          <Link href={'/home'} className="text-white font-bold tracking-wide hover:text-purple-400 transition-colors">Deep Cut</Link>
              <div className="flex flex-col items-center gap-2">
                {/* Top row — always visible */}
                <div className="flex items-center justify-between gap-8">
                  <Link href="/home" className="text-sm text-zinc-300 hover:text-white transition-colors">Home</Link>
                    <div className="col-span-2 hidden lg:block w-72">
                      <SearchBar />
                    </div>
                  <Link href="/discover" className="text-sm text-zinc-300 hover:text-white transition-colors">Discover</Link>
                </div>
                {/* Bottom row — search bar on small screens only */}
                  <div className="block lg:hidden w-full">
                    <SearchBar />
                  </div>
              </div>
          <div className="flex items-center justify-end gap-3">
            <span className="text-sm text-zinc-300">{user.display_name}</span>
            <SignOutButton />
          </div>
        </nav>
      )}
        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* PLAYER BAR - ONLY WHEN USER IS LOGGED IN */}
        {user && ( 
          <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-6 py-4 bg-zinc-900 border-t border-zinc-800">
            <Player />
          </div>
          )}
          </PlayerProvider>
        </body>
    </html>
  );
}
