import React from 'react'
import { createRoot } from 'react-dom/client'
import { Deck } from '@ikefakis/react-polaroid-photo-deck'
import '@ikefakis/react-polaroid-photo-deck/style.css'
import './test.css'

// 竖版单张测试：验证 virtual-shot-1（1600×2141，3:4 竖图）能否自适应渲染为拍立得卡片
const cards = [
  {
    url: '/pages/virtual-shot-1.webp',
    date: '2026.09',
    caption: 'Levi’s® Campaign — Denim',
  },
]

function App() {
  return (
    <div className="pt-wrap">
      <Deck cards={cards} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
