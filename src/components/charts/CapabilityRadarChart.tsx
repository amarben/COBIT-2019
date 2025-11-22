import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { ProcessCapability } from '../../types'

interface CapabilityRadarChartProps {
  capabilities: ProcessCapability[]
}

const CapabilityRadarChart: React.FC<CapabilityRadarChartProps> = ({ capabilities }) => {
  const domains = ['EDM', 'APO', 'BAI', 'DSS', 'MEA']

  const data = domains.map(domain => {
    const domainCaps = capabilities.filter(c => c.domain === domain)
    if (domainCaps.length === 0) {
      return {
        domain,
        current: 0,
        target: 0
      }
    }

    const avgCurrent = domainCaps.reduce((sum, c) => sum + c.currentLevel, 0) / domainCaps.length
    const avgTarget = domainCaps.reduce((sum, c) => sum + c.targetLevel, 0) / domainCaps.length

    return {
      domain,
      current: Number(avgCurrent.toFixed(2)),
      target: Number(avgTarget.toFixed(2))
    }
  })

  if (capabilities.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No capability data available yet</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke="#d1d5db" />
        <PolarAngleAxis dataKey="domain" tick={{ fill: '#374151', fontSize: 14 }} />
        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 12 }} />
        <Radar
          name="Current Level"
          dataKey="current"
          stroke="#14b8a6"
          fill="#14b8a6"
          fillOpacity={0.6}
        />
        <Radar
          name="Target Level"
          dataKey="target"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default CapabilityRadarChart
