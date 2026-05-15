import SearchBar from "@/app/components/SearchBar";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/bg-home.PNG')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl" style={{ marginTop: '32rem'}}>

        {/* Subtitle */}
        <p className="text-zinc-300 text-lg tracking-wide">
          Discover music by label, genre, and beyond
        </p>

        {/* Search bar */}
        <SearchBar />

      </div>
    </main>
  );
}