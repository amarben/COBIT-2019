import React, { useState } from 'react'
import { Grid, Save, Plus } from 'lucide-react'
import { AppData, Component } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface ComponentDefinitionProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const componentTypes = [
  { type: 'organizational-structures' as const, name: 'Organizational Structures', description: 'Roles, responsibilities, committees' },
  { type: 'processes' as const, name: 'Processes & Practices', description: 'Workflows, activities, procedures' },
  { type: 'information' as const, name: 'Information Flows', description: 'Data, reporting, communications' },
  { type: 'culture' as const, name: 'Culture & Behavior', description: 'Ethics, values, behaviors' },
  { type: 'skills' as const, name: 'Skills & Competencies', description: 'Training, expertise, capabilities' },
  { type: 'services' as const, name: 'Services & Infrastructure', description: 'Technologies, tools, platforms' }
]

const ComponentDefinition: React.FC<ComponentDefinitionProps> = ({ appData, updateAppData }) => {
  const [components, setComponents] = useState<Component[]>(appData.components)
  const [newComponent, setNewComponent] = useState<Partial<Component>>({
    type: 'organizational-structures',
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
          type: newComponent.type,
          name: newComponent.name,
          description: newComponent.description || '',
          status: newComponent.status || 'planned'
        }
      ])
      setNewComponent({
        type: 'organizational-structures',
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

  const getComponentsByType = (type: Component['type']) => {
    return components.filter(c => c.type === type)
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Grid className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Component Definition</h1>
        </div>
        <p className="text-teal-100">
          Define the 6 governance component categories for your framework
        </p>
      </div>

      <DisclaimerBanner />

      {/* Summary */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="font-semibold text-teal-900 mb-3">Component Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-teal-800">Total Components</div>
            <div className="text-2xl font-bold text-teal-900">{components.length}</div>
          </div>
          <div>
            <div className="font-medium text-teal-800">Planned</div>
            <div className="text-2xl font-bold text-teal-900">
              {components.filter(c => c.status === 'planned').length}
            </div>
          </div>
          <div>
            <div className="font-medium text-teal-800">In Progress</div>
            <div className="text-2xl font-bold text-teal-900">
              {components.filter(c => c.status === 'in-progress').length}
            </div>
          </div>
          <div>
            <div className="font-medium text-teal-800">Completed</div>
            <div className="text-2xl font-bold text-teal-900">
              {components.filter(c => c.status === 'completed').length}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Component */}
      <div className="card">
        <h3 className="font-semibold mb-4">Add New Component</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <select
            value={newComponent.type}
            onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value as Component['type'] })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {componentTypes.map(ct => (
              <option key={ct.type} value={ct.type}>
                {ct.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newComponent.name}
            onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
            placeholder="Component name"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <textarea
            value={newComponent.description}
            onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
            placeholder="Description"
            rows={2}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button onClick={addComponent} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Component Categories */}
      <div className="space-y-6">
        {componentTypes.map(({ type, name, description }) => {
          const typeComponents = getComponentsByType(type)
          return (
            <div key={type} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  {typeComponents.length}
                </span>
              </div>

              {typeComponents.length > 0 ? (
                <div className="space-y-2">
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
                              className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                              <option value="planned">Planned</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            <button
                              onClick={() => removeComponent(globalIndex)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                  No components defined for this category yet
                </div>
              )}
            </div>
          )
        })}
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
