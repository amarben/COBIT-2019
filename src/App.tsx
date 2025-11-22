import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { allSteps } from './data/steps'
import { AppData } from './types'
import Dashboard from './components/Dashboard'
import ExportButton from './components/ExportButton'
import GovernanceContext from './components/GovernanceContext'
import CapabilityAssessment from './components/CapabilityAssessment'
import GovernanceDesign from './components/GovernanceDesign'
import GovernanceObjectives from './components/GovernanceObjectives'
import ManagementObjectives from './components/ManagementObjectives'
import ComponentDefinition from './components/ComponentDefinition'
import PriorityImplementation from './components/PriorityImplementation'
import PerformanceMeasurement from './components/PerformanceMeasurement'
import EnablerDeployment from './components/EnablerDeployment'
import ContinuousMonitoring from './components/ContinuousMonitoring'
import InternalAssessment from './components/InternalAssessment'
import PerformanceAnalysis from './components/PerformanceAnalysis'
import ContinuousImprovement from './components/ContinuousImprovement'

const STORAGE_KEY = 'cobit-2019-app-data'

function App() {
  const [currentStepId, setCurrentStepId] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [appData, setAppData] = useState<AppData>({
    context: null,
    capabilities: [],
    governanceObjectives: [],
    managementObjectives: [],
    components: [],
    metrics: [],
    lastUpdated: new Date().toISOString()
  })

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const savedData = JSON.parse(saved)
        // Merge with defaults to ensure all required properties exist
        setAppData({
          context: savedData.context || null,
          capabilities: savedData.capabilities || [],
          governanceObjectives: savedData.governanceObjectives || [],
          managementObjectives: savedData.managementObjectives || [],
          components: savedData.components || [],
          metrics: savedData.metrics || [],
          lastUpdated: savedData.lastUpdated || new Date().toISOString()
        })
      } catch (e) {
        console.error('Failed to load saved data:', e)
      }
    }
  }, [])

  // Save data to localStorage
  const updateAppData = (updates: Partial<AppData>) => {
    const newData = {
      ...appData,
      ...updates,
      lastUpdated: new Date().toISOString()
    }
    setAppData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const renderNavItem = (step: typeof allSteps[0], depth = 0) => {
    const hasSubItems = step.subItems && step.subItems.length > 0
    const isExpanded = expandedItems.includes(step.id)
    const isActive = currentStepId === step.id
    const Icon = step.icon

    return (
      <div key={step.id}>
        <button
          onClick={() => {
            if (hasSubItems) {
              toggleExpanded(step.id)
            } else {
              setCurrentStepId(step.id)
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
            isActive
              ? 'bg-teal-100 text-teal-900 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          } ${depth > 0 ? 'pl-8' : ''}`}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-sm">{step.title}</span>
          {hasSubItems && (
            isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {hasSubItems && isExpanded && (
          <div className="bg-gray-50">
            {step.subItems!.map(subItem => renderNavItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderContent = () => {
    const props = { appData, updateAppData }

    switch (currentStepId) {
      case 'dashboard':
        return <Dashboard {...props} />
      case 'context':
        return <GovernanceContext {...props} />
      case 'assessment':
        return <CapabilityAssessment {...props} />
      case 'design':
        return <GovernanceDesign {...props} />
      case 'governance-objectives':
      case 'edm01':
      case 'edm02':
      case 'edm03':
      case 'edm04':
      case 'edm05':
        return <GovernanceObjectives {...props} selectedObjectiveId={currentStepId} />
      case 'management-objectives':
      case 'apo':
      case 'bai':
      case 'dss':
      case 'mea':
        return <ManagementObjectives {...props} selectedDomain={currentStepId} />
      case 'components':
        return <ComponentDefinition {...props} />
      case 'implementation':
        return <PriorityImplementation {...props} />
      case 'metrics':
        return <PerformanceMeasurement {...props} />
      case 'enablers':
        return <EnablerDeployment {...props} />
      case 'monitoring':
        return <ContinuousMonitoring {...props} />
      case 'internal-assessment':
        return <InternalAssessment {...props} />
      case 'analysis':
        return <PerformanceAnalysis {...props} />
      case 'improvement':
        return <ContinuousImprovement {...props} />
      default:
        return <Dashboard {...props} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-teal-800">COBIT 2019</h1>
          <p className="text-sm text-gray-600">Governance Implementation Platform</p>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {allSteps.map(step => renderNavItem(step))}
        </nav>
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          <p>COBIT® is a registered trademark of ISACA®</p>
          <p className="mt-1">Not affiliated with or endorsed by ISACA</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {allSteps.find(s => s.id === currentStepId)?.title || 'Dashboard'}
            </h2>
            <p className="text-sm text-gray-600">
              {allSteps.find(s => s.id === currentStepId)?.description}
            </p>
          </div>
          <ExportButton appData={appData} updateAppData={updateAppData} variant="minimal" />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
