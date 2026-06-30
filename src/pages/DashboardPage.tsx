"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { 
  Home, User, Package, ShoppingCart, HeadphonesIcon, 
  Settings, Shield, Gamepad2, Sword, Backpack, Star,
  Heart, ChevronRight, LogOut, Key, MessageCircle, HelpCircle, Mail, Phone
} from "lucide-react"
import ProfilePage from "./dashboard/ProfilePage"
import MarketPage from "./dashboard/MarketPage"
import InventoryPage from "./dashboard/InventoryPage"

// ============================================================================
// SIDEBAR NAV ITEMS
// ============================================================================

type TabType = "main" | "profile" | "market" | "inventory" | "support"

const navItems: { id: TabType; icon: React.ReactNode; label: string }[] = [
  { id: "main", icon: <Home className="h-4 w-4" />, label: "Main Page" },
  { id: "profile", icon: <User className="h-4 w-4" />, label: "Profile" },
  { id: "market", icon: <ShoppingCart className="h-4 w-4" />, label: "Market" },
  { id: "inventory", icon: <Package className="h-4 w-4" />, label: "Inventory" },
  { id: "support", icon: <HeadphonesIcon className="h-4 w-4" />, label: "Support" },
]

// ============================================================================
// STAT CARD
// ============================================================================

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <div className="group relative">
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25 rounded-xl`} />
    <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.05]">
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

// ============================================================================
// SUPPORT PAGE
// ============================================================================

function SupportPage() {
  const [tickets] = useState([
    { id: "#TKT-2847", subject: "Lost items after server crash", status: "Open", date: "2 hours ago", color: "text-emerald-400" },
    { id: "#TKT-2846", subject: "Rank upgrade not applied", status: "In Progress", date: "1 day ago", color: "text-yellow-400" },
    { id: "#TKT-2845", subject: "Account migration help", status: "Resolved", date: "3 days ago", color: "text-blue-400" },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Support</h2>
        <p className="text-sm text-white/40">We're here to help you 24/7</p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Live Chat</p>
              <p className="text-xs text-emerald-400">Online</p>
            </div>
          </div>
          <p className="text-xs text-white/40">Average response time: 2 minutes</p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-xs text-white/40">support@pixelcraft.tr</p>
            </div>
          </div>
          <p className="text-xs text-white/40">Response within 24 hours</p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">FAQ</p>
              <p className="text-xs text-white/40">Common questions</p>
            </div>
          </div>
          <p className="text-xs text-white/40">Instant answers</p>
        </div>
      </div>

      {/* Create Ticket */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-4">Create a Ticket</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Subject"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
          />
          <textarea
            placeholder="Describe your issue..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
          />
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/25">
            Submit Ticket
          </button>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-4">Recent Tickets</h3>
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">{ticket.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${ticket.color} bg-opacity-10 border border-current/20 ${ticket.color}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-white/80 mt-0.5">{ticket.subject}</p>
              </div>
              <span className="text-xs text-white/30">{ticket.date}</span>
              <ChevronRight className="h-3 w-3 text-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// DASHBOARD PAGE
// ============================================================================

export default function DashboardPage() {
  const navigate = useNavigate()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("main")
  
  const [ign, setIgn] = useState("")
  const [ignPassword, setIgnPassword] = useState("")
  const [ignError, setIgnError] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (!session) {
        navigate("/register")
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) navigate("/register")
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleIgnLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIgnError("")
    if (!ign || !ignPassword) {
      setIgnError("Please fill in both fields")
      return
    }
    setIsAuthenticated(true)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  const requiresAuth = activeTab === "main" || activeTab === "profile" || activeTab === "market" || activeTab === "inventory"
  const needsGameAuth = requiresAuth && !isAuthenticated

  return (
    <div className="min-h-screen bg-black">
      <div className="flex h-screen overflow-hidden">
        {/* ==================================================================== */}
        {/* SIDEBAR */}
        {/* ==================================================================== */}
        <aside className="w-64 bg-white/[0.02] border-r border-white/[0.06] flex flex-col">
          <div className="p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/img/Logo.png" alt="PixelCraft" className="h-9 w-9 rounded-lg object-contain" />
                <div>
                  <p className="text-sm font-bold text-white">PixelCraft</p>
                  <p className="text-[10px] text-white/30">Dashboard</p>
                </div>
              </a>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <span className={activeTab === item.id ? "text-blue-400" : ""}>{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {activeTab === item.id && (
                  <ChevronRight className="h-3 w-3 text-blue-400" />
                )}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-white/[0.06]">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ==================================================================== */}
        {/* MAIN CONTENT */}
        {/* ==================================================================== */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-5xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white capitalize">
                  {activeTab === "main" ? "Main Page" : activeTab}
                </h1>
                <p className="text-sm text-white/40">
                  {activeTab === "support" 
                    ? "Support is available for everyone" 
                    : `Welcome back, ${session?.user?.email?.split("@")[0] || "Player"}`
                  }
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="/" 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Home className="h-4 w-4" />
                  <span className="text-xs font-medium">Home</span>
                </a>
                {(activeTab !== "support") && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Online</span>
                  </div>
                )}
              </div>
            </div>

            {/* SUPPORT - Always accessible */}
            {activeTab === "support" && <SupportPage />}

            {/* GAME AUTH REQUIRED PAGES */}
            {activeTab !== "support" && !isAuthenticated && (
              <div className="max-w-md mx-auto mt-12">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500">
                      <Key className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white text-center mb-2">
                    Link Your Game Account
                  </h2>
                  <p className="text-sm text-white/40 text-center mb-6">
                    Enter your in-game credentials to access {activeTab}.
                  </p>

                  {ignError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                      {ignError}
                    </div>
                  )}

                  <form onSubmit={handleIgnLogin} className="space-y-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">In-Game Name</label>
                      <input
                        type="text"
                        value={ign}
                        onChange={(e) => setIgn(e.target.value)}
                        placeholder="Your Minecraft username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">In-Game Password</label>
                      <input
                        type="password"
                        value={ignPassword}
                        onChange={(e) => setIgnPassword(e.target.value)}
                        placeholder="Your game account password"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25"
                    >
                      Link Account
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* GAME AUTHENTICATED PAGES */}
            {activeTab !== "support" && isAuthenticated && (
              <>
                {activeTab === "main" && (
                  <>
                    {/* Player Info Hero */}
                    <div className="relative mb-8">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-10 blur-xl rounded-2xl" />
                      <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-6">
                          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-emerald-400">
                            <span className="text-3xl font-bold text-white">
                              {(ign || "P")[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h2 className="text-2xl font-bold text-white">{ign || "Player"}</h2>
                              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-[10px] font-bold text-white">MVP+</span>
                            </div>
                            <p className="text-sm text-white/40 mt-1">Member since June 2024 • 2,847 hours played</p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1.5">
                                <Heart className="h-3.5 w-3.5 text-red-400" fill="currentColor" />
                                <span className="text-xs text-white/60">1,234</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" />
                                <span className="text-xs text-white/60">4,567</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Sword className="h-3.5 w-3.5 text-blue-400" />
                                <span className="text-xs text-white/60">Level 142</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <StatCard icon={<Sword className="h-5 w-5" />} label="PvP Kills" value="12,847" color="from-red-500 to-orange-500" />
                      <StatCard icon={<Star className="h-5 w-5" />} label="Total Wins" value="8,234" color="from-yellow-500 to-amber-500" />
                      <StatCard icon={<Backpack className="h-5 w-5" />} label="Items Collected" value="45,678" color="from-purple-500 to-pink-500" />
                      <StatCard icon={<Shield className="h-5 w-5" />} label="K/D Ratio" value="2.47" color="from-cyan-500 to-blue-500" />
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl">
                      <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {[
                          { action: "Won a SkyBlock duel", time: "2 minutes ago", color: "text-emerald-400" },
                          { action: "Purchased MVP+ rank", time: "1 hour ago", color: "text-yellow-400" },
                          { action: "Defeated Ender Dragon", time: "3 hours ago", color: "text-purple-400" },
                          { action: "Joined PixelCraft", time: "2,847 hours ago", color: "text-blue-400" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                            <div className={`h-2 w-2 rounded-full ${item.color.replace("text-", "bg-")}`} />
                            <div className="flex-1">
                              <p className="text-sm text-white/80">{item.action}</p>
                              <p className="text-xs text-white/30">{item.time}</p>
                            </div>
                            <ChevronRight className="h-3 w-3 text-white/20" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "profile" && <ProfilePage />}
                {activeTab === "market" && <MarketPage />}
                {activeTab === "inventory" && <InventoryPage />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}