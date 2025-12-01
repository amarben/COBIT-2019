import React, { useState } from 'react'
import { Grid, Save, Plus, Info, Trash2 } from 'lucide-react'
import { AppData, Component, ComponentType } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import { TEST_IDS } from '../constants/testIds'

interface ComponentDefinitionProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

// COBIT 2019 - 7 Governance System Components (Enablers)
const componentTypes: {
  type: ComponentType
  name: string
  description: string
  cobitNumber: number
  examples: string[]
}[] = [
  {
    type: 'principles-policies-frameworks',
    name: 'Principles, Policies and Frameworks',
    description: 'The vehicle to translate desired behavior into practical guidance for day-to-day management',
    cobitNumber: 1,
    examples: [
      'IT governance policy',
      'Information security policy',
      'Data management policy',
      'Risk management framework',
      'IT standards and guidelines'
    ]
  },
  {
    type: 'processes',
    name: 'Processes',
    description: 'An organized set of practices and activities to achieve certain objectives and produce outputs',
    cobitNumber: 2,
    examples: [
      'Change management process',
      'Incident management process',
      'Project management methodology',
      'Service request fulfillment',
      'Capacity planning process'
    ]
  },
  {
    type: 'organizational-structures',
    name: 'Organizational Structures',
    description: 'Key decision-making entities in an enterprise',
    cobitNumber: 3,
    examples: [
      'IT Steering Committee',
      'Architecture Review Board',
      'Risk Management Committee',
      'CIO/CDO office',
      'Security Operations Center'
    ]
  },
  {
    type: 'culture-ethics-behavior',
    name: 'Culture, Ethics and Behavior',
    description: 'Individual and enterprise values, ethics and behaviors that support governance outcomes',
    cobitNumber: 4,
    examples: [
      'Code of conduct',
      'Security awareness culture',
      'Innovation mindset',
      'Accountability framework',
      'Ethics training program'
    ]
  },
  {
    type: 'information',
    name: 'Information',
    description: 'All information produced and used by the enterprise for governance purposes',
    cobitNumber: 5,
    examples: [
      'Risk register',
      'IT performance dashboard',
      'Audit reports',
      'Service level reports',
      'Project status reports'
    ]
  },
  {
    type: 'services-infrastructure',
    name: 'Services, Infrastructure and Applications',
    description: 'Infrastructure, technology and applications that provide IT processing and services',
    cobitNumber: 6,
    examples: [
      'GRC platform',
      'ITSM tooling',
      'Monitoring systems',
      'Collaboration platforms',
      'Security tools'
    ]
  },
  {
    type: 'people-skills-competencies',
    name: 'People, Skills and Competencies',
    description: 'The people and their competencies required for successful governance',
    cobitNumber: 7,
    examples: [
      'IT governance training',
      'Risk management certification',
      'Technical competency framework',
      'Leadership development',
      'COBIT certification'
    ]
  }
]

