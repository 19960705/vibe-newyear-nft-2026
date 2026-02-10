import React, { useState, useEffect } from 'react'
import { generateBeastMeaning } from '../services/aiService'
import { createMintTransaction } from '../services/suiService'
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit'

interface BeastType {
  id: string
  name: string
  emoji: string
  image: string
}

interface ColorScheme {
  id: string
  name: string
  bg: string
  glow: string
  from: string
  to: string
  text: string
  isAnimated?: boolean
}

const BEAST_TYPES: BeastType[] = [
  { id: 'dragon', name: '神龙', emoji: '🐉', image: '/assets/beasts/dragon.png' },
  { id: 'snake', name: '灵蛇', emoji: '🐍', image: '/assets/beasts/snake.png' },
  { id: 'horse', name: '天马', emoji: '🐴', image: '/assets/beasts/horse.png' },
  { id: 'sheep', name: '祥羊', emoji: '🐑', image: '/assets/beasts/sheep.png' },
  { id: 'monkey', name: '灵猴', emoji: '🐵', image: '/assets/beasts/monkey.png' },
  { id: 'rooster', name: '金鸡', emoji: '🐓', image: '/assets/beasts/rooster.png' },
  { id: 'dog', name: '旺狗', emoji: '🐕', image: '/assets/beasts/dog.png' },
  { id: 'pig', name: '福猪', emoji: '🐷', image: '/assets/beasts/pig.png' },
  { id: 'mouse', name: '灵鼠', emoji: '🐀', image: '/assets/beasts/mouse.png' },
  { id: 'ox', name: '神牛', emoji: '🐂', image: '/assets/beasts/ox.png' },
  { id: 'tiger', name: '猛虎', emoji: '🐅', image: '/assets/beasts/tiger.png' },
  { id: 'rabbit', name: '玉兔', emoji: '🐇', image: '/assets/beasts/rabbit.png' },
]

const COLOR_SCHEMES: ColorScheme[] = [
  { id: 'gold', name: '黄金', bg: 'bg-yellow-400', glow: 'shadow-yellow-400/50', from: 'from-yellow-300', to: 'to-yellow-600', text: 'text-yellow-950' },
  { id: 'red', name: '朱红', bg: 'bg-red-600', glow: 'shadow-red-600/50', from: 'from-red-500', to: 'to-red-700', text: 'text-white' },
  { id: 'purple', name: '紫气', bg: 'bg-[#4B0082]', glow: 'shadow-purple-900/50', from: 'from-[#4B0082]', to: 'to-[#1a0033]', text: 'text-white' },
  { id: 'rainbow', name: '彩虹', bg: 'animate-gradient-x bg-gradient-to-r from-teal-400 via-purple-500 to-orange-400', glow: 'shadow-cyan-400/50', from: 'from-cyan-400', to: 'to-orange-400', text: 'text-white', isAnimated: true },
]

