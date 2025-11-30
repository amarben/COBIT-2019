import { useState, useEffect, lazy, Suspense } from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { allSteps, phases, phaseColors } from './data/steps'
import { AppData } from './types'
import ExportButton from './components/ExportButton'
import { TEST_IDS } from './constants/testIds'

// Lazy load Dashboard as well
const Dashboard = lazy(() => import('./components/Dashboard'))

// Lazy load phase components for code splitting
// Phase 1 Components
const ProgrammeInitiation = lazy(() => import('./components/ProgrammeInitiation'))

// Phase 2 Components
const GovernanceContext = lazy(() => import('./components/GovernanceContext'))
const CapabilityAssessment = lazy(() => import('./components/CapabilityAssessment'))
const IssuesIdentification = lazy(() => import('./components/IssuesIdentification'))

// Phase 3 Components
const GovernanceDesign = lazy(() => import('./components/GovernanceDesign'))
const GoalsCascade = lazy(() => import('./components/GoalsCascade'))

// Phase 4 Components
const Phase4Planning = lazy(() => import('./components/Phase4Planning'))

// Phase 5 Components
const GovernanceObjectives = lazy(() => import('./components/GovernanceObjectives'))
const ManagementObjectives = lazy(() => import('./components/ManagementObjectives'))
const ComponentDefinition = lazy(() => import('./components/ComponentDefinition'))

// Phase 6 Components
const BenefitsRealization = lazy(() => import('./components/BenefitsRealization'))
const PerformanceMeasurement = lazy(() => import('./components/PerformanceMeasurement'))

// Phase 7 Components
const ReviewEffectiveness = lazy(() => import('./components/ReviewEffectiveness'))

// Legacy components (can be gradually replaced or integrated)
const EnablerDeployment = lazy(() => import('./components/EnablerDeployment'))
const ContinuousMonitoring = lazy(() => import('./components/ContinuousMonitoring'))
const InternalAssessment = lazy(() => import('./components/InternalAssessment'))
const PerformanceAnalysis = lazy(() => import('./components/PerformanceAnalysis'))
const ContinuousImprovement = lazy(() => import('./components/ContinuousImprovement'))

const STORAGE_KEY = 'cobit-2019-app-data'

// Map step IDs to test IDs for sidebar links
const getStepTestId = (stepId: string): string => {
  const mapping: Record<string, string> = {
    'programme-initiation': TEST_IDS.SIDEBAR.PROGRAMME_INITIATION_LINK,
    'drivers': TEST_IDS.SIDEBAR.PROGRAMME_INITIATION_LINK,
    'current-state': TEST_IDS.SIDEBAR.GOVERNANCE_CONTEXT_LINK,
    'capability-assessment': TEST_IDS.SIDEBAR.CAPABILITY_ASSESSMENT_LINK,
    'issues-identification': TEST_IDS.SIDEBAR.ISSUES_IDENTIFICATION_LINK,
    'goals-cascade': TEST_IDS.SIDEBAR.GOALS_CASCADE_LINK,
    'target-state': TEST_IDS.SIDEBAR.GOALS_CASCADE_LINK,
    'design-factors': TEST_IDS.SIDEBAR.DESIGN_FACTORS_LINK,
    'phase4-planning': TEST_IDS.SIDEBAR.PHASE4_PLANNING_LINK,
    'governance-objectives': TEST_IDS.SIDEBAR.GOVERNANCE_OBJECTIVES_LINK,
    'component-definition': TEST_IDS.SIDEBAR.COMPONENT_DEFINITION_LINK,
    'raci-chart': TEST_IDS.SIDEBAR.RACI_CHART_LINK,
    'benefits-realization': TEST_IDS.SIDEBAR.BENEFITS_REALIZATION_LINK,
    'performance-measurement': TEST_IDS.SIDEBAR.PERFORMANCE_MEASUREMENT_LINK,
    'review-effectiveness': TEST_IDS.SIDEBAR.REVIEW_EFFECTIVENESS_LINK,
  }
  return mapping[stepId] || `sidebar-${stepId}-link`
}

