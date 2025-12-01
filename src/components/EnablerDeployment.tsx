import React, { useState } from 'react'
import { Wrench, CheckCircle, Clock, FileText, Laptop, GraduationCap, Users, Plus, Download, Trash2, Edit } from 'lucide-react'
import { AppData, EnablerItem, ComponentType } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import { TEST_IDS } from '../constants/testIds'

interface EnablerDeploymentProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

// TechCorp Example Data
const TECHCORP_EXAMPLE_DATA: EnablerItem[] = [
  // Policies and Procedures
  { id: '1', enablerType: 'principles-policies-frameworks', name: 'IT Governance Policy', status: 'completed', version: 'v2.1', approved: 'March 2024', scope: 'Governance framework, roles, decision rights' },
  { id: '2', enablerType: 'principles-policies-frameworks', name: 'Enterprise Risk Management Policy', status: 'completed', version: 'v3.0', approved: 'January 2024', scope: 'Risk appetite, assessment, treatment' },
  { id: '3', enablerType: 'principles-policies-frameworks', name: 'Information Security Policy Framework', status: 'completed', version: 'Multiple', approved: '2024', scope: '15 security policies, annual review cycle' },
  { id: '4', enablerType: 'principles-policies-frameworks', name: 'Change Management SOPs', status: 'completed', version: 'v1.5', approved: '2024', scope: '8 procedures, CAB charter, escalation' },
  { id: '5', enablerType: 'principles-policies-frameworks', name: 'Business Continuity & DR Plans', status: 'completed', version: 'Multiple', approved: '2024', scope: '25 app-specific BC/DR plans, bi-annual testing' },
  { id: '6', enablerType: 'principles-policies-frameworks', name: 'Vendor Management Policy', status: 'completed', version: 'v2.0', approved: '2024', scope: 'Vendor lifecycle, risk assessment' },
  { id: '7', enablerType: 'principles-policies-frameworks', name: 'Data Governance Policy', status: 'in-progress', version: 'Draft', approved: 'Pending', scope: 'Data classification, privacy, quality' },

  // Tools and Technologies
  { id: '8', enablerType: 'services-infrastructure', name: 'ServiceNow GRC Platform', status: 'completed', deployed: 'February 2024', modules: 'Risk, Compliance, Policy, Audit', users: '150 licenses', investment: '$800K' },
  { id: '9', enablerType: 'services-infrastructure', name: 'ServiceNow ITSM Platform', status: 'completed', deployed: 'Production', modules: 'Incident, Problem, Change, Service Catalog', users: 'All IT staff', investment: '$1.2M' },
  { id: '10', enablerType: 'services-infrastructure', name: 'Splunk Enterprise Security (SIEM)', status: 'completed', deployed: 'Production', modules: '500+ log sources, 75 correlation searches', users: 'SOC team', investment: '$1.5M' },
  { id: '11', enablerType: 'services-infrastructure', name: 'Cloud Security Posture Management', status: 'completed', deployed: 'Production', modules: 'Palo Alto Prisma Cloud - AWS, Azure', users: 'Security & Cloud teams', investment: '$400K' },
  { id: '12', enablerType: 'services-infrastructure', name: 'Identity and Access Management', status: 'in-progress', deployed: 'Phased rollout', modules: 'Okta Enterprise - Target: Full SSO Q4 2024', users: 'All employees', investment: '$600K' },
  { id: '13', enablerType: 'services-infrastructure', name: 'Cloud FinOps Platform', status: 'in-progress', deployed: 'Implementation', modules: 'CloudHealth - Target: Q3 2024', users: 'FinOps team', investment: '$300K' },
  { id: '14', enablerType: 'services-infrastructure', name: 'Enterprise Architecture Tool', status: 'in-progress', deployed: 'Implementation', modules: 'LeanIX - Target: Q4 2024', users: 'Architecture team', investment: '$250K' },

  // Skills Development
  { id: '15', enablerType: 'people-skills-competencies', name: 'COBIT 2019 Foundation Training', status: 'completed', participants: '45 IT leaders and governance team', certifications: '12 COBIT certified', investment: '$50K' },
  { id: '16', enablerType: 'people-skills-competencies', name: 'Cloud Certifications Program', status: 'in-progress', participants: 'Target: 50 cloud-certified engineers', certifications: '32 certified (AWS, Azure, GCP)', investment: '$200K annually' },
  { id: '17', enablerType: 'people-skills-competencies', name: 'Cybersecurity Skills Development', status: 'completed', participants: 'Security team', certifications: '18 (CISSP, CISM, Security+, CEH)', investment: '$150K' },
  { id: '18', enablerType: 'people-skills-competencies', name: 'Agile and DevOps Training', status: 'completed', participants: '200 IT staff trained', certifications: 'CSM, DevOps Foundation', investment: '$100K' },
  { id: '19', enablerType: 'people-skills-competencies', name: 'Risk Management Training', status: 'completed', participants: '85 risk owners and first-line', certifications: 'Internal certification', investment: '$40K' },
  { id: '20', enablerType: 'people-skills-competencies', name: 'Data Privacy and GDPR Training', status: 'completed', participants: 'Mandatory for all IT staff', certifications: '98% completion rate', investment: '$30K' },

  // Culture and Behavior
  { id: '21', enablerType: 'culture-ethics-behavior', name: 'Governance Culture Initiative', status: 'in-progress', activities: 'Town halls, governance champions, awareness campaigns', goal: 'Embed governance mindset across IT', metricsValue: 'Governance awareness: 78%' },
  { id: '22', enablerType: 'culture-ethics-behavior', name: 'Cybersecurity Awareness Program', status: 'completed', activities: 'Monthly phishing sims, quarterly training, 50 security champions', goal: 'Security-first culture', metricsValue: 'Phishing click rate: <5%' },
  { id: '23', enablerType: 'culture-ethics-behavior', name: 'Continuous Improvement Program', status: 'in-progress', activities: 'Retrospectives, kaizen events, improvement boards', goal: '100 improvements implemented annually', metricsValue: 'Current: 65 improvements YTD' },
  { id: '24', enablerType: 'culture-ethics-behavior', name: 'Customer-Centric Service Culture', status: 'in-progress', activities: 'Service design thinking, customer journey mapping', goal: 'IT as trusted business partner', metricsValue: 'Customer satisfaction: 3.8/5.0' },
]

