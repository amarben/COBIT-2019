import React, { useMemo } from 'react'
import { Route, ArrowRight, Target, Shield, Zap, Info } from 'lucide-react'
import { AppData } from '../types'
import {
  getAlignmentGoalsForEnterpriseGoals,
  getRecommendedObjectives,
  enterpriseToAlignmentMapping,
  alignmentToObjectiveMapping
} from '../data/goalsCascade'
import DisclaimerBanner from './DisclaimerBanner'

interface GoalsCascadeProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const GoalsCascade: React.FC<GoalsCascadeProps> = ({ appData }) => {
  // Get selected enterprise goals
  const selectedEnterpriseGoals = useMemo(() => {
    return appData.context?.enterpriseGoals.filter(g => g.selected) || []
  }, [appData.context?.enterpriseGoals])

  // Calculate alignment goals based on selected enterprise goals
  const alignmentGoalResults = useMemo(() => {
    const selectedIds = selectedEnterpriseGoals.map(g => g.id)
    return getAlignmentGoalsForEnterpriseGoals(selectedIds)
  }, [selectedEnterpriseGoals])

  // Calculate recommended objectives
  const recommendedObjectives = useMemo(() => {
    const alignmentGoalIds = alignmentGoalResults.map(r => r.goal.id)
    return getRecommendedObjectives(alignmentGoalIds)
  }, [alignmentGoalResults])

  // Group enterprise goals by perspective
  const goalsByPerspective = useMemo(() => {
    const perspectives = ['Financial', 'Customer', 'Internal', 'Learning'] as const
    return perspectives.map(p => ({
      perspective: p,
      goals: selectedEnterpriseGoals.filter(g => g.perspective === p)
    })).filter(p => p.goals.length > 0)
  }, [selectedEnterpriseGoals])

  // Group objectives by domain
  const objectivesByDomain = useMemo(() => {
    const domains = [
      { id: 'EDM', name: 'Governance', color: 'purple' },
      { id: 'APO', name: 'Align, Plan, Organize', color: 'blue' },
      { id: 'BAI', name: 'Build, Acquire, Implement', color: 'green' },
      { id: 'DSS', name: 'Deliver, Service, Support', color: 'orange' },
      { id: 'MEA', name: 'Monitor, Evaluate, Assess', color: 'indigo' }
    ]
    return domains.map(d => ({
      ...d,
      objectives: recommendedObjectives.filter(o => o.objectiveId.startsWith(d.id))
    })).filter(d => d.objectives.length > 0)
  }, [recommendedObjectives])

