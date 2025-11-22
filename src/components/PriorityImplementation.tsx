import React from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface PriorityImplementationProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const PriorityImplementation: React.FC<PriorityImplementationProps> = ({ appData }) => {
  const enabledGovernance = appData.governanceObjectives.filter(o => o.enabled)
  const enabledManagement = appData.managementObjectives.filter(o => o.enabled)
  const highPriority = appData.managementObjectives.filter(o => o.enabled && o.priority === 'high')

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Priority Implementation</h1>
        </div>
        <p className="text-teal-100">
          Implement high-priority governance and management objectives
        </p>
      </div>

      <DisclaimerBanner />

      {enabledGovernance.length === 0 && enabledManagement.length === 0 ? (
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">No Objectives Selected</h3>
              <p className="text-sm text-yellow-800">
                Please select governance and management objectives in Steps 4 and 5 before implementing.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="text-sm font-medium text-gray-600 mb-1">Governance (EDM)</div>
              <div className="text-3xl font-bold text-purple-600">{enabledGovernance.length}</div>
              <div className="text-xs text-gray-500 mt-1">objectives enabled</div>
            </div>
            <div className="card">
              <div className="text-sm font-medium text-gray-600 mb-1">Management</div>
              <div className="text-3xl font-bold text-teal-600">{enabledManagement.length}</div>
              <div className="text-xs text-gray-500 mt-1">objectives enabled</div>
            </div>
            <div className="card">
              <div className="text-sm font-medium text-gray-600 mb-1">High Priority</div>
              <div className="text-3xl font-bold text-red-600">{highPriority.length}</div>
              <div className="text-xs text-gray-500 mt-1">critical objectives</div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Implementation Roadmap</h2>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Phase 1: Governance Foundation</h3>
                <p className="text-sm text-purple-800 mb-3">
                  Implement governance (EDM) objectives first to establish oversight
                </p>
                <div className="space-y-2">
                  {enabledGovernance.map(obj => (
                    <div key={obj.id} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      <span>{obj.id}: {obj.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Phase 2: High Priority Management</h3>
                <p className="text-sm text-red-800 mb-3">
                  Address critical management objectives
                </p>
                <div className="space-y-2">
                  {highPriority.map(obj => (
                    <div key={obj.id} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                      <span>{obj.id}: {obj.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Phase 3: Additional Objectives</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Implement medium and low priority objectives
                </p>
                <div className="space-y-2">
                  {enabledManagement
                    .filter(o => o.priority !== 'high')
                    .map(obj => (
                      <div key={obj.id} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <span>{obj.id}: {obj.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PriorityImplementation
