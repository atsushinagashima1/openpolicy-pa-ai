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
