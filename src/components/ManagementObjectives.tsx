import React, { useState, useEffect } from 'react'
import { GitBranch, Save, Filter, Compass, Package, Headphones, Activity } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import { managementObjectivesData } from '../data/managementObjectives'

interface ManagementObjectivesProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
  selectedDomain?: string
}

const domainInfo = {
  apo: {
    name: 'APO: Align, Plan and Organize',
    description: '14 objectives for aligning IT strategy with enterprise strategy',
    icon: Compass,
    color: 'blue',
    count: 14
  },
  bai: {
    name: 'BAI: Build, Acquire and Implement',
    description: '11 objectives for delivering and implementing IT solutions',
    icon: Package,
    color: 'green',
    count: 11
  },
  dss: {
    name: 'DSS: Deliver, Service and Support',
    description: '6 objectives for operating and supporting IT services',
    icon: Headphones,
    color: 'orange',
    count: 6
  },
  mea: {
    name: 'MEA: Monitor, Evaluate and Assess',
    description: '4 objectives for monitoring governance and management performance',
    icon: Activity,
    color: 'indigo',
    count: 4
  }
}

const ManagementObjectives: React.FC<ManagementObjectivesProps> = ({
  appData,
  updateAppData,
  selectedDomain
}) => {
  const [objectives, setObjectives] = useState(
    appData.managementObjectives.length > 0
      ? appData.managementObjectives
      : managementObjectivesData
  )
  const [filterDomain, setFilterDomain] = useState<string | null>(null)
  const [filterPriority, setFilterPriority] = useState<string | null>(null)

  useEffect(() => {
    if (appData.managementObjectives.length > 0) {
      setObjectives(appData.managementObjectives)
    }
  }, [appData.managementObjectives])

  useEffect(() => {
    if (selectedDomain && selectedDomain !== 'management-objectives') {
      setFilterDomain(selectedDomain.toUpperCase())
    }
  }, [selectedDomain])

  const handleSave = () => {
    updateAppData({ managementObjectives: objectives })
  }

  const toggleObjective = (objectiveId: string) => {
    setObjectives(
      objectives.map(obj =>
        obj.id === objectiveId ? { ...obj, enabled: !obj.enabled } : obj
      )
    )
  }

  const setPriority = (objectiveId: string, priority: 'high' | 'medium' | 'low') => {
    setObjectives(
      objectives.map(obj =>
        obj.id === objectiveId ? { ...obj, priority } : obj
      )
    )
  }

  const filteredObjectives = objectives.filter(obj => {
    if (filterDomain && obj.domain !== filterDomain) return false
    if (filterPriority && obj.priority !== filterPriority) return false
    return true
  })

  const getDomainStats = (domain: string) => {
    const domainObjs = objectives.filter(o => o.domain === domain)
    return {
      total: domainObjs.length,
      enabled: domainObjs.filter(o => o.enabled).length,
      high: domainObjs.filter(o => o.priority === 'high').length
    }
  }

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'APO': return 'blue'
      case 'BAI': return 'green'
      case 'DSS': return 'orange'
      case 'MEA': return 'indigo'
      default: return 'gray'
    }
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <GitBranch className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Management Objectives</h1>
        </div>
        <p className="text-teal-100">
          35 management objectives across APO, BAI, DSS, and MEA domains
        </p>
      </div>

      <DisclaimerBanner />

      {/* Domain Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(domainInfo).map(([key, info]) => {
          const stats = getDomainStats(key.toUpperCase())
          const Icon = info.icon
          return (
            <button
              key={key}
              onClick={() => setFilterDomain(filterDomain === key.toUpperCase() ? null : key.toUpperCase())}
              className={`card text-left transition-all ${
                filterDomain === key.toUpperCase()
                  ? `border-2 border-${info.color}-500 bg-${info.color}-50`
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-8 h-8 text-${info.color}-600`} />
                <span className="text-2xl font-bold text-gray-900">
                  {stats.enabled}/{stats.total}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">{key.toUpperCase()}</h3>
              <p className="text-xs text-gray-600">{info.description.split(':')[1]}</p>
              <div className="mt-2 text-xs text-gray-500">
                {stats.high} high priority
              </div>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex-1 flex flex-wrap gap-3">
            <div>
              <label className="text-xs text-gray-600 block mb-1">Domain</label>
              <select
                value={filterDomain || ''}
                onChange={(e) => setFilterDomain(e.target.value || null)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Domains</option>
                <option value="APO">APO</option>
                <option value="BAI">BAI</option>
                <option value="DSS">DSS</option>
                <option value="MEA">MEA</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">Priority</label>
              <select
                value={filterPriority || ''}
                onChange={(e) => setFilterPriority(e.target.value || null)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            {(filterDomain || filterPriority) && (
              <button
                onClick={() => {
                  setFilterDomain(null)
                  setFilterPriority(null)
                }}
                className="btn-secondary mt-auto"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Objectives List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {filteredObjectives.length} {filterDomain || 'Management'} Objectives
          </h2>
          <div className="text-sm text-gray-600">
            {filteredObjectives.filter(o => o.enabled).length} enabled
          </div>
        </div>

        {filteredObjectives.map((objective) => {
          const color = getDomainColor(objective.domain)
          return (
            <div
              key={objective.id}
              className={`card ${
                objective.enabled ? `border-l-4 border-${color}-500 bg-${color}-50` : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleObjective(objective.id)}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
                    objective.enabled
                      ? `bg-${color}-600 border-${color}-600 text-white`
                      : 'border-gray-300 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {objective.enabled && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 bg-${color}-100 text-${color}-700 rounded text-xs font-medium`}
                        >
                          {objective.domain}
                        </span>
                        <h3 className="font-bold text-gray-900">{objective.id}</h3>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{objective.name}</h4>
                      <p className="text-sm text-gray-700">{objective.purpose}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <select
                        value={objective.priority}
                        onChange={(e) =>
                          setPriority(objective.id, e.target.value as 'high' | 'medium' | 'low')
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Practices */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">
                      Practices ({objective.practices.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {objective.practices.map((practice) => (
                        <span
                          key={practice.id}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          title={practice.name}
                        >
                          {practice.id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredObjectives.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-600">No objectives match the current filters.</p>
        </div>
      )}

      {/* Summary */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="font-semibold text-teal-900 mb-3">Selection Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-teal-800">Total Enabled</div>
            <div className="text-2xl font-bold text-teal-900">
              {objectives.filter(o => o.enabled).length}/35
            </div>
          </div>
          <div>
            <div className="font-medium text-teal-800">High Priority</div>
            <div className="text-2xl font-bold text-teal-900">
              {objectives.filter(o => o.priority === 'high').length}
            </div>
          </div>
          <div>
            <div className="font-medium text-teal-800">Medium Priority</div>
            <div className="text-2xl font-bold text-teal-900">
              {objectives.filter(o => o.priority === 'medium').length}
            </div>
          </div>
          <div>
            <div className="font-medium text-teal-800">Low Priority</div>
            <div className="text-2xl font-bold text-teal-900">
              {objectives.filter(o => o.priority === 'low').length}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Management Objectives
        </button>
      </div>
    </div>
  )
}

export default ManagementObjectives
