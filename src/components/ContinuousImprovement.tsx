import React, { useState } from 'react'
import { RefreshCcw, TrendingUp, Users, Cloud, Bot, Shield, Database, CheckCircle, AlertCircle, Plus, Download, Trash2, Edit } from 'lucide-react'
import { AppData, ImprovementInitiative } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface ContinuousImprovementProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

// TechCorp Example Data - Q3 2024 Strategic Improvement Initiatives
const TECHCORP_INITIATIVES: ImprovementInitiative[] = [
  {
    id: '1',
    name: 'Benefits Realization Framework',
    description: 'Implement standardized benefits identification and tracking',
    type: 'capability',
    priority: 'high',
    status: 'on-track',
    targetObjectives: ['EDM02'],
    expectedOutcome: 'Benefits realization rate: 62% → 75% by Q1 2025',
    sponsor: 'Chief Portfolio Officer',
    team: '5 portfolio managers, 2 business analysts',
    timeline: 'July - October 2024',
    budget: '$500,000',
    progress: 40,
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
    cobitRef: 'EDM02'
  },
  {
    id: '2',
    name: 'Cloud Center of Excellence (CCoE) Expansion',
    description: 'Accelerate cloud migration while ensuring governance',
    type: 'innovation',
    priority: 'high',
    status: 'on-track',
    targetObjectives: ['Multiple'],
    expectedOutcome: 'Cloud workloads: 60% → 80% by mid-2025, $4M cost savings',
    sponsor: 'Chief Technology Officer',
    team: '12 cloud architects, engineers, FinOps specialists',
    timeline: 'June 2024 - June 2025',
    budget: '$2,500,000',
    progress: 25,
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
    cobitRef: 'Multiple'
  },
  {
    id: '3',
    name: 'AIOps for Incident Management',
    description: 'Implement AI-powered incident prediction and diagnosis',
    type: 'performance',
    priority: 'high',
    status: 'at-risk',
    targetObjectives: ['DSS02'],
    expectedOutcome: 'P1 incident resolution time: 5.2 → 3.5 hours',
    sponsor: 'VP Operations',
    team: '4 operations engineers, 2 data scientists',
    timeline: 'August 2024 - February 2025',
    budget: '$800,000',
    progress: 15,
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
    cobitRef: 'DSS02'
  },
  {
    id: '4',
    name: 'Talent Retention and Development Program',
    description: 'Reduce IT turnover and build capability',
    type: 'performance',
    priority: 'high',
    status: 'at-risk',
    targetObjectives: ['APO07'],
    expectedOutcome: 'IT turnover: 14% → <10%',
    sponsor: 'Chief Human Resources Officer',
    team: 'CHRO team, IT Leadership',
    timeline: 'July 2024 - June 2025',
    budget: '$3,000,000',
    progress: 30,
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
    cobitRef: 'APO07'
  },
  {
    id: '5',
    name: 'Zero Trust Architecture Implementation',
    description: 'Implement zero trust security model',
    type: 'capability',
    priority: 'high',
    status: 'on-track',
    targetObjectives: ['APO13', 'DSS05'],
    expectedOutcome: 'Security incidents reduced by 40%',
    sponsor: 'Chief Information Security Officer',
    team: '15 security engineers and architects',
    timeline: 'January 2024 - December 2025 (multi-phase)',
    budget: '$5,000,000',
    progress: 35,
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
    cobitRef: 'APO13, DSS05'
  },
  {
    id: '6',
    name: 'Data Governance Program',
    description: 'Establish enterprise data governance framework',
    type: 'capability',
    priority: 'medium',
    status: 'on-track',
    targetObjectives: ['APO14', 'MEA03'],
    expectedOutcome: 'Data quality: 87% → 95%, GDPR 100% compliant',
    sponsor: 'Chief Data Officer',
    team: '8 data governance specialists',
    timeline: 'April 2024 - June 2025',
    budget: '$1,800,000',
    progress: 50,
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
    cobitRef: 'APO14, MEA03'
  }
]

