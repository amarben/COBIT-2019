import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface PhaseProgressChartProps {
  phases: {
    id: number
    name: string
    progress: number
    color: string
  }[]
}

const PhaseProgressChart: React.FC<PhaseProgressChartProps> = ({ phases }) => {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    purple: '#9333ea',
    green: '#22c55e',
    orange: '#f97316'
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={phases} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} />
        <YAxis dataKey="name" type="category" tick={{ fill: '#374151', fontSize: 12 }} width={90} />
        <Tooltip
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          formatter={(value: number) => `${value.toFixed(0)}%`}
        />
        <Bar dataKey="progress" radius={[0, 8, 8, 0]}>
          {phases.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorMap[entry.color] || '#6b7280'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PhaseProgressChart
