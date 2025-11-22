import React, { useState, useEffect } from 'react'
import { Shield, Save, CheckCircle, Circle, ArrowRight } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import { governanceObjectivesData } from '../data/governanceObjectives'

interface GovernanceObjectivesProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
  selectedObjectiveId?: string
}

const GovernanceObjectives: React.FC<GovernanceObjectivesProps> = ({
  appData,
  updateAppData,
  selectedObjectiveId
}) => {
  const [objectives, setObjectives] = useState(
    appData.governanceObjectives.length > 0
      ? appData.governanceObjectives
      : governanceObjectivesData
  )

  useEffect(() => {
    if (appData.governanceObjectives.length > 0) {
      setObjectives(appData.governanceObjectives)
    }
  }, [appData.governanceObjectives])

  const handleSave = () => {
    updateAppData({ governanceObjectives: objectives })
  }

  const toggleObjective = (objectiveId: string) => {
    setObjectives(
      objectives.map(obj =>
        obj.id === objectiveId ? { ...obj, enabled: !obj.enabled } : obj
      )
    )
  }

  const togglePractice = (objectiveId: string, practiceId: string) => {
    setObjectives(
      objectives.map(obj =>
        obj.id === objectiveId
          ? {
              ...obj,
              practices: obj.practices.map(p =>
                p.id === practiceId ? { ...p, implemented: !p.implemented } : p
              )
            }
          : obj
      )
    )
  }

  const filteredObjectives = selectedObjectiveId && selectedObjectiveId.startsWith('edm')
    ? objectives.filter(obj => obj.id.toLowerCase() === selectedObjectiveId.toLowerCase())
    : objectives

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Governance Objectives (EDM)</h1>
        </div>
        <p className="text-teal-100">
          Evaluate, Direct, and Monitor - The 5 core governance objectives
        </p>
      </div>

      <DisclaimerBanner />

      {/* Summary */}
      <div className="card bg-purple-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">Governance Objectives Status</h3>
            <p className="text-sm text-purple-800">
              {objectives.filter(o => o.enabled).length} of {objectives.length} objectives enabled
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-900">
              {Math.round(
                (objectives.reduce((sum, obj) => sum + obj.practices.filter(p => p.implemented).length, 0) /
                  objectives.reduce((sum, obj) => sum + obj.practices.length, 0)) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-purple-800">Practices Implemented</div>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="space-y-4">
        {filteredObjectives.map((objective) => {
          const practicesImplemented = objective.practices.filter(p => p.implemented).length
          const totalPractices = objective.practices.length

          return (
            <div
              key={objective.id}
              className={`card ${
                objective.enabled
                  ? 'border-2 border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              }`}
            >
              {/* Objective Header */}
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleObjective(objective.id)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                    objective.enabled
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {objective.enabled ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{objective.id}</h3>
                      <h4 className="text-base font-semibold text-purple-900">{objective.name}</h4>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      EDM
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">{objective.purpose}</p>

                  {/* Practices */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-sm text-gray-900">Practices</h5>
                      <span className="text-xs text-gray-600">
                        {practicesImplemented}/{totalPractices} implemented
                      </span>
                    </div>

                    {objective.practices.map((practice) => (
                      <div
                        key={practice.id}
                        className={`p-3 rounded-lg border ${
                          practice.implemented
                            ? 'bg-green-50 border-green-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => togglePractice(objective.id, practice.id)}
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                              practice.implemented
                                ? 'bg-green-600 border-green-600'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            disabled={!objective.enabled}
                          >
                            {practice.implemented && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                              {practice.id}: {practice.name}
                            </div>
                            {practice.description && (
                              <p className="text-xs text-gray-600 mt-1">{practice.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Process Relationships */}
                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h6 className="text-xs font-semibold text-gray-700 mb-1">Inputs From:</h6>
                      <div className="flex flex-wrap gap-1">
                        {objective.inputsFrom.length > 0 ? (
                          objective.inputsFrom.map((input) => (
                            <span
                              key={input}
                              className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                            >
                              {input}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">None</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h6 className="text-xs font-semibold text-gray-700 mb-1">Outputs To:</h6>
                      <div className="flex flex-wrap gap-1">
                        {objective.outputsTo.map((output) => (
                          <span
                            key={output}
                            className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs"
                          >
                            {output}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Guidance */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Implementation Guidance</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>EDM processes are performed by the governing body (board, executives)</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              Each EDM objective follows the pattern: Evaluate (assess options) → Direct (give
              direction) → Monitor (measure performance)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              Enable objectives that align with your enterprise goals and governance priorities
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>EDM01 is typically essential for establishing the governance framework</span>
          </li>
        </ul>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Governance Objectives
        </button>
      </div>
    </div>
  )
}

export default GovernanceObjectives
