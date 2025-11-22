import React from 'react'
import { Info } from 'lucide-react'
import { COBIT_DISCLAIMER, SHORT_DISCLAIMER } from '../constants/disclaimer'

interface DisclaimerBannerProps {
  variant?: 'full' | 'short'
}

const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ variant = 'short' }) => {
  const text = variant === 'full' ? COBIT_DISCLAIMER : SHORT_DISCLAIMER

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-yellow-800">
          <p className="font-medium mb-1">Implementation Support Tool</p>
          <p className="whitespace-pre-line">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default DisclaimerBanner
