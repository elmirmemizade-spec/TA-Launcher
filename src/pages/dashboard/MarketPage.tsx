"use client"

import { ShoppingCart, Star, Sword, Pickaxe, Shield, Heart, Search, ChevronRight } from "lucide-react"

const fakeItems = [
  { name: "MVP+ Rank", price: 29.99, category: "Ranks", icon: <Star className="h-5 w-5" />, color: "from-yellow-500 to-orange-500", popular: true },
  { name: "VIP Rank", price: 14.99, category: "Ranks", icon: <Star className="h-5 w-5" />, color: "from-green-500 to-emerald-500" },
  { name: "Diamond Sword", price: 4.99, category: "Weapons", icon: <Sword className="h-5 w-5" />, color: "from-cyan-500 to-blue-500" },
  { name: "Ender Pickaxe", price: 3.99, category: "Tools", icon: <Pickaxe className="h-5 w-5" />, color: "from-purple-500 to-pink-500" },
  { name: "Guardian Shield", price: 5.99, category: "Armor", icon: <Shield className="h-5 w-5" />, color: "from-blue-500 to-indigo-500" },
  { name: "Love Bundle", price: 2.99, category: "Cosmetics", icon: <Heart className="h-5 w-5" />, color: "from-red-500 to-pink-500" },
]

const categories = ["All", "Ranks", "Weapons", "Tools", "Armor", "Cosmetics"]

export default function MarketPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Market</h2>
        <p className="text-sm text-white/40">Browse and purchase items for your adventure</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              cat === "All"
                ? "bg-white text-black"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fakeItems.map((item, idx) => (
          <div key={idx} className="group relative">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20 rounded-xl`} />
            <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.05]">
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 text-white`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    {item.popular && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">Popular</span>
                    )}
                  </div>
                  <p className="text-xs text-white/40">{item.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">${item.price.toFixed(2)}</span>
                <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}