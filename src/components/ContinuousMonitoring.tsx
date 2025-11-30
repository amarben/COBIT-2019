import React, { useState, useMemo } from 'react'
import { Eye, TrendingUp, AlertCircle, CheckCircle2, Download, Plus, Trash2, Edit2, Activity, Shield, BarChart3, FileText } from 'lucide-react'
import { AppData, PerformanceMetric } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface ContinuousMonitoringProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

// TechCorp example monitoring data
const TECHCORP_MONITORING_DATA: PerformanceMetric[] = [
  // Governance Performance Metrics
  {
    id: '1',
    objectiveId: 'EDM01',
    name: 'Board Meetings Held',
    category: 'lag',
    targetValue: 12,
    currentValue: 11,
    unit: 'meetings/year',
    frequency: 'monthly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '2',
    objectiveId: 'EDM01',
    name: 'Governance Policy Compliance Rate',
    category: 'lag',
    targetValue: 95,
    currentValue: 92,
    unit: '%',
    frequency: 'quarterly',
    status: 'at-risk',
    trend: 'stable'
  },
  {
    id: '3',
    objectiveId: 'EDM02',
    name: 'IT Investment ROI',
    category: 'lag',
    targetValue: 18,
    currentValue: 16.5,
    unit: '%',
    frequency: 'quarterly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '4',
    objectiveId: 'EDM02',
    name: 'Benefits Realization Rate',
    category: 'lag',
    targetValue: 85,
    currentValue: 78,
    unit: '%',
    frequency: 'quarterly',
    status: 'at-risk',
    trend: 'declining'
  },
  {
    id: '5',
    objectiveId: 'EDM03',
    name: 'Critical Incidents',
    category: 'lag',
    targetValue: 0,
    currentValue: 2,
    unit: 'incidents/quarter',
    frequency: 'monthly',
    status: 'critical',
    trend: 'stable'
  },
  {
    id: '6',
    objectiveId: 'EDM03',
    name: 'Risk Assessment Coverage',
    category: 'lead',
    targetValue: 100,
    currentValue: 95,
    unit: '%',
    frequency: 'monthly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '7',
    objectiveId: 'EDM04',
    name: 'IT Budget Variance',
    category: 'lag',
    targetValue: 5,
    currentValue: 3.2,
    unit: '%',
    frequency: 'monthly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '8',
    objectiveId: 'EDM04',
    name: 'Resource Utilization Rate',
    category: 'lag',
    targetValue: 85,
    currentValue: 87,
    unit: '%',
    frequency: 'weekly',
    status: 'on-track',
    trend: 'stable'
  },
  {
    id: '9',
    objectiveId: 'EDM05',
    name: 'Stakeholder Satisfaction Score',
    category: 'lag',
    targetValue: 4.5,
    currentValue: 4.2,
    unit: 'score (1-5)',
    frequency: 'quarterly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '10',
    objectiveId: 'EDM05',
    name: 'Communication Effectiveness',
    category: 'lead',
    targetValue: 90,
    currentValue: 88,
    unit: '%',
    frequency: 'monthly',
    status: 'on-track',
    trend: 'stable'
  },
  // APO Metrics
  {
    id: '11',
    objectiveId: 'APO01',
    name: 'IT Strategy Alignment Score',
    category: 'lag',
    targetValue: 4.0,
    currentValue: 3.8,
    unit: 'score (1-5)',
    frequency: 'quarterly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '12',
    objectiveId: 'APO02',
    name: 'Architecture Compliance Rate',
    category: 'lag',
    targetValue: 95,
    currentValue: 91,
    unit: '%',
    frequency: 'monthly',
    status: 'at-risk',
    trend: 'stable'
  },
  {
    id: '13',
    objectiveId: 'APO07',
    name: 'Staff Competency Level',
    category: 'lead',
    targetValue: 4.0,
    currentValue: 3.7,
    unit: 'score (1-5)',
    frequency: 'quarterly',
    status: 'on-track',
    trend: 'improving'
  },
  // BAI Metrics
  {
    id: '14',
    objectiveId: 'BAI02',
    name: 'Requirements Traceability',
    category: 'lead',
    targetValue: 100,
    currentValue: 94,
    unit: '%',
    frequency: 'per-project',
    status: 'on-track',
    trend: 'stable'
  },
  {
    id: '15',
    objectiveId: 'BAI03',
    name: 'Solution Delivery On-Time Rate',
    category: 'lag',
    targetValue: 90,
    currentValue: 85,
    unit: '%',
    frequency: 'monthly',
    status: 'at-risk',
    trend: 'declining'
  },
  {
    id: '16',
    objectiveId: 'BAI06',
    name: 'Change Success Rate',
    category: 'lag',
    targetValue: 98,
    currentValue: 96,
    unit: '%',
    frequency: 'monthly',
    status: 'on-track',
    trend: 'stable'
  },
  // DSS Metrics
  {
    id: '17',
    objectiveId: 'DSS01',
    name: 'Service Availability',
    category: 'lag',
    targetValue: 99.9,
    currentValue: 99.7,
    unit: '%',
    frequency: 'daily',
    status: 'on-track',
    trend: 'stable'
  },
  {
    id: '18',
    objectiveId: 'DSS02',
    name: 'Incident Resolution Time',
    category: 'lag',
    targetValue: 4,
    currentValue: 5.2,
    unit: 'hours',
    frequency: 'daily',
    status: 'at-risk',
    trend: 'stable'
  },
  {
    id: '19',
    objectiveId: 'DSS05',
    name: 'Security Incident Response Time',
    category: 'lag',
    targetValue: 2,
    currentValue: 1.8,
    unit: 'hours',
    frequency: 'daily',
    status: 'on-track',
    trend: 'improving'
  },
  // MEA Metrics
  {
    id: '20',
    objectiveId: 'MEA01',
    name: 'Compliance Audit Findings',
    category: 'lag',
    targetValue: 0,
    currentValue: 3,
    unit: 'findings',
    frequency: 'quarterly',
    status: 'at-risk',
    trend: 'stable'
  },
  {
    id: '21',
    objectiveId: 'MEA02',
    name: 'Internal Control Effectiveness',
    category: 'lag',
    targetValue: 95,
    currentValue: 93,
    unit: '%',
    frequency: 'quarterly',
    status: 'on-track',
    trend: 'improving'
  },
  {
    id: '22',
    objectiveId: 'MEA03',
    name: 'Regulatory Compliance Rate',
    category: 'lag',
    targetValue: 100,
    currentValue: 98,
    unit: '%',
    frequency: 'monthly',
    status: 'at-risk',
    trend: 'stable'
  }
]

