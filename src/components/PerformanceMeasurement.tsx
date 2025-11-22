import React, { useState } from 'react'
import { BarChart, Save, Plus } from 'lucide-react'
import { AppData, PerformanceMetric } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface PerformanceMeasurementProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const PerformanceMeasurement: React.FC<PerformanceMeasurementProps> = ({ appData, updateAppData }) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(appData.metrics)
  const [newMetric, setNewMetric] = useState<Partial<PerformanceMetric>>({
    name: '',
    type: 'kpi',
    objectiveId: '',
    target: 0,
    current: 0,
    unit: '%'
  })

  const handleSave = () => {
    updateAppData({ metrics })
  }

  const addMetric = () => {
    if (newMetric.name && newMetric.objectiveId) {
      setMetrics([
        ...metrics,
        {
          id: `M${metrics.length + 1}`,
          name: newMetric.name,
          type: newMetric.type || 'kpi',
          objectiveId: newMetric.objectiveId,
          target: newMetric.target || 0,
          current: newMetric.current || 0,
          unit: newMetric.unit || '%'
        }
      ])
      setNewMetric({
        name: '',
        type: 'kpi',
        objectiveId: '',
        target: 0,
        current: 0,
        unit: '%'
      })
    }
  }

  const updateMetric = (index: number, field: keyof PerformanceMetric, value: any) => {
    const updated = [...metrics]
    updated[index] = { ...updated[index], [field]: value }
    setMetrics(updated)
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <BarChart className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Performance Measurement</h1>
        </div>
        <p className="text-teal-100">Establish KPIs and performance metrics</p>
      </div>

      <DisclaimerBanner />

      <div className="card">
        <h3 className="font-semibold mb-4">Add Performance Metric</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newMetric.name}
            onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
            placeholder="Metric name"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={newMetric.type}
            onChange={(e) => setNewMetric({ ...newMetric, type: e.target.value as any })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="kpi">KPI</option>
            <option value="process-capability">Process Capability</option>
            <option value="goal">Goal</option>
          </select>
          <input
            type="text"
            value={newMetric.objectiveId}
            onChange={(e) => setNewMetric({ ...newMetric, objectiveId: e.target.value })}
            placeholder="Objective ID (e.g., EDM01)"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            value={newMetric.target}
            onChange={(e) => setNewMetric({ ...newMetric, target: parseFloat(e.target.value) })}
            placeholder="Target"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            value={newMetric.current}
            onChange={(e) => setNewMetric({ ...newMetric, current: parseFloat(e.target.value) })}
            placeholder="Current"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={newMetric.unit}
              onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
              placeholder="Unit"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
            <button onClick={addMetric} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {metrics.length > 0 && (
        <div className="card overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-sm font-semibold">Metric</th>
                <th className="text-left py-2 px-2 text-sm font-semibold">Type</th>
                <th className="text-left py-2 px-2 text-sm font-semibold">Objective</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Current</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Target</th>
                <th className="text-center py-2 px-2 text-sm font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => {
                const progress = metric.target > 0 ? (metric.current / metric.target) * 100 : 0
                return (
                  <tr key={metric.id} className="border-b border-gray-100">
                    <td className="py-2 px-2 text-sm font-medium">{metric.name}</td>
                    <td className="py-2 px-2 text-sm">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                        {metric.type}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-sm">{metric.objectiveId}</td>
                    <td className="py-2 px-2 text-center">
                      <input
                        type="number"
                        value={metric.current}
                        onChange={(e) => updateMetric(index, 'current', parseFloat(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                      />
                    </td>
                    <td className="py-2 px-2 text-center">
                      {metric.target}{metric.unit}
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              progress >= 100 ? 'bg-green-600' : progress >= 75 ? 'bg-blue-600' : 'bg-yellow-600'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium w-12 text-right">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Metrics
        </button>
      </div>
    </div>
  )
}

export default PerformanceMeasurement
