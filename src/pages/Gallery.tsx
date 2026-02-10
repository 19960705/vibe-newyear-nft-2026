import React from 'react'
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'

/**
 * 真实上链版画廊
 * 核心功能：
 * 1. 自动检测用户钱包里的神兽 NFT
 * 2. 实时拉取链上元数据（名字、属性、图片）
 * 3. 瀑布流展示
 */

// 我们的合约 Package ID
const PACKAGE_ID = '0xa1de2d5c526c101aa8367c43fff1ef5c257399e7129af05bff3f11b101066f21';

export default function Gallery() {
  const account = useCurrentAccount()

  // 查询用户拥有的对象
  const { data: objects, isPending, error } = useSuiClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address || '',
      filter: {
        StructType: `${PACKAGE_ID}::vibe_nft::Beast`,
      },
      options: {
        showContent: true,
        showDisplay: true,
      },
    },
    {
      enabled: !!account?.address,
    }
  )

  if (!account) {
    return (
      <div className="text-center py-24 bg-white/40 backdrop-blur-xl rounded-[3rem] border-4 border-dashed border-red-200">
        <div className="text-8xl mb-6 grayscale opacity-30">💼</div>
        <h2 className="text-3xl font-black text-gray-400 uppercase tracking-widest">Wallet Not Connected</h2>
        <p className="text-gray-500 mt-4 font-medium">请先连接钱包，开启你的神兽藏宝阁</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-16 h-16 border-8 border-red-100 border-t-red-500 rounded-full animate-spin" />
        <p className="text-red-500 font-black animate-pulse uppercase tracking-[0.3em]">Scanning Blockchain...</p>
      </div>
    )
  }

  const beasts = objects?.data || []

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">My Collection</h2>
          <p className="text-gray-500 font-medium">你已成功唤醒 <span className="text-red-600 font-black">{beasts.length}</span> 只 2026 祥瑞神兽</p>
        </div>
        <div className="px-6 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
           <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Sui Testnet Live</span>
        </div>
      </div>

      {beasts.length === 0 ? (
        <div className="text-center py-32 bg-white/60 backdrop-blur-md rounded-[3rem] border-4 border-dashed border-gray-100">
          <div className="text-7xl mb-8">🥚</div>
          <h3 className="text-2xl font-bold text-gray-800">藏宝阁空空如也</h3>
          <p className="text-gray-400 mt-2 max-w-xs mx-auto leading-relaxed">
            你还没有在 Sui 链上铸造任何神兽。快去生成器页唤醒你的第一只守护灵吧！
          </p>
          <button 
            onClick={() => window.location.reload()} // 简单刷新回到首页或切换状态
            className="mt-10 px-10 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-red-600 transition-colors shadow-xl"
          >
            立即去唤醒
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beasts.map((obj: any) => {
            const display = obj.data?.display?.data || {}
            const content = obj.data?.content?.fields || {}
            
            return (
              <div 
                key={obj.data?.objectId}
                className="group bg-white rounded-[2.5rem] p-4 shadow-xl border-4 border-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-square bg-gray-50 rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center">
                  {/* 背景渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-yellow-500/5" />
                  
                  <img 
                    src={display.image_url || '/assets/beasts/dragon.png'} 
                    alt="Beast"
                    className="w-4/5 h-4/5 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full">
                     <p className="text-[8px] font-black text-white uppercase tracking-tighter">ID: {obj.data?.objectId.slice(0,6)}...</p>
                  </div>
                </div>

                <div className="px-2 pb-2 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Authenticated NFT</p>
                      <h4 className="text-2xl font-black text-gray-900 tracking-tight">{display.name || 'Unnamed Beast'}</h4>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-black text-gray-500 uppercase">
                       {content.zodiac || 'Unknown'}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 italic">
                    “ {display.description || '这段神秘的寓意隐藏在区块链深处...'} ”
                  </p>

                  <div className="flex gap-2">
                     <a 
                       href={`https://suiscan.xyz/testnet/object/${obj.data?.objectId}`} 
                       target="_blank"
                       className="flex-1 py-3 text-center bg-gray-50 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
                     >
                       View on Explorer
                     </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
