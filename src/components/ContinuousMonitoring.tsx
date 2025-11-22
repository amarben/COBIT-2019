import React from 'react'
import { Eye, Shield, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface ContinuousMonitoringProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const ContinuousMonitoring: React.FC<ContinuousMonitoringProps> = () => {
  // TechCorp Financial Services Monitoring Data - Q2 2024

  const governanceMetrics = [
    { metric: 'Governance Effectiveness Score', value: '3.2 / 5.0', target: '4.0', status: 'yellow' },
    { metric: 'IT Steering Committee Attendance', value: '95%', target: '90%', status: 'green' },
    { metric: 'Governance Policy Compliance', value: '92%', target: '100%', status: 'yellow' },
    { metric: 'Escalated Issues Resolved', value: '18 of 22 (82%)', target: '100%', status: 'yellow' },
    { metric: 'Governance Training Completion', value: '87%', target: '100%', status: 'yellow' }
  ]

  const topRisks = [
    {
      risk: 'Cybersecurity Breach Risk',
      inherent: 'High',
      residual: 'Medium',
      mitigations: 'Zero trust, SIEM, SOC, security training',
      trend: 'Stable'
    },
    {
      risk: 'Cloud Migration Complexity',
      inherent: 'High',
      residual: 'Medium',
      mitigations: 'CCoE, architecture reviews, testing',
      trend: 'Increasing ↑'
    },
    {
      risk: 'Regulatory Compliance',
      inherent: 'High',
      residual: 'Low',
      mitigations: 'GRC system, continuous monitoring, legal reviews',
      trend: 'Stable'
    },
    {
      risk: 'Talent Retention',
      inherent: 'Medium',
      residual: 'Medium',
      mitigations: 'Compensation reviews, development programs',
      trend: 'Increasing ↑'
    },
    {
      risk: 'Legacy System Technical Debt',
      inherent: 'High',
      residual: 'Medium',
      mitigations: 'Modernization roadmap, risk-based prioritization',
      trend: 'Decreasing ↓'
    }
  ]

  const complianceStatus = [
    {
      regulation: 'SOX IT Controls',
      status: '98% effective',
      statusColor: 'yellow',
      notes: '2 minor deficiencies in remediation'
    },
    {
      regulation: 'GDPR Compliance',
      status: '96% compliant',
      statusColor: 'yellow',
      notes: 'Data mapping ongoing'
    },
    {
      regulation: 'PCI-DSS',
      status: '100% compliant',
      statusColor: 'green',
      notes: 'Validated Q1 2024'
    },
    {
      regulation: 'NYDFS Cybersecurity',
      status: '94% compliant',
      statusColor: 'yellow',
      notes: '4 open items'
    },
    {
      regulation: 'ISO 27001 Readiness',
      status: '92% ready',
      statusColor: 'yellow',
      notes: 'Certification audit Q4 2024'
    }
  ]

  const balancedScorecard = {
    stakeholder: [
      { metric: 'Stakeholder Satisfaction', value: '3.8/5.0', target: '4.2', status: 'yellow' },
      { metric: 'Benefits Realization', value: '62%', target: '85%', status: 'red' },
      { metric: 'Strategic Alignment', value: '88%', target: '90%', status: 'yellow' }
    ],
    financial: [
      { metric: 'IT Budget Variance', value: '+8%', target: '±5%', status: 'red' },
      { metric: 'Cost Optimization', value: '6% reduction', target: '10%', status: 'yellow' },
      { metric: 'Portfolio ROI', value: '12%', target: '15%', status: 'yellow' }
    ],
    process: [
      { metric: 'Change Success Rate', value: '92%', target: '95%', status: 'yellow' },
      { metric: 'Incident Resolution (P1)', value: '5.2 hours', target: '4 hours', status: 'red' },
      { metric: 'Project On-Time Delivery', value: '73%', target: '85%', status: 'red' }
    ],
    learning: [
      { metric: 'Employee Satisfaction', value: '3.9/5.0', target: '4.2', status: 'yellow' },
      { metric: 'Training Completion', value: '87%', target: '95%', status: 'yellow' },
      { metric: 'Certifications', value: '32 of 50', target: '50', status: 'yellow' },
      { metric: 'Turnover Rate', value: '14%', target: '<10%', status: 'red' }
    ]
  }

  const monitoringTools = [
    { name: 'ServiceNow GRC Dashboards', capabilities: 'Risk dashboards, compliance status, policy exceptions, audit findings' },
    { name: 'PowerBI Performance Dashboards', capabilities: 'IT Balanced Scorecard, portfolio performance, financial metrics' },
    { name: 'Splunk Security Monitoring', capabilities: 'Real-time security events, threat intelligence, compliance reporting' },
    { name: 'Dynatrace APM', capabilities: 'Application performance, user experience, automated problem detection' },
    { name: 'CloudHealth Cloud Governance', capabilities: 'Multi-cloud cost, policy compliance, resource optimization' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'text-green-600'
      case 'yellow': return 'text-yellow-600'
      case 'red': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-100 text-green-800'
      case 'yellow': return 'bg-yellow-100 text-yellow-800'
      case 'red': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Eye className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Continuous Monitoring</h1>
        </div>
        <p className="text-teal-100">Real-time governance dashboards and monitoring</p>
        <p className="text-teal-200 text-sm mt-2">TechCorp Financial Services - Q2 2024 Status</p>
      </div>

      <DisclaimerBanner />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold">Governance</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">5 Metrics</div>
          <div className="text-sm text-gray-600">Active monitoring</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold">Risks</h3>
          </div>
          <div className="text-2xl font-bold text-orange-600">45 Total</div>
          <div className="text-sm text-gray-600">8 high, 22 medium, 15 low</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold">Compliance</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">5 Regulations</div>
          <div className="text-sm text-gray-600">Actively tracked</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold">Performance</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">13 KPIs</div>
          <div className="text-sm text-gray-600">Balanced scorecard</div>
        </div>
      </div>

      {/* 1. Governance Monitoring */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold">Governance Monitoring</h2>
          <span className="ml-auto text-sm text-gray-600">Monthly Dashboard</span>
        </div>
        <div className="space-y-3">
          {governanceMetrics.map((m, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{m.metric}</h3>
                <span className={`text-2xl ${getStatusColor(m.status)}`}>
                  {m.status === 'green' ? '🟢' : m.status === 'yellow' ? '🟡' : '🔴'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Current:</span> {m.value} | <span className="font-medium">Target:</span> {m.target}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Quarterly Governance Reviews:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Governance framework effectiveness assessment</li>
            <li>• Stakeholder satisfaction surveys</li>
            <li>• Governance process audits</li>
            <li>• Exception reporting and trends analysis</li>
          </ul>
        </div>
      </div>

      {/* 2. Risk Monitoring */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-bold">Risk Monitoring</h2>
          <span className="ml-auto text-sm text-gray-600">Updated Monthly</span>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg mb-4">
          <h4 className="font-semibold text-orange-900 mb-2">Current Risk Profile:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-orange-800">
            <div>• Total Active IT Risks: <strong>45</strong></div>
            <div>• Risks Trending Up: <strong>6</strong></div>
            <div>• High Risks: <strong className="text-red-600">8 🔴</strong></div>
            <div>• Risks Trending Down: <strong>4</strong></div>
            <div>• Medium Risks: <strong className="text-yellow-600">22 🟡</strong></div>
            <div>• Low Risks: <strong className="text-green-600">15 🟢</strong></div>
          </div>
        </div>

        <h4 className="font-semibold mb-3">Top IT Risks Being Monitored:</h4>
        <div className="space-y-3">
          {topRisks.map((risk, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{idx + 1}. {risk.risk}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  risk.trend.includes('Increasing') ? 'bg-red-100 text-red-800' :
                  risk.trend.includes('Decreasing') ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {risk.trend}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Risk Level:</strong> {risk.inherent} (Inherent) → {risk.residual} (Residual)</div>
                <div><strong>Mitigations:</strong> {risk.mitigations}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Compliance Monitoring */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Compliance Monitoring</h2>
          <span className="ml-auto text-sm text-gray-600">Updated Monthly</span>
        </div>

        <h4 className="font-semibold mb-3">Regulatory Compliance Status:</h4>
        <div className="space-y-3 mb-4">
          {complianceStatus.map((comp, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{comp.regulation}</h3>
                <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(comp.statusColor)}`}>
                  {comp.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Notes:</strong> {comp.notes}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Compliance Monitoring Activities:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Control self-assessments: Quarterly</li>
            <li>• Compliance testing: Continuous automated + quarterly manual</li>
            <li>• Regulatory change monitoring: Continuous via RegTech</li>
            <li>• Attestation reports: Quarterly to compliance committee</li>
            <li>• External audits: Annual SOX, PCI-DSS</li>
          </ul>
        </div>
      </div>

      {/* 4. Performance Monitoring - IT Balanced Scorecard */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold">Performance Monitoring</h2>
          <span className="ml-auto text-sm text-gray-600">IT Balanced Scorecard</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Stakeholder Perspective */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3">Stakeholder Perspective</h4>
            <div className="space-y-2">
              {balancedScorecard.stakeholder.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className={getStatusColor(m.status)}>
                    {m.status === 'green' ? '🟢' : m.status === 'yellow' ? '🟡' : '🔴'}
                  </span>
                  <span className="flex-1 ml-2">{m.metric}:</span>
                  <span className="font-semibold">{m.value}</span>
                  <span className="text-gray-500 ml-2">({m.target})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Perspective */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Financial Perspective</h4>
            <div className="space-y-2">
              {balancedScorecard.financial.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className={getStatusColor(m.status)}>
                    {m.status === 'green' ? '🟢' : m.status === 'yellow' ? '🟡' : '🔴'}
                  </span>
                  <span className="flex-1 ml-2">{m.metric}:</span>
                  <span className="font-semibold">{m.value}</span>
                  <span className="text-gray-500 ml-2">({m.target})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Process Perspective */}
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-semibold text-teal-900 mb-3">Internal Process Perspective</h4>
            <div className="space-y-2">
              {balancedScorecard.process.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className={getStatusColor(m.status)}>
                    {m.status === 'green' ? '🟢' : m.status === 'yellow' ? '🟡' : '🔴'}
                  </span>
                  <span className="flex-1 ml-2">{m.metric}:</span>
                  <span className="font-semibold">{m.value}</span>
                  <span className="text-gray-500 ml-2">({m.target})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning & Growth Perspective */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3">Learning & Growth Perspective</h4>
            <div className="space-y-2">
              {balancedScorecard.learning.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className={getStatusColor(m.status)}>
                    {m.status === 'green' ? '🟢' : m.status === 'yellow' ? '🟡' : '🔴'}
                  </span>
                  <span className="flex-1 ml-2">{m.metric}:</span>
                  <span className="font-semibold">{m.value}</span>
                  <span className="text-gray-500 ml-2">({m.target})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="font-semibold text-yellow-900">Overall Performance: MIXED</div>
          <div className="text-sm text-yellow-800 mt-1">Status: 4 Red, 11 Yellow, 0 Green - Requires attention and improvement initiatives</div>
        </div>
      </div>

      {/* Monitoring Tools */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Monitoring Tools and Automation</h2>
        <div className="space-y-3">
          {monitoringTools.map((tool, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-1">{idx + 1}. {tool.name}</h3>
              <div className="text-sm text-gray-600">
                <strong>Capabilities:</strong> {tool.capabilities}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="text-xl font-bold text-teal-900 mb-4">Monitoring Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-teal-900 mb-2">Active Monitoring</h4>
            <div className="space-y-2 text-sm text-teal-800">
              <div className="flex justify-between">
                <span>Governance Metrics:</span>
                <span className="font-semibold">5 active</span>
              </div>
              <div className="flex justify-between">
                <span>Total IT Risks:</span>
                <span className="font-semibold">45 tracked</span>
              </div>
              <div className="flex justify-between">
                <span>Compliance Regulations:</span>
                <span className="font-semibold">5 regulations</span>
              </div>
              <div className="flex justify-between">
                <span>Performance KPIs:</span>
                <span className="font-semibold">13 metrics</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-teal-900 mb-2">Monitoring Approach</h4>
            <ul className="text-sm text-teal-800 space-y-1">
              <li>• Update Frequency: Monthly dashboards</li>
              <li>• Real-time alerts for critical incidents</li>
              <li>• Quarterly governance reviews</li>
              <li>• Automated compliance testing</li>
              <li>• 5 integrated monitoring platforms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContinuousMonitoring
