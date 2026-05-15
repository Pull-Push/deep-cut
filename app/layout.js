import { Geist } from "next/font/google";
import "./globals.css";
import SignInButton from "@/app/components/SignInButton";
import { getUser } from "@/lib/spotify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Deep Cut",
  description: "Discover music by label, genre, and beyond",
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        
        {/* NAV BAR */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md">
          <span className="text-white font-bold tracking-wide">Deep Cut</span>
          { user ? (
            <span className="text-sm text-zinc-300">
              {user.display_name}
            </span>
          ):(
            <SignInButton />
          )}
        </nav>

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* PLAYER BAR */}
          <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-6 py-4 bg-zinc-900 border-t border-zinc-800">
            <span className="text-zinc-500 text-sm">No track playing</span>
          </div>
        </body>
    </html>
  );
}
