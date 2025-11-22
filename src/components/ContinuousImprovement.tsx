import React, { useState } from 'react'
import { RefreshCcw, TrendingUp, Users, Cloud, Bot, Shield, Database, CheckCircle, AlertCircle } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface ContinuousImprovementProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const ContinuousImprovement: React.FC<ContinuousImprovementProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // TechCorp Q3 2024 Strategic Improvement Initiatives
  const initiatives = [
    {
      id: 1,
      title: 'Benefits Realization Framework',
      category: 'capability',
      categoryLabel: 'Capability Maturity',
      icon: TrendingUp,
      cobitRef: 'EDM02',
      sponsor: 'Chief Portfolio Officer',
      team: '5 portfolio managers, 2 business analysts',
      timeline: 'July - October 2024',
      budget: '$500,000',
      progress: 40,
      status: 'on-track' as const,
      objectives: [
        'Implement standardized benefits identification and tracking',
        'Train 25 portfolio and project managers',
        'Establish quarterly benefits review process',
        'Pilot with top 20 strategic programs'
      ],
      metrics: [
        'Benefits realization rate: 62% → 75% by Q1 2025',
        '100% projects >$500K with defined measurable benefits',
        'Stakeholder satisfaction with value transparency: 3.2 → 4.0'
      ],
      color: 'blue'
    },
    {
      id: 2,
      title: 'Cloud Center of Excellence (CCoE) Expansion',
      category: 'innovation',
      categoryLabel: 'Innovation',
      icon: Cloud,
      cobitRef: 'Multiple',
      sponsor: 'Chief Technology Officer',
      team: '12 cloud architects, engineers, FinOps specialists',
      timeline: 'June 2024 - June 2025',
      budget: '$2,500,000',
      progress: 25,
      status: 'on-track' as const,
      objectives: [
        'Accelerate cloud migration while ensuring governance',
        'Cloud cost optimization (target 20% reduction)',
        'Security and compliance by design',
        'Cloud skills enablement (50 certifications)'
      ],
      metrics: [
        'Cloud workloads: 60% → 80% by mid-2025',
        'Cloud security incidents reduced by 50%',
        'Cloud cost reduction of 20% ($4M savings)',
        '95% compliance with cloud architecture standards'
      ],
      color: 'purple'
    },
    {
      id: 3,
      title: 'AIOps for Incident Management',
      category: 'performance',
      categoryLabel: 'Performance Optimization',
      icon: Bot,
      cobitRef: 'DSS02',
      sponsor: 'VP Operations',
      team: '4 operations engineers, 2 data scientists',
      timeline: 'August 2024 - February 2025',
      budget: '$800,000',
      progress: 15,
      status: 'at-risk' as const,
      objectives: [
        'Implement AI-powered incident prediction and diagnosis',
        'Reduce incident detection time by 60%',
        'Reduce P1 incident resolution time: 5.2 → 3.5 hours',
        'Automated remediation for common incidents'
      ],
      metrics: [
        'Mean Time to Detect (MTTD): 30 minutes',
        'Mean Time to Resolve (MTTR) P1: 3.5 hours',
        '30% of incidents auto-remediated',
        'Reduction in major incidents by 25%'
      ],
      color: 'teal'
    },
    {
      id: 4,
      title: 'Talent Retention and Development Program',
      category: 'performance',
      categoryLabel: 'Performance Optimization',
      icon: Users,
      cobitRef: 'APO07',
      sponsor: 'Chief Human Resources Officer',
      team: 'CHRO team, IT Leadership',
      timeline: 'July 2024 - June 2025',
      budget: '$3,000,000',
      progress: 30,
      status: 'at-risk' as const,
      objectives: [
        'Reduce IT turnover from 14% to <10%',
        'Implement IT competency framework and career paths',
        'Compensation market alignment',
        'Leadership development program',
        'Diversity and inclusion initiatives'
      ],
      metrics: [
        'Voluntary turnover: <10%',
        'Employee engagement: 4.2/5.0',
        'Internal promotion rate: 30%',
        'Diversity hiring: 40% from underrepresented groups'
      ],
      color: 'orange'
    },
    {
      id: 5,
      title: 'Zero Trust Architecture Implementation',
      category: 'capability',
      categoryLabel: 'Capability Maturity',
      icon: Shield,
      cobitRef: 'APO13, DSS05',
      sponsor: 'Chief Information Security Officer',
      team: '15 security engineers and architects',
      timeline: 'January 2024 - December 2025 (multi-phase)',
      budget: '$5,000,000',
      progress: 35,
      status: 'on-track' as const,
      objectives: [
        'Implement zero trust security model',
        'Reduce security incidents by 40%',
        'Improve security incident detection and response',
        'Meet regulatory security requirements (NYDFS)'
      ],
      metrics: [
        '100% critical apps with zero trust controls by end 2025',
        'Security incidents reduced by 40%',
        'Mean Time to Detect (MTTD): <1 hour',
        'Security audit findings: zero material findings'
      ],
      color: 'red'
    },
    {
      id: 6,
      title: 'Data Governance Program',
      category: 'capability',
      categoryLabel: 'Capability Maturity',
      icon: Database,
      cobitRef: 'APO14, MEA03',
      sponsor: 'Chief Data Officer',
      team: '8 data governance specialists',
      timeline: 'April 2024 - June 2025',
      budget: '$1,800,000',
      progress: 50,
      status: 'on-track' as const,
      objectives: [
        'Establish enterprise data governance framework',
        'Complete data mapping for GDPR compliance',
        'Improve data quality from 87% to 95%',
        'Implement data catalog and lineage'
      ],
      metrics: [
        'Data governance framework approved and operational',
        'GDPR data mapping 100% complete',
        'Data quality score: 95%',
        'Data catalog: 80% coverage of critical data assets'
      ],
      color: 'green'
    }
  ]

  const portfolioMetrics = {
    activeInitiatives: '6 strategic + 24 tactical',
    totalInvestment: '$13.6M for strategic initiatives',
    expectedBenefits: '$12M cost savings + risk reduction + capability gains',
    onTrack: 4,
    atRisk: 2
  }

  const lessonsLearned = [
    {
      title: 'Executive Sponsorship is Critical',
      insight: 'Initiatives with active executive sponsors deliver 35% faster. Governance initiatives require Board/C-suite engagement.'
    },
    {
      title: 'Change Management Cannot Be Underestimated',
      insight: 'Technology is easy, people are hard. Benefits depend on adoption and behavior change.'
    },
    {
      title: 'Start Small, Scale Fast',
      insight: 'Pilots and iterative approaches reduce risk. Early wins build momentum and stakeholder confidence.'
    },
    {
      title: 'Metrics Drive Accountability',
      insight: 'What gets measured gets done. Clear, objective metrics essential for continuous improvement.'
    },
    {
      title: 'Cross-functional Collaboration',
      insight: 'Governance requires partnership between IT, Risk, Compliance, Business. Breaking silos accelerates improvement.'
    }
  ]

  const futureRoadmap = [
    {
      theme: 'OPTIMIZATION AND MATURITY',
      items: [
        'Achieve average capability of 3.5 across all objectives',
        'Performance metrics: 80% green, 20% yellow, 0% red',
        'Embed continuous improvement culture'
      ]
    },
    {
      theme: 'INNOVATION ACCELERATION',
      items: [
        'Establish innovation management capability (APO04)',
        'GenAI/AI adoption for productivity and new capabilities',
        'API economy and ecosystem partnerships'
      ]
    },
    {
      theme: 'RESILIENCE AND TRUST',
      items: [
        'Cybersecurity excellence (target 90th percentile)',
        'Business continuity and operational resilience',
        'Regulatory compliance leadership'
      ]
    },
    {
      theme: 'SUSTAINABLE IT',
      items: [
        'ESG and sustainability initiatives',
        'Green IT and carbon footprint reduction',
        'Responsible and ethical technology use'
      ]
    }
  ]

  const getStatusBadge = (status: 'on-track' | 'at-risk') => {
    if (status === 'on-track') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3" /> On Track
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
        <AlertCircle className="w-3 h-3" /> At Risk
      </span>
    )
  }

  const filteredInitiatives = selectedCategory === 'all'
    ? initiatives
    : initiatives.filter(i => i.category === selectedCategory)

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCcw className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Continuous Improvement</h1>
        </div>
        <p className="text-teal-100">Q3 2024 Strategic Improvement Initiatives</p>
        <p className="text-teal-200 text-sm mt-1">TechCorp Financial Services • 6 Major Initiatives • $13.6M Investment</p>
      </div>

      <DisclaimerBanner />

      {/* Improvement Approach */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Improvement Approach</h2>
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm font-medium mb-2">Plan-Do-Check-Act (PDCA) cycle integrated with COBIT governance model</p>
          <p className="text-xs text-gray-700">Four improvement categories: Capability maturity improvements, Performance optimization, Process efficiency, Innovation and transformation</p>
        </div>
      </div>

      {/* Portfolio Dashboard */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Improvement Portfolio Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-blue-700 mb-1">Total Active Initiatives</div>
            <div className="text-lg font-bold text-blue-900">{portfolioMetrics.activeInitiatives}</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-xs text-purple-700 mb-1">Total Investment</div>
            <div className="text-lg font-bold text-purple-900">{portfolioMetrics.totalInvestment}</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-xs text-green-700 mb-1">On-Track Initiatives</div>
            <div className="text-lg font-bold text-green-900">{portfolioMetrics.onTrack} of 6</div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="text-xs text-orange-700 mb-1">At-Risk Initiatives</div>
            <div className="text-lg font-bold text-orange-900">{portfolioMetrics.atRisk} (resource constraints)</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <strong>Expected Benefits:</strong> {portfolioMetrics.expectedBenefits}
        </div>
      </div>

      {/* Category Filter */}
      <div className="card">
        <h3 className="font-semibold mb-3">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Initiatives', icon: '📊' },
            { id: 'capability', label: 'Capability Maturity', icon: '📈' },
            { id: 'performance', label: 'Performance Optimization', icon: '⚡' },
            { id: 'innovation', label: 'Innovation', icon: '💡' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Strategic Initiatives */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Q3 2024 Strategic Initiatives</h2>
        {filteredInitiatives.map((initiative) => {
          const Icon = initiative.icon
          return (
            <div key={initiative.id} className="card border-2">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${initiative.color}-100`}>
                    <Icon className={`w-6 h-6 text-${initiative.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{initiative.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <span className="font-medium">{initiative.categoryLabel}</span>
                      <span>•</span>
                      <span>{initiative.cobitRef}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(initiative.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div><strong>Sponsor:</strong> {initiative.sponsor}</div>
                  <div><strong>Team:</strong> {initiative.team}</div>
                  <div><strong>Timeline:</strong> {initiative.timeline}</div>
                  <div><strong>Budget:</strong> {initiative.budget}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Progress: {initiative.progress}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-${initiative.color}-600`}
                      style={{ width: `${initiative.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Objectives:</h4>
                  <ul className="text-sm space-y-1">
                    {initiative.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Success Metrics:</h4>
                  <ul className="text-sm space-y-1">
                    {initiative.metrics.map((metric, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lessons Learned */}
      {selectedCategory === 'all' && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Lessons Learned (Q1-Q2 2024)</h2>
          <div className="space-y-4">
            {lessonsLearned.map((lesson, idx) => (
              <div key={idx} className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">{idx + 1}. {lesson.title}</h3>
                <p className="text-sm text-blue-800">→ {lesson.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Future Roadmap */}
      {selectedCategory === 'all' && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">🗺️ Future Improvement Roadmap (2025 and Beyond)</h2>
          <div className="space-y-4">
            {futureRoadmap.map((theme, idx) => (
              <div key={idx} className="border-l-4 border-teal-600 pl-4 py-2">
                <h3 className="font-bold text-teal-900 mb-2">{idx + 1}. {theme.theme}</h3>
                <ul className="space-y-1 text-sm">
                  {theme.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quarterly Reviews */}
      {selectedCategory === 'all' && (
        <div className="card bg-purple-50 border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-3">Quarterly Improvement Reviews</h3>
          <ul className="text-sm text-purple-800 space-y-2">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Portfolio review by IT Steering Committee</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Benefits realization tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Resource allocation and prioritization</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Lessons learned and best practice sharing</span>
            </li>
          </ul>
        </div>
      )}

      {/* Action Button */}
      <div className="card bg-teal-50 border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-teal-900">Continuous Improvement Active</h3>
            <p className="text-sm text-teal-700 mt-1">
              6 strategic initiatives launched • $13.6M investment • Expected $12M+ benefits
            </p>
          </div>
          <button className="btn-primary">
            Save Initiatives
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {selectedCategory === 'all' && (
        <div className="card bg-gradient-to-r from-teal-600 to-blue-600 text-white border-none">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-2">🏆 COBIT 2019 Implementation Complete!</h2>
            <p className="text-teal-100 mb-4">All 13 Steps Successfully Completed</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white bg-opacity-20 rounded p-3">
                <div className="font-bold text-lg">40</div>
                <div className="text-teal-100">Objectives</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <div className="font-bold text-lg">48</div>
                <div className="text-teal-100">Components</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <div className="font-bold text-lg">30</div>
                <div className="text-teal-100">KPIs</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded p-3">
                <div className="font-bold text-lg">2.4→3.5</div>
                <div className="text-teal-100">Maturity Target</div>
              </div>
            </div>
            <p className="mt-4 text-sm">TechCorp is now a governance leader!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContinuousImprovement
