import React, { useState } from 'react'
import { AlertTriangle, Save, Plus, Trash2, Link as LinkIcon, TrendingUp, Target, Info, X } from 'lucide-react'
import { AppData, ITRelatedIssue } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface IssuesIdentificationProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

interface ExtendedIssue extends ITRelatedIssue {
  severity: 'critical' | 'high' | 'medium' | 'low'
  impact: string
  affectedProcesses: string[]
  rootCauses: string[]
  businessImpact: string
  estimatedCost: string
  status: 'identified' | 'analyzing' | 'planning' | 'resolved'
}

const issueCategories = [
  { value: 'frustration', label: 'Frustration & Pain Points', icon: '😤', color: 'red' },
  { value: 'incident', label: 'Incidents & Problems', icon: '🚨', color: 'orange' },
  { value: 'risk', label: 'Risks & Vulnerabilities', icon: '⚠️', color: 'yellow' },
  { value: 'opportunity', label: 'Improvement Opportunities', icon: '💡', color: 'green' },
] as const

const allObjectives = [
  // EDM
  'EDM01', 'EDM02', 'EDM03', 'EDM04', 'EDM05',
  // APO
  'APO01', 'APO02', 'APO03', 'APO04', 'APO05', 'APO06', 'APO07', 'APO08', 'APO09', 'APO10',
  'APO11', 'APO12', 'APO13', 'APO14',
  // BAI
  'BAI01', 'BAI02', 'BAI03', 'BAI04', 'BAI05', 'BAI06', 'BAI07', 'BAI08', 'BAI09', 'BAI10', 'BAI11',
  // DSS
  'DSS01', 'DSS02', 'DSS03', 'DSS04', 'DSS05', 'DSS06',
  // MEA
  'MEA01', 'MEA02', 'MEA03', 'MEA04',
]

const IssuesIdentification: React.FC<IssuesIdentificationProps> = ({ appData, updateAppData }) => {
  const [issues, setIssues] = useState<ExtendedIssue[]>(() => {
    // Initialize from context if available
    const contextIssues = appData.context?.designFactors?.itRelatedIssues || []
    return contextIssues.map(issue => ({
      ...issue,
      severity: 'medium' as const,
      impact: '',
      affectedProcesses: [],
      rootCauses: [],
      businessImpact: '',
      estimatedCost: '',
      status: 'identified' as const,
    }))
  })

  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [showObjectiveSuggestions, setShowObjectiveSuggestions] = useState<string | null>(null)

  const addIssue = () => {
    const newIssue: ExtendedIssue = {
      id: `issue-${Date.now()}`,
      category: 'frustration',
      description: '',
      priority: 'medium',
      relatedObjectives: [],
      severity: 'medium',
      impact: '',
      affectedProcesses: [],
      rootCauses: [],
      businessImpact: '',
      estimatedCost: '',
      status: 'identified',
    }
    setIssues(prev => [...prev, newIssue])
    setSelectedIssue(newIssue.id)
  }

  const updateIssue = (id: string, updates: Partial<ExtendedIssue>) => {
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, ...updates } : issue))
  }

  const removeIssue = (id: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== id))
    if (selectedIssue === id) setSelectedIssue(null)
  }

  const addRootCause = (issueId: string) => {
    updateIssue(issueId, {
      rootCauses: [...(issues.find(i => i.id === issueId)?.rootCauses || []), '']
    })
  }

  const updateRootCause = (issueId: string, index: number, value: string) => {
    const issue = issues.find(i => i.id === issueId)
    if (!issue) return
    const updated = [...issue.rootCauses]
    updated[index] = value
    updateIssue(issueId, { rootCauses: updated })
  }

  const removeRootCause = (issueId: string, index: number) => {
    const issue = issues.find(i => i.id === issueId)
    if (!issue) return
    updateIssue(issueId, { rootCauses: issue.rootCauses.filter((_, i) => i !== index) })
  }

  const toggleObjective = (issueId: string, objectiveId: string) => {
    const issue = issues.find(i => i.id === issueId)
    if (!issue) return
    const updated = issue.relatedObjectives.includes(objectiveId)
      ? issue.relatedObjectives.filter(o => o !== objectiveId)
      : [...issue.relatedObjectives, objectiveId]
    updateIssue(issueId, { relatedObjectives: updated })
  }

  const getSuggestedObjectives = (category: ITRelatedIssue['category']): string[] => {
    const suggestions: Record<ITRelatedIssue['category'], string[]> = {
      frustration: ['APO01', 'APO07', 'BAI05', 'DSS02'],
      incident: ['DSS02', 'DSS03', 'DSS04', 'MEA01'],
      risk: ['EDM03', 'APO12', 'APO13', 'DSS05', 'MEA02'],
      opportunity: ['EDM01', 'EDM02', 'APO02', 'APO04', 'BAI05'],
    }
    return suggestions[category] || []
  }

  const handleSave = () => {
    // Update context with issues (only save base ITRelatedIssue fields)
    const simpleIssues: ITRelatedIssue[] = issues.map(issue => ({
      id: issue.id,
      category: issue.category,
      description: issue.description,
      priority: issue.priority,
      relatedObjectives: issue.relatedObjectives,
    }))

    updateAppData({
      context: {
        ...appData.context!,
        designFactors: {
          ...appData.context!.designFactors,
          itRelatedIssues: simpleIssues,
        },
      },
    })
  }

  const stats = {
    total: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    byCategory: issueCategories.map(cat => ({
      category: cat.label,
      count: issues.filter(i => i.category === cat.value).length,
    })),
    withObjectives: issues.filter(i => i.relatedObjectives.length > 0).length,
  }

  const selectedIssueData = issues.find(i => i.id === selectedIssue)

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">I&T-Related Issues Identification</h1>
            <p className="text-teal-100">Phase 2: Identify and analyze current issues and pain points</p>
          </div>
        </div>
        <p className="text-teal-100 text-sm mt-2">
          Document issues that need to be addressed and link them to COBIT objectives
        </p>
      </div>

      <DisclaimerBanner />

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <AlertTriangle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Issues</div>
        </div>
        <div className="card text-center bg-red-50">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
          <div className="text-sm text-red-800">Critical</div>
        </div>
        <div className="card text-center bg-orange-50">
          <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-orange-600">{stats.high}</div>
          <div className="text-sm text-orange-800">High Severity</div>
        </div>
        <div className="card text-center bg-blue-50">
          <LinkIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-blue-600">{stats.withObjectives}</div>
          <div className="text-sm text-blue-800">Linked to Objectives</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h3 className="font-semibold mb-4">Issues by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.byCategory.map(cat => (
            <div key={cat.category} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <div className="text-2xl">{issueCategories.find(c => c.label === cat.category)?.icon}</div>
              <div>
                <div className="text-sm font-medium text-gray-900">{cat.count}</div>
                <div className="text-xs text-gray-600">{cat.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issues List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Issues</h2>
            <button onClick={addIssue} className="btn-primary text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Issue
            </button>
          </div>

          {issues.length === 0 ? (
            <div className="card bg-gray-50 text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No issues identified yet.</p>
              <p className="text-sm text-gray-500">Click "Add Issue" to start.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {issues.map(issue => {
                const category = issueCategories.find(c => c.value === issue.category)
                return (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue.id)}
                    className={`card cursor-pointer transition-all ${
                      selectedIssue === issue.id
                        ? 'ring-2 ring-teal-500 bg-teal-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{category?.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            issue.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            issue.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {issue.severity}
                          </span>
                          {issue.relatedObjectives.length > 0 && (
                            <span className="text-xs text-blue-600 flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              {issue.relatedObjectives.length}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-900 line-clamp-2">
                          {issue.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{category?.label}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Issue Details */}
        <div className="lg:col-span-2">
          {!selectedIssueData ? (
            <div className="card bg-gray-50 text-center py-12">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select an issue to view and edit details</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Issue Header */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold">Issue Details</h2>
                  <button
                    onClick={() => removeIssue(selectedIssueData.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Category, Priority & Severity */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={selectedIssueData.category}
                        onChange={(e) => updateIssue(selectedIssueData.id, { category: e.target.value as ITRelatedIssue['category'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      >
                        {issueCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={selectedIssueData.priority}
                        onChange={(e) => updateIssue(selectedIssueData.id, { priority: e.target.value as ITRelatedIssue['priority'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <select
                        value={selectedIssueData.severity}
                        onChange={(e) => updateIssue(selectedIssueData.id, { severity: e.target.value as ExtendedIssue['severity'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                    <textarea
                      value={selectedIssueData.description}
                      onChange={(e) => updateIssue(selectedIssueData.id, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      rows={3}
                      placeholder="Describe the issue in detail..."
                    />
                  </div>

                  {/* Business Impact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Impact</label>
                    <textarea
                      value={selectedIssueData.businessImpact}
                      onChange={(e) => updateIssue(selectedIssueData.id, { businessImpact: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      rows={2}
                      placeholder="How does this issue impact the business?"
                    />
                  </div>

                  {/* Status & Cost */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedIssueData.status}
                        onChange={(e) => updateIssue(selectedIssueData.id, { status: e.target.value as ExtendedIssue['status'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="identified">Identified</option>
                        <option value="analyzing">Analyzing</option>
                        <option value="planning">Planning</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost Impact</label>
                      <input
                        type="text"
                        value={selectedIssueData.estimatedCost}
                        onChange={(e) => updateIssue(selectedIssueData.id, { estimatedCost: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., $50,000/year"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Root Cause Analysis */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Root Cause Analysis
                  </h3>
                  <button
                    onClick={() => addRootCause(selectedIssueData.id)}
                    className="btn-secondary text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Root Cause
                  </button>
                </div>

                {selectedIssueData.rootCauses.length === 0 ? (
                  <p className="text-gray-500 text-sm">No root causes identified yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedIssueData.rootCauses.map((cause, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={cause}
                          onChange={(e) => updateRootCause(selectedIssueData.id, index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                          placeholder="Describe a root cause..."
                        />
                        <button
                          onClick={() => removeRootCause(selectedIssueData.id, index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related COBIT Objectives */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Related COBIT Objectives
                  </h3>
                  <button
                    onClick={() => setShowObjectiveSuggestions(
                      showObjectiveSuggestions === selectedIssueData.id ? null : selectedIssueData.id
                    )}
                    className="btn-secondary text-sm"
                  >
                    {showObjectiveSuggestions === selectedIssueData.id ? 'Hide' : 'Show'} Suggestions
                  </button>
                </div>

                {/* Suggested Objectives */}
                {showObjectiveSuggestions === selectedIssueData.id && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-2">Suggested for {issueCategories.find(c => c.value === selectedIssueData.category)?.label}:</p>
                    <div className="flex flex-wrap gap-2">
                      {getSuggestedObjectives(selectedIssueData.category).map(obj => (
                        <button
                          key={obj}
                          onClick={() => toggleObjective(selectedIssueData.id, obj)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            selectedIssueData.relatedObjectives.includes(obj)
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-100'
                          }`}
                        >
                          {obj}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Objectives */}
                {selectedIssueData.relatedObjectives.length === 0 ? (
                  <p className="text-gray-500 text-sm">No objectives linked yet. Click "Show Suggestions" for recommendations.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedIssueData.relatedObjectives.map(obj => (
                      <span
                        key={obj}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        {obj}
                        <button
                          onClick={() => toggleObjective(selectedIssueData.id, obj)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* All Objectives Grid */}
                <details className="mt-4">
                  <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                    Browse all {allObjectives.length} COBIT objectives
                  </summary>
                  <div className="mt-3 grid grid-cols-5 md:grid-cols-8 gap-2">
                    {allObjectives.map(obj => (
                      <button
                        key={obj}
                        onClick={() => toggleObjective(selectedIssueData.id, obj)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          selectedIssueData.relatedObjectives.includes(obj)
                            ? obj.startsWith('EDM') ? 'bg-purple-600 text-white' :
                              obj.startsWith('APO') ? 'bg-blue-600 text-white' :
                              obj.startsWith('BAI') ? 'bg-green-600 text-white' :
                              obj.startsWith('DSS') ? 'bg-orange-600 text-white' :
                              'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Issues
        </button>
      </div>
    </div>
  )
}

export default IssuesIdentification
