import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { PerformanceMetric } from '../../types'

interface MetricsProgressChartProps {
  metrics: PerformanceMetric[]
  maxMetrics?: number
}

const MetricsProgressChart: React.FC<MetricsProgressChartProps> = ({ metrics, maxMetrics = 10 }) => {
  const displayMetrics = metrics.slice(0, maxMetrics)

  const data = displayMetrics.map(m => {
    const progress = m.target > 0 ? (m.current / m.target) * 100 : 0
    return {
      name: m.name.length > 20 ? m.name.substring(0, 20) + '...' : m.name,
      progress: Number(progress.toFixed(1)),
      current: m.current,
      target: m.target,
      unit: m.unit
    }
  })

  if (metrics.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No performance metrics defined yet</p>
      </div>
    )
  }

  const getBarColor = (progress: number) => {
    if (progress >= 100) return '#22c55e' // green
    if (progress >= 80) return '#eab308' // yellow
    return '#ef4444' // red
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(300, displayMetrics.length * 40)}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} />
        <YAxis dataKey="name" type="category" tick={{ fill: '#374151', fontSize: 11 }} width={140} />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value: number, name: string, props: any) => {
            if (name === 'progress') {
              return [`${value.toFixed(1)}% (${props.payload.current}/${props.payload.target}${props.payload.unit})`, 'Progress']
            }
            return value
          }}
        />
        <Bar dataKey="progress" radius={[0, 8, 8, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.progress)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MetricsProgressChart
