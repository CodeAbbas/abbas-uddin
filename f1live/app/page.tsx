import { drivers, teams } from "@/lib/drivers"
import { DriverCard } from "@/components/driver-card"
import { Trophy } from "lucide-react"

export default function Home() {
  // Group drivers by team
  const driversByTeam = teams.map((team) => ({
    team,
    drivers: drivers.filter((driver) => driver.team === team).sort((a, b) => b.points - a.points),
  }))

  // Get sorted drivers for ranking
  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            <Trophy className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-balance">F1 2025 Season</h1>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Driver Standings</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Overall Standings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight flex items-center gap-3">
            <span className="text-primary">{"///"}</span> Championship Standings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {sortedDrivers.map((driver, index) => (
              <DriverCard key={driver.id} driver={driver} rank={index + 1} />
            ))}
          </div>
        </section>

        {/* By Team */}
        <section>
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight flex items-center gap-3">
            <span className="text-accent">{"///"}</span> By Constructor
          </h2>
          <div className="space-y-12">
            {driversByTeam.map(({ team, drivers: teamDrivers }) => (
              <div key={team}>
                <h3 className="text-xl font-bold mb-6 text-muted-foreground uppercase tracking-wider">{team}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                  {teamDrivers.map((driver) => {
                    const rank = sortedDrivers.findIndex((d) => d.id === driver.id) + 1
                    return <DriverCard key={driver.id} driver={driver} rank={rank} />
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>2025 Formula 1 World Championship</p>
        </div>
      </footer>
    </div>
  )
}
