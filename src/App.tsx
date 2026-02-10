import React, { useState } from 'react'
import { SuiClientProvider, WalletProvider, createNetworkConfig } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@mysten/dapp-kit/dist/index.css'

import Generator from './pages/Generator'
import Gallery from './pages/Gallery'
import WalletConnect from './components/WalletConnect'

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
})

const queryClient = new QueryClient()

export default function App() {
  const [page, setPage] = useState<'generator' | 'gallery'>('generator')

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-200">
            {/* 顶部导航 */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-red-100">
              <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🐉</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                    Vibe 神兽
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setPage('generator')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        page === 'generator' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'
                      }`}
                    >
                      生成器
                    </button>
                    <button
                      onClick={() => setPage('gallery')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        page === 'gallery' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'
                      }`}
                    >
                      画廊
                    </button>
                  </div>
                  <WalletConnect />
                </div>
              </div>
            </nav>

            {/* 主要内容 */}
            <main className="max-w-7xl mx-auto px-4 py-12">
              {page === 'generator' ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Generator />
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Gallery />
                </div>
              )}
            </main>

            {/* 页脚 */}
            <footer className="py-12 text-center text-gray-400 text-sm border-t border-red-50">
              <p>✨ 2026 丙午马年 · 祥瑞神兽 NFT</p>
              <p className="mt-1">Vibe Coding × Sui Network</p>
            </footer>
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}
