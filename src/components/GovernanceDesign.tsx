import React, { useState, useEffect } from 'react'
import { Layers, Save, AlertCircle } from 'lucide-react'
import { AppData, DesignFactors } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface GovernanceDesignProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const GovernanceDesign: React.FC<GovernanceDesignProps> = ({ appData, updateAppData }) => {
  const [designFactors, setDesignFactors] = useState<DesignFactors>(
    appData.context?.designFactors || {
      enterpriseStrategy: '',
      enterpriseGoalsAlignment: '',
      riskProfile: '',
      itRole: '',
      complianceRequirements: [],
      threatLandscape: '',
      technologyAdoption: ''
    }
  )

  const [newCompliance, setNewCompliance] = useState('')

  useEffect(() => {
    if (appData.context?.designFactors) {
      setDesignFactors(appData.context.designFactors)
    }
  }, [appData.context])

  const handleSave = () => {
    if (appData.context) {
      updateAppData({
        context: {
          ...appData.context,
          designFactors
        }
      })
    }
  }

  const addCompliance = () => {
    if (newCompliance.trim() && !designFactors.complianceRequirements.includes(newCompliance.trim())) {
      setDesignFactors({
        ...designFactors,
        complianceRequirements: [...designFactors.complianceRequirements, newCompliance.trim()]
      })
      setNewCompliance('')
    }
  }

  const removeCompliance = (requirement: string) => {
    setDesignFactors({
      ...designFactors,
      complianceRequirements: designFactors.complianceRequirements.filter(r => r !== requirement)
    })
  }

  if (!appData.context) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Context Required</h3>
              <p className="text-sm text-yellow-800">
                Please complete Step 1: Governance Context before designing your governance framework.
                The design factors build upon your enterprise context and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Governance System Design</h1>
        </div>
        <p className="text-teal-100">
          Design a tailored governance framework using COBIT 2019 design factors
        </p>
      </div>

      <DisclaimerBanner />

      {/* Context Summary */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="font-semibold text-teal-900 mb-3">Your Enterprise Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-teal-800">Organization:</span>{' '}
            <span className="text-teal-900">{appData.context.organizationName}</span>
          </div>
          <div>
            <span className="font-medium text-teal-800">Industry:</span>{' '}
            <span className="text-teal-900">{appData.context.industry}</span>
          </div>
          <div>
            <span className="font-medium text-teal-800">Size:</span>{' '}
            <span className="text-teal-900">{appData.context.size}</span>
          </div>
          <div>
            <span className="font-medium text-teal-800">IT Role:</span>{' '}
            <span className="text-teal-900">{appData.context.itRole}</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="font-medium text-teal-800">Selected Enterprise Goals:</span>{' '}
          <span className="text-teal-900">
            {appData.context.enterpriseGoals.filter(g => g.selected).length} goals across{' '}
            {new Set(appData.context.enterpriseGoals.filter(g => g.selected).map(g => g.perspective)).size}{' '}
            BSC perspectives
          </span>
        </div>
      </div>

      {/* COBIT Design Factors */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">COBIT 2019 Design Factors</h2>
        <p className="text-sm text-gray-600 mb-6">
          Design factors help you customize the COBIT framework to your specific context. These factors
          influence which governance and management objectives are most relevant to your organization.
        </p>

        <div className="space-y-6">
          {/* Enterprise Strategy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. Enterprise Strategy
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Describe your organization's strategic direction and how IT supports it
            </p>
            <textarea
              value={designFactors.enterpriseStrategy}
              onChange={(e) =>
                setDesignFactors({ ...designFactors, enterpriseStrategy: e.target.value })
              }
              placeholder="e.g., Digital transformation to become a leading online bank, expanding into mobile banking and fintech partnerships"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Enterprise Goals Alignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2. Enterprise Goals Alignment
            </label>
            <p className="text-xs text-gray-500 mb-2">
              How do your selected enterprise goals translate to IT governance priorities?
            </p>
            <textarea
              value={designFactors.enterpriseGoalsAlignment}
              onChange={(e) =>
                setDesignFactors({ ...designFactors, enterpriseGoalsAlignment: e.target.value })
              }
              placeholder="e.g., Financial goals drive ROI measurement; customer goals prioritize service quality; internal goals focus on operational efficiency"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Risk Profile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3. Risk Profile
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Describe your organization's risk appetite and key risk concerns
            </p>
            <textarea
              value={designFactors.riskProfile}
              onChange={(e) =>
                setDesignFactors({ ...designFactors, riskProfile: e.target.value })
              }
              placeholder="e.g., Conservative risk appetite due to regulatory oversight; primary concerns: cyber threats, data breaches, operational disruptions"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* IT Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4. Role of IT
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Define IT's strategic role: Support, Factory, Turnaround, or Strategic
            </p>
            <select
              value={designFactors.itRole}
              onChange={(e) => setDesignFactors({ ...designFactors, itRole: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select IT Role...</option>
              <option value="support">Support - Enables current operations</option>
              <option value="factory">Factory - Critical for current operations</option>
              <option value="turnaround">Turnaround - Important for future strategy</option>
              <option value="strategic">Strategic - Critical for current and future strategy</option>
            </select>
          </div>

          {/* Compliance Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              5. Compliance Requirements
            </label>
            <p className="text-xs text-gray-500 mb-2">
              List regulatory and compliance obligations (e.g., GDPR, SOX, PCI-DSS)
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCompliance}
                onChange={(e) => setNewCompliance(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCompliance()}
                placeholder="e.g., GDPR, SOX, Basel III"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button onClick={addCompliance} className="btn-primary">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {designFactors.complianceRequirements.map((req) => (
                <span
                  key={req}
                  className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm flex items-center gap-2"
                >
                  {req}
                  <button
                    onClick={() => removeCompliance(req)}
                    className="hover:text-teal-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Threat Landscape */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              6. Threat Landscape
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Describe the threat environment your organization faces
            </p>
            <textarea
              value={designFactors.threatLandscape}
              onChange={(e) =>
                setDesignFactors({ ...designFactors, threatLandscape: e.target.value })
              }
              placeholder="e.g., High-value target for cybercriminals; increasing ransomware and phishing attacks; state-sponsored threats"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Technology Adoption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              7. Technology Adoption
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Describe your organization's approach to new technologies
            </p>
            <textarea
              value={designFactors.technologyAdoption}
              onChange={(e) =>
                setDesignFactors({ ...designFactors, technologyAdoption: e.target.value })
              }
              placeholder="e.g., Moving to cloud-first strategy; adopting AI/ML for fraud detection; legacy system modernization in progress"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Design Recommendations */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">Design Recommendations</h3>
        <p className="text-sm text-blue-800 mb-4">
          Based on your design factors, the following COBIT objectives are recommended:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium text-purple-900 mb-1">Governance (EDM)</div>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• EDM01 - Governance Framework (Essential)</li>
              <li>• EDM03 - Risk Optimization (High priority)</li>
              <li>• EDM02 - Benefits Delivery (Recommended)</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium text-blue-900 mb-1">Align, Plan, Organize (APO)</div>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• APO12 - Managed Risk (High priority)</li>
              <li>• APO13 - Managed Security (High priority)</li>
              <li>• APO01 - IT Management Framework (Essential)</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium text-orange-900 mb-1">Deliver, Service, Support (DSS)</div>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• DSS05 - Security Services (High priority)</li>
              <li>• DSS04 - Managed Continuity (Recommended)</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <div className="font-medium text-indigo-900 mb-1">Monitor, Evaluate, Assess (MEA)</div>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• MEA03 - Compliance Management (High priority)</li>
              <li>• MEA01 - Performance Monitoring (Essential)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Governance Design
        </button>
      </div>
    </div>
  )
}

export default GovernanceDesign
