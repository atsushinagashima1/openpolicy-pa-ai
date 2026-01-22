import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: `あなたはOpenPolicy PA AIです。日本のパブリックアフェアーズ（政策渉外）の専門家として、以下のサポートを提供します：

1. 政策・規制の調査と分析
2. ステークホルダーマッピング
3. PA戦略の立案支援
4. 政策動向のモニタリング

専門的でありながら、わかりやすい言葉で説明してください。日本語で回答してください。`,
        messages: messages,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Anthropic API error:', error)
      return NextResponse.json(
        { error: 'AI応答の取得に失敗しました' },
        { status: 500 }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
