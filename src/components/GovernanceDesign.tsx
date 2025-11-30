import React, { useState, useEffect } from 'react'
import { Layers, Save, AlertCircle, Plus, Trash2, Info } from 'lucide-react'
import { AppData, DesignFactors, ITRelatedIssue, defaultDesignFactors } from '../types'
import { focusAreas, getFocusArea } from '../data/focusAreas'
import DisclaimerBanner from './DisclaimerBanner'

interface GovernanceDesignProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const GovernanceDesign: React.FC<GovernanceDesignProps> = ({ appData, updateAppData }) => {
  const [designFactors, setDesignFactors] = useState<DesignFactors>(
    appData.context?.designFactors || defaultDesignFactors
  )

  const [newIssue, setNewIssue] = useState<Partial<ITRelatedIssue>>({
    category: 'frustration',
    description: '',
    priority: 'medium',
    relatedObjectives: []
  })

  const [newCompliance, setNewCompliance] = useState('')
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>(
    appData.context?.selectedFocusAreas || []
  )

  useEffect(() => {
    if (appData.context?.designFactors) {
      setDesignFactors(appData.context.designFactors)
    }
    if (appData.context?.selectedFocusAreas) {
      setSelectedFocusAreas(appData.context.selectedFocusAreas)
    }
  }, [appData.context])

