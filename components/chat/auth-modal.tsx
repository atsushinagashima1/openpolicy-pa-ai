"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AuthModalProps {
  isOpen: boolean
  onAuthenticate: (email: string) => void
}

export function AuthModal({ isOpen, onAuthenticate }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("すべてのフィールドを入力してください")
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError("パスワードが一致しません")
      return
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください")
      return
    }

    onAuthenticate(email)
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <img
              src="/images/openpolicy-high-resolution-logo-e3-81-ae-e3-82-b3-e3-83-92-e3-82-9a-e3-83-bc.png"
              alt="OpenPolicy"
              className="h-8 w-auto mx-auto"
            />
          </div>
          <DialogTitle className="text-xl">
            {isLogin ? "ログイン" : "アカウント作成"}
          </DialogTitle>
          <DialogDescription>
            OpenPolicy PA AIにアクセスするには認証が必要です
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="6文字以上"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード（確認）</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="パスワードを再入力"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" className="w-full">
            {isLogin ? "ログイン" : "アカウント作成"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
              setConfirmPassword("")
            }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isLogin
              ? "アカウントをお持ちでない方はこちら"
              : "すでにアカウントをお持ちの方はこちら"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