export default function Generator() {
  const account = useCurrentAccount()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()

  const [selectedType, setSelectedType] = useState<BeastType>(BEAST_TYPES[0])
  const [selectedColor, setSelectedColor] = useState<ColorScheme>(COLOR_SCHEMES[0])
  const [name, setName] = useState('')
  const [meaning, setMeaning] = useState('等待神启，赋予这段因缘独一无二的寓意...')
  const [displayedMeaning, setDisplayedMeaning] = useState('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState<{ success?: boolean; txDigest?: string; error?: string }>({})
  const [isHovered, setIsHovered] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let i = 0
    setDisplayedMeaning('')
    const timer = setInterval(() => {
      if (i < meaning.length) {
        setDisplayedMeaning((prev) => prev + meaning.charAt(i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [meaning])

  const handleGenerateAI = async () => {
    setIsLoadingAI(true)
    try {
      const result = await generateBeastMeaning({
        beastType: selectedType.name,
        colorScheme: selectedColor.name,
        customName: name,
      })
      setMeaning(result)
    } catch (err) {
      setMeaning('星辰紊乱，神谕未能降临。')
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleMint = async () => {
    if (!account) {
      alert('请先连接钱包！')
      return
    }

    setIsMinting(true)
    setMintStatus({})

    try {
      const txb: any = createMintTransaction({
        name: name || (selectedColor.name + selectedType.name),
        description: meaning,
        imageUrl: window.location.origin + selectedType.image,
        zodiac: selectedType.name,
        element: selectedColor.name,
      })

      signAndExecute(
        { transaction: txb },
        {
          onSuccess: (result) => {
            setMintStatus({ success: true, txDigest: result.digest })
            setIsMinting(false)
          },
          onError: (err) => {
            setMintStatus({ success: false, error: err.message })
            setIsMinting(false)
          },
        }
      )
    } catch (err) {
      setIsMinting(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 10
    const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 10
    setRotate({ x: rotateX, y: rotateY })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start pb-20">
      <div className="space-y-12 text-left">
        <section className="relative">
          <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-red-500 via-red-200 to-transparent rounded-full" />
          <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">1. 唤醒神兽 <span className="text-red-500">Zodiac</span></h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {BEAST_TYPES.map((type) => (
              <button key={type.id} onClick={() => setSelectedType(type)} className={`group relative p-3 rounded-2xl border-4 transition-all duration-500 ${selectedType.id === type.id ? 'border-red-500 bg-white shadow-[0_20px_40px_rgba(239,68,68,0.2)] scale-105' : 'border-transparent bg-gray-100/50 hover:bg-white hover:border-red-100'}`}>
                <div className="relative aspect-square mb-2 overflow-hidden rounded-xl bg-gray-50/50 flex items-center justify-center">
                  <img src={type.image} alt={type.name} className={`w-full h-full object-contain p-1.5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${selectedType.id === type.id ? 'scale-110 drop-shadow-xl' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`} />
                </div>
                <div className={`text-xs font-black transition-colors ${selectedType.id === type.id ? 'text-red-600' : 'text-gray-400'}`}>{type.name}</div>
              </button>
            ))}
          </div>
        </section>
        <section className="relative">
          <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-yellow-500 via-yellow-200 to-transparent rounded-full" />
          <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">2. 注入灵气 <span className="text-yellow-600">Aura</span></h2>
          <div className="flex flex-wrap gap-4">
            {COLOR_SCHEMES.map((color) => (
              <button key={color.id} onClick={() => setSelectedColor(color)} className={`group relative px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${selectedColor.id === color.id ? 'scale-110 shadow-2xl ring-4 ring-offset-4 ring-gray-900 ' + color.bg + ' ' + color.text : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-300 hover:scale-105'}`}>
                {color.name}
              </button>
            ))}
          </div>
        </section>
        <section className="relative">
          <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-gray-900 via-gray-200 to-transparent rounded-full" />
          <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">3. 缔结契约 <span className="text-gray-500">Naming</span></h2>
          <div className="space-y-6">
            <div className="group relative">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="为你的神兽命名..." className="w-full p-6 rounded-[2rem] border-4 border-white bg-white/50 text-2xl font-black placeholder:text-gray-200 outline-none focus:ring-8 focus:ring-red-100 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl opacity-20 group-focus-within:opacity-100 group-focus-within:scale-125 transition-all">🪄</div>
            </div>
            <button onClick={handleGenerateAI} disabled={isLoadingAI} className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all ${isLoadingAI ? 'bg-gray-100 text-gray-400 cursor-wait' : 'bg-white border-4 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]'}`}>
              {isLoadingAI ? <><div className="w-5 h-5 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" /><span>正在召唤神谕...</span></> : <><span className="text-xl">✨</span><span>召唤 AI 灵启</span></>}
            </button>
          </div>
        </section>
      </div>
      <div className="md:sticky md:top-24 perspective-1000">
        <div onMouseMove={handleMouseMove} onMouseLeave={() => setRotate({x:0, y:0})} onMouseEnter={() => setIsHovered(true)} style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transition: isHovered ? 'none' : 'all 0.5s ease' }} className="bg-white rounded-[3.5rem] p-6 shadow-2xl relative overflow-hidden group border-4 border-white">
          <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30 blur-[120px] transition-all duration-1000 group-hover:opacity-50 ${selectedColor.bg}`} />
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-[3rem] p-10 border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
            <div className="relative aspect-square flex items-center justify-center mb-12 group/beast">
              <div className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse ${selectedColor.bg}`} />
              <img src={selectedType.image} alt={selectedType.name} className="w-[85%] h-[85%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover/beast:scale-110 group-hover/beast:-translate-y-4" />
            </div>
            <div className="space-y-8 text-left">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedColor.bg} animate-ping`} />
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${selectedColor.id === 'gold' ? 'text-yellow-600' : 'text-red-500'}`}>Mythical Collectible</span>
                  </div>
                  <h3 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">{name || (selectedColor.name + selectedType.name)}</h3>
                </div>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl bg-gradient-to-br ring-4 ring-white ${selectedColor.from} ${selectedColor.to} ${selectedColor.text}`}>
                  {selectedType.name.slice(-1)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Spirit Zodiac</p><p className="text-xl font-black text-gray-800">{selectedType.emoji} {selectedType.name}</p></div>
                <div className="bg-white/60 p-5 rounded-[1.5rem] border border-white shadow-sm"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Elemental Aura</p><p className="text-xl font-black text-gray-800">{selectedColor.name}</p></div>
              </div>
              <div className="relative min-h-[100px]"><div className="absolute -left-4 top-0 w-1 h-full bg-gray-100 rounded-full" /><p className="text-base text-gray-500 leading-relaxed font-medium italic pl-4">“ {displayedMeaning} ”</p></div>
              <div className="space-y-4">
                <button onClick={handleMint} disabled={isMinting || isLoadingAI} className="w-full group/btn relative overflow-hidden py-7 rounded-[2rem] bg-gray-900 text-white font-black text-2xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-40 transition-opacity bg-gradient-to-r ${selectedColor.from} ${selectedColor.to}`} />
                  <div className="relative flex items-center justify-center gap-3">{isMinting ? <><div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /><span>MINTING...</span></> : <><span>MINT ON SUI</span><span className="group-hover/btn:translate-x-2 transition-transform">✨</span></>}</div>
                </button>
                {mintStatus.success && <div className="p-4 bg-green-50 border-2 border-green-200 rounded-2xl animate-in zoom-in-95 text-center text-green-800 font-bold">🎉 铸造成功！神兽已降临钱包 <a href={`https://suiscan.xyz/testnet/tx/${mintStatus.txDigest}`} target="_blank" className="block text-xs text-green-600 underline mt-1 font-bold">查看链上凭证 ➔</a></div>}
                {mintStatus.error && <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl animate-in shake text-center text-red-800 font-bold text-sm">❌ 铸造失败: {mintStatus.error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: ` @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } } @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } } .animate-shimmer { animation: shimmer 2.5s infinite; } .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 5s ease infinite; } .perspective-1000 { perspective: 1000px; } `}} />
    </div>
  )
}