function App() {
  const [currentStepId, setCurrentStepId] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2]) // Default expanded phases
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [appData, setAppData] = useState<AppData>({
    context: null,
    programme: null,
    capabilities: [],
    governanceObjectives: [],
    managementObjectives: [],
    components: [],
    metrics: [],
    raciCharts: [],
    enablerItems: [],
    benefits: [],
    improvements: [],
    currentPhase: 1,
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
          programme: savedData.programme || null,
          capabilities: savedData.capabilities || [],
          governanceObjectives: savedData.governanceObjectives || [],
          managementObjectives: savedData.managementObjectives || [],
          components: savedData.components || [],
          metrics: savedData.metrics || [],
          raciCharts: savedData.raciCharts || [],
          enablerItems: savedData.enablerItems || [],
          benefits: savedData.benefits || [],
          improvements: savedData.improvements || [],
          currentPhase: savedData.currentPhase || 1,
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

  const togglePhaseExpanded = (phaseId: number) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId) ? prev.filter(id => id !== phaseId) : [...prev, phaseId]
    )
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
          data-testid={getStepTestId(step.id)}
          onClick={() => {
            if (hasSubItems) {
              toggleExpanded(step.id)
            } else {
              setCurrentStepId(step.id)
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
            isActive
              ? 'bg-teal-100 text-teal-900 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          } ${depth > 0 ? 'pl-10' : 'pl-6'}`}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
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

  const renderPhaseNav = () => {
    return (
      <div className="space-y-1">
        {/* Dashboard - always visible */}
        <button
          data-testid={TEST_IDS.SIDEBAR.DASHBOARD_LINK}
          onClick={() => setCurrentStepId('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
            currentStepId === 'dashboard'
              ? 'bg-teal-100 text-teal-900 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
            H
          </span>
          <span className="flex-1 text-sm font-medium">Dashboard</span>
        </button>

        {/* Phases */}
        {phases.map(phase => {
          const phaseSteps = allSteps.filter(step => step.phase === phase.id)
          const isPhaseExpanded = expandedPhases.includes(phase.id)
          const colors = phaseColors[phase.id]

          return (
            <div key={phase.id}>
              {/* Phase Header */}
              <button
                data-testid={TEST_IDS.SIDEBAR.PHASE_BUTTON(phase.id)}
                onClick={() => togglePhaseExpanded(phase.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100 ${colors.text}`}
              >
                <span className={`w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold`}>
                  {phase.id}
                </span>
                <div className="flex-1">
                  <span className="text-sm font-medium block">{phase.name}</span>
                  <span className="text-xs text-gray-500">{phase.question}</span>
                </div>
                {isPhaseExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {/* Phase Steps */}
              {isPhaseExpanded && (
                <div className={`border-l-2 ml-7 ${colors.border}`}>
                  {phaseSteps.map(step => renderNavItem(step))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderContent = () => {
    const props = { appData, updateAppData }

    switch (currentStepId) {
      // Dashboard
      case 'dashboard':
        return <Dashboard {...props} />

      // Phase 1: What Are the Drivers?
      case 'programme-initiation':
      case 'drivers':
        return <ProgrammeInitiation {...props} />

      // Phase 2: Where Are We Now?
      case 'current-state':
        return <GovernanceContext {...props} />
      case 'capability-assessment':
        return <CapabilityAssessment {...props} />
      case 'issues-identification':
        return <IssuesIdentification {...props} />

      // Phase 3: Where Do We Want to Be?
      case 'target-state':
        return <GoalsCascade {...props} /> // Goals Cascade visualization
      case 'gap-analysis':
        return <CapabilityAssessment {...props} /> // Gap calculated here
      case 'design-factors':
        return <GovernanceDesign {...props} />

      // Phase 4: What Needs to Be Done?
      case 'business-case':
      case 'project-planning':
      case 'quick-wins':
        return <Phase4Planning {...props} />

      // Phase 5: How Do We Get There?
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
        return <EnablerDeployment {...props} />

      // Phase 6: Did We Get There?
      case 'benefits-tracking':
        return <BenefitsRealization {...props} />
      case 'metrics':
        return <PerformanceMeasurement {...props} />
      case 'value-reporting':
        return <ContinuousMonitoring {...props} />

      // Phase 7: How Do We Keep Momentum?
      case 'effectiveness-review':
        return <ReviewEffectiveness {...props} />
      case 'lessons-learned':
        return <InternalAssessment {...props} />
      case 'continuous-improvement':
        return <ContinuousImprovement {...props} />

      // Legacy routes (backward compatibility)
      case 'context':
        return <GovernanceContext {...props} />
      case 'assessment':
        return <CapabilityAssessment {...props} />
      case 'design':
        return <GovernanceDesign {...props} />
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

  // Find current step info
  const currentStep = allSteps.find(s => s.id === currentStepId)
  const currentPhase = currentStep?.phase ? phases.find(p => p.id === currentStep.phase) : null

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
          <p className="text-sm text-gray-600">Implementation Guide</p>
          <p className="text-xs text-teal-600 mt-1">7-Phase Approach</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {renderPhaseNav()}
        </nav>
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          <p>COBIT is a registered trademark of ISACA</p>
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
            {currentPhase && (
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${phaseColors[currentPhase.id]?.bg} ${phaseColors[currentPhase.id]?.text}`}>
                  Phase {currentPhase.id}
                </span>
                <span className="text-xs text-gray-500">{currentPhase.question}</span>
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-900">
              {currentStep?.title || 'Dashboard'}
            </h2>
            <p className="text-sm text-gray-600">
              {currentStep?.description}
            </p>
          </div>
          <ExportButton appData={appData} updateAppData={updateAppData} variant="minimal" />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600 mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }>
            {renderContent()}
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default App
