import SearchBar from "@/app/components/SearchBar";


export default function Home(){
  return(
    <main
  className="flex min-h-screen flex-col justify-center px-24 sm:px-24"
  style={{
    backgroundImage: "url('/bg-blank.PNG')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="flex flex-col items-center gap-6 w-full max-w-lg">
    <div className="text-center">
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
    <SearchBar />
    <button disabled className="cursor-not-allowed opacity-50">Sign In With Spotify</button>
  </div>
</main>
  )
}