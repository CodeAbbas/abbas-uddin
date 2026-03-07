"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import type { Driver } from "@/lib/drivers"
import { ChevronDown, Trophy, Medal, Zap, Flag } from "lucide-react"
import Image from "next/image"

interface DriverCardProps {
  driver: Driver
  rank: number
}

export function DriverCard({ driver, rank }: DriverCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-500 cursor-pointer border-2 hover:border-primary/50 ${
        isExpanded ? "row-span-2" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="relative p-6">
        {/* Rank Badge */}
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
          {rank}
        </div>

        {/* Radial Profile Section */}
        <div className="flex flex-col items-center mb-4">
          {/* Circular Avatar with Team Color Border */}
          <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${driver.teamColor} p-1 mb-4 shadow-xl`}>
            <div className="w-full h-full rounded-full bg-card overflow-hidden">
              <Image
                src={`/placeholder.svg?height=128&width=128&query=${encodeURIComponent(driver.imageQuery)}`}
                alt={driver.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            {/* Driver Number Overlay */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl border-4 border-card shadow-lg">
              {driver.number}
            </div>
          </div>

          {/* Driver Name & Team */}
          <h3 className="text-2xl font-bold text-center text-balance mb-1">{driver.name}</h3>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">{driver.team}</p>

          {/* Points Display */}
          <div className="mt-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
            <span className="text-3xl font-bold text-primary">{driver.points}</span>
            <span className="text-xs text-muted-foreground ml-2">PTS</span>
          </div>
        </div>

        {/* Expand Indicator */}
        <div className="flex justify-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Expanded Stats Section */}
        {isExpanded && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="h-px bg-border" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                <Trophy className="w-5 h-5 text-chart-3" />
                <div>
                  <p className="text-2xl font-bold">{driver.wins}</p>
                  <p className="text-xs text-muted-foreground">Wins</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                <Medal className="w-5 h-5 text-chart-2" />
                <div>
                  <p className="text-2xl font-bold">{driver.podiums}</p>
                  <p className="text-xs text-muted-foreground">Podiums</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                <Zap className="w-5 h-5 text-chart-3" />
                <div>
                  <p className="text-2xl font-bold">{driver.fastestLaps}</p>
                  <p className="text-xs text-muted-foreground">Fastest Laps</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                <Flag className="w-5 h-5 text-chart-1" />
                <div>
                  <p className="text-2xl font-bold">{driver.championships}</p>
                  <p className="text-xs text-muted-foreground">Titles</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Country</span>
                <span className="text-sm font-semibold">{driver.country}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
