import React, { useState } from 'react'
import { FileText, Save, Target, Zap, Users, Calendar, DollarSign, AlertTriangle, CheckCircle2, Plus, Trash2 } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface Phase4PlanningProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

interface BusinessCase {
  title: string
  problemStatement: string
  proposedSolution: string
  benefits: { description: string; type: 'financial' | 'operational' | 'strategic' | 'compliance'; estimatedValue: string }[]
  costs: { description: string; type: 'capital' | 'operational' | 'people'; amount: string }[]
  risks: { description: string; mitigation: string }[]
  timeline: string
  successCriteria: string[]
  sponsor: string
  status: 'draft' | 'review' | 'approved' | 'rejected'
}

interface QuickWin {
  id: string
  title: string
  description: string
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  relatedObjectives: string[]
  status: 'identified' | 'in-progress' | 'completed'
  owner: string
  targetDate: string
}

interface ProjectPlan {
  id: string
  name: string
  description: string
  objectives: string[]
  phase: string
  startDate: string
  endDate: string
  resources: string[]
  milestones: { name: string; date: string; completed: boolean }[]
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold'
}

const Phase4Planning: React.FC<Phase4PlanningProps> = ({ appData, updateAppData }) => {
  const [activeTab, setActiveTab] = useState<'business-case' | 'quick-wins' | 'projects' | 'resources'>('business-case')

  // Save function to persist Phase 4 planning data
  const handleSave = () => {
    // TODO: Add phase4Planning to AppData types when ready
    // For now, just trigger an update to mark lastUpdated
    updateAppData({})
  }

  // Business Case State
  const [businessCase, setBusinessCase] = useState<BusinessCase>({
    title: appData.programme?.name || 'COBIT 2019 Implementation',
    problemStatement: '',
    proposedSolution: '',
    benefits: [],
    costs: [],
    risks: [],
    timeline: '',
    successCriteria: [],
    sponsor: appData.programme?.sponsor || '',
    status: 'draft'
  })

  // Quick Wins State
  const [quickWins, setQuickWins] = useState<QuickWin[]>([])

  // Project Plans State
  const [projects, setProjects] = useState<ProjectPlan[]>([])

  // Derived data from capabilities
  const highPriorityGaps = (appData.capabilities || [])
    .filter(c => c.priority === 'high' && c.gap > 0)
    .sort((a, b) => b.gap - a.gap)

  const lowEffortHighImpact = (appData.capabilities || [])
    .filter(c => c.gap > 0 && c.gap <= 2 && c.priority === 'high')

  // Business Case handlers
  const addBenefit = () => {
    setBusinessCase(prev => ({
      ...prev,
      benefits: [...prev.benefits, { description: '', type: 'operational', estimatedValue: '' }]
    }))
  }

  const addCost = () => {
    setBusinessCase(prev => ({
      ...prev,
      costs: [...prev.costs, { description: '', type: 'operational', amount: '' }]
    }))
  }

  const addRisk = () => {
    setBusinessCase(prev => ({
      ...prev,
      risks: [...prev.risks, { description: '', mitigation: '' }]
    }))
  }

  const addSuccessCriteria = () => {
    setBusinessCase(prev => ({
      ...prev,
      successCriteria: [...prev.successCriteria, '']
    }))
  }

  // Quick Wins handlers
  const addQuickWin = () => {
    const newWin: QuickWin = {
      id: `qw-${Date.now()}`,
      title: '',
      description: '',
      effort: 'low',
      impact: 'high',
      relatedObjectives: [],
      status: 'identified',
      owner: '',
      targetDate: ''
    }
    setQuickWins(prev => [...prev, newWin])
  }

  const updateQuickWin = (id: string, updates: Partial<QuickWin>) => {
    setQuickWins(prev => prev.map(qw => qw.id === id ? { ...qw, ...updates } : qw))
  }

  const removeQuickWin = (id: string) => {
    setQuickWins(prev => prev.filter(qw => qw.id !== id))
  }

  // Project handlers
  const addProject = () => {
    const newProject: ProjectPlan = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      objectives: [],
      phase: 'Phase 5',
      startDate: '',
      endDate: '',
      resources: [],
      milestones: [],
      status: 'planned'
    }
    setProjects(prev => [...prev, newProject])
  }

  const updateProject = (id: string, updates: Partial<ProjectPlan>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">Phase 4: What Needs to Be Done?</h1>
            <p className="text-teal-100">Business Case Development, Project Planning & Quick Wins</p>
          </div>
        </div>
        <p className="text-teal-100 text-sm mt-2">
          Develop the business case, identify quick wins, and plan implementation projects
        </p>
      </div>

      <DisclaimerBanner />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-red-600">{highPriorityGaps.length}</div>
          <div className="text-sm text-gray-600">High Priority Gaps</div>
        </div>
        <div className="card text-center">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-yellow-600">{lowEffortHighImpact.length}</div>
          <div className="text-sm text-gray-600">Potential Quick Wins</div>
        </div>
        <div className="card text-center">
          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-green-600">
            {quickWins.filter(qw => qw.status === 'completed').length}/{quickWins.length}
          </div>
          <div className="text-sm text-gray-600">Quick Wins Completed</div>
        </div>
        <div className="card text-center">
          <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
          <div className="text-sm text-gray-600">Projects Planned</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('business-case')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'business-case'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Business Case
          </div>
        </button>
        <button
          onClick={() => setActiveTab('quick-wins')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'quick-wins'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Wins
          </div>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'projects'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Project Planning
          </div>
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'resources'
              ? 'border-teal-600 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Resources
          </div>
        </button>
      </div>

      {/* Business Case Tab */}
      {activeTab === 'business-case' && (
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Implementation Business Case</h2>
            <select
              value={businessCase.status}
              onChange={(e) => setBusinessCase(prev => ({ ...prev, status: e.target.value as BusinessCase['status'] }))}
              className={`px-4 py-2 rounded-lg font-medium ${
                businessCase.status === 'approved' ? 'bg-green-100 text-green-800' :
                businessCase.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                businessCase.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              <option value="draft">Draft</option>
              <option value="review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Basic Info */}
          <div className="card">
            <h3 className="font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initiative Title</label>
                <input
                  type="text"
                  value={businessCase.title}
                  onChange={(e) => setBusinessCase(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., COBIT 2019 Governance Implementation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Executive Sponsor</label>
                <input
                  type="text"
                  value={businessCase.sponsor}
                  onChange={(e) => setBusinessCase(prev => ({ ...prev, sponsor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., CIO, CFO"
                />
              </div>
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="card">
            <h3 className="font-semibold mb-4">Problem Statement & Proposed Solution</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement</label>
                <textarea
                  value={businessCase.problemStatement}
                  onChange={(e) => setBusinessCase(prev => ({ ...prev, problemStatement: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Describe the current pain points, gaps, and issues that need to be addressed..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Solution</label>
                <textarea
                  value={businessCase.proposedSolution}
                  onChange={(e) => setBusinessCase(prev => ({ ...prev, proposedSolution: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Describe how COBIT 2019 implementation will address these issues..."
                />
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Expected Benefits</h3>
              <button onClick={addBenefit} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Benefit
              </button>
            </div>
            {businessCase.benefits.length === 0 ? (
              <p className="text-gray-500 text-sm">No benefits added yet. Click "Add Benefit" to start.</p>
            ) : (
              <div className="space-y-3">
                {businessCase.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                    <select
                      value={benefit.type}
                      onChange={(e) => {
                        const updated = [...businessCase.benefits]
                        updated[index].type = e.target.value as typeof benefit.type
                        setBusinessCase(prev => ({ ...prev, benefits: updated }))
                      }}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="financial">Financial</option>
                      <option value="operational">Operational</option>
                      <option value="strategic">Strategic</option>
                      <option value="compliance">Compliance</option>
                    </select>
                    <input
                      type="text"
                      value={benefit.description}
                      onChange={(e) => {
                        const updated = [...businessCase.benefits]
                        updated[index].description = e.target.value
                        setBusinessCase(prev => ({ ...prev, benefits: updated }))
                      }}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Benefit description..."
                    />
                    <input
                      type="text"
                      value={benefit.estimatedValue}
                      onChange={(e) => {
                        const updated = [...businessCase.benefits]
                        updated[index].estimatedValue = e.target.value
                        setBusinessCase(prev => ({ ...prev, benefits: updated }))
                      }}
                      className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Est. value"
                    />
                    <button
                      onClick={() => {
                        const updated = businessCase.benefits.filter((_, i) => i !== index)
                        setBusinessCase(prev => ({ ...prev, benefits: updated }))
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Costs */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Estimated Costs</h3>
              <button onClick={addCost} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Cost
              </button>
            </div>
            {businessCase.costs.length === 0 ? (
              <p className="text-gray-500 text-sm">No costs added yet. Click "Add Cost" to start.</p>
            ) : (
              <div className="space-y-3">
                {businessCase.costs.map((cost, index) => (
                  <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                    <select
                      value={cost.type}
                      onChange={(e) => {
                        const updated = [...businessCase.costs]
                        updated[index].type = e.target.value as typeof cost.type
                        setBusinessCase(prev => ({ ...prev, costs: updated }))
                      }}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="capital">Capital</option>
                      <option value="operational">Operational</option>
                      <option value="people">People/Training</option>
                    </select>
                    <input
                      type="text"
                      value={cost.description}
                      onChange={(e) => {
                        const updated = [...businessCase.costs]
                        updated[index].description = e.target.value
                        setBusinessCase(prev => ({ ...prev, costs: updated }))
                      }}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Cost description..."
                    />
                    <input
                      type="text"
                      value={cost.amount}
                      onChange={(e) => {
                        const updated = [...businessCase.costs]
                        updated[index].amount = e.target.value
                        setBusinessCase(prev => ({ ...prev, costs: updated }))
                      }}
                      className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Amount"
                    />
                    <button
                      onClick={() => {
                        const updated = businessCase.costs.filter((_, i) => i !== index)
                        setBusinessCase(prev => ({ ...prev, costs: updated }))
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risks */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Risks & Mitigations</h3>
              <button onClick={addRisk} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Risk
              </button>
            </div>
            {businessCase.risks.length === 0 ? (
              <p className="text-gray-500 text-sm">No risks added yet. Click "Add Risk" to start.</p>
            ) : (
              <div className="space-y-3">
                {businessCase.risks.map((risk, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex gap-3 items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={risk.description}
                          onChange={(e) => {
                            const updated = [...businessCase.risks]
                            updated[index].description = e.target.value
                            setBusinessCase(prev => ({ ...prev, risks: updated }))
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Risk description..."
                        />
                        <input
                          type="text"
                          value={risk.mitigation}
                          onChange={(e) => {
                            const updated = [...businessCase.risks]
                            updated[index].mitigation = e.target.value
                            setBusinessCase(prev => ({ ...prev, risks: updated }))
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Mitigation strategy..."
                        />
                      </div>
                      <button
                        onClick={() => {
                          const updated = businessCase.risks.filter((_, i) => i !== index)
                          setBusinessCase(prev => ({ ...prev, risks: updated }))
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Success Criteria */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Success Criteria</h3>
              <button onClick={addSuccessCriteria} className="btn-secondary text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Criteria
              </button>
            </div>
            {businessCase.successCriteria.length === 0 ? (
              <p className="text-gray-500 text-sm">No success criteria added yet.</p>
            ) : (
              <div className="space-y-2">
                {businessCase.successCriteria.map((criteria, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={criteria}
                      onChange={(e) => {
                        const updated = [...businessCase.successCriteria]
                        updated[index] = e.target.value
                        setBusinessCase(prev => ({ ...prev, successCriteria: updated }))
                      }}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Measurable success criteria..."
                    />
                    <button
                      onClick={() => {
                        const updated = businessCase.successCriteria.filter((_, i) => i !== index)
                        setBusinessCase(prev => ({ ...prev, successCriteria: updated }))
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Wins Tab */}
      {activeTab === 'quick-wins' && (
        <div className="space-y-6">
          {/* Suggested Quick Wins from Gaps */}
          {lowEffortHighImpact.length > 0 && (
            <div className="card bg-yellow-50 border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Suggested Quick Wins (Based on Capability Assessment)
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                These objectives have small gaps (1-2 levels) but high priority - perfect for quick wins:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {lowEffortHighImpact.slice(0, 6).map(cap => (
                  <div key={cap.objectiveId} className="bg-white p-3 rounded-lg border border-yellow-200">
                    <div className="font-medium text-sm">{cap.objectiveId}</div>
                    <div className="text-xs text-gray-600">{cap.name}</div>
                    <div className="text-xs text-yellow-700 mt-1">Gap: {cap.gap} level(s)</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Wins List */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Quick Wins</h2>
            <button onClick={addQuickWin} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Quick Win
            </button>
          </div>

          {quickWins.length === 0 ? (
            <div className="card bg-gray-50 text-center py-8">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No quick wins identified yet.</p>
              <p className="text-sm text-gray-500">Quick wins are low-effort, high-impact improvements that build momentum.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quickWins.map(qw => (
                <div key={qw.id} className={`card ${
                  qw.status === 'completed' ? 'bg-green-50 border-green-200' :
                  qw.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                  'border-gray-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={qw.title}
                          onChange={(e) => updateQuickWin(qw.id, { title: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg font-medium"
                          placeholder="Quick win title..."
                        />
                        <div className="flex gap-2">
                          <select
                            value={qw.effort}
                            onChange={(e) => updateQuickWin(qw.id, { effort: e.target.value as QuickWin['effort'] })}
                            className="px-2 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="low">Low Effort</option>
                            <option value="medium">Medium Effort</option>
                            <option value="high">High Effort</option>
                          </select>
                          <select
                            value={qw.impact}
                            onChange={(e) => updateQuickWin(qw.id, { impact: e.target.value as QuickWin['impact'] })}
                            className="px-2 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="high">High Impact</option>
                            <option value="medium">Medium Impact</option>
                            <option value="low">Low Impact</option>
                          </select>
                          <select
                            value={qw.status}
                            onChange={(e) => updateQuickWin(qw.id, { status: e.target.value as QuickWin['status'] })}
                            className={`px-2 py-2 border rounded-lg text-sm font-medium ${
                              qw.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                              qw.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                              'border-gray-300'
                            }`}
                          >
                            <option value="identified">Identified</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      <textarea
                        value={qw.description}
                        onChange={(e) => updateQuickWin(qw.id, { description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={2}
                        placeholder="Description of the quick win..."
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={qw.owner}
                          onChange={(e) => updateQuickWin(qw.id, { owner: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Owner/Responsible"
                        />
                        <input
                          type="date"
                          value={qw.targetDate}
                          onChange={(e) => updateQuickWin(qw.id, { targetDate: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeQuickWin(qw.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Implementation Projects</h2>
            <button onClick={addProject} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="card bg-gray-50 text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No projects planned yet.</p>
              <p className="text-sm text-gray-500">Break down your implementation into manageable projects.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id} className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg font-medium"
                          placeholder="Project name..."
                        />
                        <div className="flex gap-2">
                          <input
                            type="date"
                            value={proj.startDate}
                            onChange={(e) => updateProject(proj.id, { startDate: e.target.value })}
                            className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Start"
                          />
                          <input
                            type="date"
                            value={proj.endDate}
                            onChange={(e) => updateProject(proj.id, { endDate: e.target.value })}
                            className="flex-1 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="End"
                          />
                        </div>
                        <select
                          value={proj.status}
                          onChange={(e) => updateProject(proj.id, { status: e.target.value as ProjectPlan['status'] })}
                          className={`px-2 py-2 border rounded-lg text-sm font-medium ${
                            proj.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                            proj.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                            proj.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                            'border-gray-300'
                          }`}
                        >
                          <option value="planned">Planned</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="on-hold">On Hold</option>
                        </select>
                      </div>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={2}
                        placeholder="Project description and objectives..."
                      />
                    </div>
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Resource Allocation</h2>

          {/* Resource Summary from Programme */}
          {appData.programme?.resources && appData.programme.resources.length > 0 ? (
            <div className="card">
              <h3 className="font-semibold mb-4">Allocated Resources (from Programme Initiation)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appData.programme.resources.map((resource, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      resource.allocated ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {resource.type === 'budget' && <DollarSign className="w-4 h-4 text-green-600" />}
                      {resource.type === 'people' && <Users className="w-4 h-4 text-blue-600" />}
                      {resource.type === 'technology' && <Target className="w-4 h-4 text-purple-600" />}
                      {resource.type === 'external' && <Users className="w-4 h-4 text-orange-600" />}
                      <span className="font-medium capitalize">{resource.type}</span>
                      {resource.allocated && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Allocated</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium">No resources defined yet</p>
                  <p className="text-sm text-yellow-700">
                    Go to Phase 1 (Programme Initiation) to define and allocate resources for the implementation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resource Planning Guidance */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Resource Planning Guidance</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                <span><strong>Budget:</strong> Consider costs for tools, training, consulting, and certification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                <span><strong>People:</strong> Identify internal champions, subject matter experts, and dedicated team members</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                <span><strong>Technology:</strong> GRC tools, assessment platforms, documentation systems</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                <span><strong>External:</strong> COBIT consultants, auditors, training providers</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Phase 4 Planning
        </button>
      </div>
    </div>
  )
}

export default Phase4Planning
