import React, { useState, useEffect } from 'react'
import { Target, Plus, Trash2, Save } from 'lucide-react'
import { AppData, EnterpriseContext, EnterpriseGoal, Stakeholder, defaultDesignFactors } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface GovernanceContextProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const enterpriseGoalsData: EnterpriseGoal[] = [
  { id: 'EG01', name: 'Stakeholder value of business investments', perspective: 'Financial', selected: false },
  { id: 'EG02', name: 'Portfolio of competitive products and services', perspective: 'Financial', selected: false },
  { id: 'EG03', name: 'Managed business risk', perspective: 'Financial', selected: false },
  { id: 'EG04', name: 'Compliance with external laws and regulations', perspective: 'Financial', selected: false },
  { id: 'EG05', name: 'Customer-oriented service culture', perspective: 'Customer', selected: false },
  { id: 'EG06', name: 'Business service continuity and availability', perspective: 'Customer', selected: false },
  { id: 'EG07', name: 'Agility to respond to changing business environment', perspective: 'Customer', selected: false },
  { id: 'EG08', name: 'Quality of management information', perspective: 'Internal', selected: false },
  { id: 'EG09', name: 'Optimization of internal business process functionality', perspective: 'Internal', selected: false },
  { id: 'EG10', name: 'Optimization of business process costs', perspective: 'Internal', selected: false },
  { id: 'EG11', name: 'Skilled and motivated people', perspective: 'Learning', selected: false },
  { id: 'EG12', name: 'Product and business innovation culture', perspective: 'Learning', selected: false },
  { id: 'EG13', name: 'Management of business change programs', perspective: 'Learning', selected: false },
]

const GovernanceContext: React.FC<GovernanceContextProps> = ({ appData, updateAppData }) => {
  const [context, setContext] = useState<EnterpriseContext>(
    appData.context || {
      organizationName: '',
      industry: '',
      size: '',
      itRole: '',
      challenges: [],
      enterpriseGoals: enterpriseGoalsData,
      alignmentGoals: [],
      stakeholders: [],
      designFactors: defaultDesignFactors,
      selectedFocusAreas: []
    }
  )

  const [newChallenge, setNewChallenge] = useState('')
  const [newStakeholder, setNewStakeholder] = useState<Stakeholder>({
    name: '',
    needs: '',
    priority: 'medium'
  })

  useEffect(() => {
    if (appData.context) {
      setContext(appData.context)
    }
  }, [appData.context])

  const handleSave = () => {
    updateAppData({ context })
  }

  const toggleGoal = (goalId: string) => {
    setContext({
      ...context,
      enterpriseGoals: context.enterpriseGoals.map(g =>
        g.id === goalId ? { ...g, selected: !g.selected } : g
      )
    })
  }

  const addChallenge = () => {
    if (newChallenge.trim()) {
      setContext({
        ...context,
        challenges: [...context.challenges, newChallenge.trim()]
      })
      setNewChallenge('')
    }
  }

  const removeChallenge = (index: number) => {
    setContext({
      ...context,
      challenges: context.challenges.filter((_, i) => i !== index)
    })
  }

  const addStakeholder = () => {
    if (newStakeholder.name.trim() && newStakeholder.needs.trim()) {
      setContext({
        ...context,
        stakeholders: [...context.stakeholders, newStakeholder]
      })
      setNewStakeholder({ name: '', needs: '', priority: 'medium' })
    }
  }

  const removeStakeholder = (index: number) => {
    setContext({
      ...context,
      stakeholders: context.stakeholders.filter((_, i) => i !== index)
    })
  }

  const perspectives = ['Financial', 'Customer', 'Internal', 'Learning'] as const

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Governance Context Definition</h1>
        </div>
        <p className="text-teal-100">
          Define your enterprise goals, stakeholder needs, and governance context
        </p>
      </div>

      <DisclaimerBanner />

      {/* Organization Details */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Enterprise Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name
            </label>
            <input
              type="text"
              value={context.organizationName}
              onChange={(e) => setContext({ ...context, organizationName: e.target.value })}
              placeholder="e.g., Global Financial Services Inc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <input
              type="text"
              value={context.industry}
              onChange={(e) => setContext({ ...context, industry: e.target.value })}
              placeholder="e.g., Banking and Financial Services"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Size
            </label>
            <select
              value={context.size}
              onChange={(e) => setContext({ ...context, size: e.target.value as EnterpriseContext['size'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Organization Size...</option>
              <option value="small">Small - Under 250 employees</option>
              <option value="medium">Medium - 250-1,000 employees</option>
              <option value="large">Large - 1,000-10,000 employees</option>
              <option value="enterprise">Enterprise - Over 10,000 employees</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IT Role</label>
            <input
              type="text"
              value={context.itRole}
              onChange={(e) => setContext({ ...context, itRole: e.target.value })}
              placeholder="e.g., Key enabler of digital banking"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Enterprise Goals - Balanced Scorecard */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Enterprise Goals (Balanced Scorecard)</h2>
        <p className="text-sm text-gray-600 mb-6">
          Select enterprise goals that align with your strategic objectives. These will cascade to
          alignment goals and governance objectives.
        </p>
        {perspectives.map((perspective) => (
          <div key={perspective} className="mb-6 last:mb-0">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">{perspective} Perspective</h3>
            <div className="space-y-2">
              {context.enterpriseGoals
                .filter(g => g.perspective === perspective)
                .map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      goal.selected
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          goal.selected ? 'bg-teal-600 border-teal-600' : 'border-gray-300'
                        }`}
                      >
                        {goal.selected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="flex-1 text-sm font-medium">{goal.name}</span>
                      <span className="text-xs text-gray-500">{goal.id}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
        <div className="mt-4 p-3 bg-teal-50 rounded-lg">
          <p className="text-sm text-teal-800">
            <strong>{context.enterpriseGoals.filter(g => g.selected).length} goals selected</strong> across{' '}
            {new Set(context.enterpriseGoals.filter(g => g.selected).map(g => g.perspective)).size}{' '}
            perspectives
          </p>
        </div>
      </div>

      {/* Key Challenges */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Key Governance Challenges</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newChallenge}
            onChange={(e) => setNewChallenge(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addChallenge()}
            placeholder="e.g., Digital transformation, regulatory compliance"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button onClick={addChallenge} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {context.challenges.map((challenge, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
            >
              <span className="text-sm">{challenge}</span>
              <button
                onClick={() => removeChallenge(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Needs */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Stakeholder Needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            value={newStakeholder.name}
            onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
            placeholder="e.g., Board of Directors"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <input
            type="text"
            value={newStakeholder.needs}
            onChange={(e) => setNewStakeholder({ ...newStakeholder, needs: e.target.value })}
            placeholder="e.g., ROI visibility, risk oversight"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <select
              value={newStakeholder.priority}
              onChange={(e) =>
                setNewStakeholder({
                  ...newStakeholder,
                  priority: e.target.value as 'high' | 'medium' | 'low'
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button onClick={addStakeholder} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {context.stakeholders.map((stakeholder, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{stakeholder.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      stakeholder.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : stakeholder.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {stakeholder.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{stakeholder.needs}</p>
              </div>
              <button
                onClick={() => removeStakeholder(index)}
                className="text-red-600 hover:text-red-700 ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Governance Context
        </button>
      </div>
    </div>
  )
}

export default GovernanceContext
