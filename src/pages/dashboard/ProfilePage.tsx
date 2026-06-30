"use client"

import { User, Star, Sword, Calendar, Clock, Shield } from "lucide-react"

const fakeProfile = {
  username: "PixelMaster_42",
  rank: "MVP+",
  joined: "June 2024",
  lastSeen: "2 minutes ago",
  level: 142,
  xp: 847_500,
  xpToNext: 1_000_000,
  gamesPlayed: 15_234,
  achievements: 84,
  friends: 128,
  bio: "Building dreams, one block at a time. SkyBlock champion and PvP master.",
  stats: {
    kills: 12847,
    deaths: 5199,
    wins: 8234,
    losses: 2987,
  }
}

export default function ProfilePage() {
  const p = fakeProfile

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-10 blur-xl rounded-2xl" />
        <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-emerald-400">
              <span className="text-4xl font-bold text-white">{p.username[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">{p.username}</h2>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-[10px] font-bold text-white">{p.rank}</span>
              </div>
              <p className="text-sm text-white/50 mt-2 max-w-lg">{p.bio}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined {p.joined}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Last seen {p.lastSeen}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Level {p.level}</span>
          </div>
          <span className="text-xs text-white/40">{p.xp.toLocaleString()} / {p.xpToNext.toLocaleString()} XP</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500" style={{ width: `${(p.xp / p.xpToNext) * 100}%` }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard2 icon={<Sword className="h-5 w-5" />} label="Kills" value={p.stats.kills.toLocaleString()} color="from-red-500 to-orange-500" />
        <StatCard2 icon={<Shield className="h-5 w-5" />} label="Deaths" value={p.stats.deaths.toLocaleString()} color="from-gray-500 to-gray-400" />
        <StatCard2 icon={<Star className="h-5 w-5" />} label="Wins" value={p.stats.wins.toLocaleString()} color="from-yellow-500 to-amber-500" />
        <StatCard2 icon={<Sword className="h-5 w-5" />} label="K/D Ratio" value={(p.stats.kills / p.stats.deaths).toFixed(2)} color="from-cyan-500 to-blue-500" />
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-3 gap-4">
        <InfoBox label="Games Played" value={p.gamesPlayed.toLocaleString()} icon={<Sword className="h-4 w-4" />} />
        <InfoBox label="Achievements" value={p.achievements.toString()} icon={<Star className="h-4 w-4" />} />
        <InfoBox label="Friends" value={p.friends.toString()} icon={<User className="h-4 w-4" />} />
      </div>
    </div>
  )
}

function StatCard2({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25 rounded-xl`} />
      <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} bg-opacity-10 text-white`}>
            {icon}
          </div>
          <div>
            <p className="text-xs text-white/40">{label}</p>
            <p className="text-sm font-bold text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="text-white/40">{icon}</div>
        <div>
          <p className="text-xs text-white/40">{label}</p>
          <p className="text-sm font-medium text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}