import React, { useState, useMemo } from 'react'
import { Users, Save, RotateCcw, Info, ChevronDown, ChevronRight } from 'lucide-react'
import { AppData, RACIValue, RACIAssignment, Practice } from '../types'
import { standardRoles, raciDescriptions, getRACITemplate, getRolesByCategory } from '../data/raci'
import DisclaimerBanner from './DisclaimerBanner'

interface RACIChartProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
  objectiveId?: string
  objectiveName?: string
  practices?: Practice[]
}

const RACIChart: React.FC<RACIChartProps> = ({
  appData,
  updateAppData,
  objectiveId,
  objectiveName,
  practices = []
}) => {
  // State for selected roles to display
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([
    'board', 'exec-committee', 'cio', 'ciso', 'cro', 'it-steering',
    'it-ops-manager', 'security-manager', 'business-owner', 'internal-auditor'
  ])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['governance', 'management'])
  const [assignments, setAssignments] = useState<Map<string, RACIValue>>(() => {
    // Initialize from existing data or template
    const map = new Map<string, RACIValue>()

    if (objectiveId) {
      const existingChart = appData.raciCharts?.find(c => c.objectiveId === objectiveId)
      if (existingChart) {
        existingChart.assignments.forEach(a => {
          map.set(`${a.practiceId}-${a.roleId}`, a.value)
        })
      } else {
        // Load from template if available
        const template = getRACITemplate(objectiveId)
        if (template) {
          template.defaultAssignments.forEach(a => {
            map.set(`${a.practiceId}-${a.roleId}`, a.value)
          })
        }
      }
    }

    return map
  })

  const selectedRoles = useMemo(() => {
    return standardRoles.filter(r => selectedRoleIds.includes(r.id))
  }, [selectedRoleIds])

  const roleCategories = [
    { id: 'governance', name: 'Governance Roles', roles: getRolesByCategory('governance') },
    { id: 'management', name: 'Management Roles', roles: getRolesByCategory('management') },
    { id: 'operational', name: 'Operational Roles', roles: getRolesByCategory('operational') },
    { id: 'external', name: 'External Roles', roles: getRolesByCategory('external') },
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleRole = (roleId: string) => {
    setSelectedRoleIds(prev =>
      prev.includes(roleId)
        ? prev.filter(r => r !== roleId)
        : [...prev, roleId]
    )
  }

  const handleAssignmentChange = (practiceId: string, roleId: string, value: RACIValue) => {
    setAssignments(prev => {
      const newMap = new Map(prev)
      newMap.set(`${practiceId}-${roleId}`, value)
      return newMap
    })
  }

  const getAssignment = (practiceId: string, roleId: string): RACIValue => {
    return assignments.get(`${practiceId}-${roleId}`) || ''
  }

  const handleSave = () => {
    if (!objectiveId) return

    const assignmentsList: RACIAssignment[] = []
    assignments.forEach((value, key) => {
      const [practiceId, roleId] = key.split('-')
      if (value) {
        assignmentsList.push({
          objectiveId,
          practiceId,
          roleId,
          value
        })
      }
    })

    const existingCharts = appData.raciCharts || []
    const existingIndex = existingCharts.findIndex(c => c.objectiveId === objectiveId)

    const newChart = {
      id: objectiveId,
      objectiveId,
      roles: selectedRoles,
      assignments: assignmentsList,
      lastUpdated: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      const updatedCharts = [...existingCharts]
      updatedCharts[existingIndex] = newChart
      updateAppData({ raciCharts: updatedCharts })
    } else {
      updateAppData({ raciCharts: [...existingCharts, newChart] })
    }
  }

  const handleResetToTemplate = () => {
    if (!objectiveId) return

    const template = getRACITemplate(objectiveId)
    if (template) {
      const newMap = new Map<string, RACIValue>()
      template.defaultAssignments.forEach(a => {
        newMap.set(`${a.practiceId}-${a.roleId}`, a.value)
      })
      setAssignments(newMap)
    }
  }

  const raciValues: RACIValue[] = ['R', 'A', 'C', 'I', '']

  // Calculate statistics
  const stats = useMemo(() => {
    let responsible = 0
    let accountable = 0
    let consulted = 0
    let informed = 0

    assignments.forEach(value => {
      if (value === 'R') responsible++
      else if (value === 'A') accountable++
      else if (value === 'C') consulted++
      else if (value === 'I') informed++
    })

    return { responsible, accountable, consulted, informed }
  }, [assignments])

  if (!objectiveId || practices.length === 0) {
    return (
      <div className="card bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <Info className="w-5 h-5" />
          <p>Select an objective with practices to view or edit the RACI chart.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">RACI Chart</h1>
            <p className="text-teal-100">{objectiveId} - {objectiveName}</p>
          </div>
        </div>
        <p className="text-teal-100 text-sm mt-2">
          Define Responsible, Accountable, Consulted, and Informed roles for each practice
        </p>
      </div>

      <DisclaimerBanner />

      {/* RACI Legend */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">RACI Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['R', 'A', 'C', 'I'] as RACIValue[]).map(value => {
            const desc = raciDescriptions[value]
            return (
              <div key={value} className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded flex items-center justify-center font-bold ${desc.color}`}>
                  {value}
                </span>
                <div>
                  <div className="font-medium text-sm">{desc.name}</div>
                  <div className="text-xs text-gray-600">{desc.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card text-center bg-blue-50">
          <div className="text-3xl font-bold text-blue-600">{stats.responsible}</div>
          <div className="text-sm text-blue-800">Responsible</div>
        </div>
        <div className="card text-center bg-red-50">
          <div className="text-3xl font-bold text-red-600">{stats.accountable}</div>
          <div className="text-sm text-red-800">Accountable</div>
        </div>
        <div className="card text-center bg-yellow-50">
          <div className="text-3xl font-bold text-yellow-600">{stats.consulted}</div>
          <div className="text-sm text-yellow-800">Consulted</div>
        </div>
        <div className="card text-center bg-green-50">
          <div className="text-3xl font-bold text-green-600">{stats.informed}</div>
          <div className="text-sm text-green-800">Informed</div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Select Roles to Display</h3>
        <div className="space-y-2">
          {roleCategories.map(category => (
            <div key={category.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span className="font-medium">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {category.roles.filter(r => selectedRoleIds.includes(r.id)).length}/{category.roles.length}
                  </span>
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>
              {expandedCategories.includes(category.id) && (
                <div className="px-4 pb-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.roles.map(role => (
                    <label
                      key={role.id}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRoleIds.includes(role.id)}
                        onChange={() => toggleRole(role.id)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span title={role.description}>{role.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RACI Matrix */}
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">RACI Matrix</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 border-b-2 border-gray-300 sticky left-0 bg-gray-100 z-10 min-w-[200px]">
                Practice
              </th>
              {selectedRoles.map(role => (
                <th
                  key={role.id}
                  className="text-center py-3 px-2 border-b-2 border-gray-300 min-w-[80px]"
                  title={role.description}
                >
                  <div className="text-xs font-medium">{role.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {practices.map((practice, index) => (
              <tr
                key={practice.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-teal-50`}
              >
                <td className="py-3 px-4 border-b border-gray-200 sticky left-0 bg-inherit z-10">
                  <div className="font-medium text-sm">{practice.id}</div>
                  <div className="text-xs text-gray-600">{practice.name}</div>
                </td>
                {selectedRoles.map(role => {
                  const value = getAssignment(practice.id, role.id)
                  const desc = raciDescriptions[value]
                  return (
                    <td
                      key={role.id}
                      className="text-center py-2 px-2 border-b border-gray-200"
                    >
                      <select
                        value={value}
                        onChange={(e) => handleAssignmentChange(practice.id, role.id, e.target.value as RACIValue)}
                        className={`w-12 h-8 text-center font-bold rounded border-0 cursor-pointer ${desc.color}`}
                      >
                        {raciValues.map(v => (
                          <option key={v} value={v}>
                            {v || '-'}
                          </option>
                        ))}
                      </select>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={handleResetToTemplate}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Template
        </button>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save RACI Chart
        </button>
      </div>
    </div>
  )
}

export default RACIChart
