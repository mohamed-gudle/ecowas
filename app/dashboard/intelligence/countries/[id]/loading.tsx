export default function CountryDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-64 md:h-80 bg-muted" />
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 -mt-16 relative z-10 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-card rounded-xl border" />
          ))}
        </div>
        <div className="h-12 bg-muted rounded-lg w-96 mb-6" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-card rounded-xl border" />
          ))}
        </div>
      </div>
    </div>
  )
}
