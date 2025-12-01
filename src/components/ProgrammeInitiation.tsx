import React, { useState, useEffect } from 'react'
import { PlayCircle, Save, Plus, Trash2, Target, AlertTriangle, Users } from 'lucide-react'
import { AppData, ImplementationProgramme, ProgrammeDriver, ProgrammeRisk, ProgrammeResource } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import { TEST_IDS } from '../constants/testIds'

interface ProgrammeInitiationProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const defaultProgramme: ImplementationProgramme = {
  name: '',
  sponsor: '',
  objectives: [],
  scope: '',
  timeline: {
    startDate: '',
    targetEndDate: '',
    currentPhase: 1
  },
  drivers: [],
  risks: [],
  resources: []
}

const ProgrammeInitiation: React.FC<ProgrammeInitiationProps> = ({ appData, updateAppData }) => {
  const [programme, setProgramme] = useState<ImplementationProgramme>(
    appData.programme || defaultProgramme
  )
  const [newObjective, setNewObjective] = useState('')
  const [newDriver, setNewDriver] = useState<Partial<ProgrammeDriver>>({
    type: 'internal',
    description: '',
    urgency: 'medium'
  })
  const [newRisk, setNewRisk] = useState<Partial<ProgrammeRisk>>({
    description: '',
    likelihood: 'medium',
    impact: 'medium',
    mitigation: ''
  })
  const [newResource, setNewResource] = useState<Partial<ProgrammeResource>>({
    type: 'people',
    description: '',
    allocated: false
  })

  useEffect(() => {
    if (appData.programme) {
      setProgramme(appData.programme)
    }
  }, [appData.programme])

  const handleSave = () => {
    updateAppData({ programme })
  }

  // Objective management
  const addObjective = () => {
    if (newObjective.trim()) {
      setProgramme({
        ...programme,
        objectives: [...programme.objectives, newObjective.trim()]
      })
      setNewObjective('')
    }
  }

  const removeObjective = (index: number) => {
    setProgramme({
      ...programme,
      objectives: programme.objectives.filter((_, i) => i !== index)
    })
  }

  // Driver management
  const addDriver = () => {
    if (newDriver.description?.trim()) {
      const driver: ProgrammeDriver = {
        id: `driver-${Date.now()}`,
        type: newDriver.type || 'internal',
        description: newDriver.description.trim(),
        urgency: newDriver.urgency || 'medium'
      }
      setProgramme({
        ...programme,
        drivers: [...programme.drivers, driver]
      })
      setNewDriver({ type: 'internal', description: '', urgency: 'medium' })
    }
  }

  const removeDriver = (id: string) => {
    setProgramme({
      ...programme,
      drivers: programme.drivers.filter(d => d.id !== id)
    })
  }

  // Risk management
  const addRisk = () => {
    if (newRisk.description?.trim()) {
      const risk: ProgrammeRisk = {
        id: `risk-${Date.now()}`,
        description: newRisk.description.trim(),
        likelihood: newRisk.likelihood || 'medium',
        impact: newRisk.impact || 'medium',
        mitigation: newRisk.mitigation || ''
      }
      setProgramme({
        ...programme,
        risks: [...programme.risks, risk]
      })
      setNewRisk({ description: '', likelihood: 'medium', impact: 'medium', mitigation: '' })
    }
  }

  const removeRisk = (id: string) => {
    setProgramme({
      ...programme,
      risks: programme.risks.filter(r => r.id !== id)
    })
  }

  // Resource management
  const addResource = () => {
    if (newResource.description?.trim()) {
      const resource: ProgrammeResource = {
        id: `resource-${Date.now()}`,
        type: newResource.type || 'people',
        description: newResource.description.trim(),
        allocated: newResource.allocated || false
      }
      setProgramme({
        ...programme,
        resources: [...programme.resources, resource]
      })
      setNewResource({ type: 'people', description: '', allocated: false })
    }
  }

  const removeResource = (id: string) => {
    setProgramme({
      ...programme,
      resources: programme.resources.filter(r => r.id !== id)
    })
  }

  const toggleResourceAllocated = (id: string) => {
    setProgramme({
      ...programme,
      resources: programme.resources.map(r =>
        r.id === id ? { ...r, allocated: !r.allocated } : r
      )
    })
  }

  return (
    <div className="space-y-6 max-w-5xl" data-testid={TEST_IDS.PROGRAMME_INITIATION.CONTAINER}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <PlayCircle className="w-8 h-8" />
          <div>
            <p className="text-blue-200 text-sm font-medium">Phase 1: What Are the Drivers?</p>
            <h1 className="text-3xl font-bold">Programme Initiation</h1>
          </div>
        </div>
        <p className="text-blue-100">
          Create desire to change, obtain management commitment, and initiate the governance improvement programme
        </p>
      </div>

      <DisclaimerBanner />

      {/* Programme Basic Info */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Programme Definition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Programme Name
            </label>
            <input
              type="text"
              value={programme.name}
              onChange={(e) => setProgramme({ ...programme, name: e.target.value })}
              placeholder="e.g., IT Governance Enhancement Programme"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Executive Sponsor
            </label>
            <input
              type="text"
              value={programme.sponsor}
              onChange={(e) => setProgramme({ ...programme, sponsor: e.target.value })}
              placeholder="e.g., CIO, VP of IT"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.EXECUTIVE_SPONSOR_INPUT}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Programme Scope
          </label>
          <textarea
            value={programme.scope}
            onChange={(e) => setProgramme({ ...programme, scope: e.target.value })}
            placeholder="Define the boundaries and focus areas of the governance improvement initiative..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Start Date
            </label>
            <input
              type="date"
              value={programme.timeline.startDate}
              onChange={(e) => setProgramme({
                ...programme,
                timeline: { ...programme.timeline, startDate: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.TARGET_START_DATE_INPUT}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target End Date
            </label>
            <input
              type="date"
              value={programme.timeline.targetEndDate}
              onChange={(e) => setProgramme({
                ...programme,
                timeline: { ...programme.timeline, targetEndDate: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.TARGET_END_DATE_INPUT}
            />
          </div>
        </div>
      </div>

      {/* Programme Objectives */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold">Programme Objectives</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          What do you want to achieve with this governance improvement programme?
        </p>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addObjective()}
            placeholder="e.g., Achieve COBIT maturity level 3 for key processes"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid={TEST_IDS.PROGRAMME_INITIATION.PROGRAMME_OBJECTIVE_INPUT(programme.objectives.length)}
          />
          <button onClick={addObjective} className="btn-primary flex items-center gap-2" data-testid={TEST_IDS.PROGRAMME_INITIATION.ADD_OBJECTIVE_BUTTON}>
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {programme.objectives.length > 0 ? (
          <ul className="space-y-2">
            {programme.objectives.map((obj, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{obj}</span>
                <button onClick={() => removeObjective(index)} className="text-red-600 hover:text-red-700" data-testid={TEST_IDS.PROGRAMME_INITIATION.REMOVE_OBJECTIVE_BUTTON(index)}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No objectives defined yet</p>
        )}
      </div>

      {/* Drivers - Key Phase 1 Activity */}
      <div className="card border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-700" />
          <h2 className="text-xl font-bold text-blue-900">Implementation Drivers</h2>
        </div>
        <p className="text-sm text-blue-800 mb-4">
          <strong>Key Phase 1 Activity:</strong> Identify what is driving the need for governance improvement.
          These drivers create the urgency and business case for change.
        </p>

        {/* Add Driver Form */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <select
              value={newDriver.type}
              onChange={(e) => setNewDriver({ ...newDriver, type: e.target.value as ProgrammeDriver['type'] })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.DRIVER_TYPE_SELECT(programme.drivers.length)}
            >
              <option value="internal">Internal Driver</option>
              <option value="external">External Driver</option>
            </select>
            <select
              value={newDriver.urgency}
              onChange={(e) => setNewDriver({ ...newDriver, urgency: e.target.value as ProgrammeDriver['urgency'] })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.DRIVER_URGENCY_SELECT(programme.drivers.length)}
            >
              <option value="high">High Urgency</option>
              <option value="medium">Medium Urgency</option>
              <option value="low">Low Urgency</option>
            </select>
            <button onClick={addDriver} className="btn-primary flex items-center justify-center gap-2" data-testid={TEST_IDS.PROGRAMME_INITIATION.ADD_DRIVER_BUTTON}>
              <Plus className="w-4 h-4" /> Add Driver
            </button>
          </div>
          <input
            type="text"
            value={newDriver.description}
            onChange={(e) => setNewDriver({ ...newDriver, description: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addDriver()}
            placeholder="e.g., Recent audit findings, Regulatory requirements, Security incidents, Digital transformation needs"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            data-testid={TEST_IDS.PROGRAMME_INITIATION.DRIVER_DESCRIPTION_INPUT(programme.drivers.length)}
          />
        </div>

        {/* Driver List */}
        {programme.drivers.length > 0 ? (
          <div className="space-y-2">
            {programme.drivers.map((driver, index) => (
              <div key={driver.id} className="flex items-start justify-between p-3 bg-white rounded-lg border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      driver.type === 'external' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {driver.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      driver.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      driver.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {driver.urgency} urgency
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{driver.description}</p>
                </div>
                <button onClick={() => removeDriver(driver.id)} className="text-red-600 hover:text-red-700 ml-3" data-testid={TEST_IDS.PROGRAMME_INITIATION.REMOVE_DRIVER_BUTTON(index)}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-blue-700 italic">No drivers identified yet - this is critical for Phase 1</p>
        )}

        {/* Driver Examples */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800 font-medium mb-2">Common Driver Examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Regulatory compliance requirements',
              'Audit findings and recommendations',
              'Security breaches or incidents',
              'Digital transformation initiative',
              'Merger or acquisition',
              'Cost optimization mandate',
              'Board or executive directive',
              'Customer satisfaction issues'
            ].map(example => (
              <button
                key={example}
                onClick={() => setNewDriver({ ...newDriver, description: example })}
                className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 rounded transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Programme Risks */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-bold">Programme Risks</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Identify risks that could impact the success of the governance improvement programme
        </p>

        {/* Add Risk Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={newRisk.description}
              onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
              placeholder="Risk description"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.RISK_DESCRIPTION_INPUT(programme.risks.length)}
            />
            <input
              type="text"
              value={newRisk.mitigation}
              onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
              placeholder="Mitigation strategy"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.RISK_MITIGATION_INPUT(programme.risks.length)}
            />
          </div>
          <div className="flex gap-3">
            <select
              value={newRisk.likelihood}
              onChange={(e) => setNewRisk({ ...newRisk, likelihood: e.target.value as ProgrammeRisk['likelihood'] })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.RISK_LIKELIHOOD_SELECT(programme.risks.length)}
            >
              <option value="high">High Likelihood</option>
              <option value="medium">Medium Likelihood</option>
              <option value="low">Low Likelihood</option>
            </select>
            <select
              value={newRisk.impact}
              onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value as ProgrammeRisk['impact'] })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              data-testid={TEST_IDS.PROGRAMME_INITIATION.RISK_IMPACT_SELECT(programme.risks.length)}
            >
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
            <button onClick={addRisk} className="btn-primary flex items-center gap-2" data-testid={TEST_IDS.PROGRAMME_INITIATION.ADD_RISK_BUTTON}>
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {programme.risks.length > 0 ? (
          <div className="space-y-2">
            {programme.risks.map((risk, index) => (
              <div key={risk.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        risk.likelihood === 'high' ? 'bg-red-100 text-red-700' :
                        risk.likelihood === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        L: {risk.likelihood}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        risk.impact === 'high' ? 'bg-red-100 text-red-700' :
                        risk.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        I: {risk.impact}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{risk.description}</p>
                    {risk.mitigation && (
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">Mitigation:</span> {risk.mitigation}
                      </p>
                    )}
                  </div>
                  <button onClick={() => removeRisk(risk.id)} className="text-red-600 hover:text-red-700 ml-3" data-testid={TEST_IDS.PROGRAMME_INITIATION.REMOVE_RISK_BUTTON(index)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No risks identified yet</p>
        )}
      </div>

      {/* Resources Required */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Resources Required</h2>
        <p className="text-sm text-gray-600 mb-4">
          Identify resources needed for the implementation programme
        </p>

        {/* Add Resource Form */}
        <div className="flex gap-3 mb-4">
          <select
            value={newResource.type}
            onChange={(e) => setNewResource({ ...newResource, type: e.target.value as ProgrammeResource['type'] })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            data-testid={TEST_IDS.PROGRAMME_INITIATION.RESOURCE_TYPE_SELECT(programme.resources.length)}
          >
            <option value="budget">Budget</option>
            <option value="people">People</option>
            <option value="technology">Technology</option>
            <option value="external">External (Consultants)</option>
          </select>
          <input
            type="text"
            value={newResource.description}
            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            placeholder="Resource description"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            data-testid={TEST_IDS.PROGRAMME_INITIATION.RESOURCE_DESCRIPTION_INPUT(programme.resources.length)}
          />
          <button onClick={addResource} className="btn-primary flex items-center gap-2" data-testid={TEST_IDS.PROGRAMME_INITIATION.ADD_RESOURCE_BUTTON}>
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {programme.resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {programme.resources.map((resource, index) => (
              <div
                key={resource.id}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  resource.allocated ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={resource.allocated}
                    onChange={() => toggleResourceAllocated(resource.id)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    data-testid={TEST_IDS.PROGRAMME_INITIATION.RESOURCE_ALLOCATED_CHECKBOX(index)}
                  />
                  <div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      resource.type === 'budget' ? 'bg-yellow-100 text-yellow-700' :
                      resource.type === 'people' ? 'bg-blue-100 text-blue-700' :
                      resource.type === 'technology' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {resource.type}
                    </span>
                    <p className="text-sm text-gray-700 mt-1">{resource.description}</p>
                  </div>
                </div>
                <button onClick={() => removeResource(resource.id)} className="text-red-600 hover:text-red-700" data-testid={TEST_IDS.PROGRAMME_INITIATION.REMOVE_RESOURCE_BUTTON(index)}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No resources identified yet</p>
        )}
      </div>

      {/* Readiness Check */}
      <div className="card bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-900 mb-4">Phase 1 Readiness Check</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg ${programme.name ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-sm font-medium">{programme.name ? 'ok' : 'o'} Programme defined</p>
          </div>
          <div className={`p-3 rounded-lg ${programme.sponsor ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-sm font-medium">{programme.sponsor ? 'ok' : 'o'} Executive sponsor identified</p>
          </div>
          <div className={`p-3 rounded-lg ${programme.drivers.length > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-sm font-medium">{programme.drivers.length > 0 ? 'ok' : 'o'} Drivers identified ({programme.drivers.length})</p>
          </div>
          <div className={`p-3 rounded-lg ${programme.objectives.length > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-sm font-medium">{programme.objectives.length > 0 ? 'ok' : 'o'} Objectives defined ({programme.objectives.length})</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Programme
        </button>
      </div>
    </div>
  )
}

export default ProgrammeInitiation
