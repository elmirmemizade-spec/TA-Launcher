"use client"

import { useState } from "react"
import { ChevronDown, Download, ExternalLink, Home, Terminal, Globe, Package } from "lucide-react"
import { Link } from "react-router-dom"

// ============================================================================
// SVG LOGOS (inline - no external files needed)
// ============================================================================

const WindowsLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="2" fill="currentColor" />
    <rect x="48" y="8" width="32" height="32" rx="2" fill="currentColor" />
    <rect x="8" y="48" width="32" height="32" rx="2" fill="currentColor" />
    <rect x="48" y="48" width="32" height="32" rx="2" fill="currentColor" />
  </svg>
)

const MacLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.6 12.6c0-3.4 2.8-5.1 2.9-5.2-1.6-2.3-4-2.7-4.9-2.7-2.1-.2-4.1 1.2-5.1 1.2s-2.7-1.2-4.5-1.2c-2.3 0-4.5 1.4-5.7 3.5-2.5 4.3-.6 10.6 1.8 14.1 1.2 1.7 2.6 3.6 4.5 3.5s2.5-1.1 4.7-1.1 2.9 1.1 4.7 1.1 3.2-1.7 4.4-3.5c1.4-2 1.9-4 2-4.1-.1 0-3.8-1.5-3.8-5.6zM14.8 3.8c1-1.2 1.7-2.9 1.5-4.6-1.4.1-3.2.9-4.2 2.1-.9 1.1-1.7 2.8-1.5 4.5 1.6.1 3.1-.8 4.2-2z" fill="currentColor" />
  </svg>
)

const LinuxLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.9 2 10 2.9 10 4c0 .7.4 1.3.9 1.7-.4.2-.9.3-1.4.3-1.7 0-3-1.3-3-3 0-1.7 1.3-3 3-3 .9 0 1.7.4 2.2 1C12.2 1.4 12.9 1 13.5 1c1.7 0 3 1.3 3 3 0 1.7-1.3 3-3 3-.5 0-1-.1-1.4-.3.5-.4.9-1 .9-1.7 0-1.1-.9-2-2-2z" fill="currentColor" />
    <path d="M17.5 18c-.7 0-1.4.3-1.9.7-.6.6-1.4.9-2.3.9h-2.6c-.9 0-1.7-.3-2.3-.9-.5-.4-1.2-.7-1.9-.7-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5.5 0 1-.2 1.4-.4.6-.5 1.4-.8 2.3-.8h2.6c.9 0 1.7.3 2.3.8.4.2.9.4 1.4.4 1.4 0 2.5-1.1 2.5-2.5 0-1.4-1.1-2.5-2.5-2.5z" fill="currentColor" />
    <ellipse cx="8.5" cy="10" rx="2.5" ry="3" fill="currentColor" />
    <ellipse cx="15.5" cy="10" rx="2.5" ry="3" fill="currentColor" />
    <path d="M12 14c-3 0-4.5 2-4.5 4h9c0-2-1.5-4-4.5-4z" fill="currentColor" />
  </svg>
)

// ============================================================================
// BUTTON COMPONENT (matches the hero style)
// ============================================================================

interface ButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "lg"
  className?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
}

