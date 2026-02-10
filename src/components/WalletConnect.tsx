import React from 'react'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'

export default function WalletConnect() {
  const account = useCurrentAccount()

  return (
    <div className="flex items-center gap-4">
      {account ? (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-mono text-green-700">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </span>
        </div>
      ) : null}
      <ConnectButton />
    </div>
  )
}