  const getPerspectiveColor = (perspective: string) => {
    switch (perspective) {
      case 'Financial': return 'bg-green-100 text-green-800 border-green-300'
      case 'Customer': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Internal': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Learning': return 'bg-purple-100 text-purple-800 border-purple-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-gray-100 text-gray-600 border-gray-300'
      default: return 'bg-gray-100 text-gray-600 border-gray-300'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'value': return 'bg-emerald-50 border-emerald-200'
      case 'risk': return 'bg-red-50 border-red-200'
      case 'resource': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getDomainColor = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'green': return 'bg-green-100 text-green-800 border-green-300'
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'indigo': return 'bg-indigo-100 text-indigo-800 border-indigo-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  if (selectedEnterpriseGoals.length === 0) {
    return (
      <div className="space-y-6 max-w-6xl">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Route className="w-8 h-8" />
            <div>
              <p className="text-purple-200 text-sm font-medium">Phase 3: Where Do We Want to Be?</p>
              <h1 className="text-3xl font-bold">Goals Cascade</h1>
            </div>
          </div>
          <p className="text-purple-100">
            Visualize how Enterprise Goals cascade to Alignment Goals and Governance/Management Objectives
          </p>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">No Enterprise Goals Selected</h3>
              <p className="text-sm text-yellow-800">
                Please go to Phase 2 (Current State Assessment) and select your Enterprise Goals first.
                The Goals Cascade will then show how your goals map to Alignment Goals and recommended Objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Route className="w-8 h-8" />
          <div>
            <p className="text-purple-200 text-sm font-medium">Phase 3: Where Do We Want to Be?</p>
            <h1 className="text-3xl font-bold">Goals Cascade</h1>
          </div>
        </div>
        <p className="text-purple-100">
          COBIT 2019 Goals Cascade: Enterprise Goals → Alignment Goals → Governance/Management Objectives
        </p>
      </div>

      <DisclaimerBanner />

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center bg-green-50 border-green-200">
          <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <div className="text-3xl font-bold text-green-700">{selectedEnterpriseGoals.length}</div>
          <div className="text-sm text-green-600">Enterprise Goals</div>
        </div>
        <div className="card text-center bg-blue-50 border-blue-200">
          <Zap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <div className="text-3xl font-bold text-blue-700">{alignmentGoalResults.length}</div>
          <div className="text-sm text-blue-600">Alignment Goals</div>
        </div>
        <div className="card text-center bg-purple-50 border-purple-200">
          <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <div className="text-3xl font-bold text-purple-700">{recommendedObjectives.length}</div>
          <div className="text-sm text-purple-600">Recommended Objectives</div>
        </div>
      </div>

      {/* Legend */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold mb-3">Relationship Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded font-bold">P</span>
            <span>Primary relationship (strong influence)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded font-bold">S</span>
            <span>Secondary relationship (supporting influence)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>High importance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span>Medium importance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span>Low importance</span>
          </div>
        </div>
      </div>

      {/* Cascade Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Enterprise Goals */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Enterprise Goals
            <span className="text-sm font-normal text-gray-500">(Balanced Scorecard)</span>
          </h2>

          {goalsByPerspective.map(({ perspective, goals }) => (
            <div key={perspective} className="space-y-2">
              <h3 className={`text-sm font-semibold px-2 py-1 rounded ${getPerspectiveColor(perspective)}`}>
                {perspective} Perspective
              </h3>
              {goals.map(goal => {
                // Find related alignment goals
                const relatedMappings = enterpriseToAlignmentMapping.filter(m => m.enterpriseGoalId === goal.id)
                return (
                  <div key={goal.id} className="p-3 bg-white border rounded-lg shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-500">{goal.id}</span>
                        <p className="text-sm font-medium text-gray-800">{goal.name}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {relatedMappings.map(m => (
                        <span
                          key={m.alignmentGoalId}
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            m.relationship === 'P' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {m.alignmentGoalId} ({m.relationship})
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ArrowRight className="w-8 h-8" />
            <span className="text-xs font-medium">Cascades to</span>
          </div>
        </div>

        {/* Column 2: Alignment Goals */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Alignment Goals
            <span className="text-sm font-normal text-gray-500">(13 I&T Goals)</span>
          </h2>

          {/* Group by category */}
          {(['value', 'risk', 'resource'] as const).map(category => {
            const categoryGoals = alignmentGoalResults.filter(r => r.goal.category === category)
            if (categoryGoals.length === 0) return null

            return (
              <div key={category} className="space-y-2">
                <h3 className={`text-sm font-semibold px-2 py-1 rounded capitalize ${
                  category === 'value' ? 'bg-emerald-100 text-emerald-800' :
                  category === 'risk' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {category === 'value' ? 'Value/Benefits' : category === 'risk' ? 'Risk Management' : 'Resource Optimization'}
                </h3>
                {categoryGoals.map(({ goal, importance, primaryCount, secondaryCount }) => {
                  // Find related objectives
                  const relatedMappings = alignmentToObjectiveMapping.filter(m => m.alignmentGoalId === goal.id)
                  return (
                    <div key={goal.id} className={`p-3 border rounded-lg shadow-sm ${getCategoryColor(category)}`}>
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500">{goal.id}</span>
                            <span className={`w-2 h-2 rounded-full ${
                              importance === 'high' ? 'bg-red-500' :
                              importance === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></span>
                          </div>
                          <p className="text-sm font-medium text-gray-800">{goal.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded">{primaryCount}P</span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{secondaryCount}S</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {relatedMappings.slice(0, 5).map(m => (
                          <span
                            key={m.objectiveId}
                            className={`text-xs px-1.5 py-0.5 rounded ${
                              m.relationship === 'P' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {m.objectiveId}
                          </span>
                        ))}
                        {relatedMappings.length > 5 && (
                          <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                            +{relatedMappings.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Arrow for mobile and Recommended Objectives */}
      <div className="flex items-center justify-center py-4 lg:hidden">
        <ArrowRight className="w-8 h-8 text-gray-400 rotate-90" />
      </div>

      {/* Column 3: Recommended Objectives */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-purple-600" />
          Recommended Governance & Management Objectives
          <span className="text-sm font-normal text-gray-500">({recommendedObjectives.length} objectives)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {objectivesByDomain.map(domain => (
            <div key={domain.id} className="space-y-2">
              <h3 className={`text-sm font-semibold px-2 py-1 rounded ${getDomainColor(domain.color)}`}>
                {domain.id} ({domain.objectives.length})
              </h3>
              <div className="space-y-1">
                {domain.objectives.map(obj => (
                  <div
                    key={obj.objectiveId}
                    className={`p-2 rounded border ${getImportanceColor(obj.importance)}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{obj.objectiveId}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs px-1 bg-red-200 text-red-800 rounded">{obj.primaryCount}P</span>
                        <span className="text-xs px-1 bg-gray-200 text-gray-700 rounded">{obj.secondaryCount}S</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Summary */}
      <div className="card bg-purple-50 border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-3">Priority Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-purple-800 mb-2">High Priority Objectives</h4>
            <div className="flex flex-wrap gap-1">
              {recommendedObjectives
                .filter(o => o.importance === 'high')
                .map(o => (
                  <span key={o.objectiveId} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                    {o.objectiveId}
                  </span>
                ))}
              {recommendedObjectives.filter(o => o.importance === 'high').length === 0 && (
                <span className="text-sm text-gray-500">None</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-purple-800 mb-2">Medium Priority Objectives</h4>
            <div className="flex flex-wrap gap-1">
              {recommendedObjectives
                .filter(o => o.importance === 'medium')
                .map(o => (
                  <span key={o.objectiveId} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
                    {o.objectiveId}
                  </span>
                ))}
              {recommendedObjectives.filter(o => o.importance === 'medium').length === 0 && (
                <span className="text-sm text-gray-500">None</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-purple-800 mb-2">Supporting Objectives</h4>
            <div className="flex flex-wrap gap-1">
              {recommendedObjectives
                .filter(o => o.importance === 'low')
                .map(o => (
                  <span key={o.objectiveId} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                    {o.objectiveId}
                  </span>
                ))}
              {recommendedObjectives.filter(o => o.importance === 'low').length === 0 && (
                <span className="text-sm text-gray-500">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guidance */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Using the Goals Cascade</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>1. <strong>High priority objectives</strong> should be your primary focus - set target capability level 3-4</li>
              <li>2. <strong>Medium priority objectives</strong> support your goals - target capability level 2-3</li>
              <li>3. <strong>Supporting objectives</strong> may need basic implementation - target capability level 1-2</li>
              <li>4. Use this cascade to inform your capability assessment target levels in Phase 3</li>
              <li>5. The cascade reflects the official COBIT 2019 mapping tables</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalsCascade
