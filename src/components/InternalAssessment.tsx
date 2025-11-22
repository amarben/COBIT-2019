import React from 'react'
import { ClipboardCheck, TrendingUp, AlertCircle, Target, CheckCircle2 } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface InternalAssessmentProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const InternalAssessment: React.FC<InternalAssessmentProps> = () => {
  // TechCorp Financial Services - Q2 2024 Internal Assessment Results

  const overallResults = {
    avgCurrent: 2.4,
    avgTarget: 4.0,
    avgGap: 1.6,
    trend: '+0.3'
  }

  const domainAssessment = [
    {
      domain: 'EDM (Governance)',
      avgCurrent: 2.2,
      avgTarget: 4.0,
      avgGap: 1.8,
      status: 'Foundational work in progress',
      icon: '🛡️',
      color: 'purple'
    },
    {
      domain: 'APO (Align, Plan, Organize)',
      avgCurrent: 2.4,
      avgTarget: 4.0,
      avgGap: 1.6,
      status: 'Mixed maturity, strategic processes stronger',
      icon: '🎯',
      color: 'blue'
    },
    {
      domain: 'BAI (Build, Acquire, Implement)',
      avgCurrent: 2.3,
      avgTarget: 3.8,
      avgGap: 1.5,
      status: 'Agile delivery maturing',
      icon: '🔨',
      color: 'teal'
    },
    {
      domain: 'DSS (Deliver, Service, Support)',
      avgCurrent: 2.9,
      avgTarget: 4.2,
      avgGap: 1.3,
      status: 'Strongest domain, operational maturity',
      icon: '⚡',
      color: 'green'
    },
    {
      domain: 'MEA (Monitor, Evaluate, Assess)',
      avgCurrent: 2.5,
      avgTarget: 4.2,
      avgGap: 1.7,
      status: 'Monitoring in place, needs sophistication',
      icon: '📊',
      color: 'orange'
    }
  ]

  const criticalGaps = [
    {
      objective: 'EDM02: Benefits Delivery',
      current: 1,
      target: 4,
      gap: 3,
      action: 'Implement benefits realization framework',
      owner: 'Portfolio Management Office',
      timeline: 'Q3-Q4 2024',
      investment: '$500K'
    },
    {
      objective: 'APO04: Innovation',
      current: 1,
      target: 3,
      gap: 2,
      action: 'Establish innovation management process',
      owner: 'Innovation Council',
      timeline: 'Q4 2024 - Q1 2025',
      investment: '$1M'
    }
  ]

  const highPriorityGaps = [
    {
      objective: 'EDM01: Governance Framework',
      gap: 2,
      action: 'Governance maturity improvement program',
      timeline: 'Q3 2024 - Q2 2025'
    },
    {
      objective: 'APO12: Risk Management',
      gap: 2,
      action: 'Advanced risk analytics and automation',
      timeline: 'Q4 2024 - Q3 2025'
    },
    {
      objective: 'APO13: Security',
      gap: 2,
      action: 'Zero trust architecture full implementation',
      timeline: 'Ongoing through 2025'
    },
    {
      objective: 'APO07: Human Resources',
      gap: 2,
      action: 'IT competency framework and talent development',
      timeline: 'Q3-Q4 2024'
    }
  ]

  const roadmap2024 = [
    'Q3-Q4: EDM02 (Benefits Delivery)',
    'Q3-Q4: EDM01 (Governance Framework)',
    'Q3-Q4: APO07 (Human Resources)',
    'Q4: MEA01 (Performance Monitoring)'
  ]

  const roadmap2025 = [
    'Q1-Q3: APO12 (Risk Management)',
    'Ongoing: APO13 (Security)',
    'Q1-Q2: APO04 (Innovation)',
    'Q2-Q3: BAI04 (Availability and Capacity)'
  ]

  const swotAnalysis = {
    strengths: [
      'Strong operational service delivery (DSS domain)',
      'Mature incident and change management',
      'Solid security and compliance foundation',
      'Executive support for governance'
    ],
    weaknesses: [
      'Lack of systematic benefits realization',
      'Innovation management immature',
      'Resource optimization needs attention',
      'Stakeholder engagement inconsistent'
    ],
    opportunities: [
      'Leverage automation to scale processes',
      'Cloud capabilities enable rapid maturity gains',
      'GRC platform investment showing ROI',
      'Strong talent pipeline emerging'
    ],
    threats: [
      'Talent competition limiting capability building',
      'Rapid technology change outpacing process maturity',
      'Regulatory changes requiring continuous adaptation',
      'Budget constraints limiting investment'
    ]
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Internal Assessment</h1>
        </div>
        <p className="text-teal-100">Q2 2024 Capability Assessment Results</p>
        <p className="text-teal-200 text-sm mt-2">TechCorp Financial Services - Comprehensive Assessment of 40 Objectives</p>
      </div>

      <DisclaimerBanner />

      {/* Assessment Methodology */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">📐 Assessment Methodology</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Self-assessment using COBIT Process Assessment Model (PAM)</li>
          <li>• Validation through document review and interviews</li>
          <li>• Independent assessment facilitated by internal audit</li>
          <li>• Process capability scale: 0-5 (Incomplete → Optimizing)</li>
        </ul>
      </div>

      {/* Overall Results */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">📊 Overall Assessment Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Avg Current Capability</div>
            <div className="text-3xl font-bold text-teal-600">{overallResults.avgCurrent}</div>
            <div className="text-xs text-gray-500 mt-1">Managed → Established</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Avg Target Capability</div>
            <div className="text-3xl font-bold text-blue-600">{overallResults.avgTarget}</div>
            <div className="text-xs text-gray-500 mt-1">Predictable</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Average Gap</div>
            <div className="text-3xl font-bold text-yellow-600">{overallResults.avgGap}</div>
            <div className="text-xs text-gray-500 mt-1">Capability levels</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Trend vs Q1 2024</div>
            <div className="text-3xl font-bold text-green-600">{overallResults.trend}</div>
            <div className="text-xs text-gray-500 mt-1">Improvement</div>
          </div>
        </div>
      </div>

      {/* Domain-Level Assessment */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">🎯 Domain-Level Assessment</h2>
        <div className="space-y-3">
          {domainAssessment.map((domain, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{domain.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{domain.domain}</h3>
                    <p className="text-sm text-gray-600">{domain.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Gap: <span className="font-bold text-yellow-600">{domain.avgGap} levels</span></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current:</span>
                  <span className="ml-2 font-semibold text-teal-600">{domain.avgCurrent}</span>
                </div>
                <div>
                  <span className="text-gray-600">Target:</span>
                  <span className="ml-2 font-semibold text-blue-600">{domain.avgTarget}</span>
                </div>
                <div>
                  <span className="text-gray-600">Gap:</span>
                  <span className="ml-2 font-semibold text-yellow-600">{domain.avgGap}</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${domain.color}-600`}
                    style={{ width: `${(domain.avgCurrent / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Gaps */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold">🚨 Critical Gaps (3-Level Gaps)</h2>
        </div>
        <div className="space-y-3">
          {criticalGaps.map((gap, idx) => (
            <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-red-900">{idx + 1}. {gap.objective}</h3>
                <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                  Gap: {gap.gap} levels
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-red-800">
                <div><strong>Current:</strong> {gap.current} | <strong>Target:</strong> {gap.target}</div>
                <div><strong>Investment:</strong> {gap.investment}</div>
                <div><strong>Action:</strong> {gap.action}</div>
                <div><strong>Timeline:</strong> {gap.timeline}</div>
                <div className="md:col-span-2"><strong>Owner:</strong> {gap.owner}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Priority Gaps */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-bold">⚠️ High-Priority Gaps (2-Level Gaps)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highPriorityGaps.map((gap, idx) => (
            <div key={idx} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-yellow-900">{idx + 1}. {gap.objective}</h3>
                <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                  Gap: {gap.gap} levels
                </span>
              </div>
              <div className="text-sm text-yellow-800 space-y-1">
                <div><strong>Action:</strong> {gap.action}</div>
                <div><strong>Timeline:</strong> {gap.timeline}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capability Improvement Roadmap */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-teal-600" />
          <h2 className="text-xl font-bold">🗺️ Capability Improvement Roadmap</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50 rounded-lg">
            <h3 className="font-semibold text-teal-900 mb-3">2024 Priorities</h3>
            <ul className="text-sm text-teal-800 space-y-2">
              {roadmap2024.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">2025 Priorities</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              {roadmap2025.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-teal-100 rounded-lg border border-teal-200">
          <div className="font-semibold text-teal-900">🎯 2025 Target</div>
          <div className="text-sm text-teal-800 mt-1">Average capability of 3.5 by end of 2025</div>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold">💡 Assessment Insights and Trends (SWOT)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">Strengths ✅</h3>
            <ul className="text-sm text-green-800 space-y-1">
              {swotAnalysis.strengths.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-900 mb-3">Weaknesses ⚠️</h3>
            <ul className="text-sm text-red-800 space-y-1">
              {swotAnalysis.weaknesses.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Opportunities 💡</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {swotAnalysis.opportunities.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-3">Threats ⚠️</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              {swotAnalysis.threats.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="text-xl font-bold text-teal-900 mb-4">Assessment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-teal-900 mb-2">Key Findings</h4>
            <div className="space-y-2 text-sm text-teal-800">
              <div className="flex justify-between">
                <span>Objectives Assessed:</span>
                <span className="font-semibold">40</span>
              </div>
              <div className="flex justify-between">
                <span>Critical Gaps:</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
              <div className="flex justify-between">
                <span>High-Priority Gaps:</span>
                <span className="font-semibold text-yellow-600">4</span>
              </div>
              <div className="flex justify-between">
                <span>Capability Trend:</span>
                <span className="font-semibold text-green-600">+0.3 improvement</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-teal-900 mb-2">Next Steps</h4>
            <ul className="text-sm text-teal-800 space-y-1">
              <li>• Launch improvement initiatives for critical gaps</li>
              <li>• Allocate budget for capability building programs</li>
              <li>• Track progress monthly through performance analysis</li>
              <li>• Conduct next assessment in Q4 2024</li>
              <li>• Target 3.5 average capability by end of 2025</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternalAssessment
