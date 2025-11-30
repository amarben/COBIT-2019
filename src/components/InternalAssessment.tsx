import React, { useMemo } from 'react'
import { ClipboardCheck, TrendingUp, AlertCircle, Target, CheckCircle2, BarChart3 } from 'lucide-react'
import { AppData, ProcessCapability } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface InternalAssessmentProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const InternalAssessment: React.FC<InternalAssessmentProps> = ({ appData }) => {
  // Calculate assessment metrics from actual capabilities data
  const assessmentMetrics = useMemo(() => {
    const capabilities = appData.capabilities || []

    if (capabilities.length === 0) {
      return null
    }

    const totalCurrent = capabilities.reduce((sum, cap) => sum + cap.currentLevel, 0)
    const totalTarget = capabilities.reduce((sum, cap) => sum + cap.targetLevel, 0)
    const totalGap = capabilities.reduce((sum, cap) => sum + cap.gap, 0)

    const avgCurrent = totalCurrent / capabilities.length
    const avgTarget = totalTarget / capabilities.length
    const avgGap = totalGap / capabilities.length

    // Calculate domain averages
    const domainStats = ['EDM', 'APO', 'BAI', 'DSS', 'MEA'].map(domain => {
      const domainCaps = capabilities.filter(cap => cap.domain === domain)
      if (domainCaps.length === 0) {
        return {
          domain,
          avgCurrent: 0,
          avgTarget: 0,
          avgGap: 0,
          count: 0
        }
      }

      const domainCurrent = domainCaps.reduce((sum, cap) => sum + cap.currentLevel, 0) / domainCaps.length
      const domainTarget = domainCaps.reduce((sum, cap) => sum + cap.targetLevel, 0) / domainCaps.length
      const domainGap = domainCaps.reduce((sum, cap) => sum + cap.gap, 0) / domainCaps.length

      return {
        domain,
        avgCurrent: domainCurrent,
        avgTarget: domainTarget,
        avgGap: domainGap,
        count: domainCaps.length
      }
    })

    // Find critical gaps (gap >= 2)
    const criticalGaps = capabilities
      .filter(cap => cap.gap >= 2)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 10)

    // Find high priority gaps (gap >= 1 and priority = high)
    const highPriorityGaps = capabilities
      .filter(cap => cap.gap >= 1 && cap.priority === 'high')
      .sort((a, b) => b.gap - a.gap)

    return {
      avgCurrent: Number(avgCurrent.toFixed(1)),
      avgTarget: Number(avgTarget.toFixed(1)),
      avgGap: Number(avgGap.toFixed(1)),
      domainStats,
      criticalGaps,
      highPriorityGaps,
      totalCount: capabilities.length
    }
  }, [appData.capabilities])

  const hasData = assessmentMetrics !== null

  const domainConfig: Record<string, { label: string; icon: string; color: string }> = {
    EDM: { label: 'Governance', icon: '🛡️', color: 'purple' },
    APO: { label: 'Align, Plan, Organize', icon: '🎯', color: 'blue' },
    BAI: { label: 'Build, Acquire, Implement', icon: '🔨', color: 'teal' },
    DSS: { label: 'Deliver, Service, Support', icon: '⚡', color: 'green' },
    MEA: { label: 'Monitor, Evaluate, Assess', icon: '📊', color: 'orange' }
  }

  const getMaturityLabel = (level: number): string => {
    if (level === 0) return 'Incomplete'
    if (level === 1) return 'Performed'
    if (level === 2) return 'Managed'
    if (level === 3) return 'Established'
    if (level === 4) return 'Predictable'
    if (level === 5) return 'Optimizing'
    return 'N/A'
  }

  const getGapStatusColor = (gap: number): string => {
    if (gap >= 2) return 'text-red-600 bg-red-100'
    if (gap >= 1) return 'text-orange-600 bg-orange-100'
    return 'text-green-600 bg-green-100'
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="gradient-indigo text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Internal Assessment</h1>
        </div>
        <p className="text-indigo-100">Review capability maturity and identify improvement priorities</p>
        {hasData && appData.context && (
          <p className="text-indigo-200 text-sm mt-2">
            {appData.context.organizationName || 'Your Organization'} • {assessmentMetrics.totalCount} Objectives Assessed
          </p>
        )}
      </div>

      <DisclaimerBanner />

      {/* Empty State */}
      {!hasData && (
        <div className="card bg-blue-50 border-blue-200 text-center py-12">
          <ClipboardCheck className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-900 mb-2">No Assessment Data Available</h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Complete your capability assessment in Phase 2 to see your internal assessment results here.
          </p>
          <div className="text-sm text-blue-600">
            Navigate to <strong>Phase 2 → Capability Assessment</strong> to get started
          </div>
        </div>
      )}

      {/* Assessment Dashboard */}
      {hasData && (
        <>
          {/* Overall Results */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" />
              Overall Assessment Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700 mb-1">Current Maturity</div>
                <div className="text-3xl font-bold text-blue-900">{assessmentMetrics.avgCurrent}</div>
                <div className="text-xs text-blue-600 mt-1">{getMaturityLabel(Math.round(assessmentMetrics.avgCurrent))}</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700 mb-1">Target Maturity</div>
                <div className="text-3xl font-bold text-green-900">{assessmentMetrics.avgTarget}</div>
                <div className="text-xs text-green-600 mt-1">{getMaturityLabel(Math.round(assessmentMetrics.avgTarget))}</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-orange-700 mb-1">Average Gap</div>
                <div className="text-3xl font-bold text-orange-900">{assessmentMetrics.avgGap}</div>
                <div className="text-xs text-orange-600 mt-1">Points to improve</div>
              </div>
            </div>
          </div>

          {/* Domain Assessment */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              Domain-Level Assessment
            </h2>
            <div className="space-y-4">
              {assessmentMetrics.domainStats.map((domain) => {
                const config = domainConfig[domain.domain]
                if (domain.count === 0) return null

                return (
                  <div key={domain.domain} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{config.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">{domain.domain}: {config.label}</h3>
                          <div className="text-sm text-gray-600">{domain.count} objectives</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getGapStatusColor(domain.avgGap)} px-3 py-1 rounded`}>
                          Gap: {domain.avgGap.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current:</span>
                        <span className="ml-2 font-semibold">{domain.avgCurrent.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Target:</span>
                        <span className="ml-2 font-semibold">{domain.avgTarget.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Progress:</span>
                        <span className="ml-2 font-semibold">
                          {domain.avgTarget > 0 ? Math.round((domain.avgCurrent / domain.avgTarget) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Critical Gaps */}
          {assessmentMetrics.criticalGaps.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                Critical Gaps (Gap ≥ 2)
              </h2>
              <div className="space-y-3">
                {assessmentMetrics.criticalGaps.map((cap) => (
                  <div key={cap.objectiveId} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-red-900">{cap.objectiveId}: {cap.name}</h3>
                        <div className="text-sm text-red-700 mt-1">
                          Priority: <span className="font-semibold">{cap.priority.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">Gap: {cap.gap}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mt-2">
                      <div>
                        <span className="text-gray-600">Current:</span>
                        <span className="ml-2 font-semibold">{cap.currentLevel} - {getMaturityLabel(cap.currentLevel)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Target:</span>
                        <span className="ml-2 font-semibold">{cap.targetLevel} - {getMaturityLabel(cap.targetLevel)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Domain:</span>
                        <span className="ml-2 font-semibold">{cap.domain}</span>
                      </div>
                    </div>
                    {cap.rationale && (
                      <div className="mt-2 text-sm text-gray-700 italic">
                        <strong>Rationale:</strong> {cap.rationale}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* High Priority Gaps */}
          {assessmentMetrics.highPriorityGaps.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-600" />
                High Priority Improvement Areas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assessmentMetrics.highPriorityGaps.map((cap) => (
                  <div key={cap.objectiveId} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-orange-900 text-sm">{cap.objectiveId}</h3>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${getGapStatusColor(cap.gap)}`}>
                        Gap: {cap.gap}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700">{cap.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {cap.currentLevel} → {cap.targetLevel} ({cap.domain})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary & Recommendations */}
          <div className="card bg-indigo-50 border-indigo-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-900">
              <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              Assessment Summary & Next Steps
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✓</span>
                <p className="text-gray-700">
                  <strong>Assessment Complete:</strong> {assessmentMetrics.totalCount} COBIT objectives assessed across {assessmentMetrics.domainStats.filter(d => d.count > 0).length} domains
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✓</span>
                <p className="text-gray-700">
                  <strong>Current Maturity:</strong> {assessmentMetrics.avgCurrent}/5.0 ({getMaturityLabel(Math.round(assessmentMetrics.avgCurrent))})
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">✓</span>
                <p className="text-gray-700">
                  <strong>Target Maturity:</strong> {assessmentMetrics.avgTarget}/5.0 ({getMaturityLabel(Math.round(assessmentMetrics.avgTarget))})
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">→</span>
                <p className="text-gray-700">
                  <strong>Focus Areas:</strong> {assessmentMetrics.criticalGaps.length} critical gaps (≥2 points) and {assessmentMetrics.highPriorityGaps.length} high-priority improvements identified
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">→</span>
                <p className="text-gray-700">
                  <strong>Recommended Next Step:</strong> Review critical gaps and develop detailed improvement roadmap in Phase 4 (Planning)
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InternalAssessment