const Button = ({ variant = "default", size = "sm", className = "", children, onClick, href, disabled }: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-white text-black hover:bg-gray-100",
    outline: "border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30",
    ghost: "text-white/90 hover:text-white hover:bg-white/10",
  }

  const sizes = {
    sm: "h-9 px-4 py-2 text-sm",
    lg: "px-8 py-6 text-lg",
  }

  const classes = `group relative overflow-hidden rounded-full ${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </>
  )

  if (href) {
    return <a href={href} className={classes}>{content}</a>
  }

  return <button onClick={onClick} className={classes} disabled={disabled}>{content}</button>
}

// ============================================================================
// OS CARD COMPONENT
// ============================================================================

interface OsCardProps {
  name: string
  icon: React.ReactNode
  description: string
  downloads: {
    label: string
    icon: React.ReactNode
    description?: string
    recommended?: boolean
  }[]
  color: string // gradient color
}

const OsCard = ({ name, icon, description, downloads, color }: OsCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30 rounded-3xl`} />
      
      <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.05]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-white/90">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-white/50">{description}</p>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-2">
          {downloads.map((dl, idx) => (
            <button
              key={idx}
              onClick={() => console.log(`Download: ${name} - ${dl.label}`)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                dl.recommended
                  ? "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/5"
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                dl.recommended ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-white/60"
              }`}>
                {dl.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{dl.label}</span>
                  {dl.recommended && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                      Recommended
                    </span>
                  )}
                </div>
                {dl.description && (
                  <p className="text-xs text-white/40 mt-0.5">{dl.description}</p>
                )}
              </div>
              <Download className="h-4 w-4 text-white/40 group-hover:text-white/80 transition-colors" />
            </button>
          ))}
        </div>

        {/* Extra Info (Linux/Mac) */}
        {(name === "Linux" || name === "macOS") && (
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors w-full"
            >
              <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              {name === "Linux" ? "Alternative installation methods" : "Alternative downloads"}
            </button>
            
            {isOpen && (
              <div className="mt-3 space-y-2">
                {name === "Linux" && (
                  <>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors cursor-pointer">
                      <Terminal className="h-4 w-4 text-white/40" />
                      <div className="flex-1">
                        <p className="text-xs text-white/70 font-medium">APT Repository</p>
                        <code className="text-[11px] text-white/30 font-mono">sudo apt-add-repository ppa:pixelcraft/stable</code>
                      </div>
                      <CopyIcon />
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors cursor-pointer">
                      <Globe className="h-4 w-4 text-white/40" />
                      <div className="flex-1">
                        <p className="text-xs text-white/70 font-medium">Flatpak</p>
                        <code className="text-[11px] text-white/30 font-mono">flatpak install flathub io.pixelcraft.launcher</code>
                      </div>
                      <CopyIcon />
                    </div>
                  </>
                )}
                {name === "macOS" && (
                  <>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors cursor-pointer">
                      <Package className="h-4 w-4 text-white/40" />
                      <div className="flex-1">
                        <p className="text-xs text-white/70 font-medium">Homebrew Cask</p>
                        <code className="text-[11px] text-white/30 font-mono">brew install --cask pixelcraft</code>
                      </div>
                      <CopyIcon />
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors cursor-pointer">
                      <Terminal className="h-4 w-4 text-white/40" />
                      <div className="flex-1">
                        <p className="text-xs text-white/70 font-medium">DMG Archive</p>
                        <code className="text-[11px] text-white/30 font-mono">PixelCraft-Launcher-x64.dmg</code>
                      </div>
                      <Download className="h-3.5 w-3.5 text-white/30" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// COPY ICON (for code blocks)
// ============================================================================

const CopyIcon = () => (
  <svg className="h-3.5 w-3.5 text-white/30 hover:text-white/70 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

// ============================================================================
// DOWNLOADS PAGE
// ============================================================================

export default function DownloadsPage() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/20 to-black" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors mb-8"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Download <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Launcher</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Choose your platform and download the PixelCraft Launcher to start playing on our Minecraft server.
          </p>
        </div>

        {/* OS Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Windows */}
          <OsCard
            name="Windows"
            icon={<WindowsLogo className="h-7 w-7" />}
            description="Windows 10, 11 & Server 2022+"
            color="from-blue-500 via-cyan-500 to-blue-500"
            downloads={[
              {
                label: "Installer (.exe)",
                icon: <Download className="h-4 w-4" />,
                description: "64-bit, includes auto-updater",
                recommended: true,
              },
              {
                label: "Portable (.zip)",
                icon: <Package className="h-4 w-4" />,
                description: "No installation required",
              },
            ]}
          />

          {/* macOS */}
          <OsCard
            name="macOS"
            icon={<MacLogo className="h-7 w-7" />}
            description="macOS 12 Monterey or later"
            color="from-gray-500 via-white/30 to-gray-500"
            downloads={[
              {
                label: "Apple Silicon (.dmg)",
                icon: <Download className="h-4 w-4" />,
                description: "M1, M2, M3 & M4 native",
                recommended: true,
              },
              {
                label: "Intel (.dmg)",
                icon: <Package className="h-4 w-4" />,
                description: "For Intel-based Macs",
              },
            ]}
          />

          {/* Linux */}
          <OsCard
            name="Linux"
            icon={<LinuxLogo className="h-7 w-7" />}
            description="Ubuntu, Fedora, Arch & more"
            color="from-orange-500 via-yellow-500 to-orange-500"
            downloads={[
              {
                label: ".deb Package",
                icon: <Download className="h-4 w-4" />,
                description: "Debian, Ubuntu & derivatives",
                recommended: true,
              },
              {
                label: ".tar.gz Archive",
                icon: <Package className="h-4 w-4" />,
                description: "Portable, any distribution",
              },
              {
                label: "AppImage",
                icon: <Terminal className="h-4 w-4" />,
                description: "Universal Linux format",
              },
            ]}
          />
        </div>

        {/* Bottom Info */}
        <div className="text-center">
          <p className="text-white/30 text-sm">
            All downloads are signed and verified.{" "}
            <a href="#" className="text-white/50 hover:text-white/80 underline underline-offset-4 transition-colors">
              View checksums
            </a>
          </p>
          <p className="text-white/20 text-xs mt-2">
            Linux logo: penguin, Windows logo: 4-pane window, macOS logo: apple shape — all inline SVGs
          </p>
        </div>
      </div>
    </div>
  )
}