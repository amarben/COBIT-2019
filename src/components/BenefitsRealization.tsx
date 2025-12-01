import React, { useState, useEffect } from 'react'
import { Award, Save, Plus, Trash2, TrendingUp, Check, X, Clock } from 'lucide-react'
import { AppData, Benefit } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import { TEST_IDS } from '../constants/testIds'

interface BenefitsRealizationProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const BenefitsRealization: React.FC<BenefitsRealizationProps> = ({ appData, updateAppData }) => {
  const [benefits, setBenefits] = useState<Benefit[]>(appData.benefits || [])
  const [newBenefit, setNewBenefit] = useState<Partial<Benefit>>({
    name: '',
    description: '',
    type: 'operational',
    status: 'planned',
    targetValue: 0,
    actualValue: 0,
    unit: '%',
    relatedObjectives: [],
    evidenceNotes: ''
  })

  useEffect(() => {
    if (appData.benefits) {
      setBenefits(appData.benefits)
    }
  }, [appData.benefits])

  const handleSave = () => {
    updateAppData({ benefits })
  }

  const addBenefit = () => {
    if (newBenefit.name?.trim()) {
      const benefit: Benefit = {
        id: `benefit-${Date.now()}`,
        name: newBenefit.name.trim(),
        description: newBenefit.description || '',
        type: newBenefit.type || 'operational',
        status: newBenefit.status || 'planned',
        targetValue: newBenefit.targetValue || 0,
        actualValue: newBenefit.actualValue || 0,
        unit: newBenefit.unit || '%',
        relatedObjectives: newBenefit.relatedObjectives || [],
        evidenceNotes: newBenefit.evidenceNotes || ''
      }
      setBenefits([...benefits, benefit])
      setNewBenefit({
        name: '',
        description: '',
        type: 'operational',
        status: 'planned',
        targetValue: 0,
        actualValue: 0,
        unit: '%',
        relatedObjectives: [],
        evidenceNotes: ''
      })
    }
  }

