import React, { useState, useMemo } from 'react'
import { LineChart, TrendingUp, TrendingDown, Minus, AlertCircle, BarChart3 } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface PerformanceAnalysisProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({ appData }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all')

  const hasMetrics = appData.metrics && appData.metrics.length > 0

  // Calculate performance summary from real metrics
  const performanceSummary = useMemo(() => {
    if (!hasMetrics) return null

    const metrics = appData.metrics
    const onTrack = metrics.filter(m => m.status === 'on-track').length
    const atRisk = metrics.filter(m => m.status === 'at-risk').length
    const critical = metrics.filter(m => m.status === 'critical').length
    const total = metrics.length

    const improving = metrics.filter(m => m.trend === 'improving').length
    const stable = metrics.filter(m => m.trend === 'stable').length
    const declining = metrics.filter(m => m.trend === 'declining').length

    return {
      green: { count: onTrack, percent: Math.round((onTrack / total) * 100) },
      yellow: { count: atRisk, percent: Math.round((atRisk / total) * 100) },
      red: { count: critical, percent: Math.round((critical / total) * 100) },
      trends: {
        improved: { count: improving, percent: Math.round((improving / total) * 100) },
        stable: { count: stable, percent: Math.round((stable / total) * 100) },
        declining: { count: declining, percent: Math.round((declining / total) * 100) }
      }
    }
  }, [appData.metrics, hasMetrics])

  // Group metrics by domain
  const metricsByDomain = useMemo(() => {
    if (!hasMetrics) return {}

    return appData.metrics.reduce((acc, metric) => {
      const domain = metric.objectiveId.substring(0, 3) // Extract EDM, APO, BAI, DSS, MEA
      if (!acc[domain]) {
        acc[domain] = []
      }
      acc[domain].push(metric)
      return acc
    }, {} as Record<string, typeof appData.metrics>)
  }, [appData.metrics, hasMetrics])

  // Get metrics needing attention (at-risk or critical)
  const metricsNeedingAttention = useMemo(() => {
    if (!hasMetrics) return []
    return appData.metrics
      .filter(m => m.status === 'at-risk' || m.status === 'critical')
      .sort((a, b) => {
        if (a.status === 'critical' && b.status !== 'critical') return -1
        if (a.status !== 'critical' && b.status === 'critical') return 1
        return 0
      })
  }, [appData.metrics, hasMetrics])

  // Filter metrics by domain
  const filteredMetrics = useMemo(() => {
    if (!hasMetrics) return []
    if (selectedDomain === 'all') return metricsNeedingAttention
    return metricsNeedingAttention.filter(m => m.objectiveId.startsWith(selectedDomain.toUpperCase()))
  }, [metricsNeedingAttention, selectedDomain, hasMetrics])

  const getStatusIcon = (status: 'on-track' | 'at-risk' | 'critical') => {
    switch (status) {
      case 'on-track': return '🟢'
      case 'at-risk': return '🟡'
      case 'critical': return '🔴'
    }
  }

  const getStatusClass = (status: 'on-track' | 'at-risk' | 'critical') => {
    switch (status) {
      case 'on-track': return 'bg-green-50 border-green-200'
      case 'at-risk': return 'bg-yellow-50 border-yellow-200'
      case 'critical': return 'bg-red-50 border-red-200'
    }
  }

  const getDomainLabel = (domain: string): string => {
    const labels: Record<string, string> = {
      'edm': 'EDM (Governance)',
      'apo': 'APO (Strategic)',
      'bai': 'BAI (Delivery)',
      'dss': 'DSS (Operational)',
      'mea': 'MEA (Compliance)'
    }
    return labels[domain] || domain.toUpperCase()
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <LineChart className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Performance Analysis</h1>
        </div>
        <p className="text-teal-100">Root cause analysis and performance trends</p>
        {performanceSummary && (
          <p className="text-teal-200 text-sm mt-1">
            {performanceSummary.green.count + performanceSummary.yellow.count + performanceSummary.red.count} KPIs Analyzed
          </p>
        )}
      </div>

      <DisclaimerBanner />

      {/* Empty State */}
      {!hasMetrics && (
        <div className="card bg-blue-50 border-blue-200 text-center py-12">
          <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-900 mb-2">No Performance Metrics Available</h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Performance analysis requires metrics data. Navigate to Continuous Monitoring in Phase 6 to set up metrics tracking first.
          </p>
          <div className="text-sm text-blue-600">
            <strong>Phase 6 → Continuous Monitoring</strong> to configure metrics
          </div>
        </div>
      )}

      {/* Performance Analysis Dashboard */}
      {hasMetrics && performanceSummary && (
        <>
          {/* Overall Performance Summary */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Overall Performance Summary ({appData.metrics.length} KPIs)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="card bg-green-50 border-green-200">
                <div className="text-sm font-medium text-green-800 mb-1">🟢 Meeting Target</div>
                <div className="text-3xl font-bold text-green-600">{performanceSummary.green.count}</div>
                <div className="text-xs text-green-700 mt-1">{performanceSummary.green.percent}% of KPIs</div>
              </div>
              <div className="card bg-yellow-50 border-yellow-200">
                <div className="text-sm font-medium text-yellow-800 mb-1">🟡 Close to Target</div>
                <div className="text-3xl font-bold text-yellow-600">{performanceSummary.yellow.count}</div>
                <div className="text-xs text-yellow-700 mt-1">{performanceSummary.yellow.percent}% of KPIs</div>
              </div>
              <div className="card bg-red-50 border-red-200">
                <div className="text-sm font-medium text-red-800 mb-1">🔴 Below Target</div>
                <div className="text-3xl font-bold text-red-600">{performanceSummary.red.count}</div>
                <div className="text-xs text-red-700 mt-1">{performanceSummary.red.percent}% of KPIs</div>
              </div>
            </div>

            <h3 className="font-semibold mb-3">Performance Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-900">Improved</div>
                  <div className="text-sm text-blue-700">{performanceSummary.trends.improved.count} KPIs ({performanceSummary.trends.improved.percent}%)</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <Minus className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-semibold text-gray-900">Stable</div>
                  <div className="text-sm text-gray-700">{performanceSummary.trends.stable.count} KPIs ({performanceSummary.trends.stable.percent}%)</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-orange-900">Declining</div>
                  <div className="text-sm text-orange-700">{performanceSummary.trends.declining.count} KPIs ({performanceSummary.trends.declining.percent}%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Domain Performance Summary */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Performance by Domain</h2>
            <div className="space-y-3">
              {Object.entries(metricsByDomain).map(([domain, metrics]) => {
                const onTrack = metrics.filter(m => m.status === 'on-track').length
                const atRisk = metrics.filter(m => m.status === 'at-risk').length
                const critical = metrics.filter(m => m.status === 'critical').length
                const total = metrics.length
                const healthScore = Math.round((onTrack / total) * 100)

                return (
                  <div key={domain} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{getDomainLabel(domain.toLowerCase())}</h3>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-700">Health: {healthScore}%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <span className="ml-2 font-semibold">{total}</span>
                      </div>
                      <div>
                        <span className="text-green-600">On Track:</span>
                        <span className="ml-2 font-semibold">{onTrack}</span>
                      </div>
                      <div>
                        <span className="text-yellow-600">At Risk:</span>
                        <span className="ml-2 font-semibold">{atRisk}</span>
                      </div>
                      <div>
                        <span className="text-red-600">Critical:</span>
                        <span className="ml-2 font-semibold">{critical}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Metrics Needing Attention */}
          {metricsNeedingAttention.length > 0 && (
            <>
              {/* Domain Filter */}
              <div className="card">
                <h3 className="font-semibold mb-3">Filter by Domain:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Domains', icon: '📊' },
                    { id: 'edm', label: 'EDM (Governance)', icon: '🛡️' },
                    { id: 'apo', label: 'APO (Strategic)', icon: '🎯' },
                    { id: 'bai', label: 'BAI (Delivery)', icon: '🔨' },
                    { id: 'dss', label: 'DSS (Operational)', icon: '⚡' },
                    { id: 'mea', label: 'MEA (Compliance)', icon: '✅' }
                  ].map(domain => (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDomain === domain.id
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {domain.icon} {domain.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  Metrics Requiring Root Cause Analysis ({filteredMetrics.length})
                </h2>

                {filteredMetrics.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No metrics requiring attention in this domain
                  </div>
                )}

                <div className="space-y-4">
                  {filteredMetrics.map(metric => (
                    <div key={metric.id} className={`border-2 rounded-lg p-4 ${getStatusClass(metric.status)}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {getStatusIcon(metric.status)} {metric.name}
                          </h3>
                          <div className="text-sm mt-1">
                            <span className="px-2 py-0.5 bg-gray-700 text-white rounded text-xs font-bold mr-2">
                              {metric.objectiveId}
                            </span>
                            Current: <span className="font-bold">{metric.currentValue} {metric.unit}</span> |
                            Target: <span className="font-bold">{metric.targetValue} {metric.unit}</span> |
                            Achievement: <span className="font-bold">
                              {metric.targetValue > 0 ? Math.round((metric.currentValue / metric.targetValue) * 100) : 0}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Recommended Actions:
                        </h4>
                        <ul className="text-sm space-y-1">
                          {metric.status === 'critical' && (
                            <>
                              <li className="ml-4 flex items-start gap-2">
                                <span className="text-red-600 mt-1">!</span>
                                <span>Immediate escalation to leadership required</span>
                              </li>
                              <li className="ml-4 flex items-start gap-2">
                                <span className="text-red-600 mt-1">!</span>
                                <span>Conduct detailed root cause analysis</span>
                              </li>
                              <li className="ml-4 flex items-start gap-2">
                                <span className="text-red-600 mt-1">!</span>
                                <span>Develop corrective action plan with timelines</span>
                              </li>
                            </>
                          )}
                          {metric.status === 'at-risk' && (
                            <>
                              <li className="ml-4 flex items-start gap-2">
                                <span className="text-orange-600 mt-1">→</span>
                                <span>Review metric trending and identify contributing factors</span>
                              </li>
                              <li className="ml-4 flex items-start gap-2">
                                <span className="text-orange-600 mt-1">→</span>
                                <span>Implement preventive measures before status becomes critical</span>
                              </li>
                              <li className="ml-4 flex items-start gap-2">
                                <span className="text-orange-600 mt-1">→</span>
                                <span>Increase monitoring frequency to weekly/daily</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div className="bg-white bg-opacity-60 rounded p-2 text-sm">
                        <strong>Trend:</strong> {metric.trend === 'improving' ? '📈 Improving' : metric.trend === 'declining' ? '📉 Declining' : '➡️ Stable'} |
                        <strong className="ml-2">Frequency:</strong> {metric.frequency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Summary */}
          <div className="card bg-teal-50 border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-teal-900">Performance Analysis Complete</h3>
                <p className="text-sm text-teal-700 mt-1">
                  {metricsNeedingAttention.length} metrics identified as needing attention and corrective actions
                </p>
                <div className="mt-2 text-sm text-teal-800">
                  <div>• Overall Health: {performanceSummary.green.percent}% metrics on track</div>
                  <div>• {performanceSummary.trends.improved.count} metrics improving, {performanceSummary.trends.declining.count} declining</div>
                  <div>• Next Step: Review root causes and implement corrective actions</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PerformanceAnalysis
