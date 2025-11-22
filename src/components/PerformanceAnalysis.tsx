import React, { useState } from 'react'
import { LineChart, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface PerformanceAnalysisProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all')

  // TechCorp Q2 2024 Performance Data
  const performanceSummary = {
    green: { count: 7, percent: 23 },
    yellow: { count: 15, percent: 50 },
    red: { count: 8, percent: 27 },
    trends: {
      improved: { count: 12, percent: 40 },
      stable: { count: 10, percent: 33 },
      declining: { count: 8, percent: 27 }
    }
  }

  const edmAnalysis = [
    {
      metric: 'Benefits Realization Rate',
      current: 62,
      target: 85,
      status: 'red' as const,
      rootCauses: [
        'Lack of formal benefits tracking process',
        'Business cases inconsistently define measurable benefits',
        'No accountability for benefits realization post-implementation',
        'Limited post-implementation reviews'
      ],
      actions: [
        'Implement benefits realization framework (Q3 2024)',
        'Train portfolio managers on benefits management',
        'Mandatory benefits tracking for projects >$500K',
        'Quarterly benefits review with business sponsors'
      ],
      expectedImpact: 'Improvement to 75% by Q4 2024, 85% by Q2 2025'
    },
    {
      metric: 'IT Risk Incidents',
      current: 5,
      target: 2,
      status: 'red' as const,
      rootCauses: [
        'Three incidents related to cloud misconfigurations',
        'Two incidents from inadequate change testing',
        'Increased attack sophistication'
      ],
      actions: [
        'CSPM (Cloud Security Posture Management) deployment',
        'Enhanced change testing for high-risk changes',
        'Security training focused on cloud security',
        'Architecture review board oversight of cloud designs'
      ],
      expectedImpact: 'Reduction to 3 incidents for full year 2024'
    },
    {
      metric: 'Stakeholder Satisfaction',
      current: 3.8,
      target: 4.2,
      status: 'yellow' as const,
      rootCauses: [
        'Inconsistent communication with business leaders',
        'Lack of transparency on IT initiative status',
        'Perceived slow response to business needs',
        'IT jargon in communications'
      ],
      actions: [
        'Monthly business relationship reviews',
        'Simplified executive dashboards',
        'Business relationship manager training',
        'Communication playbook for stakeholders'
      ],
      expectedImpact: 'Improvement to 4.0 by Q4 2024'
    }
  ]

  const apoAnalysis = [
    {
      metric: 'Strategic Initiative On-Time Delivery',
      current: 78,
      target: 90,
      status: 'yellow' as const,
      rootCauses: [
        'Requirements volatility in 40% of projects',
        'Resource constraints and priority changes',
        'Dependencies on vendor deliveries',
        'Technical complexity underestimated'
      ],
      actions: [
        'Agile methodology adoption for appropriate projects',
        'Requirements stability gates before initiation',
        'Vendor management improvements',
        'Enhanced estimation practices and buffers'
      ],
      expectedImpact: 'Improvement to 85% by Q1 2025'
    },
    {
      metric: 'IT Employee Turnover',
      current: 14,
      target: 10,
      status: 'red' as const,
      rootCauses: [
        'Competitive market for cloud and security talent',
        'Compensation benchmarking gaps identified',
        'Career development path clarity needed',
        'Work-life balance concerns (on-call burden)'
      ],
      actions: [
        'Compensation review and market adjustments ($2M budget)',
        'Career development framework and individual plans',
        'On-call burden reduction through automation',
        'Remote work flexibility enhancement',
        'Retention bonuses for critical roles'
      ],
      expectedImpact: 'Reduction to 11% by end of 2024'
    }
  ]

  const dssAnalysis = [
    {
      metric: 'Incident Resolution Time (P1)',
      current: '5.2 hours',
      target: '4 hours',
      status: 'red' as const,
      rootCauses: [
        'Complex distributed systems increase troubleshooting time',
        'Inadequate runbooks and documentation',
        'Skills gaps in cloud-native troubleshooting',
        'After-hours resource availability'
      ],
      actions: [
        'AIOps implementation for faster root cause identification',
        'Runbook completeness initiative (target 95% coverage)',
        'Cloud troubleshooting training',
        'Enhanced on-call structure and compensation'
      ],
      expectedImpact: 'Reduction to 4.5 hours by Q4 2024'
    },
    {
      metric: 'Project On-Time Delivery',
      current: 73,
      target: 85,
      status: 'red' as const,
      rootCauses: [
        'Optimistic initial estimates',
        'Scope creep in 35% of projects',
        'Resource allocation conflicts',
        'Integration complexity with legacy systems'
      ],
      actions: [
        'Estimation review by independent experts',
        'Stricter change control process',
        'Portfolio resource optimization',
        'Legacy modernization to reduce integration complexity'
      ],
      expectedImpact: 'Improvement to 80% by Q1 2025'
    },
    {
      metric: 'Change Success Rate',
      current: 92,
      target: 95,
      status: 'yellow' as const,
      rootCauses: [
        'Insufficient testing for 60% of failed changes',
        'Inadequate rollback plans',
        'Communication gaps',
        'Emergency changes bypassing testing'
      ],
      actions: [
        'Mandatory test environment validation',
        'Rollback plan review by CAB',
        'Enhanced change communication',
        'Post-implementation reviews for failures',
        'Reduction of emergency change usage'
      ],
      expectedImpact: 'Improvement to 94% by Q4 2024'
    }
  ]

  const meaAnalysis = {
    finding1: {
      title: 'GDPR Data Mapping Incomplete',
      completion: 85,
      target: 100,
      rootCauses: [
        'Insufficient resource allocation to data governance',
        'Complexity of data landscape'
      ],
      actions: [
        'Data governance team expansion (3 FTEs)',
        'Data discovery tool implementation'
      ]
    },
    finding2: {
      title: 'SOX Control Documentation Gaps',
      rootCauses: [
        'Decentralized control documentation',
        'Process changes not reflected in documentation'
      ],
      actions: [
        'Centralized control documentation repository',
        'Quarterly control documentation reviews',
        'Change management integration with SOX controls'
      ]
    },
    expectedImpact: 'Remediation by Q4 2024, zero findings target for 2025'
  }

  const benchmarking = [
    { metric: 'Governance Maturity', techcorp: '50th percentile', target: '75th', status: 'yellow' as const },
    { metric: 'IT Budget as % Revenue', techcorp: '8.2%', peer: '7.8%', status: 'yellow' as const },
    { metric: 'Cloud Adoption', techcorp: '75th percentile', target: '-', status: 'green' as const },
    { metric: 'Cybersecurity Maturity', techcorp: '60th percentile', target: '90th', status: 'yellow' as const },
    { metric: 'IT Staff Turnover', techcorp: '14%', peer: '12%', status: 'red' as const },
    { metric: 'Digital Innovation', techcorp: '65th percentile', target: '-', status: 'green' as const }
  ]

  const getStatusIcon = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green': return '🟢'
      case 'yellow': return '🟡'
      case 'red': return '🔴'
    }
  }

  const getStatusClass = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green': return 'bg-green-50 border-green-200'
      case 'yellow': return 'bg-yellow-50 border-yellow-200'
      case 'red': return 'bg-red-50 border-red-200'
    }
  }

  const formatValue = (value: number | string) => {
    if (typeof value === 'string') return value
    return value < 10 ? value.toString() : `${value}%`
  }

  const renderAnalysis = (analyses: any[], domain: string, icon: string) => {
    if (selectedDomain !== 'all' && selectedDomain !== domain) return null

    return (
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {domain} Performance Analysis
        </h2>
        <div className="space-y-6">
          {analyses.map((analysis, idx) => (
            <div key={idx} className={`border-2 rounded-lg p-4 ${getStatusClass(analysis.status)}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {getStatusIcon(analysis.status)} {analysis.metric}
                  </h3>
                  <div className="text-sm mt-1">
                    Current: <span className="font-bold">{formatValue(analysis.current)}</span> |
                    Target: <span className="font-bold">{formatValue(analysis.target)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Root Causes:
                </h4>
                <ul className="text-sm space-y-1">
                  {analysis.rootCauses.map((cause: string, i: number) => (
                    <li key={i} className="ml-4 flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Corrective Actions:</h4>
                <ul className="text-sm space-y-1">
                  {analysis.actions.map((action: string, i: number) => (
                    <li key={i} className="ml-4 flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white bg-opacity-60 rounded p-2 text-sm">
                <strong>Expected Impact:</strong> {analysis.expectedImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <LineChart className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Performance Analysis</h1>
        </div>
        <p className="text-teal-100">Q2 2024 Root Cause Analysis & Performance Trends</p>
        <p className="text-teal-200 text-sm mt-1">TechCorp Financial Services</p>
      </div>

      <DisclaimerBanner />

      {/* Overall Performance Summary */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Overall Performance Summary (30 KPIs)</h2>
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

        <h3 className="font-semibold mb-3">Performance Trends (vs. Q1 2024)</h3>
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

      {/* Domain Filter */}
      <div className="card">
        <h3 className="font-semibold mb-3">Filter by Domain:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Domains', icon: '📊' },
            { id: 'edm', label: 'EDM (Governance)', icon: '🛡️' },
            { id: 'apo', label: 'APO (Strategic)', icon: '🎯' },
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

      {/* Governance Performance (EDM) */}
      {renderAnalysis(edmAnalysis, 'edm', '🛡️')}

      {/* Strategic Alignment (APO) */}
      {renderAnalysis(apoAnalysis, 'apo', '🎯')}

      {/* Operational Performance (DSS) */}
      {renderAnalysis(dssAnalysis, 'dss', '⚡')}

      {/* Compliance Analysis (MEA) */}
      {(selectedDomain === 'all' || selectedDomain === 'mea') && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            MEA Performance Analysis
          </h2>
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4">
            <div className="font-semibold text-lg mb-2">🔴 Regulatory Audit Findings: 2 material (Target: 0)</div>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-semibold text-lg mb-2">Finding 1: {meaAnalysis.finding1.title}</h3>
              <div className="text-sm mb-3">
                Current: <span className="font-bold">{meaAnalysis.finding1.completion}% complete</span> |
                Target: <span className="font-bold">{meaAnalysis.finding1.target}%</span>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Root Causes:</h4>
                <ul className="text-sm space-y-1">
                  {meaAnalysis.finding1.rootCauses.map((cause, i) => (
                    <li key={i} className="ml-4">• {cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Corrective Actions:</h4>
                <ul className="text-sm space-y-1">
                  {meaAnalysis.finding1.actions.map((action, i) => (
                    <li key={i} className="ml-4 flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-semibold text-lg mb-2">Finding 2: {meaAnalysis.finding2.title}</h3>

              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Root Causes:</h4>
                <ul className="text-sm space-y-1">
                  {meaAnalysis.finding2.rootCauses.map((cause, i) => (
                    <li key={i} className="ml-4">• {cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Corrective Actions:</h4>
                <ul className="text-sm space-y-1">
                  {meaAnalysis.finding2.actions.map((action, i) => (
                    <li key={i} className="ml-4 flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded p-3 text-sm">
              <strong>Expected Impact:</strong> {meaAnalysis.expectedImpact}
            </div>
          </div>
        </div>
      )}

      {/* Benchmarking Analysis */}
      {selectedDomain === 'all' && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Benchmarking Analysis</h2>
          <p className="text-sm text-gray-600 mb-4">Industry Peer Comparison (Financial Services &gt;$1B revenue)</p>

          <div className="space-y-3">
            {benchmarking.map((bench, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 rounded border-2 ${getStatusClass(bench.status)}`}>
                <div className="flex items-center gap-2">
                  <span>{getStatusIcon(bench.status)}</span>
                  <span className="font-medium">{bench.metric}</span>
                </div>
                <div className="text-sm text-right">
                  <div className="font-semibold">{bench.techcorp}</div>
                  {bench.peer && <div className="text-gray-600">vs. peer avg {bench.peer}</div>}
                  {bench.target !== '-' && <div className="text-gray-600">target: {bench.target}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Key Insights:</h3>
            <ul className="text-sm space-y-1">
              <li>• Strong technology adoption but governance maturity lags</li>
              <li>• Higher IT spend should drive better outcomes - efficiency opportunity</li>
              <li>• Turnover impacting capability building</li>
              <li>• Cybersecurity needs continued investment given threat landscape</li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="card bg-teal-50 border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-teal-900">Performance Analysis Complete</h3>
            <p className="text-sm text-teal-700 mt-1">
              9 priority KPIs analyzed with root causes and corrective actions defined
            </p>
          </div>
          <button className="btn-primary">
            Save Analysis
          </button>
        </div>
      </div>
    </div>
  )
}

export default PerformanceAnalysis