const ComponentDefinition: React.FC<ComponentDefinitionProps> = ({ appData, updateAppData }) => {
  const [components, setComponents] = useState<Component[]>(appData.components)
  const [newComponent, setNewComponent] = useState<Partial<Component>>({
    type: 'principles-policies-frameworks',
    name: '',
    description: '',
    status: 'planned'
  })

  const handleSave = () => {
    updateAppData({ components })
  }

  const addComponent = () => {
    if (newComponent.name && newComponent.type) {
      setComponents([
        ...components,
        {
          type: newComponent.type as ComponentType,
          name: newComponent.name,
          description: newComponent.description || '',
          status: newComponent.status || 'planned',
          relatedObjectives: []
        }
      ])
      setNewComponent({
        type: 'principles-policies-frameworks',
        name: '',
        description: '',
        status: 'planned'
      })
    }
  }

  const updateComponentStatus = (index: number, status: 'planned' | 'in-progress' | 'completed') => {
    const updated = [...components]
    updated[index].status = status
    setComponents(updated)
  }

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index))
  }

  const getComponentsByType = (type: ComponentType) => {
    return components.filter(c => c.type === type)
  }

  const addExampleComponent = (type: ComponentType, example: string) => {
    setComponents([
      ...components,
      {
        type,
        name: example,
        description: '',
        status: 'planned',
        relatedObjectives: []
      }
    ])
  }

  // Calculate statistics
  const totalComponents = components.length
  const completedCount = components.filter(c => c.status === 'completed').length
  const inProgressCount = components.filter(c => c.status === 'in-progress').length
  const plannedCount = components.filter(c => c.status === 'planned').length
  const completionPercentage = totalComponents > 0 ? Math.round((completedCount / totalComponents) * 100) : 0

  return (
    <div className="space-y-6 max-w-6xl" data-testid={TEST_IDS.COMPONENT_DEFINITION.CONTAINER}>
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Grid className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Governance Components</h1>
        </div>
        <p className="text-teal-100">
          Define the 7 COBIT 2019 governance enabler components (Phase 5)
        </p>
      </div>

      <DisclaimerBanner />

      {/* COBIT 2019 Enablers Info */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">COBIT 2019 Governance System Components</h3>
            <p className="text-sm text-blue-800">
              The 7 enablers are factors that individually and collectively influence whether governance and management
              over enterprise I&T will work. They are driven by the goals cascade and provide the mechanism for
              achieving the governance and management objectives.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Dashboard */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="font-semibold text-teal-900 mb-4">Component Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-900">{totalComponents}</div>
            <div className="text-teal-700">Total Components</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600">{plannedCount}</div>
            <div className="text-gray-600">Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{inProgressCount}</div>
            <div className="text-yellow-700">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <div className="text-green-700">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600">{completionPercentage}%</div>
            <div className="text-teal-700">Progress</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-green-500 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Add New Component */}
      <div className="card">
        <h3 className="font-semibold mb-4">Add New Component</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <select
            value={newComponent.type}
            onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value as ComponentType })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            data-testid={TEST_IDS.COMPONENT_DEFINITION.COMPONENT_TYPE_SELECT}
          >
            {componentTypes.map(ct => (
              <option key={ct.type} value={ct.type}>
                {ct.cobitNumber}. {ct.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newComponent.name}
            onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
            placeholder="Component name"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            data-testid={TEST_IDS.COMPONENT_DEFINITION.COMPONENT_NAME_INPUT}
          />
        </div>
        <div className="flex gap-3">
          <textarea
            value={newComponent.description}
            onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
            placeholder="Description (optional)"
            rows={2}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            data-testid={TEST_IDS.COMPONENT_DEFINITION.DESCRIPTION_TEXTAREA}
          />
          <button onClick={addComponent} className="btn-primary flex items-center gap-2 self-start" data-testid={TEST_IDS.COMPONENT_DEFINITION.ADD_COMPONENT_BUTTON}>
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* 7 Component Categories */}
      <div className="space-y-6">
        {componentTypes.map(({ type, name, description, cobitNumber, examples }) => {
          const typeComponents = getComponentsByType(type)
          const typeCompleted = typeComponents.filter(c => c.status === 'completed').length

          return (
            <div key={type} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-teal-100 text-teal-800 text-sm font-bold px-2 py-1 rounded">
                      {cobitNumber}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="text-right ml-4">
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                    {typeCompleted}/{typeComponents.length}
                  </span>
                </div>
              </div>

              {/* Component list */}
              {typeComponents.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {typeComponents.map((component, idx) => {
                    const globalIndex = components.findIndex(c => c === component)
                    return (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{component.name}</h4>
                            {component.description && (
                              <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={component.status}
                              onChange={(e) =>
                                updateComponentStatus(globalIndex, e.target.value as Component['status'])
                              }
                              className={`px-2 py-1 border rounded text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                component.status === 'completed'
                                  ? 'border-green-300 bg-green-50 text-green-700'
                                  : component.status === 'in-progress'
                                  ? 'border-yellow-300 bg-yellow-50 text-yellow-700'
                                  : 'border-gray-300'
                              }`}
                              data-testid={TEST_IDS.COMPONENT_DEFINITION.COMPONENT_STATUS_SELECT(globalIndex)}
                            >
                              <option value="planned">Planned</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            <button
                              onClick={() => removeComponent(globalIndex)}
                              className="text-red-600 hover:text-red-700"
                              data-testid={TEST_IDS.COMPONENT_DEFINITION.REMOVE_COMPONENT_BUTTON(globalIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-lg mb-4">
                  No components defined for this category yet
                </div>
              )}

              {/* Example suggestions */}
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 mb-2">Quick add examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examples
                    .filter(ex => !typeComponents.some(c => c.name === ex))
                    .slice(0, 3)
                    .map(example => (
                      <button
                        key={example}
                        onClick={() => addExampleComponent(type, example)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-800 rounded-full transition-colors"
                        data-testid={TEST_IDS.COMPONENT_DEFINITION.QUICK_ADD_EXAMPLE_BUTTON(example.toLowerCase().replace(/\s+/g, '-'))}
                      >
                        + {example}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Enabler Coverage Summary */}
      <div className="card bg-purple-50 border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-4">Enabler Coverage Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {componentTypes.map(ct => {
            const count = getComponentsByType(ct.type).length
            const completed = getComponentsByType(ct.type).filter(c => c.status === 'completed').length
            return (
              <div
                key={ct.type}
                className={`p-3 rounded-lg ${
                  count === 0
                    ? 'bg-red-50 border border-red-200'
                    : completed === count && count > 0
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-500">{ct.cobitNumber}</span>
                  <span className="text-sm font-medium text-gray-800 truncate">{ct.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${
                    count === 0 ? 'text-red-600' : completed === count && count > 0 ? 'text-green-600' : 'text-gray-700'
                  }`}>
                    {count}
                  </span>
                  {count > 0 && (
                    <span className="text-xs text-gray-500">{completed} complete</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Components
        </button>
      </div>
    </div>
  )
}

export default ComponentDefinition