  const handleSave = () => {
    if (appData.context) {
      updateAppData({
        context: {
          ...appData.context,
          designFactors,
          selectedFocusAreas
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

  const addIssue = () => {
    if (newIssue.description?.trim()) {
      const issue: ITRelatedIssue = {
        id: `issue-${Date.now()}`,
        category: newIssue.category || 'frustration',
        description: newIssue.description.trim(),
        priority: newIssue.priority || 'medium',
        relatedObjectives: newIssue.relatedObjectives || []
      }
      setDesignFactors({
        ...designFactors,
        itRelatedIssues: [...designFactors.itRelatedIssues, issue]
      })
      setNewIssue({
        category: 'frustration',
        description: '',
        priority: 'medium',
        relatedObjectives: []
      })
    }
  }

  const removeIssue = (issueId: string) => {
    setDesignFactors({
      ...designFactors,
      itRelatedIssues: designFactors.itRelatedIssues.filter(i => i.id !== issueId)
    })
  }

  const toggleFocusArea = (focusAreaId: string) => {
    if (selectedFocusAreas.includes(focusAreaId)) {
      setSelectedFocusAreas(selectedFocusAreas.filter(id => id !== focusAreaId))
    } else {
      setSelectedFocusAreas([...selectedFocusAreas, focusAreaId])
    }
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
                Please complete Phase 2: Current State Assessment before designing your governance framework.
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
          <h1 className="text-3xl font-bold">COBIT 2019 Design Factors</h1>
        </div>
        <p className="text-teal-100">
          Apply all 11 design factors to customize your governance system (Phase 3)
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
            <span className="font-medium text-teal-800">Selected Enterprise Goals:</span>{' '}
            <span className="text-teal-900">
              {appData.context.enterpriseGoals.filter(g => g.selected).length} goals
            </span>
          </div>
        </div>
      </div>

      {/* Focus Areas Selection */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Focus Areas (Optional)</h2>
        <p className="text-sm text-gray-600 mb-4">
          Select applicable focus areas to receive tailored design recommendations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {focusAreas.map(fa => (
            <button
              key={fa.id}
              onClick={() => toggleFocusArea(fa.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedFocusAreas.includes(fa.id)
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{fa.name}</div>
              <div className="text-xs text-gray-500 mt-1">{fa.description}</div>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
                fa.category === 'industry' ? 'bg-blue-100 text-blue-700' :
                fa.category === 'topic' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {fa.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* All 11 COBIT 2019 Design Factors */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">11 COBIT 2019 Design Factors</h2>
        <p className="text-sm text-gray-600 mb-6">
          Design factors influence which governance and management objectives are most relevant.
          Complete each factor to customize your COBIT implementation.
        </p>

        <div className="space-y-8">
          {/* DF1: Enterprise Strategy */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF1</span>
              <label className="text-sm font-semibold text-gray-800">Enterprise Strategy</label>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              The primary strategic archetype that describes your organization's approach
            </p>
            <select
              value={designFactors.enterpriseStrategy}
              onChange={(e) => setDesignFactors({ ...designFactors, enterpriseStrategy: e.target.value as DesignFactors['enterpriseStrategy'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select Strategy...</option>
              <option value="growth">Growth/Acquisition - Expand market presence</option>
              <option value="innovation">Innovation/Differentiation - Lead through innovation</option>
              <option value="cost-leadership">Cost Leadership - Compete on price/efficiency</option>
              <option value="client-service">Client Service/Stability - Focus on service excellence</option>
            </select>
            <textarea
              value={designFactors.enterpriseStrategyDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, enterpriseStrategyDescription: e.target.value })}
              placeholder="Describe how this strategy manifests in your organization..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF2: Enterprise Goals - Reference to Goals Cascade */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF2</span>
              <label className="text-sm font-semibold text-gray-800">Enterprise Goals</label>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">
                <strong>{appData.context.enterpriseGoals.filter(g => g.selected).length}</strong> enterprise goals selected in Current State Assessment
              </p>
              <p className="text-xs text-blue-700">
                These goals drive the Goals Cascade to recommend alignment goals and objectives.
                Return to Phase 2 to modify goal selections.
              </p>
            </div>
            <textarea
              value={designFactors.enterpriseGoalsAlignment}
              onChange={(e) => setDesignFactors({ ...designFactors, enterpriseGoalsAlignment: e.target.value })}
              placeholder="Describe how enterprise goals translate to IT governance priorities..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mt-3"
            />
          </div>

          {/* DF3: Risk Profile */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF3</span>
              <label className="text-sm font-semibold text-gray-800">Risk Profile</label>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Your organization's overall appetite for risk
            </p>
            <select
              value={designFactors.riskProfile}
              onChange={(e) => setDesignFactors({ ...designFactors, riskProfile: e.target.value as DesignFactors['riskProfile'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select Risk Profile...</option>
              <option value="risk-averse">Risk Averse - Minimize risk, conservative approach</option>
              <option value="risk-neutral">Risk Neutral - Balanced risk-reward trade-offs</option>
              <option value="risk-seeking">Risk Seeking - Accept higher risk for higher returns</option>
            </select>
            <textarea
              value={designFactors.riskProfileDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, riskProfileDescription: e.target.value })}
              placeholder="Describe your risk appetite and key risk concerns..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF4: I&T-Related Issues (NEW) */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">DF4</span>
              <label className="text-sm font-semibold text-gray-800">I&T-Related Issues</label>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Pain points, trigger events, frustrations, and opportunities that drive the need for improved governance
            </p>

            {/* Add New Issue */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <select
                  value={newIssue.category}
                  onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value as ITRelatedIssue['category'] })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="frustration">Frustration/Pain Point</option>
                  <option value="incident">Incident/Trigger Event</option>
                  <option value="risk">Risk/Concern</option>
                  <option value="opportunity">Opportunity</option>
                </select>
                <select
                  value={newIssue.priority}
                  onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value as ITRelatedIssue['priority'] })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <button onClick={addIssue} className="btn-primary flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Issue
                </button>
              </div>
              <textarea
                value={newIssue.description}
                onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                placeholder="e.g., Frequent security incidents, Slow project delivery, Compliance audit findings..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Issue List */}
            {designFactors.itRelatedIssues.length > 0 ? (
              <div className="space-y-2">
                {designFactors.itRelatedIssues.map(issue => (
                  <div key={issue.id} className="flex items-start justify-between p-3 bg-white border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          issue.category === 'frustration' ? 'bg-orange-100 text-orange-700' :
                          issue.category === 'incident' ? 'bg-red-100 text-red-700' :
                          issue.category === 'risk' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {issue.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          issue.priority === 'high' ? 'bg-red-50 text-red-600' :
                          issue.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {issue.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{issue.description}</p>
                    </div>
                    <button onClick={() => removeIssue(issue.id)} className="text-red-600 hover:text-red-700 ml-3">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No I&T-related issues identified yet</p>
            )}
          </div>

          {/* DF5: Threat Landscape */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF5</span>
              <label className="text-sm font-semibold text-gray-800">Threat Landscape</label>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              The level of threat exposure your organization faces
            </p>
            <select
              value={designFactors.threatLandscape}
              onChange={(e) => setDesignFactors({ ...designFactors, threatLandscape: e.target.value as DesignFactors['threatLandscape'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select Threat Level...</option>
              <option value="low">Low - Minimal targeted threats</option>
              <option value="normal">Normal - Average industry threat level</option>
              <option value="high">High - Elevated threat environment</option>
            </select>
            <textarea
              value={designFactors.threatLandscapeDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, threatLandscapeDescription: e.target.value })}
              placeholder="Describe specific threats: ransomware, insider threats, nation-state actors, etc."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF6: Compliance Requirements */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF6</span>
              <label className="text-sm font-semibold text-gray-800">Compliance Requirements</label>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Regulatory and compliance obligations affecting I&T governance
            </p>
            <select
              value={designFactors.complianceLevel}
              onChange={(e) => setDesignFactors({ ...designFactors, complianceLevel: e.target.value as DesignFactors['complianceLevel'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-3"
            >
              <option value="">Select Compliance Level...</option>
              <option value="low">Low - Minimal regulatory oversight</option>
              <option value="normal">Normal - Standard industry regulations</option>
              <option value="high">High - Heavily regulated environment</option>
            </select>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCompliance}
                onChange={(e) => setNewCompliance(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCompliance()}
                placeholder="e.g., GDPR, SOX, PCI-DSS, HIPAA, ISO 27001"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button onClick={addCompliance} className="btn-primary">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {designFactors.complianceRequirements.map((req) => (
                <span key={req} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm flex items-center gap-2">
                  {req}
                  <button onClick={() => removeCompliance(req)} className="hover:text-teal-900">x</button>
                </span>
              ))}
            </div>
          </div>

          {/* DF7: Role of IT */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF7</span>
              <label className="text-sm font-semibold text-gray-800">Role of IT</label>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              IT's strategic importance based on McFarlan's Strategic Grid
            </p>
            <select
              value={designFactors.itRole}
              onChange={(e) => setDesignFactors({ ...designFactors, itRole: e.target.value as DesignFactors['itRole'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select IT Role...</option>
              <option value="support">Support - Enables current operations (low strategic impact)</option>
              <option value="factory">Factory - Critical for daily operations</option>
              <option value="turnaround">Turnaround - Important for future strategy</option>
              <option value="strategic">Strategic - Critical for current AND future success</option>
            </select>
            <textarea
              value={designFactors.itRoleDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, itRoleDescription: e.target.value })}
              placeholder="Describe how IT contributes to business value..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF8: Sourcing Model (NEW) */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">DF8</span>
              <label className="text-sm font-semibold text-gray-800">Sourcing Model</label>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              How IT services and capabilities are sourced
            </p>
            <select
              value={designFactors.sourcingModel}
              onChange={(e) => setDesignFactors({ ...designFactors, sourcingModel: e.target.value as DesignFactors['sourcingModel'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select Sourcing Model...</option>
              <option value="insourced">Insourced - Primarily internal IT capabilities</option>
              <option value="outsourced">Outsourced - Primarily external service providers</option>
              <option value="hybrid">Hybrid - Mix of internal and external</option>
              <option value="cloud">Cloud - Cloud-first strategy</option>
            </select>
            <textarea
              value={designFactors.sourcingModelDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, sourcingModelDescription: e.target.value })}
              placeholder="Describe your sourcing approach and key vendors..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF9: IT Implementation Methods (NEW) */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">DF9</span>
              <label className="text-sm font-semibold text-gray-800">IT Implementation Methods</label>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Primary methodologies for IT development and delivery
            </p>
            <select
              value={designFactors.itImplementationMethods}
              onChange={(e) => setDesignFactors({ ...designFactors, itImplementationMethods: e.target.value as DesignFactors['itImplementationMethods'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select Implementation Method...</option>
              <option value="waterfall">Waterfall - Traditional sequential approach</option>
              <option value="agile">Agile - Iterative, flexible delivery</option>
              <option value="devops">DevOps - Continuous integration/delivery</option>
              <option value="hybrid">Hybrid - Mix of methodologies</option>
            </select>
            <textarea
              value={designFactors.itImplementationDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, itImplementationDescription: e.target.value })}
              placeholder="Describe your development practices, tools, and methodologies..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF10: Technology Adoption Strategy */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DF10</span>
              <label className="text-sm font-semibold text-gray-800">Technology Adoption Strategy</label>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Your organization's approach to adopting new technologies
            </p>
            <select
              value={designFactors.technologyAdoption}
              onChange={(e) => setDesignFactors({ ...designFactors, technologyAdoption: e.target.value as DesignFactors['technologyAdoption'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
            >
              <option value="">Select Adoption Strategy...</option>
              <option value="first-mover">First Mover - Lead with emerging technologies</option>
              <option value="follower">Follower - Adopt proven technologies</option>
              <option value="slow-adopter">Slow Adopter - Conservative, wait for maturity</option>
            </select>
            <textarea
              value={designFactors.technologyAdoptionDescription}
              onChange={(e) => setDesignFactors({ ...designFactors, technologyAdoptionDescription: e.target.value })}
              placeholder="Describe your approach to AI, cloud, automation, emerging tech..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DF11: Enterprise Size (NEW) */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">DF11</span>
              <label className="text-sm font-semibold text-gray-800">Enterprise Size</label>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">NEW</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Organization size affects governance complexity and resource availability
            </p>
            <select
              value={designFactors.enterpriseSize}
              onChange={(e) => setDesignFactors({ ...designFactors, enterpriseSize: e.target.value as DesignFactors['enterpriseSize'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Enterprise Size...</option>
              <option value="small">Small - Under 250 employees</option>
              <option value="medium">Medium - 250-1,000 employees</option>
              <option value="large">Large - 1,000-10,000 employees</option>
              <option value="enterprise">Enterprise - Over 10,000 employees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Focus Area Recommendations */}
      {selectedFocusAreas.length > 0 && (
        <div className="card bg-purple-50 border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Focus Area Recommendations
          </h3>
          <div className="space-y-4">
            {selectedFocusAreas.map(faId => {
              const fa = getFocusArea(faId)
              if (!fa) return null
              return (
                <div key={faId} className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">{fa.name}</h4>
                  <div className="text-sm text-purple-700 mb-2">
                    <strong>Priority Objectives:</strong>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fa.priorityObjectives.slice(0, 6).map(po => (
                      <span key={po.objectiveId} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        {po.objectiveId} (min. Level {po.minimumCapability})
                      </span>
                    ))}
                    {fa.priorityObjectives.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{fa.priorityObjectives.length - 6} more
                      </span>
                    )}
                  </div>
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
          Save Design Factors
        </button>
      </div>
    </div>
  )
}

export default GovernanceDesign
