export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
          dev ai
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          dev ai
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          A clean starting point for building AI-powered products and experiences.
        </p>
      </div>
    </main>
  );
}
