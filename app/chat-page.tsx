'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useChat } from '@/hooks/use-chat'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  MessageSquare, 
  History, 
  Settings, 
  Send, 
  LogOut,
  Loader2,
  ChevronLeft
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

// ログインモーダル
function LoginModal({ 
  onClose, 
  onSwitchToSignup 
}: { 
  onClose: () => void
  onSwitchToSignup: () => void 
}) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const { error } = await signIn(email, password)
    
    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません')
    } else {
      onClose()
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-sm text-gray-500 mb-2">OPENPOLICY</h2>
          <h1 className="text-2xl font-bold">ログイン</h1>
          <p className="text-gray-600 mt-2">OpenPolicy PA AIにアクセスするには認証が必要です</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">メールアドレス</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">パスワード</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f]"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ログイン'}
          </Button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          アカウントをお持ちでない方は
          <button 
            onClick={onSwitchToSignup}
            className="text-[#1e3a5f] hover:underline ml-1"
          >
            こちら
          </button>
        </p>
      </div>
    </div>
  )
}

// サインアップモーダル
function SignupModal({ 
  onClose, 
  onSwitchToLogin 
}: { 
  onClose: () => void
  onSwitchToLogin: () => void 
}) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError('アカウント作成に失敗しました。別のメールアドレスをお試しください')
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <h2 className="text-2xl font-bold mb-4">確認メールを送信しました</h2>
          <p className="text-gray-600 mb-6">
            {email} に確認メールを送信しました。<br />
            メール内のリンクをクリックして登録を完了してください。
          </p>
          <Button onClick={onSwitchToLogin} className="bg-[#1e3a5f] hover:bg-[#2d4a6f]">
            ログイン画面へ
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-sm text-gray-500 mb-2">OPENPOLICY</h2>
          <h1 className="text-2xl font-bold">アカウント作成</h1>
          <p className="text-gray-600 mt-2">新しいアカウントを作成します</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">メールアドレス</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">パスワード</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f]"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'アカウント作成'}
          </Button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          既にアカウントをお持ちの方は
          <button 
            onClick={onSwitchToLogin}
            className="text-[#1e3a5f] hover:underline ml-1"
          >
            こちら
          </button>
        </p>
      </div>
    </div>
  )
}

// メインのチャットコンポーネント
export default function ChatPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat()
  const [input, setInput] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 新しいメッセージが来たら自動スクロール
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !user) {
      setShowLogin(true)
    }
  }, [authLoading, user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput('')
    }
  }

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1e3a5f]" />
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* サイドバー */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-[#1e3a5f] text-white transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">OpenPolicy</h1>
          <button onClick={() => setSidebarOpen(false)}>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={clearMessages}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <MessageSquare className="w-5 h-5" />
            チャット
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white/70">
            <History className="w-5 h-5" />
            履歴
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-white/70">
            <Settings className="w-5 h-5" />
            設定
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-white/20 text-white text-sm">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm truncate">{user?.email}</span>
          </div>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded transition"
          >
            <LogOut className="w-4 h-4" />
            ログアウト
          </button>
        </div>

        <div className="p-4 text-xs text-white/50">
          Powered by OpenPolicy AI
        </div>
      </aside>

      {/* メインエリア */}
      <main className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <header className="h-14 border-b bg-white flex items-center px-4 gap-4">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">OPENPOLICY</span>
            <span className="font-semibold">PA AI</span>
          </div>
        </header>

        {/* チャットエリア */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  OpenPolicy PA AIへようこそ
                </h2>
                <p className="text-gray-600 mb-8">
                  政策・規制に関する質問をお気軽にどうぞ。<br />
                  専門的な分析と戦略立案をサポートいたします。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    '民泊新法の最新動向を教えてください',
                    'AI規制の国際比較を分析してください',
                    '自動運転の規制緩和の状況は？',
                    'PA戦略の立て方を教えてください',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="p-4 text-left border rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-[#1e3a5f] text-white text-xs">
                        PA
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-[#1e3a5f] text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-4">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-[#1e3a5f] text-white text-xs">
                    PA
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border shadow-sm rounded-lg p-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 text-sm">{error}</div>
            )}
          </div>
        </ScrollArea>

        {/* 入力エリア */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力してください..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-[#1e3a5f] hover:bg-[#2d4a6f]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-2">
            AIの回答は参考情報としてご利用ください
          </p>
        </div>
      </main>

      {/* ログインモーダル */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false)
            setShowSignup(true)
          }}
        />
      )}

      {/* サインアップモーダル */}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false)
            setShowLogin(true)
          }}
        />
      )}
    </div>
  )
}
