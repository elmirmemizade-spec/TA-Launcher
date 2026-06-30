"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      // OpenRouter API call
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-exp:free",
          messages: [
            {
              role: "system",
              content: "You are PixelCraft AI assistant. You help players with Minecraft server questions, ranks, commands, and general support. Be friendly and helpful."
            },
            ...messages,
            { role: "user", content: userMessage }
          ],
        }),
      })

      const data = await response.json()
      const aiResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again."

      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble connecting. Please try again later or contact support." 
      }])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 hover:scale-110 transition-transform"
      >
        <Bot className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl shadow-2xl transition-all duration-300 ${
      isMinimized ? "h-14 w-72" : "h-[500px] w-96"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">PixelCraft AI</p>
            <p className="text-[10px] text-emerald-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/40">Hi! I'm PixelCraft AI assistant.</p>
                <p className="text-xs text-white/30 mt-1">Ask me anything about the server!</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                    msg.role === "user" 
                      ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                      : "bg-gradient-to-br from-blue-500 to-cyan-400"
                  }`}>
                    {msg.role === "user" ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className={`rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                      : "bg-white/5 text-white/80 border border-white/10"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}