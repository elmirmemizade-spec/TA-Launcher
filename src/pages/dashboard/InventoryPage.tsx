"use client"

import { Package, Sword, Pickaxe, Shield, Star, Heart, Gem, FlaskRound as Flask, Apple } from "lucide-react"

const fakeInventory = {
  weapons: [
    { name: "Diamond Sword", rarity: "Legendary", damage: "+45", icon: <Sword className="h-5 w-5" />, color: "from-cyan-500 to-blue-500" },
    { name: "Netherite Axe", rarity: "Epic", damage: "+38", icon: <Sword className="h-5 w-5" />, color: "from-red-500 to-purple-500" },
    { name: "Iron Sword", rarity: "Common", damage: "+12", icon: <Sword className="h-5 w-5" />, color: "from-gray-500 to-gray-400" },
  ],
  armor: [
    { name: "Diamond Chestplate", rarity: "Legendary", defense: "+30", icon: <Shield className="h-5 w-5" />, color: "from-cyan-500 to-blue-500" },
    { name: "Netherite Boots", rarity: "Epic", defense: "+22", icon: <Shield className="h-5 w-5" />, color: "from-red-500 to-purple-500" },
  ],
  tools: [
    { name: "Ender Pickaxe", rarity: "Epic", efficiency: "+40", icon: <Pickaxe className="h-5 w-5" />, color: "from-purple-500 to-pink-500" },
    { name: "Golden Shovel", rarity: "Rare", efficiency: "+18", icon: <Pickaxe className="h-5 w-5" />, color: "from-yellow-500 to-amber-500" },
  ],
  consumables: [
    { name: "XP Boost x5", rarity: "Rare", icon: <Flask className="h-5 w-5" />, color: "from-green-500 to-emerald-500" },
    { name: "Golden Apple x3", rarity: "Epic", icon: <Apple className="h-5 w-5" />, color: "from-yellow-500 to-orange-500" },
  ],
  currency: { coins: 45230, gems: 1280, tokens: 345 }
}

const rarityColors: Record<string, string> = {
  Common: "text-gray-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-yellow-400",
}

export default function InventoryPage() {
  const inv = fakeInventory

  return (
    <div className="space-y-6">
      {/* Currency Display */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-lg font-bold text-white mb-4">Currency</h2>
        <div className="grid grid-cols-3 gap-4">
          <CurrencyItem icon={<Gem className="h-5 w-5 text-cyan-400" />} label="Coins" value={inv.currency.coins.toLocaleString()} />
          <CurrencyItem icon={<Star className="h-5 w-5 text-purple-400" />} label="Gems" value={inv.currency.gems.toLocaleString()} />
          <CurrencyItem icon={<Heart className="h-5 w-5 text-red-400" fill="currentColor" />} label="Tokens" value={inv.currency.tokens.toLocaleString()} />
        </div>
      </div>

      {/* Weapons */}
      <Section title="Weapons" items={inv.weapons} />

      {/* Armor */}
      <Section title="Armor" items={inv.armor} />

      {/* Tools */}
      <Section title="Tools" items={inv.tools} />

      {/* Consumables */}
      <Section title="Consumables" items={inv.consumables} />
    </div>
  )
}

function CurrencyItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
      {icon}
      <div>
        <p className="text-xs text-white/40">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

function Section({ title, items }: { title: string; items: { name: string; rarity: string; icon: React.ReactNode; color: string; damage?: string; defense?: string; efficiency?: string }[] }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
      <h3 className="text-base font-bold text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 text-white`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">{item.name}</p>
                <span className={`text-[10px] ${rarityColors[item.rarity]} font-medium`}>{item.rarity}</span>
              </div>
              <p className="text-xs text-white/40">{item.damage || item.defense || item.efficiency || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}