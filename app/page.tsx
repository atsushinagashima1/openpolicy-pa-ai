"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/chat/sidebar"
import { Header } from "@/components/chat/header"
import { ChatArea } from "@/components/chat/chat-area"
import { AuthModal } from "@/components/chat/auth-modal"
import type { Message } from "@/components/chat/chat-message"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { History, Settings } from "lucide-react"

// Demo AI responses for simulation
const demoResponses = [
  `## 最新の政策動向について

政策動向の分析において、以下の点に注目することをお勧めします：

1. **デジタルトランスフォーメーション関連規制**
   - データプライバシー法の強化
   - AI規制フレームワークの策定

2. **環境・サステナビリティ政策**
   - カーボンニュートラル目標の設定
   - サプライチェーンデューデリジェンス

3. **経済安全保障**
   - 技術流出防止策
   - サプライチェーン強靭化

これらの分野で新しい規制や政策が次々と発表されています。具体的な分野についてさらに詳しく知りたい場合はお知らせください。`,

  `## 規制対応のベストプラクティス

効果的な規制対応には、以下のアプローチが推奨されます：

### 1. 早期関与（Early Engagement）
規制の策定段階から積極的に意見を提出し、政策形成プロセスに参加することが重要です。

### 2. ステークホルダーマッピング
- 規制当局の担当者
- 業界団体
- 学識経験者
- NGO・市民社会

### 3. コンプライアンス体制の構築
\`\`\`
・ 専任チームの設置
・ 定期的なリスクアセスメント
・ トレーニングプログラムの実施
\`\`\`

### 4. モニタリングと報告
定期的な進捗報告と、問題発生時の迅速な対応体制を整えましょう。`,

  `## ステークホルダーエンゲージメント戦略

効果的なステークホルダーエンゲージメントには、以下の要素が重要です：

### コミュニケーション戦略
| ステークホルダー | 頻度 | チャネル |
|---|---|---|
| 政府機関 | 月次 | 対面・書面 |
| 業界団体 | 週次 | 会議・メール |
| メディア | 随時 | プレスリリース |

### 関係構築のポイント

1. **透明性の確保**
   - 正確な情報提供
   - タイムリーな開示

2. **双方向コミュニケーション**
   - フィードバックの収集
   - 対話の機会創出

3. **長期的視点**
   - 信頼関係の構築
   - 継続的な関与

具体的なステークホルダーや課題についてご相談ください。`,
]

export default function ChatPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleAuthenticate = useCallback((email: string) => {
    setIsAuthenticated(true)
    console.log("[v0] User authenticated:", email)
  }, [])

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false)
    setMessages([])
    console.log("[v0] User logged out")
  }, [])

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const responseIndex = Math.floor(Math.random() * demoResponses.length)
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: demoResponses[responseIndex],
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)
  }, [])

  const renderContent = () => {
    if (activeTab === "history") {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">チャット履歴</h2>
            <p className="text-muted-foreground text-sm">
              過去のチャット履歴がここに表示されます
            </p>
          </div>
        </div>
      )
    }

    if (activeTab === "settings") {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">設定</h2>
            <p className="text-muted-foreground text-sm">
              アプリケーション設定がここに表示されます
            </p>
          </div>
        </div>
      )
    }

    return (
      <ChatArea
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
    )
  }

  return (
    <>
      <AuthModal isOpen={!isAuthenticated} onAuthenticate={handleAuthenticate} />

      <div className="h-screen flex bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && isMobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full z-50">
              <Sidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab)
                  setIsMobileSidebarOpen(false)
                }}
                isCollapsed={false}
                onToggleCollapse={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onLogout={handleLogout}
            onMenuClick={() => setIsMobileSidebarOpen(true)}
            showMenuButton={isMobile}
          />
          {renderContent()}
        </div>
      </div>
    </>
  )
}
