import { Geist, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SearchBar from "@/app/components/SearchBar";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${barlowCondensed.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md">
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
        </nav>
        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>
        
        </body>
    </html>
  );
}
