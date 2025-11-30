import React, { useState, useEffect } from 'react'
import { RefreshCcw, Save, Plus, Trash2, Lightbulb, TrendingUp, CheckCircle2, Clock } from 'lucide-react'
import { AppData, ImprovementInitiative } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface ReviewEffectivenessProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const ReviewEffectiveness: React.FC<ReviewEffectivenessProps> = ({ appData, updateAppData }) => {
  const [improvements, setImprovements] = useState<ImprovementInitiative[]>(appData.improvements || [])
  const [newImprovement, setNewImprovement] = useState<Partial<ImprovementInitiative>>({
    name: '',
    description: '',
    type: 'process',
    priority: 'medium',
    status: 'proposed',
    targetObjectives: [],
    expectedOutcome: '',
    lessons: ''
  })

  useEffect(() => {
    if (appData.improvements) {
      setImprovements(appData.improvements)
    }
  }, [appData.improvements])

  const handleSave = () => {
    updateAppData({ improvements })
  }

  const addImprovement = () => {
    if (newImprovement.name?.trim()) {
      const initiative: ImprovementInitiative = {
        id: `improvement-${Date.now()}`,
        name: newImprovement.name.trim(),
        description: newImprovement.description || '',
        type: newImprovement.type || 'process',
        priority: newImprovement.priority || 'medium',
        status: newImprovement.status || 'proposed',
        targetObjectives: newImprovement.targetObjectives || [],
        expectedOutcome: newImprovement.expectedOutcome || '',
        lessons: newImprovement.lessons || ''
      }
      setImprovements([...improvements, initiative])
      setNewImprovement({
        name: '',
        description: '',
        type: 'process',
        priority: 'medium',
        status: 'proposed',
        targetObjectives: [],
        expectedOutcome: '',
        lessons: ''
      })
    }
  }

  const updateImprovement = (id: string, updates: Partial<ImprovementInitiative>) => {
    setImprovements(improvements.map(i => i.id === id ? { ...i, ...updates } : i))
  }

  const removeImprovement = (id: string) => {
    setImprovements(improvements.filter(i => i.id !== id))
  }

  // Calculate statistics
  const totalInitiatives = improvements.length
  const completedInitiatives = improvements.filter(i => i.status === 'completed').length
  const inProgressInitiatives = improvements.filter(i => i.status === 'in-progress').length
  const proposedInitiatives = improvements.filter(i => i.status === 'proposed').length
  const approvedInitiatives = improvements.filter(i => i.status === 'approved').length

  const completionRate = totalInitiatives > 0
    ? Math.round((completedInitiatives / totalInitiatives) * 100)
    : 0

  // Calculate benefits and capabilities summary from appData
  const totalBenefits = appData.benefits?.length || 0
  const realizedBenefits = appData.benefits?.filter(b => b.status === 'realized').length || 0
  const avgCapability = appData.capabilities.length > 0
    ? (appData.capabilities.reduce((sum, c) => sum + c.currentLevel, 0) / appData.capabilities.length).toFixed(1)
    : '0'
  const avgTarget = appData.capabilities.length > 0
    ? (appData.capabilities.reduce((sum, c) => sum + c.targetLevel, 0) / appData.capabilities.length).toFixed(1)
    : '0'

  const getStatusColor = (status: ImprovementInitiative['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300 text-green-800'
      case 'in-progress': return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'approved': return 'bg-purple-100 border-purple-300 text-purple-800'
      case 'deferred': return 'bg-gray-100 border-gray-300 text-gray-600'
      default: return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    }
  }

  const getTypeColor = (type: ImprovementInitiative['type']) => {
    switch (type) {
      case 'process': return 'bg-blue-100 text-blue-700'
      case 'capability': return 'bg-green-100 text-green-700'
      case 'governance': return 'bg-purple-100 text-purple-700'
      case 'technology': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: ImprovementInitiative['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCcw className="w-8 h-8" />
          <div>
            <p className="text-indigo-200 text-sm font-medium">Phase 7: How Do We Keep the Momentum Going?</p>
            <h1 className="text-3xl font-bold">Review Effectiveness</h1>
          </div>
        </div>
        <p className="text-indigo-100">
          Review governance effectiveness, capture lessons learned, and plan continuous improvements
        </p>
      </div>

      <DisclaimerBanner />

      {/* Overall Effectiveness Dashboard */}
      <div className="card bg-indigo-50 border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-4">Implementation Effectiveness Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-indigo-600">{avgCapability}</div>
            <div className="text-sm text-indigo-700">Avg. Current Capability</div>
            <div className="text-xs text-gray-500 mt-1">Target: {avgTarget}</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{realizedBenefits}/{totalBenefits}</div>
            <div className="text-sm text-green-700">Benefits Realized</div>
            <div className="text-xs text-gray-500 mt-1">
              {totalBenefits > 0 ? Math.round((realizedBenefits / totalBenefits) * 100) : 0}% success rate
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">{appData.components.filter(c => c.status === 'completed').length}</div>
            <div className="text-sm text-purple-700">Components Deployed</div>
            <div className="text-xs text-gray-500 mt-1">of {appData.components.length} defined</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{completedInitiatives}</div>
            <div className="text-sm text-blue-700">Improvements Completed</div>
            <div className="text-xs text-gray-500 mt-1">{completionRate}% completion rate</div>
          </div>
        </div>

        {/* Governance Maturity Progress */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-indigo-800">Overall Governance Maturity Progress</span>
            <span className="text-sm text-indigo-600">
              {avgCapability} / {avgTarget} (Gap: {(parseFloat(avgTarget) - parseFloat(avgCapability)).toFixed(1)})
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
              style={{ width: `${parseFloat(avgTarget) > 0 ? (parseFloat(avgCapability) / parseFloat(avgTarget)) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Key Questions for Review */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Phase 7 Review Questions</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li>o Did we achieve the target capability levels for priority objectives?</li>
              <li>o Were the expected benefits realized? If not, why?</li>
              <li>o What worked well and should be continued?</li>
              <li>o What challenges did we face and how can we address them going forward?</li>
              <li>o What new governance needs have emerged?</li>
              <li>o Should we start a new iteration of the implementation cycle?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add New Improvement Initiative */}
      <div className="card">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          Add Improvement Initiative
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initiative Name</label>
            <input
              type="text"
              value={newImprovement.name}
              onChange={(e) => setNewImprovement({ ...newImprovement, name: e.target.value })}
              placeholder="e.g., Enhance change management process"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newImprovement.type}
                onChange={(e) => setNewImprovement({ ...newImprovement, type: e.target.value as ImprovementInitiative['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="process">Process</option>
                <option value="capability">Capability</option>
                <option value="governance">Governance</option>
                <option value="technology">Technology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newImprovement.priority}
                onChange={(e) => setNewImprovement({ ...newImprovement, priority: e.target.value as ImprovementInitiative['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newImprovement.description}
              onChange={(e) => setNewImprovement({ ...newImprovement, description: e.target.value })}
              placeholder="Describe the improvement initiative..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Outcome</label>
            <textarea
              value={newImprovement.expectedOutcome}
              onChange={(e) => setNewImprovement({ ...newImprovement, expectedOutcome: e.target.value })}
              placeholder="What results do you expect from this initiative?"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={addImprovement} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Initiative
          </button>
        </div>
      </div>

      {/* Improvement Initiatives Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card text-center bg-yellow-50 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">{proposedInitiatives}</div>
          <div className="text-sm text-yellow-600">Proposed</div>
        </div>
        <div className="card text-center bg-purple-50 border-purple-200">
          <div className="text-2xl font-bold text-purple-700">{approvedInitiatives}</div>
          <div className="text-sm text-purple-600">Approved</div>
        </div>
        <div className="card text-center bg-blue-50 border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{inProgressInitiatives}</div>
          <div className="text-sm text-blue-600">In Progress</div>
        </div>
        <div className="card text-center bg-green-50 border-green-200">
          <div className="text-2xl font-bold text-green-700">{completedInitiatives}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        <div className="card text-center bg-gray-50 border-gray-200">
          <div className="text-2xl font-bold text-gray-600">
            {improvements.filter(i => i.status === 'deferred').length}
          </div>
          <div className="text-sm text-gray-500">Deferred</div>
        </div>
      </div>

      {/* Improvement Initiatives List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Improvement Initiatives ({improvements.length})</h3>

        {improvements.length > 0 ? (
          improvements.map(initiative => (
            <div key={initiative.id} className={`card border-2 ${getStatusColor(initiative.status)}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{initiative.name}</h4>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(initiative.type)}`}>
                      {initiative.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(initiative.priority)}`}>
                      {initiative.priority} priority
                    </span>
                  </div>
                </div>
                <button onClick={() => removeImprovement(initiative.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {initiative.description && (
                <p className="text-sm text-gray-600 mb-3">{initiative.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <select
                    value={initiative.status}
                    onChange={(e) => updateImprovement(initiative.id, { status: e.target.value as ImprovementInitiative['status'] })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="proposed">Proposed</option>
                    <option value="approved">Approved</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="deferred">Deferred</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Expected Outcome</label>
                  <input
                    type="text"
                    value={initiative.expectedOutcome}
                    onChange={(e) => updateImprovement(initiative.id, { expectedOutcome: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Lessons Learned</label>
                <textarea
                  value={initiative.lessons || ''}
                  onChange={(e) => updateImprovement(initiative.id, { lessons: e.target.value })}
                  placeholder="Document what worked, what didn't, and key insights..."
                  rows={2}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12 text-gray-500">
            <RefreshCcw className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No improvement initiatives defined yet. Review your implementation and identify areas for improvement.</p>
          </div>
        )}
      </div>

      {/* Next Iteration Planning */}
      <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Next Iteration Planning
        </h3>
        <p className="text-sm text-indigo-800 mb-4">
          COBIT 2019 implementation is iterative. After completing Phase 7, return to Phase 1 to:
        </p>
        <ul className="text-sm text-indigo-700 space-y-2 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">1.</span>
            <span>Re-evaluate drivers - have business priorities changed?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">2.</span>
            <span>Re-assess current state with updated capability levels</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">3.</span>
            <span>Set new target states for the next maturity level</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">4.</span>
            <span>Plan and execute the next wave of improvements</span>
          </li>
        </ul>
        <div className="flex items-center gap-2 text-indigo-600 font-medium">
          <Clock className="w-4 h-4" />
          <span>Recommended review cycle: Quarterly or bi-annually</span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Review Data
        </button>
      </div>
    </div>
  )
}

export default ReviewEffectiveness
