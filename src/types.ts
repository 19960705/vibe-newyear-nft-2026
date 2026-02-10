export interface BeastType {
  id: string
  name: string
  emoji: string
  icon: string
}

export interface ColorScheme {
  id: string
  name: string
  colors: string[]
}

export interface BeastAttributes {
  type: string
  colorScheme: ColorScheme
  customName: string
  luckyNumber: number
  meaning: string
  accessories: string[]
}

export interface Beast {
  id: string
  type: string
  typeData: BeastType
  colorScheme: ColorScheme
  customName: string
  luckyNumber: number
  meaning: string
  accessories?: string[]
  generatedAt: string
  mintedAt?: string
  minted?: boolean
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  likes: number
  owner?: string
}

export interface UserInfo {
  birthYear: number
  zodiac: string
  preferences: string[]
}

export interface MintResult {
  success: boolean
  beastId: string
  transactionId: string
  error?: string
}

export interface AIResponse {
  description: string
  suggestedAttributes: Partial<BeastAttributes>
}
