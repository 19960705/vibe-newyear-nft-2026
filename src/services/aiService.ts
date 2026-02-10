/**
 * AI 服务 (Anyrouter 版)
 * 兼容旧版调用接口
 */

const AI_CONFIG = {
  apiKey: import.meta.env.VITE_ANYROUTER_API_KEY || '',
  apiEndpoint: 'https://api.anyrouter.com/v1',
  model: import.meta.env.VITE_AI_MODEL || 'deepseek/deepseek-chat',
}

/**
 * 核心：生成神兽神话寓意
 */
export async function generateBeastMeaning({
  beastType,
  colorScheme,
  customName,
}: {
  beastType: string
  colorScheme: string
  customName: string
}): Promise<string> {
  if (!AI_CONFIG.apiKey) return `身披${colorScheme}神采，此乃 2026 丙午年之守护灵。${beastType}降世。`;

  try {
    const response = await fetch(`${AI_CONFIG.apiEndpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: '你是一位精通神话的占卜专家，请根据输入生成 50 字左右的神兽寓意文案。',
          },
          {
            role: 'user',
            content: `神兽：${beastType}, 颜色：${colorScheme}, 名字：${customName}`,
          },
        ],
      }),
    })
    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    return `瑞气东来，${beastType}护佑。`;
  }
}

// 兼容性导出：让旧代码不报错
export const generateBeastDescription = generateBeastMeaning;
export const suggestBeastAttributes = async () => ({
  recommendedType: 'dragon',
  recommendedColor: 'gold',
  recommendedAccessories: [],
});
export const generateBeastImage = async () => '/assets/beasts/dragon.png';

export default {
  generateBeastMeaning,
  generateBeastDescription,
  suggestBeastAttributes,
  generateBeastImage,
}