const ContinuousMonitoring: React.FC<ContinuousMonitoringProps> = ({ appData, updateAppData }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'on-track' | 'at-risk' | 'critical'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PerformanceMetric>>({})

  const hasUserData = appData.metrics && appData.metrics.length > 0

  const loadExample = () => {
    updateAppData({ metrics: TECHCORP_MONITORING_DATA })
  }

  const displayData = hasUserData ? appData.metrics : []

  // Calculate monitoring metrics
  const monitoringMetrics = useMemo(() => {
    if (displayData.length === 0) return null

    const totalMetrics = displayData.length
    const onTrack = displayData.filter(m => m.status === 'on-track').length
    const atRisk = displayData.filter(m => m.status === 'at-risk').length
    const critical = displayData.filter(m => m.status === 'critical').length

    const improving = displayData.filter(m => m.trend === 'improving').length
    const stable = displayData.filter(m => m.trend === 'stable').length
    const declining = displayData.filter(m => m.trend === 'declining').length

    const healthScore = ((onTrack / totalMetrics) * 100).toFixed(0)

    // Group by objective
    const byObjective = displayData.reduce((acc, m) => {
      if (!acc[m.objectiveId]) {
        acc[m.objectiveId] = []
      }
      acc[m.objectiveId].push(m)
      return acc
    }, {} as Record<string, PerformanceMetric[]>)

    // Find objectives with issues
    const objectivesAtRisk = Object.entries(byObjective)
      .filter(([_, metrics]) => metrics.some(m => m.status === 'at-risk' || m.status === 'critical'))
      .map(([objectiveId]) => objectiveId)

    return {
      totalMetrics,
      onTrack,
      atRisk,
      critical,
      improving,
      stable,
      declining,
      healthScore,
      objectivesAtRisk
    }
  }, [displayData])

  const filteredData = useMemo(() => {
    if (selectedFilter === 'all') return displayData
    return displayData.filter(m => m.status === selectedFilter)
  }, [displayData, selectedFilter])

  const getStatusColor = (status: PerformanceMetric['status']): string => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 border-green-300'
      case 'at-risk': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'critical': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getTrendIcon = (trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const handleAdd = () => {
    setFormData({
      objectiveId: '',
      name: '',
      category: 'lag',
      targetValue: 0,
      currentValue: 0,
      unit: '',
      frequency: 'monthly',
      status: 'on-track',
      trend: 'stable'
    })
    setEditingId('new')
  }

  const handleEdit = (metric: PerformanceMetric) => {
    setFormData(metric)
    setEditingId(metric.id)
  }

  const handleSave = () => {
    if (editingId === 'new') {
      const newMetric: PerformanceMetric = {
        ...formData as PerformanceMetric,
        id: Date.now().toString()
      }
      updateAppData({ metrics: [...displayData, newMetric] })
    } else {
      updateAppData({
        metrics: displayData.map(m => m.id === editingId ? { ...formData as PerformanceMetric } : m)
      })
    }
    setEditingId(null)
    setFormData({})
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this metric?')) {
      updateAppData({ metrics: displayData.filter(m => m.id !== id) })
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({})
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="gradient-emerald text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Eye className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Continuous Monitoring</h1>
        </div>
        <p className="text-emerald-100">Monitor governance performance and compliance in real-time</p>
        {monitoringMetrics && (
          <p className="text-emerald-200 text-sm mt-2">
            Health Score: {monitoringMetrics.healthScore}% • {monitoringMetrics.totalMetrics} Metrics Tracked
          </p>
        )}
      </div>

      <DisclaimerBanner />

      {/* Empty State */}
      {!hasUserData && (
        <div className="card bg-emerald-50 border-emerald-200 text-center py-12">
          <Eye className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-emerald-900 mb-2">No Monitoring Data Yet</h3>
          <p className="text-emerald-700 mb-6 max-w-2xl mx-auto">
            Set up continuous monitoring to track governance performance metrics and ensure objectives are met.
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={loadExample} className="btn-secondary">
              <Download className="w-4 h-4" />
              Load TechCorp Example
            </button>
            <button onClick={handleAdd} className="btn-primary">
              <Plus className="w-4 h-4" />
              Add First Metric
            </button>
          </div>
        </div>
      )}

      {/* Monitoring Dashboard */}
      {hasUserData && monitoringMetrics && (
        <>
          {/* Health Overview */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              Governance Health Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="text-sm text-emerald-700 mb-1">Overall Health</div>
                <div className="text-3xl font-bold text-emerald-900">{monitoringMetrics.healthScore}%</div>
                <div className="text-xs text-emerald-600 mt-1">{monitoringMetrics.onTrack} on track</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700 mb-1">On Track</div>
                <div className="text-3xl font-bold text-green-900">{monitoringMetrics.onTrack}</div>
                <div className="text-xs text-green-600 mt-1">Meeting targets</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-orange-700 mb-1">At Risk</div>
                <div className="text-3xl font-bold text-orange-900">{monitoringMetrics.atRisk}</div>
                <div className="text-xs text-orange-600 mt-1">Needs attention</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-700 mb-1">Critical</div>
                <div className="text-3xl font-bold text-red-900">{monitoringMetrics.critical}</div>
                <div className="text-xs text-red-600 mt-1">Immediate action</div>
              </div>
            </div>
          </div>

          {/* Trend Analysis */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Performance Trends
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">Improving</span>
                </div>
                <div className="text-2xl font-bold text-green-900">{monitoringMetrics.improving}</div>
                <div className="text-xs text-green-700 mt-1">Metrics trending upward</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Stable</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{monitoringMetrics.stable}</div>
                <div className="text-xs text-gray-700 mt-1">Metrics holding steady</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                  <span className="font-semibold text-red-900">Declining</span>
                </div>
                <div className="text-2xl font-bold text-red-900">{monitoringMetrics.declining}</div>
                <div className="text-xs text-red-700 mt-1">Metrics trending downward</div>
              </div>
            </div>
          </div>

          {/* Objectives at Risk */}
          {monitoringMetrics.objectivesAtRisk.length > 0 && (
            <div className="card bg-orange-50 border-orange-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-900">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                Objectives Requiring Attention
              </h2>
              <div className="flex flex-wrap gap-2">
                {monitoringMetrics.objectivesAtRisk.map(objId => (
                  <span key={objId} className="px-3 py-1 bg-orange-100 text-orange-800 border border-orange-300 rounded-lg text-sm font-semibold">
                    {objId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Filters and Actions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-600" />
                Performance Metrics ({filteredData.length})
              </h2>
              <button onClick={handleAdd} className="btn-primary">
                <Plus className="w-4 h-4" />
                Add Metric
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4 border-b border-gray-200">
              {(['all', 'on-track', 'at-risk', 'critical'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 font-medium text-sm transition-colors ${
                    selectedFilter === filter
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter === 'on-track' ? 'On Track' : filter === 'at-risk' ? 'At Risk' : 'Critical'}
                </button>
              ))}
            </div>

            {/* Metrics List */}
            <div className="space-y-3">
              {filteredData.map(metric => (
                <div key={metric.id} className={`p-4 rounded-lg border ${getStatusColor(metric.status)}`}>
                  {editingId === metric.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={formData.objectiveId || ''}
                          onChange={e => setFormData({ ...formData, objectiveId: e.target.value })}
                          placeholder="Objective ID (e.g., EDM01)"
                          className="input"
                        />
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Metric name"
                          className="input"
                        />
                        <select
                          value={formData.category || 'lag'}
                          onChange={e => setFormData({ ...formData, category: e.target.value as 'lag' | 'lead' })}
                          className="input"
                        >
                          <option value="lag">Lag Indicator</option>
                          <option value="lead">Lead Indicator</option>
                        </select>
                        <select
                          value={formData.frequency || 'monthly'}
                          onChange={e => setFormData({ ...formData, frequency: e.target.value as any })}
                          className="input"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="per-project">Per Project</option>
                        </select>
                        <input
                          type="number"
                          value={formData.targetValue || 0}
                          onChange={e => setFormData({ ...formData, targetValue: parseFloat(e.target.value) })}
                          placeholder="Target value"
                          className="input"
                        />
                        <input
                          type="number"
                          value={formData.currentValue || 0}
                          onChange={e => setFormData({ ...formData, currentValue: parseFloat(e.target.value) })}
                          placeholder="Current value"
                          className="input"
                        />
                        <input
                          type="text"
                          value={formData.unit || ''}
                          onChange={e => setFormData({ ...formData, unit: e.target.value })}
                          placeholder="Unit (e.g., %, hours)"
                          className="input"
                        />
                        <select
                          value={formData.status || 'on-track'}
                          onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                          className="input"
                        >
                          <option value="on-track">On Track</option>
                          <option value="at-risk">At Risk</option>
                          <option value="critical">Critical</option>
                        </select>
                        <select
                          value={formData.trend || 'stable'}
                          onChange={e => setFormData({ ...formData, trend: e.target.value as any })}
                          className="input"
                        >
                          <option value="improving">Improving</option>
                          <option value="stable">Stable</option>
                          <option value="declining">Declining</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="btn-primary">Save</button>
                        <button onClick={handleCancel} className="btn-secondary">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-gray-700 text-white rounded text-xs font-bold">
                              {metric.objectiveId}
                            </span>
                            <span className="px-2 py-0.5 bg-white bg-opacity-50 rounded text-xs font-medium">
                              {metric.category === 'lag' ? 'Lag Indicator' : 'Lead Indicator'}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg">{metric.name}</h3>
                          <div className="text-sm mt-1">Frequency: {metric.frequency}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(metric.trend)}
                          <button onClick={() => handleEdit(metric)} className="p-2 hover:bg-white hover:bg-opacity-50 rounded transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(metric.id)} className="p-2 hover:bg-white hover:bg-opacity-50 rounded transition-colors text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <div className="text-xs opacity-75">Target</div>
                          <div className="text-xl font-bold">{metric.targetValue} {metric.unit}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-75">Current</div>
                          <div className="text-xl font-bold">{metric.currentValue} {metric.unit}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-75">Achievement</div>
                          <div className="text-xl font-bold">
                            {metric.targetValue > 0 ? ((metric.currentValue / metric.targetValue) * 100).toFixed(0) : 0}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {editingId === 'new' && (
                <div className="p-4 rounded-lg border border-emerald-300 bg-emerald-50">
                  <h3 className="font-bold mb-3">Add New Metric</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formData.objectiveId || ''}
                        onChange={e => setFormData({ ...formData, objectiveId: e.target.value })}
                        placeholder="Objective ID (e.g., EDM01)"
                        className="input"
                      />
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Metric name"
                        className="input"
                      />
                      <select
                        value={formData.category || 'lag'}
                        onChange={e => setFormData({ ...formData, category: e.target.value as 'lag' | 'lead' })}
                        className="input"
                      >
                        <option value="lag">Lag Indicator</option>
                        <option value="lead">Lead Indicator</option>
                      </select>
                      <select
                        value={formData.frequency || 'monthly'}
                        onChange={e => setFormData({ ...formData, frequency: e.target.value as any })}
                        className="input"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="per-project">Per Project</option>
                      </select>
                      <input
                        type="number"
                        value={formData.targetValue || 0}
                        onChange={e => setFormData({ ...formData, targetValue: parseFloat(e.target.value) })}
                        placeholder="Target value"
                        className="input"
                      />
                      <input
                        type="number"
                        value={formData.currentValue || 0}
                        onChange={e => setFormData({ ...formData, currentValue: parseFloat(e.target.value) })}
                        placeholder="Current value"
                        className="input"
                      />
                      <input
                        type="text"
                        value={formData.unit || ''}
                        onChange={e => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="Unit (e.g., %, hours)"
                        className="input"
                      />
                      <select
                        value={formData.status || 'on-track'}
                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                        className="input"
                      >
                        <option value="on-track">On Track</option>
                        <option value="at-risk">At Risk</option>
                        <option value="critical">Critical</option>
                      </select>
                      <select
                        value={formData.trend || 'stable'}
                        onChange={e => setFormData({ ...formData, trend: e.target.value as any })}
                        className="input"
                      >
                        <option value="improving">Improving</option>
                        <option value="stable">Stable</option>
                        <option value="declining">Declining</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="btn-primary">Add Metric</button>
                      <button onClick={handleCancel} className="btn-secondary">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="card bg-emerald-50 border-emerald-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              Monitoring Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <p className="text-gray-700">
                  <strong>Active Monitoring:</strong> {monitoringMetrics.totalMetrics} performance metrics tracked across COBIT objectives
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <p className="text-gray-700">
                  <strong>Health Score:</strong> {monitoringMetrics.healthScore}% overall governance health
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className={`${monitoringMetrics.atRisk > 0 || monitoringMetrics.critical > 0 ? 'text-orange-600' : 'text-green-600'} mt-0.5`}>
                  {monitoringMetrics.atRisk > 0 || monitoringMetrics.critical > 0 ? '→' : '✓'}
                </span>
                <p className="text-gray-700">
                  <strong>Action Items:</strong> {monitoringMetrics.atRisk} metrics at risk, {monitoringMetrics.critical} critical
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">→</span>
                <p className="text-gray-700">
                  <strong>Next Step:</strong> Conduct performance analysis to identify root causes and improvement opportunities
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ContinuousMonitoring
