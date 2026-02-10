/**
 * Sui SDK 服务 (真实上链版)
 * 核心功能：
 * 1. 提供合约配置
 * 2. 构造铸造交易块
 */

import { Transaction } from '@mysten/sui/transactions';

// 已部署的合约配置 (已修正 URL 版本)
export const CONTRACT_CONFIG = {
  packageId: '0xbd35be3b17c1da5f7a32796e563cd93b81adc127b57bec6142d636ae5a815f87',
  moduleName: 'vibe_nft',
  functionName: 'mint',
};

/**
 * 构造铸造 NFT 的交易块
 */
export function createMintTransaction({
  name,
  description,
  imageUrl,
  zodiac,
  element,
}: {
  name: string
  description: string
  imageUrl: string
  zodiac: string
  element: string
}) {
  const txb = new Transaction();

  txb.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::${CONTRACT_CONFIG.moduleName}::${CONTRACT_CONFIG.functionName}`,
    arguments: [
      txb.pure.string(name),
      txb.pure.string(description),
      txb.pure.string(imageUrl),
      txb.pure.string(zodiac),
      txb.pure.string(element),
    ],
  });

  return txb;
}

export default {
  CONTRACT_CONFIG,
  createMintTransaction,
}
