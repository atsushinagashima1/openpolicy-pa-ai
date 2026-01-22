"use client"

import { Bot } from "lucide-react"

export function LoadingIndicator() {
  return (
    <div className="flex gap-3 px-4 py-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <Bot className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="bg-muted rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}
