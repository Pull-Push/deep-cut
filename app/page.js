import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col justify-center px-12 sm:px-24"
      style={{
        backgroundImage: "url('/bg-blank.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-start gap-6 w-full max-w-lg">
        <div>
          <h1
            className="text-8xl sm:text-9xl font-bold uppercase tracking-tight"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              background: "linear-gradient(180deg, #e2d9f3 0%, #9b7fd4 50%, #6b46c1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Deep Cut
          </h1>
          <p className="mt-2 text-zinc-300 text-lg tracking-wide">
            Discover music by label, genre, and beyond
          </p>
        </div>
        <Link href="/discover">
          <button className="rounded-full bg-purple-600 px-8 py-3 text-sm font-bold text-white hover:bg-purple-500 transition-colors">
            Start Exploring
          </button>
        </Link>
      </div>
    </main>
  );
}