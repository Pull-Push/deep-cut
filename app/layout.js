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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md px-6 py-4">
          <div className="flex flex-col gap-2">
            {/* Main row */}
            <div className="flex items-center justify-between">
              {/* Left — Logo */}
              <Link href="/" className="text-white font-bold tracking-wide hover:text-purple-400 transition-colors flex-shrink-0">
                Deep Cut
              </Link>
              {/* Center — Search */}
              <div className="hidden lg:block w-72">
                <SearchBar />
              </div>
              {/* Right — Links */}
              <div className="flex items-center gap-6">
                <Link href="/discover" className="text-sm text-zinc-300 hover:text-white transition-colors">Discover</Link>
              </div>
            </div>
            {/* Mobile search */}
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
