"use client"

import { useRef, useEffect } from "react"
import { ChatMessage, type Message } from "./chat-message"
import { ChatInput } from "./chat-input"
import { LoadingIndicator } from "./loading-indicator"

interface ChatAreaProps {
  messages: Message[]
  isLoading: boolean
  onSendMessage: (content: string) => void
}

export function ChatArea({ messages, isLoading, onSendMessage }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <img
                  src="/images/openpolicy-high-resolution-logo-e3-81-ae-e3-82-b3-e3-83-92-e3-82-9a-e3-83-bc.png"
                  alt="OpenPolicy"
                  className="h-10 w-auto mx-auto"
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                PA AIへようこそ
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                政策分析、規制動向、パブリックアフェアーズに関する質問をお気軽にどうぞ。専門的な知見をもとにサポートいたします。
              </p>
              <div className="mt-6 grid gap-2">
                <button
                  onClick={() => onSendMessage("最新の政策動向について教えてください")}
                  className="text-sm text-left px-4 py-3 rounded-lg bg-muted hover:bg-accent transition-colors text-foreground"
                >
                  最新の政策動向について教えてください
                </button>
                <button
                  onClick={() => onSendMessage("規制対応のベストプラクティスは？")}
                  className="text-sm text-left px-4 py-3 rounded-lg bg-muted hover:bg-accent transition-colors text-foreground"
                >
                  規制対応のベストプラクティスは？
                </button>
                <button
                  onClick={() => onSendMessage("ステークホルダーエンゲージメントの戦略を教えてください")}
                  className="text-sm text-left px-4 py-3 rounded-lg bg-muted hover:bg-accent transition-colors text-foreground"
                >
                  ステークホルダーエンゲージメントの戦略を教えてください
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <ChatInput onSend={onSendMessage} isLoading={isLoading} />
    </div>
  )
}