const EnablerDeployment: React.FC<EnablerDeploymentProps> = ({ appData, updateAppData }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<EnablerItem | null>(null)
  const [filterType, setFilterType] = useState<ComponentType | 'all'>('all')
  const [newItem, setNewItem] = useState<Partial<EnablerItem>>({
    enablerType: 'principles-policies-frameworks',
    name: '',
    status: 'planned'
  })

  const hasUserData = appData.enablerItems && appData.enablerItems.length > 0
  const displayData = hasUserData ? appData.enablerItems : []

  // Load TechCorp example
  const loadExample = () => {
    updateAppData({ enablerItems: TECHCORP_EXAMPLE_DATA })
  }

  // Add new item
  const handleAddItem = () => {
    if (!newItem.name) return

    const item: EnablerItem = {
      id: Date.now().toString(),
      enablerType: newItem.enablerType as ComponentType,
      name: newItem.name,
      status: newItem.status as 'completed' | 'in-progress' | 'planned',
      version: newItem.version,
      approved: newItem.approved,
      scope: newItem.scope,
      deployed: newItem.deployed,
      modules: newItem.modules,
      users: newItem.users,
      investment: newItem.investment,
      participants: newItem.participants,
      certifications: newItem.certifications,
      activities: newItem.activities,
      goal: newItem.goal,
      metricsValue: newItem.metricsValue
    }

    updateAppData({ enablerItems: [...appData.enablerItems, item] })
    setShowAddForm(false)
    setNewItem({ enablerType: 'principles-policies-frameworks', name: '', status: 'planned' })
  }

  // Update item
  const handleUpdateItem = () => {
    if (!editingItem) return

    const updated = appData.enablerItems.map(item =>
      item.id === editingItem.id ? editingItem : item
    )
    updateAppData({ enablerItems: updated })
    setEditingItem(null)
  }

  // Delete item
  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      updateAppData({ enablerItems: appData.enablerItems.filter(item => item.id !== id) })
    }
  }

  // Get filtered items
  const filteredItems = filterType === 'all'
    ? displayData
    : displayData.filter(item => item.enablerType === filterType)

  // Calculate statistics
  const stats = {
    policies: displayData.filter(i => i.enablerType === 'principles-policies-frameworks'),
    tools: displayData.filter(i => i.enablerType === 'services-infrastructure'),
    skills: displayData.filter(i => i.enablerType === 'people-skills-competencies'),
    culture: displayData.filter(i => i.enablerType === 'culture-ethics-behavior')
  }

  const policiesCompleted = stats.policies.filter(i => i.status === 'completed').length
  const toolsCompleted = stats.tools.filter(i => i.status === 'completed').length
  const skillsCompleted = stats.skills.filter(i => i.status === 'completed').length
  const cultureCompleted = stats.culture.filter(i => i.status === 'completed').length

  // Enabler type labels
  const enablerTypeLabels: Record<ComponentType, { label: string; icon: any; color: string }> = {
    'principles-policies-frameworks': { label: 'Policies & Frameworks', icon: FileText, color: 'blue' },
    'services-infrastructure': { label: 'Tools & Infrastructure', icon: Laptop, color: 'purple' },
    'people-skills-competencies': { label: 'Skills & Training', icon: GraduationCap, color: 'green' },
    'culture-ethics-behavior': { label: 'Culture & Behavior', icon: Users, color: 'orange' },
    'processes': { label: 'Processes', icon: Wrench, color: 'teal' },
    'organizational-structures': { label: 'Organizational Structures', icon: Users, color: 'indigo' },
    'information': { label: 'Information', icon: FileText, color: 'cyan' }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Wrench className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Enabler Deployment</h1>
        </div>
        <p className="text-teal-100">Deploy supporting enablers for governance objectives</p>
        {hasUserData && appData.context && (
          <p className="text-teal-200 text-sm mt-2">{appData.context.organizationName || 'Your Organization'}</p>
        )}
      </div>

      <DisclaimerBanner />

      {/* Empty State / Load Example */}
      {!hasUserData && (
        <div className="card bg-blue-50 border-blue-200 text-center py-12">
          <Wrench className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-900 mb-2">No Enabler Deployment Data Yet</h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Document the policies, tools, skills, and culture initiatives you're deploying to support your governance objectives.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={loadExample} className="btn-secondary flex items-center gap-2" data-testid={TEST_IDS.ENABLER_DEPLOYMENT.LOAD_EXAMPLE_BUTTON}>
              <Download className="w-4 h-4" />
              Load TechCorp Example
            </button>
            <button onClick={() => setShowAddForm(true)} className="btn-primary flex items-center gap-2" data-testid={TEST_IDS.ENABLER_DEPLOYMENT.ADD_FIRST_ENABLER_BUTTON}>
              <Plus className="w-4 h-4" />
              Add First Enabler
            </button>
          </div>
        </div>
      )}

      {/* Summary Dashboard */}
      {hasUserData && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Deployment Overview</h2>
            <div className="flex gap-2">
              {!hasUserData && (
                <button onClick={loadExample} className="btn-secondary text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Load Example
                </button>
              )}
              <button onClick={() => setShowAddForm(true)} className="btn-primary text-sm flex items-center gap-2" data-testid={TEST_IDS.ENABLER_DEPLOYMENT.ADD_ENABLER_BUTTON}>
                <Plus className="w-4 h-4" />
                Add Enabler
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold">Policies</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">{policiesCompleted}/{stats.policies.length}</div>
              <div className="text-sm text-gray-600">
                {stats.policies.length > 0 ? `${Math.round((policiesCompleted/stats.policies.length)*100)}% Complete` : 'None yet'}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <Laptop className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold">Tools</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">{toolsCompleted}/{stats.tools.length}</div>
              <div className="text-sm text-gray-600">
                {stats.tools.length > 0 ? `${Math.round((toolsCompleted/stats.tools.length)*100)}% Complete` : 'None yet'}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold">Skills</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">{skillsCompleted}/{stats.skills.length}</div>
              <div className="text-sm text-gray-600">
                {stats.skills.length > 0 ? `${Math.round((skillsCompleted/stats.skills.length)*100)}% Complete` : 'None yet'}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-orange-600" />
                <h3 className="font-semibold">Culture</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">{cultureCompleted}/{stats.culture.length}</div>
              <div className="text-sm text-gray-600">
                {stats.culture.length > 0 ? `${Math.round((cultureCompleted/stats.culture.length)*100)}% Complete` : 'None yet'}
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="card">
            <h3 className="font-semibold mb-3">Filter by Enabler Type:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={TEST_IDS.ENABLER_DEPLOYMENT.FILTER_ALL_BUTTON}
              >
                All ({displayData.length})
              </button>
              {Object.entries(enablerTypeLabels).map(([type, { label }]) => {
                const count = displayData.filter(i => i.enablerType === type).length
                if (count === 0) return null

                // Map testID based on type
                const testIdMap: Record<string, string> = {
                  'principles-policies-frameworks': TEST_IDS.ENABLER_DEPLOYMENT.FILTER_POLICIES_BUTTON,
                  'services-infrastructure': TEST_IDS.ENABLER_DEPLOYMENT.FILTER_TOOLS_BUTTON,
                  'people-skills-competencies': TEST_IDS.ENABLER_DEPLOYMENT.FILTER_SKILLS_BUTTON,
                  'culture-ethics-behavior': TEST_IDS.ENABLER_DEPLOYMENT.FILTER_CULTURE_BUTTON,
                }

                return (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as ComponentType)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterType === type ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    data-testid={testIdMap[type]}
                  >
                    {label} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Enabler Items */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">
              {filterType === 'all' ? 'All Enablers' : enablerTypeLabels[filterType as ComponentType]?.label}
            </h2>
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items in this category yet.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item, index) => {
                  const typeInfo = enablerTypeLabels[item.enablerType]
                  const Icon = typeInfo?.icon || Wrench
                  return (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200" data-testid={TEST_IDS.ENABLER_DEPLOYMENT.ENABLER_CARD(index)}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          {item.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              <Icon className="w-3 h-3" />
                              {typeInfo?.label}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                          </span>
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Edit"
                            data-testid={TEST_IDS.ENABLER_DEPLOYMENT.EDIT_ENABLER_BUTTON(index)}
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 hover:bg-red-100 rounded"
                            title="Delete"
                            data-testid={TEST_IDS.ENABLER_DEPLOYMENT.DELETE_ENABLER_BUTTON(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 ml-7 space-y-1">
                        {item.version && <div><strong>Version:</strong> {item.version}</div>}
                        {item.approved && <div><strong>Approved:</strong> {item.approved}</div>}
                        {item.scope && <div><strong>Scope:</strong> {item.scope}</div>}
                        {item.deployed && <div><strong>Deployed:</strong> {item.deployed}</div>}
                        {item.modules && <div><strong>Modules:</strong> {item.modules}</div>}
                        {item.users && <div><strong>Users:</strong> {item.users}</div>}
                        {item.investment && <div><strong>Investment:</strong> {item.investment}</div>}
                        {item.participants && <div><strong>Participants:</strong> {item.participants}</div>}
                        {item.certifications && <div><strong>Certifications:</strong> {item.certifications}</div>}
                        {item.activities && <div><strong>Activities:</strong> {item.activities}</div>}
                        {item.goal && <div><strong>Goal:</strong> {item.goal}</div>}
                        {item.metricsValue && <div><strong>Metrics:</strong> {item.metricsValue}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingItem ? 'Edit Enabler' : 'Add New Enabler'}
              </h3>

              <div className="space-y-4">
                {/* Enabler Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enabler Type *
                  </label>
                  <select
                    value={editingItem ? editingItem.enablerType : newItem.enablerType}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, enablerType: e.target.value as ComponentType })
                      : setNewItem({ ...newItem, enablerType: e.target.value as ComponentType })
                    }
                    className="input-field"
                    data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_TYPE_SELECT}
                  >
                    {Object.entries(enablerTypeLabels).map(([value, { label }]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem ? editingItem.name : newItem.name || ''}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, name: e.target.value })
                      : setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g., IT Governance Policy"
                    data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_NAME_INPUT}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    value={editingItem ? editingItem.status : newItem.status}
                    onChange={(e) => editingItem
                      ? setEditingItem({ ...editingItem, status: e.target.value as 'completed' | 'in-progress' | 'planned' })
                      : setNewItem({ ...newItem, status: e.target.value as 'completed' | 'in-progress' | 'planned' })
                    }
                    className="input-field"
                    data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_STATUS_SELECT}
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Conditional fields based on enabler type */}
                {(editingItem?.enablerType === 'principles-policies-frameworks' || newItem.enablerType === 'principles-policies-frameworks') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.version || '' : newItem.version || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, version: e.target.value })
                          : setNewItem({ ...newItem, version: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., v1.0"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_VERSION_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Approved Date</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.approved || '' : newItem.approved || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, approved: e.target.value })
                          : setNewItem({ ...newItem, approved: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., March 2024"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_APPROVED_DATE_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                      <textarea
                        value={editingItem ? editingItem.scope || '' : newItem.scope || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, scope: e.target.value })
                          : setNewItem({ ...newItem, scope: e.target.value })
                        }
                        className="input-field"
                        rows={2}
                        placeholder="Describe the scope and coverage"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_SCOPE_TEXTAREA}
                      />
                    </div>
                  </>
                )}

                {(editingItem?.enablerType === 'services-infrastructure' || newItem.enablerType === 'services-infrastructure') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deployed Date</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.deployed || '' : newItem.deployed || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, deployed: e.target.value })
                          : setNewItem({ ...newItem, deployed: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., Production, February 2024"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_DEPLOYED_DATE_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Modules/Capabilities</label>
                      <textarea
                        value={editingItem ? editingItem.modules || '' : newItem.modules || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, modules: e.target.value })
                          : setNewItem({ ...newItem, modules: e.target.value })
                        }
                        className="input-field"
                        rows={2}
                        placeholder="Key modules or capabilities"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_MODULES_TEXTAREA}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Users</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.users || '' : newItem.users || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, users: e.target.value })
                          : setNewItem({ ...newItem, users: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., All IT staff, 150 licenses"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_USERS_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Investment</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.investment || '' : newItem.investment || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, investment: e.target.value })
                          : setNewItem({ ...newItem, investment: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., $500K"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_INVESTMENT_INPUT}
                      />
                    </div>
                  </>
                )}

                {(editingItem?.enablerType === 'people-skills-competencies' || newItem.enablerType === 'people-skills-competencies') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.participants || '' : newItem.participants || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, participants: e.target.value })
                          : setNewItem({ ...newItem, participants: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., 45 IT leaders"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_PARTICIPANTS_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.certifications || '' : newItem.certifications || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, certifications: e.target.value })
                          : setNewItem({ ...newItem, certifications: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., 12 COBIT certified"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_CERTIFICATIONS_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Investment</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.investment || '' : newItem.investment || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, investment: e.target.value })
                          : setNewItem({ ...newItem, investment: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., $50K"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_INVESTMENT_INPUT}
                      />
                    </div>
                  </>
                )}

                {(editingItem?.enablerType === 'culture-ethics-behavior' || newItem.enablerType === 'culture-ethics-behavior') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Activities</label>
                      <textarea
                        value={editingItem ? editingItem.activities || '' : newItem.activities || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, activities: e.target.value })
                          : setNewItem({ ...newItem, activities: e.target.value })
                        }
                        className="input-field"
                        rows={2}
                        placeholder="Key activities and programs"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_ACTIVITIES_TEXTAREA}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.goal || '' : newItem.goal || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, goal: e.target.value })
                          : setNewItem({ ...newItem, goal: e.target.value })
                        }
                        className="input-field"
                        placeholder="Primary goal or objective"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_GOAL_INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Metrics</label>
                      <input
                        type="text"
                        value={editingItem ? editingItem.metricsValue || '' : newItem.metricsValue || ''}
                        onChange={(e) => editingItem
                          ? setEditingItem({ ...editingItem, metricsValue: e.target.value })
                          : setNewItem({ ...newItem, metricsValue: e.target.value })
                        }
                        className="input-field"
                        placeholder="e.g., Awareness: 78%"
                        data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_METRICS_INPUT}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingItem(null)
                    setNewItem({ enablerType: 'principles-policies-frameworks', name: '', status: 'planned' })
                  }}
                  className="btn-secondary flex-1"
                  data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_CANCEL_BUTTON}
                >
                  Cancel
                </button>
                <button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="btn-primary flex-1"
                  disabled={editingItem ? !editingItem.name : !newItem.name}
                  data-testid={TEST_IDS.ENABLER_DEPLOYMENT.MODAL_SAVE_BUTTON}
                >
                  {editingItem ? 'Update' : 'Add'} Enabler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnablerDeployment
