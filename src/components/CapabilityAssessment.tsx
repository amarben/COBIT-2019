import React, { useState, useMemo } from 'react'
import { BarChart3, Save, TrendingUp, Target, AlertTriangle, CheckCircle2, Info, Zap } from 'lucide-react'
import { AppData, ProcessCapability } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import GapAnalysisChart from './charts/GapAnalysisChart'
import CapabilityRadarChart from './charts/CapabilityRadarChart'
import { focusAreas, getFocusArea } from '../data/focusAreas'

interface CapabilityAssessmentProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const capabilityLevels = [
  { level: 0, name: 'Incomplete', description: 'Process is not implemented or fails to achieve its purpose', color: 'bg-red-500' },
  { level: 1, name: 'Performed', description: 'Process achieves its purpose', color: 'bg-orange-500' },
  { level: 2, name: 'Managed', description: 'Process is managed (planned, monitored, adjusted)', color: 'bg-yellow-500' },
  { level: 3, name: 'Established', description: 'Process is established as a standard process', color: 'bg-blue-500' },
  { level: 4, name: 'Predictable', description: 'Process operates within defined limits', color: 'bg-indigo-500' },
  { level: 5, name: 'Optimizing', description: 'Process is continuously improved', color: 'bg-green-500' },
]

const defaultObjectives = [
  // EDM - Governance (All 5)
  { objectiveId: 'EDM01', domain: 'EDM' as const, name: 'Ensured Governance Framework Setting and Maintenance' },
  { objectiveId: 'EDM02', domain: 'EDM' as const, name: 'Ensured Benefits Delivery' },
  { objectiveId: 'EDM03', domain: 'EDM' as const, name: 'Ensured Risk Optimization' },
  { objectiveId: 'EDM04', domain: 'EDM' as const, name: 'Ensured Resource Optimization' },
  { objectiveId: 'EDM05', domain: 'EDM' as const, name: 'Ensured Stakeholder Engagement' },
  // APO - Key objectives (Added APO02, APO04, APO05, APO07)
  { objectiveId: 'APO01', domain: 'APO' as const, name: 'Managed IT Management Framework' },
  { objectiveId: 'APO02', domain: 'APO' as const, name: 'Managed Strategy' },
  { objectiveId: 'APO04', domain: 'APO' as const, name: 'Managed Innovation' },
  { objectiveId: 'APO05', domain: 'APO' as const, name: 'Managed Portfolio' },
  { objectiveId: 'APO07', domain: 'APO' as const, name: 'Managed Human Resources' },
  { objectiveId: 'APO12', domain: 'APO' as const, name: 'Managed Risk' },
  { objectiveId: 'APO13', domain: 'APO' as const, name: 'Managed Security' },
  { objectiveId: 'APO14', domain: 'APO' as const, name: 'Managed Data' },
  // BAI - Key objectives (Added BAI03, BAI05, BAI11)
  { objectiveId: 'BAI03', domain: 'BAI' as const, name: 'Managed Solutions Identification and Build' },
  { objectiveId: 'BAI05', domain: 'BAI' as const, name: 'Managed Organizational Change' },
  { objectiveId: 'BAI06', domain: 'BAI' as const, name: 'Managed IT Changes' },
  { objectiveId: 'BAI10', domain: 'BAI' as const, name: 'Managed Configuration' },
  { objectiveId: 'BAI11', domain: 'BAI' as const, name: 'Managed Projects' },
  // DSS - Key objectives (Added DSS01, DSS02, DSS03, DSS04)
  { objectiveId: 'DSS01', domain: 'DSS' as const, name: 'Managed Operations' },
  { objectiveId: 'DSS02', domain: 'DSS' as const, name: 'Managed Service Requests and Incidents' },
  { objectiveId: 'DSS03', domain: 'DSS' as const, name: 'Managed Problems' },
  { objectiveId: 'DSS04', domain: 'DSS' as const, name: 'Managed Continuity' },
  { objectiveId: 'DSS05', domain: 'DSS' as const, name: 'Managed Security Services' },
  { objectiveId: 'DSS06', domain: 'DSS' as const, name: 'Managed Business Process Controls' },
  // MEA - All 4 objectives
  { objectiveId: 'MEA01', domain: 'MEA' as const, name: 'Managed Performance and Conformance Monitoring' },
  { objectiveId: 'MEA02', domain: 'MEA' as const, name: 'Managed System of Internal Control' },
  { objectiveId: 'MEA03', domain: 'MEA' as const, name: 'Managed Compliance with External Requirements' },
  { objectiveId: 'MEA04', domain: 'MEA' as const, name: 'Managed Assurance' },
]

const CapabilityAssessment: React.FC<CapabilityAssessmentProps> = ({ appData, updateAppData }) => {
  const [capabilities, setCapabilities] = useState<ProcessCapability[]>(
    appData.capabilities.length > 0
      ? appData.capabilities
      : defaultObjectives.map(obj => ({
          ...obj,
          currentLevel: 0 as const,
          targetLevel: 3 as const,
          priority: 'medium' as const,
          gap: 3
        }))
  )
  const [showFocusAreaPanel, setShowFocusAreaPanel] = useState(true)

  // Get selected focus areas from context
  const selectedFocusAreaIds = appData.context?.selectedFocusAreas || []
  const selectedFocusAreas = useMemo(() => {
    return selectedFocusAreaIds.map(id => getFocusArea(id)).filter(Boolean) as typeof focusAreas
  }, [selectedFocusAreaIds])

  // Calculate focus area recommendations for each objective
  const focusAreaRecommendations = useMemo(() => {
    const recommendations: Record<string, {
      minimumCapability: number
      focusAreas: string[]
      rationale: string[]
      highest: number
    }> = {}

    selectedFocusAreas.forEach(fa => {
      fa.priorityObjectives.forEach(po => {
        if (!recommendations[po.objectiveId]) {
          recommendations[po.objectiveId] = {
            minimumCapability: po.minimumCapability,
            focusAreas: [fa.name],
            rationale: [po.rationale],
            highest: po.minimumCapability
          }
        } else {
          recommendations[po.objectiveId].focusAreas.push(fa.name)
          recommendations[po.objectiveId].rationale.push(po.rationale)
          recommendations[po.objectiveId].highest = Math.max(
            recommendations[po.objectiveId].highest,
            po.minimumCapability
          )
        }
      })
    })

    return recommendations
  }, [selectedFocusAreas])

  // Apply focus area recommendations to targets
  const applyFocusAreaRecommendations = () => {
    const updated = capabilities.map(cap => {
      const rec = focusAreaRecommendations[cap.objectiveId]
      if (rec && rec.highest > cap.targetLevel) {
        return {
          ...cap,
          targetLevel: rec.highest as 0 | 1 | 2 | 3 | 4 | 5,
          gap: rec.highest - cap.currentLevel,
          focusAreaRecommendation: rec.highest,
          priority: rec.highest >= 4 ? 'high' as const : rec.highest >= 3 ? 'medium' as const : cap.priority
        }
      }
      return {
        ...cap,
        focusAreaRecommendation: rec?.highest
      }
    })
    setCapabilities(updated)
  }

  // Check if any recommendations need to be applied
  const pendingRecommendations = useMemo(() => {
    return capabilities.filter(cap => {
      const rec = focusAreaRecommendations[cap.objectiveId]
      return rec && rec.highest > cap.targetLevel
    })
  }, [capabilities, focusAreaRecommendations])

  // Get objectives below focus area recommendations
  const objectivesBelowRecommendation = useMemo(() => {
    return capabilities.filter(cap => {
      const rec = focusAreaRecommendations[cap.objectiveId]
      return rec && cap.currentLevel < rec.highest
    })
  }, [capabilities, focusAreaRecommendations])

  const handleCapabilityChange = (
    index: number,
    field: 'currentLevel' | 'targetLevel' | 'priority' | 'rationale',
    value: number | string
  ) => {
    const updated = [...capabilities]
    if (field === 'priority') {
      updated[index].priority = value as 'high' | 'medium' | 'low'
    } else if (field === 'rationale') {
      updated[index].rationale = value as string
    } else {
      updated[index][field] = value as 0 | 1 | 2 | 3 | 4 | 5
      updated[index].gap = updated[index].targetLevel - updated[index].currentLevel
    }
    setCapabilities(updated)
  }

  const handleSave = () => {
    updateAppData({ capabilities })
  }

  const getAverageCapability = (domain?: string) => {
    const filtered = domain
      ? capabilities.filter(c => c.domain === domain)
      : capabilities
    if (filtered.length === 0) return 0
    return filtered.reduce((sum, c) => sum + c.currentLevel, 0) / filtered.length
  }

  const getAverageTarget = (domain?: string) => {
    const filtered = domain
      ? capabilities.filter(c => c.domain === domain)
      : capabilities
    if (filtered.length === 0) return 0
    return filtered.reduce((sum, c) => sum + c.targetLevel, 0) / filtered.length
  }

  const getAverageGap = (domain?: string) => {
    const filtered = domain
      ? capabilities.filter(c => c.domain === domain)
      : capabilities
    if (filtered.length === 0) return 0
    return filtered.reduce((sum, c) => sum + c.gap, 0) / filtered.length
  }

  const getProcessCount = (domain: string) => {
    return capabilities.filter(c => c.domain === domain).length
  }

  const getPriorityCount = (priority: 'high' | 'medium' | 'low') => {
    return capabilities.filter(c => c.priority === priority).length
  }

  const domains = ['EDM', 'APO', 'BAI', 'DSS', 'MEA'] as const

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Capability Assessment</h1>
        </div>
        <p className="text-teal-100">
          COBIT 2019 Process Capability Maturity Assessment (0-5 Scale)
        </p>
      </div>

      <DisclaimerBanner />

      {/* Focus Area Recommendations Panel */}
      {selectedFocusAreas.length > 0 && (
        <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-purple-900">Focus Area Recommendations</h3>
                <p className="text-sm text-purple-700">
                  Based on {selectedFocusAreas.length} selected focus area{selectedFocusAreas.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFocusAreaPanel(!showFocusAreaPanel)}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              {showFocusAreaPanel ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {showFocusAreaPanel && (
            <>
              {/* Selected Focus Areas */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedFocusAreas.map(fa => (
                  <span
                    key={fa.id}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      fa.category === 'industry'
                        ? 'bg-blue-100 text-blue-800'
                        : fa.category === 'topic'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {fa.name}
                  </span>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Objectives with Recommendations</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {Object.keys(focusAreaRecommendations).length}
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">Below Recommended Level</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-700">
                    {objectivesBelowRecommendation.length}
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Pending Target Adjustments</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {pendingRecommendations.length}
                  </div>
                </div>
              </div>

              {/* Apply Recommendations Button */}
              {pendingRecommendations.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-amber-800 mb-3">
                        <strong>{pendingRecommendations.length} objective{pendingRecommendations.length > 1 ? 's have' : ' has'} target levels below focus area recommendations.</strong>{' '}
                        Click below to automatically adjust targets to meet minimum requirements.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pendingRecommendations.slice(0, 5).map(cap => {
                          const rec = focusAreaRecommendations[cap.objectiveId]
                          return (
                            <span key={cap.objectiveId} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                              {cap.objectiveId}: {cap.targetLevel} → {rec?.highest}
                            </span>
                          )
                        })}
                        {pendingRecommendations.length > 5 && (
                          <span className="text-xs text-amber-700">+{pendingRecommendations.length - 5} more</span>
                        )}
                      </div>
                      <button
                        onClick={applyFocusAreaRecommendations}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Apply Focus Area Recommendations
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {pendingRecommendations.length === 0 && objectivesBelowRecommendation.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Targets are aligned with focus area recommendations.</strong>{' '}
                        {objectivesBelowRecommendation.length} objective{objectivesBelowRecommendation.length > 1 ? 's are' : ' is'} currently below the recommended capability level and {objectivesBelowRecommendation.length > 1 ? 'require' : 'requires'} improvement.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {objectivesBelowRecommendation.length === 0 && Object.keys(focusAreaRecommendations).length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">
                      <strong>All focus area objectives are meeting recommended capability levels!</strong>{' '}
                      Your organization is well-positioned for the selected focus areas.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* No Focus Areas Selected */}
      {selectedFocusAreas.length === 0 && (
        <div className="card bg-gray-50 border-gray-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                <strong>No focus areas selected.</strong>{' '}
                Select focus areas in the Governance Design section to get tailored capability recommendations
                for your organization's specific needs (e.g., Cybersecurity, Cloud, SME, Healthcare).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Capability Level Reference */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Process Capability Levels (COBIT 2019)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilityLevels.map(level => (
            <div key={level.level} className="flex gap-3 items-start">
              <div className={`w-12 h-12 rounded-lg ${level.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-xl font-bold text-white">{level.level}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{level.name}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{level.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {domains.map(domain => (
          <div key={domain} className="card text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">{domain}</div>
            <div className="text-3xl font-bold text-teal-600">
              {getAverageCapability(domain).toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Avg Capability</div>
          </div>
        ))}
      </div>

      {/* Visualizations */}
      {capabilities.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Capability Maturity Radar</h3>
            <CapabilityRadarChart capabilities={capabilities} />
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Gap Analysis by Domain</h3>
            <GapAnalysisChart capabilities={capabilities} />
          </div>
        </div>
      )}

      {/* Assessment Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Process Capability Assessment</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Domain</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Objective</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Current</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Target</th>
              {selectedFocusAreas.length > 0 && (
                <th className="text-center py-3 px-2 text-sm font-semibold text-purple-700">
                  <div className="flex items-center justify-center gap-1">
                    <Target className="w-4 h-4" />
                    Rec.
                  </div>
                </th>
              )}
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Gap</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Priority</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Rationale</th>
            </tr>
          </thead>
          <tbody>
            {capabilities.map((capability, index) => {
              const rec = focusAreaRecommendations[capability.objectiveId]
              const isBelowRecommendation = rec && capability.currentLevel < rec.highest
              const hasRecommendation = !!rec

              return (
                <tr
                  key={capability.objectiveId}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    isBelowRecommendation ? 'bg-amber-50/50' : ''
                  }`}
                >
                  <td className="py-3 px-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        capability.domain === 'EDM'
                          ? 'bg-purple-100 text-purple-700'
                          : capability.domain === 'APO'
                          ? 'bg-blue-100 text-blue-700'
                          : capability.domain === 'BAI'
                          ? 'bg-green-100 text-green-700'
                          : capability.domain === 'DSS'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {capability.domain}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{capability.objectiveId}</div>
                        <div className="text-xs text-gray-600">{capability.name}</div>
                        {hasRecommendation && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {rec.focusAreas.map((fa, i) => (
                              <span
                                key={i}
                                className="inline-block text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700"
                                title={rec.rationale[i]}
                              >
                                {fa}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {isBelowRecommendation && (
                        <span title="Below focus area recommendation">
                          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <select
                      value={capability.currentLevel}
                      onChange={(e) =>
                        handleCapabilityChange(index, 'currentLevel', parseInt(e.target.value))
                      }
                      className={`px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        isBelowRecommendation ? 'border-amber-400 bg-amber-50' : 'border-gray-300'
                      }`}
                    >
                      {[0, 1, 2, 3, 4, 5].map(level => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <select
                      value={capability.targetLevel}
                      onChange={(e) =>
                        handleCapabilityChange(index, 'targetLevel', parseInt(e.target.value))
                      }
                      className={`px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        rec && capability.targetLevel < rec.highest ? 'border-amber-400 bg-amber-50' : 'border-gray-300'
                      }`}
                    >
                      {[0, 1, 2, 3, 4, 5].map(level => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </td>
                  {selectedFocusAreas.length > 0 && (
                    <td className="py-3 px-2 text-center">
                      {rec ? (
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                            capability.currentLevel >= rec.highest
                              ? 'bg-green-100 text-green-700'
                              : capability.targetLevel >= rec.highest
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                          title={rec.rationale.join('; ')}
                        >
                          {rec.highest}
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  )}
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        capability.gap > 2
                          ? 'bg-red-100 text-red-700'
                          : capability.gap > 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {capability.gap > 0 ? `+${capability.gap}` : capability.gap}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <select
                      value={capability.priority}
                      onChange={(e) => handleCapabilityChange(index, 'priority', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </td>
                  <td className="py-3 px-2">
                    <textarea
                      value={capability.rationale || ''}
                      onChange={(e) => handleCapabilityChange(index, 'rationale', e.target.value)}
                      placeholder={rec ? rec.rationale[0] : "Enter assessment rationale..."}
                      className="w-full min-w-[250px] px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
                      rows={2}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Gap Analysis Summary */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Capability Gap Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">High Priority Gaps</div>
                <div className="text-2xl font-bold text-blue-900">
                  {capabilities.filter(c => c.priority === 'high' && c.gap > 0).length}
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Average Gap</div>
                <div className="text-2xl font-bold text-blue-900">
                  {(capabilities.reduce((sum, c) => sum + c.gap, 0) / capabilities.length).toFixed(1)}
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Processes Assessed</div>
                <div className="text-2xl font-bold text-blue-900">{capabilities.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Analytics Dashboard */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-600" />
          Assessment Analytics Dashboard
        </h3>

        {/* Statistics Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-300">Domain</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-300">Processes</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-300">Avg Current</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-300">Avg Target</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-300">Avg Gap</th>
              </tr>
            </thead>
            <tbody>
              {domains.map(domain => (
                <tr key={domain} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded font-medium text-sm ${
                      domain === 'EDM' ? 'bg-purple-100 text-purple-700' :
                      domain === 'APO' ? 'bg-blue-100 text-blue-700' :
                      domain === 'BAI' ? 'bg-green-100 text-green-700' :
                      domain === 'DSS' ? 'bg-orange-100 text-orange-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>
                      {domain}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-medium">{getProcessCount(domain)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-semibold text-teal-700">{getAverageCapability(domain).toFixed(1)}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-semibold text-blue-700">{getAverageTarget(domain).toFixed(1)}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      getAverageGap(domain) > 2 ? 'bg-red-100 text-red-700' :
                      getAverageGap(domain) > 1 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {getAverageGap(domain) > 0 ? `+${getAverageGap(domain).toFixed(1)}` : getAverageGap(domain).toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold border-t-2 border-gray-300">
                <td className="py-3 px-4 text-gray-900">Overall</td>
                <td className="py-3 px-4 text-center text-gray-900">{capabilities.length}</td>
                <td className="py-3 px-4 text-center text-teal-700">{getAverageCapability().toFixed(1)}</td>
                <td className="py-3 px-4 text-center text-blue-700">{getAverageTarget().toFixed(1)}</td>
                <td className="py-3 px-4 text-center text-gray-900">
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    getAverageGap() > 2 ? 'bg-red-100 text-red-700' :
                    getAverageGap() > 1 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {getAverageGap() > 0 ? `+${getAverageGap().toFixed(1)}` : getAverageGap().toFixed(1)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Priority Distribution */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3 text-gray-800">Priority Distribution</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="text-4xl font-bold text-red-600">{getPriorityCount('high')}</div>
              <div className="text-sm text-red-700 font-medium mt-1">High Priority</div>
              <div className="text-xs text-red-600 mt-1">
                {((getPriorityCount('high') / capabilities.length) * 100).toFixed(0)}% of processes
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="text-4xl font-bold text-yellow-600">{getPriorityCount('medium')}</div>
              <div className="text-sm text-yellow-700 font-medium mt-1">Medium Priority</div>
              <div className="text-xs text-yellow-600 mt-1">
                {((getPriorityCount('medium') / capabilities.length) * 100).toFixed(0)}% of processes
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-4xl font-bold text-gray-600">{getPriorityCount('low')}</div>
              <div className="text-sm text-gray-700 font-medium mt-1">Low Priority</div>
              <div className="text-xs text-gray-600 mt-1">
                {((getPriorityCount('low') / capabilities.length) * 100).toFixed(0)}% of processes
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Key Insights & Recommendations
          </h4>
          <ul className="space-y-2 text-sm text-blue-900">
            {(() => {
              const domainStats = domains.map(d => ({
                domain: d,
                avgCurrent: getAverageCapability(d),
                avgGap: getAverageGap(d)
              }))
              const strongest = domainStats.reduce((max, d) => d.avgCurrent > max.avgCurrent ? d : max)
              const weakest = domainStats.reduce((min, d) => d.avgCurrent < min.avgCurrent ? d : min)
              const largestGap = capabilities.reduce((max, c) => c.gap > max.gap ? c : max)
              const highPriorityCount = getPriorityCount('high')

              return (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-0.5">✓</span>
                    <span><strong>Strongest Domain:</strong> {strongest.domain} with average capability of {strongest.avgCurrent.toFixed(1)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-0.5">⚠</span>
                    <span><strong>Needs Most Attention:</strong> {weakest.domain} domain with average capability of {weakest.avgCurrent.toFixed(1)}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-0.5">!</span>
                    <span><strong>Largest Gap:</strong> {largestGap.objectiveId} - {largestGap.name} (Gap: {largestGap.gap} levels)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">→</span>
                    <span><strong>Action Required:</strong> {highPriorityCount} high-priority processes require immediate attention and resource allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-0.5">📊</span>
                    <span><strong>Overall Assessment:</strong> Average capability is {getAverageCapability().toFixed(1)} with target of {getAverageTarget().toFixed(1)}, indicating {getAverageGap() > 2 ? 'significant' : getAverageGap() > 1 ? 'moderate' : 'minor'} improvement opportunities</span>
                  </li>
                </>
              )
            })()}
          </ul>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Capability Assessment
        </button>
      </div>
    </div>
  )
}

export default CapabilityAssessment