const ContinuousImprovement: React.FC<ContinuousImprovementProps> = ({ appData, updateAppData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingInitiative, setEditingInitiative] = useState<ImprovementInitiative | null>(null)
  const [newInitiative, setNewInitiative] = useState<Partial<ImprovementInitiative>>({
    type: 'capability',
    priority: 'medium',
    status: 'proposed'
  })

  const hasUserData = appData.improvements && appData.improvements.length > 0
  const displayData = hasUserData ? appData.improvements : []

  // Load TechCorp example
  const loadExample = () => {
    updateAppData({ improvements: TECHCORP_INITIATIVES })
  }

  // Add new initiative
  const handleAddInitiative = () => {
    if (!newInitiative.name || !newInitiative.description) return

    const initiative: ImprovementInitiative = {
      id: Date.now().toString(),
      name: newInitiative.name,
      description: newInitiative.description,
      type: newInitiative.type as any,
      priority: newInitiative.priority as any,
      status: newInitiative.status as any,
      targetObjectives: newInitiative.targetObjectives || [],
      expectedOutcome: newInitiative.expectedOutcome || '',
      sponsor: newInitiative.sponsor,
      team: newInitiative.team,
      timeline: newInitiative.timeline,
      budget: newInitiative.budget,
      progress: newInitiative.progress || 0,
      objectives: newInitiative.objectives,
      metrics: newInitiative.metrics,
      cobitRef: newInitiative.cobitRef,
      lessons: newInitiative.lessons
    }

    updateAppData({ improvements: [...appData.improvements, initiative] })
    setShowAddForm(false)
    setNewInitiative({ type: 'capability', priority: 'medium', status: 'proposed' })
  }

  // Update initiative
  const handleUpdateInitiative = () => {
    if (!editingInitiative) return

    const updated = appData.improvements.map(init =>
      init.id === editingInitiative.id ? editingInitiative : init
    )
    updateAppData({ improvements: updated })
    setEditingInitiative(null)
  }

  // Delete initiative
  const handleDeleteInitiative = (id: string) => {
    if (confirm('Are you sure you want to delete this initiative?')) {
      updateAppData({ improvements: appData.improvements.filter(init => init.id !== id) })
    }
  }

  // Filter initiatives
  const filteredInitiatives = selectedCategory === 'all'
    ? displayData
    : displayData.filter(i => i.type === selectedCategory)

  // Calculate portfolio metrics
  const onTrackCount = displayData.filter(i => i.status === 'on-track' || i.status === 'completed').length
  const atRiskCount = displayData.filter(i => i.status === 'at-risk').length
  const totalBudget = displayData.reduce((sum, i) => {
    const budget = i.budget?.replace(/[^0-9.]/g, '') || '0'
    return sum + parseFloat(budget)
  }, 0)

  // Icon mapping
  const iconMap: Record<string, any> = {
    innovation: Cloud,
    performance: TrendingUp,
    capability: Bot,
    technology: Database,
    governance: Shield,
    process: RefreshCcw
  }

  const getStatusBadge = (status: string) => {
    if (status === 'on-track' || status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3" /> {status === 'completed' ? 'Completed' : 'On Track'}
        </span>
      )
    }
    if (status === 'at-risk') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
          <AlertCircle className="w-3 h-3" /> At Risk
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
        {status}
      </span>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCcw className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Continuous Improvement</h1>
        </div>
        <p className="text-teal-100">Strategic improvement initiatives and lessons learned</p>
        {hasUserData && appData.context && (
          <p className="text-teal-200 text-sm mt-2">{appData.context.organizationName || 'Your Organization'} • {displayData.length} Initiatives • {totalBudget > 0 ? `$${(totalBudget / 1000000).toFixed(1)}M Investment` : 'Budget TBD'}</p>
        )}
      </div>

      <DisclaimerBanner />

      {/* Empty State */}
      {!hasUserData && (
        <div className="card bg-blue-50 border-blue-200 text-center py-12">
          <RefreshCcw className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-900 mb-2">No Improvement Initiatives Yet</h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Track your strategic improvement initiatives to continuously enhance governance maturity and performance.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={loadExample} className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Load TechCorp Example
            </button>
            <button onClick={() => setShowAddForm(true)} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add First Initiative
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Dashboard */}
      {hasUserData && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Improvement Portfolio Dashboard</h2>
            <button onClick={() => setShowAddForm(true)} className="btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Initiative
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg card">
              <div className="text-xs text-blue-700 mb-1">Total Active Initiatives</div>
              <div className="text-lg font-bold text-blue-900">{displayData.length}</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg card">
              <div className="text-xs text-purple-700 mb-1">Total Investment</div>
              <div className="text-lg font-bold text-purple-900">
                {totalBudget > 0 ? `$${(totalBudget / 1000000).toFixed(1)}M` : 'TBD'}
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg card">
              <div className="text-xs text-green-700 mb-1">On-Track Initiatives</div>
              <div className="text-lg font-bold text-green-900">{onTrackCount} of {displayData.length}</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg card">
              <div className="text-xs text-orange-700 mb-1">At-Risk Initiatives</div>
              <div className="text-lg font-bold text-orange-900">{atRiskCount}</div>
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
                { id: 'innovation', label: 'Innovation', icon: '💡' },
                { id: 'technology', label: 'Technology', icon: '🔧' },
                { id: 'governance', label: 'Governance', icon: '🛡️' },
                { id: 'process', label: 'Process', icon: '🔄' }
              ].map(cat => {
                const count = cat.id === 'all' ? displayData.length : displayData.filter(i => i.type === cat.id).length
                if (count === 0 && cat.id !== 'all') return null
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.icon} {cat.label} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Strategic Initiatives */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Strategic Initiatives</h2>
            {filteredInitiatives.length === 0 ? (
              <div className="card text-center py-8 text-gray-500">
                No initiatives in this category yet.
              </div>
            ) : (
              filteredInitiatives.map((initiative) => {
                const Icon = iconMap[initiative.type] || RefreshCcw
                const colorMap: Record<string, string> = {
                  innovation: 'purple',
                  performance: 'orange',
                  capability: 'blue',
                  technology: 'teal',
                  governance: 'red',
                  process: 'green'
                }
                const color = colorMap[initiative.type] || 'gray'

                return (
                  <div key={initiative.id} className="card border-2">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg bg-${color}-100`}>
                          <Icon className={`w-6 h-6 text-${color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{initiative.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{initiative.description}</p>
                          {initiative.cobitRef && (
                            <div className="text-xs text-gray-500 mt-1">COBIT: {initiative.cobitRef}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(initiative.status)}
                        <button
                          onClick={() => setEditingInitiative(initiative)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteInitiative(initiative.id)}
                          className="p-1 hover:bg-red-100 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="space-y-1">
                        {initiative.sponsor && <div><strong>Sponsor:</strong> {initiative.sponsor}</div>}
                        {initiative.team && <div><strong>Team:</strong> {initiative.team}</div>}
                        {initiative.timeline && <div><strong>Timeline:</strong> {initiative.timeline}</div>}
                        {initiative.budget && <div><strong>Budget:</strong> {initiative.budget}</div>}
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">
                          Progress: {initiative.progress || 0}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full bg-${color}-600`}
                            style={{ width: `${initiative.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {initiative.objectives && initiative.objectives.length > 0 && (
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
                      )}
                      {initiative.metrics && initiative.metrics.length > 0 && (
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
                      )}
                    </div>

                    {initiative.expectedOutcome && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                        <strong>Expected Impact:</strong> {initiative.expectedOutcome}
                      </div>
                    )}

                    {initiative.lessons && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                        <strong>Lessons Learned:</strong> {initiative.lessons}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </>
      )}

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingInitiative) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingInitiative ? 'Edit Initiative' : 'Add New Initiative'}
              </h3>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initiative Name *
                  </label>
                  <input
                    type="text"
                    value={editingInitiative ? editingInitiative.name : newInitiative.name || ''}
                    onChange={(e) => editingInitiative
                      ? setEditingInitiative({ ...editingInitiative, name: e.target.value })
                      : setNewInitiative({ ...newInitiative, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g., Benefits Realization Framework"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={editingInitiative ? editingInitiative.description : newInitiative.description || ''}
                    onChange={(e) => editingInitiative
                      ? setEditingInitiative({ ...editingInitiative, description: e.target.value })
                      : setNewInitiative({ ...newInitiative, description: e.target.value })
                    }
                    className="input-field"
                    rows={2}
                    placeholder="Brief description of the initiative"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      value={editingInitiative ? editingInitiative.type : newInitiative.type}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, type: e.target.value as any })
                        : setNewInitiative({ ...newInitiative, type: e.target.value as any })
                      }
                      className="input-field"
                    >
                      <option value="capability">Capability Maturity</option>
                      <option value="performance">Performance Optimization</option>
                      <option value="innovation">Innovation</option>
                      <option value="technology">Technology</option>
                      <option value="governance">Governance</option>
                      <option value="process">Process</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                    <select
                      value={editingInitiative ? editingInitiative.priority : newInitiative.priority}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, priority: e.target.value as any })
                        : setNewInitiative({ ...newInitiative, priority: e.target.value as any })
                      }
                      className="input-field"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      value={editingInitiative ? editingInitiative.status : newInitiative.status}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, status: e.target.value as any })
                        : setNewInitiative({ ...newInitiative, status: e.target.value as any })
                      }
                      className="input-field"
                    >
                      <option value="proposed">Proposed</option>
                      <option value="approved">Approved</option>
                      <option value="in-progress">In Progress</option>
                      <option value="on-track">On Track</option>
                      <option value="at-risk">At Risk</option>
                      <option value="completed">Completed</option>
                      <option value="deferred">Deferred</option>
                    </select>
                  </div>

                  {/* Progress */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingInitiative ? editingInitiative.progress || 0 : newInitiative.progress || 0}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, progress: parseInt(e.target.value) || 0 })
                        : setNewInitiative({ ...newInitiative, progress: parseInt(e.target.value) || 0 })
                      }
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Sponsor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor</label>
                    <input
                      type="text"
                      value={editingInitiative ? editingInitiative.sponsor || '' : newInitiative.sponsor || ''}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, sponsor: e.target.value })
                        : setNewInitiative({ ...newInitiative, sponsor: e.target.value })
                      }
                      className="input-field"
                      placeholder="e.g., CIO"
                    />
                  </div>

                  {/* COBIT Reference */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">COBIT Reference</label>
                    <input
                      type="text"
                      value={editingInitiative ? editingInitiative.cobitRef || '' : newInitiative.cobitRef || ''}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, cobitRef: e.target.value })
                        : setNewInitiative({ ...newInitiative, cobitRef: e.target.value })
                      }
                      className="input-field"
                      placeholder="e.g., EDM02, APO13"
                    />
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                    <input
                      type="text"
                      value={editingInitiative ? editingInitiative.timeline || '' : newInitiative.timeline || ''}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, timeline: e.target.value })
                        : setNewInitiative({ ...newInitiative, timeline: e.target.value })
                      }
                      className="input-field"
                      placeholder="e.g., Q1 2024 - Q4 2024"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <input
                      type="text"
                      value={editingInitiative ? editingInitiative.budget || '' : newInitiative.budget || ''}
                      onChange={(e) => editingInitiative
                        ? setEditingInitiative({ ...editingInitiative, budget: e.target.value })
                        : setNewInitiative({ ...newInitiative, budget: e.target.value })
                      }
                      className="input-field"
                      placeholder="e.g., $500,000"
                    />
                  </div>
                </div>

                {/* Team */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                  <input
                    type="text"
                    value={editingInitiative ? editingInitiative.team || '' : newInitiative.team || ''}
                    onChange={(e) => editingInitiative
                      ? setEditingInitiative({ ...editingInitiative, team: e.target.value })
                      : setNewInitiative({ ...newInitiative, team: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g., 5 developers, 2 architects"
                  />
                </div>

                {/* Expected Outcome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Outcome</label>
                  <textarea
                    value={editingInitiative ? editingInitiative.expectedOutcome || '' : newInitiative.expectedOutcome || ''}
                    onChange={(e) => editingInitiative
                      ? setEditingInitiative({ ...editingInitiative, expectedOutcome: e.target.value })
                      : setNewInitiative({ ...newInitiative, expectedOutcome: e.target.value })
                    }
                    className="input-field"
                    rows={2}
                    placeholder="Describe the expected impact and outcomes"
                  />
                </div>

                {/* Lessons Learned */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lessons Learned</label>
                  <textarea
                    value={editingInitiative ? editingInitiative.lessons || '' : newInitiative.lessons || ''}
                    onChange={(e) => editingInitiative
                      ? setEditingInitiative({ ...editingInitiative, lessons: e.target.value })
                      : setNewInitiative({ ...newInitiative, lessons: e.target.value })
                    }
                    className="input-field"
                    rows={2}
                    placeholder="Document key lessons learned (if applicable)"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingInitiative(null)
                    setNewInitiative({ type: 'capability', priority: 'medium', status: 'proposed' })
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={editingInitiative ? handleUpdateInitiative : handleAddInitiative}
                  className="btn-primary flex-1"
                  disabled={editingInitiative ? !editingInitiative.name || !editingInitiative.description : !newInitiative.name || !newInitiative.description}
                >
                  {editingInitiative ? 'Update' : 'Add'} Initiative
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContinuousImprovement
