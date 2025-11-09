export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background">
      <h1 className="text-4xl font-bold mb-4">Welcome to Orbit</h1>
      <p className="text-muted-foreground max-w-xl mb-8">
        Discover events that match your interests, connect with friends, and let Orbit surprise you with unforgettable experiences.
      </p>
      <div className="flex gap-3">
        <a
          href="/signup"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
        >
          Sign up free
        </a>
        <a
          href="/"
          className="px-4 py-2 rounded-md border border-input hover:bg-accent hover:text-accent-foreground"
        >
          Explore demo
        </a>
      </div>
    </main>
  )
}
