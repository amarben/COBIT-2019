import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { ProcessCapability } from '../../types'

interface GapAnalysisChartProps {
  capabilities: ProcessCapability[]
}

const GapAnalysisChart: React.FC<GapAnalysisChartProps> = ({ capabilities }) => {
  // Group by domain and calculate average gap
  const domains = ['EDM', 'APO', 'BAI', 'DSS', 'MEA']

  const data = domains.map(domain => {
    const domainCaps = capabilities.filter(c => c.domain === domain)
    if (domainCaps.length === 0) {
      return {
        domain,
        avgGap: 0,
        count: 0
      }
    }

    const avgGap = domainCaps.reduce((sum, c) => sum + c.gap, 0) / domainCaps.length

    return {
      domain,
      avgGap: Number(avgGap.toFixed(2)),
      count: domainCaps.length
    }
  })

  if (capabilities.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No capability data available for gap analysis</p>
      </div>
    )
  }

  const getBarColor = (gap: number) => {
    if (gap > 2) return '#ef4444' // red - large gap
    if (gap > 1) return '#f97316' // orange - medium gap
    if (gap > 0) return '#eab308' // yellow - small gap
    return '#22c55e' // green - no gap
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="domain" tick={{ fill: '#374151', fontSize: 12 }} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} label={{ value: 'Average Gap', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value: number, name: string, props: any) => {
            if (name === 'avgGap') {
              return [`${value.toFixed(2)} levels (${props.payload.count} processes)`, 'Avg Gap']
            }
            return value
          }}
        />
        <Legend />
        <Bar dataKey="avgGap" name="Average Gap" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.avgGap)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default GapAnalysisChart