  const updateBenefit = (id: string, updates: Partial<Benefit>) => {
    setBenefits(benefits.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  const removeBenefit = (id: string) => {
    setBenefits(benefits.filter(b => b.id !== id))
  }

  // Calculate statistics
  const totalBenefits = benefits.length
  const realizedBenefits = benefits.filter(b => b.status === 'realized').length
  const inProgressBenefits = benefits.filter(b => b.status === 'in-progress').length
  const plannedBenefits = benefits.filter(b => b.status === 'planned').length
  const notRealizedBenefits = benefits.filter(b => b.status === 'not-realized').length

  const realizationRate = totalBenefits > 0
    ? Math.round((realizedBenefits / totalBenefits) * 100)
    : 0

  const averageAchievement = benefits.length > 0
    ? Math.round(benefits.reduce((sum, b) => {
        if (b.targetValue === 0) return sum
        return sum + (b.actualValue / b.targetValue * 100)
      }, 0) / benefits.filter(b => b.targetValue > 0).length) || 0
    : 0

  const getStatusIcon = (status: Benefit['status']) => {
    switch (status) {
      case 'realized': return <Check className="w-4 h-4 text-green-600" />
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'not-realized': return <X className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: Benefit['status']) => {
    switch (status) {
      case 'realized': return 'bg-green-100 border-green-300 text-green-800'
      case 'in-progress': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'not-realized': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getTypeColor = (type: Benefit['type']) => {
    switch (type) {
      case 'financial': return 'bg-green-100 text-green-700'
      case 'operational': return 'bg-blue-100 text-blue-700'
      case 'strategic': return 'bg-purple-100 text-purple-700'
      case 'compliance': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 max-w-6xl" data-testid={TEST_IDS.BENEFITS_REALIZATION.CONTAINER}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-8 h-8" />
          <div>
            <p className="text-emerald-200 text-sm font-medium">Phase 6: Did We Get There?</p>
            <h1 className="text-3xl font-bold">Benefits Realization</h1>
          </div>
        </div>
        <p className="text-emerald-100">
          Track and verify that expected benefits from governance improvements are being realized
        </p>
      </div>

      <DisclaimerBanner />

      {/* Summary Dashboard */}
      <div className="card bg-emerald-50 border-emerald-200">
        <h3 className="font-semibold text-emerald-900 mb-4">Benefits Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-900">{totalBenefits}</div>
            <div className="text-sm text-emerald-700">Total Benefits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{realizedBenefits}</div>
            <div className="text-sm text-green-700">Realized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{inProgressBenefits}</div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-500">{plannedBenefits}</div>
            <div className="text-sm text-gray-600">Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{notRealizedBenefits}</div>
            <div className="text-sm text-red-700">Not Realized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{realizationRate}%</div>
            <div className="text-sm text-emerald-700">Realization Rate</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-emerald-700 mb-1">
            <span>Benefits Realization Progress</span>
            <span>{averageAchievement}% avg. achievement</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${(realizedBenefits / Math.max(totalBenefits, 1)) * 100}%` }}
            />
            <div
              className="h-full bg-yellow-500 transition-all"
              style={{ width: `${(inProgressBenefits / Math.max(totalBenefits, 1)) * 100}%` }}
            />
            <div
              className="h-full bg-red-400 transition-all"
              style={{ width: `${(notRealizedBenefits / Math.max(totalBenefits, 1)) * 100}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded" /> Realized</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded" /> In Progress</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded" /> Not Realized</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300 rounded" /> Planned</span>
          </div>
        </div>
      </div>

      {/* Add New Benefit */}
      <div className="card">
        <h3 className="font-semibold mb-4">Define Expected Benefit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefit Name</label>
            <input
              type="text"
              value={newBenefit.name}
              onChange={(e) => setNewBenefit({ ...newBenefit, name: e.target.value })}
              placeholder="e.g., Reduced security incidents"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_NAME_INPUT}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefit Type</label>
            <select
              value={newBenefit.type}
              onChange={(e) => setNewBenefit({ ...newBenefit, type: e.target.value as Benefit['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_TYPE_SELECT}
            >
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="strategic">Strategic</option>
              <option value="compliance">Compliance</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newBenefit.description}
            onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
            placeholder="Describe the expected benefit and how it will be measured..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_DESCRIPTION_TEXTAREA}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
            <input
              type="number"
              value={newBenefit.targetValue}
              onChange={(e) => setNewBenefit({ ...newBenefit, targetValue: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_TARGET_VALUE_INPUT}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={newBenefit.unit}
              onChange={(e) => setNewBenefit({ ...newBenefit, unit: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_UNIT_SELECT}
            >
              <option value="%">Percentage (%)</option>
              <option value="$">Dollars ($)</option>
              <option value="days">Days</option>
              <option value="hours">Hours</option>
              <option value="count">Count</option>
              <option value="score">Score</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={addBenefit} className="w-full btn-primary flex items-center justify-center gap-2" data-testid={TEST_IDS.BENEFITS_REALIZATION.ADD_BENEFIT_BUTTON}>
              <Plus className="w-4 h-4" /> Add Benefit
            </button>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Tracked Benefits ({benefits.length})</h3>

        {benefits.length > 0 ? (
          benefits.map(benefit => {
            const achievementRate = benefit.targetValue > 0
              ? Math.round((benefit.actualValue / benefit.targetValue) * 100)
              : 0

            const benefitIndex = benefits.indexOf(benefit)
            return (
              <div key={benefit.id} className={`card border-2 ${getStatusColor(benefit.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(benefit.status)}
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.name}</h4>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(benefit.type)}`}>
                        {benefit.type}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeBenefit(benefit.id)} className="text-red-600 hover:text-red-700" data-testid={TEST_IDS.BENEFITS_REALIZATION.REMOVE_BENEFIT_BUTTON(benefitIndex)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {benefit.description && (
                  <p className="text-sm text-gray-600 mb-3">{benefit.description}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                    <select
                      value={benefit.status}
                      onChange={(e) => updateBenefit(benefit.id, { status: e.target.value as Benefit['status'] })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-emerald-500"
                      data-testid={TEST_IDS.BENEFITS_REALIZATION.STATUS_UPDATE_INPUT(benefitIndex)}
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="realized">Realized</option>
                      <option value="not-realized">Not Realized</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Target ({benefit.unit})</label>
                    <input
                      type="number"
                      value={benefit.targetValue}
                      onChange={(e) => updateBenefit(benefit.id, { targetValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-emerald-500"
                      data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_TARGET_INPUT(benefitIndex)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Actual ({benefit.unit})</label>
                    <input
                      type="number"
                      value={benefit.actualValue}
                      onChange={(e) => updateBenefit(benefit.id, { actualValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-emerald-500"
                      data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_ACTUAL_VALUE_INPUT(benefitIndex)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Achievement</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            achievementRate >= 100 ? 'bg-green-500' :
                            achievementRate >= 75 ? 'bg-yellow-500' :
                            achievementRate >= 50 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(achievementRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{achievementRate}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Evidence / Notes</label>
                  <textarea
                    value={benefit.evidenceNotes || ''}
                    onChange={(e) => updateBenefit(benefit.id, { evidenceNotes: e.target.value })}
                    placeholder="Document evidence of benefit realization..."
                    rows={2}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-emerald-500"
                    data-testid={TEST_IDS.BENEFITS_REALIZATION.BENEFIT_EVIDENCE_NOTES_TEXTAREA(benefitIndex)}
                  />
                </div>
              </div>
            )
          })
        ) : (
          <div className="card text-center py-12 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No benefits defined yet. Start by adding expected benefits above.</p>
          </div>
        )}
      </div>

      {/* Benefits by Type Summary */}
      {benefits.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Benefits by Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['financial', 'operational', 'strategic', 'compliance'] as const).map(type => {
              const typeBenefits = benefits.filter(b => b.type === type)
              const realized = typeBenefits.filter(b => b.status === 'realized').length
              return (
                <div key={type} className={`p-4 rounded-lg ${getTypeColor(type)}`}>
                  <div className="text-2xl font-bold">{typeBenefits.length}</div>
                  <div className="text-sm font-medium capitalize">{type}</div>
                  <div className="text-xs mt-1">{realized} realized</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Benefits
        </button>
      </div>
    </div>
  )
}

export default BenefitsRealization
