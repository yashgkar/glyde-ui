export function StatsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="1.73 KB" label="Gzipped" />
        <StatCard value="0" label="Dependencies" />
        <StatCard value="41" label="Tests passing" />
        <StatCard value="100%" label="TypeScript" />
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <p className="text-2xl lg:text-3xl font-bold gradient-text-subtle">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
