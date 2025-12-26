"use client"

const impactStats = [
  {
    sdg: 1,
    color: "#E5243B",
    name: "No Poverty",
    actions: 1245,
    description: "Fighting poverty through direct aid",
  },
  {
    sdg: 3,
    color: "#4C9F38",
    name: "Good Health",
    actions: 2341,
    description: "Supporting healthcare initiatives",
  },
  {
    sdg: 4,
    color: "#C5192D",
    name: "Quality Education",
    actions: 1876,
    description: "Enabling access to education",
  },
  {
    sdg: 13,
    color: "#3F7E44",
    name: "Climate Action",
    actions: 3102,
    description: "Taking climate action",
  },
]

export function CollectiveImpact() {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Collective Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Real actions.
            <br />
            <span className="text-muted-foreground">Measurable change.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Every action contributes to the UN Sustainable Development Goals. See how our community is making a
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.sdg}
              className="group bg-card border border-border rounded-lg p-6 hover:border-foreground/20 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold mb-4"
                style={{ backgroundColor: stat.color }}
              >
                {stat.sdg}
              </div>
              <h3 className="font-semibold text-lg mb-1">{stat.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{stat.description}</p>
              <p className="text-3xl font-bold">{stat.actions.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">actions taken</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
