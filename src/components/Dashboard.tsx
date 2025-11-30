import React, { useMemo } from 'react'
import { Home, Target, Shield, GitBranch, TrendingUp, AlertCircle, ExternalLink, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import ExportButton from './ExportButton'
import { phases, phaseColors } from '../data/steps'
import PhaseProgressChart from './charts/PhaseProgressChart'
import CapabilityRadarChart from './charts/CapabilityRadarChart'
import MetricsProgressChart from './charts/MetricsProgressChart'
import { TEST_IDS } from '../constants/testIds'

interface DashboardProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const Dashboard: React.FC<DashboardProps> = ({ appData, updateAppData }) => {
  // Calculate comprehensive stats
  const stats = useMemo(() => {
    const programme = appData.programme
    const context = appData.context
    const capabilities = appData.capabilities || []
    const governanceObjectives = appData.governanceObjectives || []
    const managementObjectives = appData.managementObjectives || []
    const components = appData.components || []
    const metrics = appData.metrics || []
    const benefits = appData.benefits || []
    const improvements = appData.improvements || []

    return {
      // Phase 1: Programme Initiation
      programmeInitiated: programme !== null,
      driversIdentified: (programme?.drivers?.length || 0) > 0,
      risksIdentified: (programme?.risks?.length || 0) > 0,
      resourcesPlanned: (programme?.resources?.length || 0) > 0,

      // Phase 2: Current State
      contextDefined: context !== null,
      enterpriseGoalsSelected: (context?.enterpriseGoals?.filter(g => g.selected)?.length || 0),
      stakeholdersDefined: (context?.stakeholders?.length || 0) > 0,
      capabilitiesAssessed: capabilities.length > 0,
      capabilitiesWithCurrentLevel: capabilities.filter(c => c.currentLevel > 0).length,
      designFactorsCompleted: context?.designFactors ?
        Object.values(context.designFactors).filter(v => v !== '' && v !== null && (Array.isArray(v) ? v.length > 0 : true)).length : 0,

      // Phase 3: Target State
      capabilitiesWithTargetLevel: capabilities.filter(c => c.targetLevel > 0).length,
      gapsIdentified: capabilities.filter(c => c.gap !== 0).length,
      alignmentGoalsSelected: (context?.alignmentGoals?.filter(g => g.selected)?.length || 0),
      focusAreasSelected: (context?.selectedFocusAreas?.length || 0),

      // Phase 4: Planning
      governanceObjectivesSelected: governanceObjectives.filter(o => o.enabled).length,
      managementObjectivesSelected: managementObjectives.filter(o => o.enabled).length,
      totalObjectivesSelected: governanceObjectives.filter(o => o.enabled).length + managementObjectives.filter(o => o.enabled).length,
      highPriorityCapabilities: capabilities.filter(c => c.priority === 'high').length,

      // Phase 5: Implementation
      componentsPlanned: components.filter(c => c.status === 'planned').length,
      componentsInProgress: components.filter(c => c.status === 'in-progress').length,
      componentsCompleted: components.filter(c => c.status === 'completed').length,
      totalComponents: components.length,
      practicesImplemented: [...governanceObjectives, ...managementObjectives]
        .flatMap(o => o.practices || [])
        .filter(p => p.implemented).length,

      // Phase 6: Benefits Realization
      benefitsPlanned: benefits.filter(b => b.status === 'planned').length,
      benefitsInProgress: benefits.filter(b => b.status === 'in-progress').length,
      benefitsRealized: benefits.filter(b => b.status === 'realized').length,
      totalBenefits: benefits.length,
      metricsTracked: metrics.length,
      metricsOnTarget: metrics.filter(m => m.current >= m.target).length,

      // Phase 7: Continuous Improvement
      improvementsProposed: improvements.filter(i => i.status === 'proposed').length,
      improvementsApproved: improvements.filter(i => i.status === 'approved').length,
      improvementsInProgress: improvements.filter(i => i.status === 'in-progress').length,
      improvementsCompleted: improvements.filter(i => i.status === 'completed').length,
      totalImprovements: improvements.length,
    }
  }, [appData])

  // Calculate progress for each of the 7 phases
  const getPhaseProgress = (phaseId: number): number => {
    switch (phaseId) {
      case 1: // What Are the Drivers?
        // Programme initiation (25%), drivers (25%), risks (25%), resources (25%)
        let p1 = 0
        if (stats.programmeInitiated) p1 += 25
        if (stats.driversIdentified) p1 += 25
        if (stats.risksIdentified) p1 += 25
        if (stats.resourcesPlanned) p1 += 25
        return p1

      case 2: // Where Are We Now?
        // Context (20%), enterprise goals (20%), stakeholders (15%), capabilities assessed (25%), design factors (20%)
        let p2 = 0
        if (stats.contextDefined) p2 += 20
        if (stats.enterpriseGoalsSelected > 0) p2 += Math.min(20, (stats.enterpriseGoalsSelected / 5) * 20)
        if (stats.stakeholdersDefined) p2 += 15
        if (stats.capabilitiesWithCurrentLevel > 0) p2 += Math.min(25, (stats.capabilitiesWithCurrentLevel / 10) * 25)
        if (stats.designFactorsCompleted > 0) p2 += Math.min(20, (stats.designFactorsCompleted / 11) * 20)
        return Math.min(100, p2)

      case 3: // Where Do We Want to Be?
        // Target levels (35%), gaps identified (25%), alignment goals (20%), focus areas (20%)
        let p3 = 0
        if (stats.capabilitiesWithTargetLevel > 0) p3 += Math.min(35, (stats.capabilitiesWithTargetLevel / 10) * 35)
        if (stats.gapsIdentified > 0) p3 += Math.min(25, (stats.gapsIdentified / 10) * 25)
        if (stats.alignmentGoalsSelected > 0) p3 += Math.min(20, (stats.alignmentGoalsSelected / 5) * 20)
        if (stats.focusAreasSelected > 0) p3 += Math.min(20, (stats.focusAreasSelected / 2) * 20)
        return Math.min(100, p3)

      case 4: // What Needs to Be Done?
        // Objectives selected (60%), priorities set (40%)
        let p4 = 0
        if (stats.totalObjectivesSelected > 0) p4 += Math.min(60, (stats.totalObjectivesSelected / 15) * 60)
        if (stats.highPriorityCapabilities > 0) p4 += Math.min(40, (stats.highPriorityCapabilities / 5) * 40)
        return Math.min(100, p4)

      case 5: // How Do We Get There?
        // Components (60%), practices (40%)
        let p5 = 0
        if (stats.totalComponents > 0) {
          const componentProgress = ((stats.componentsInProgress * 0.5) + stats.componentsCompleted) / stats.totalComponents
          p5 += componentProgress * 60
        }
        if (stats.practicesImplemented > 0) p5 += Math.min(40, (stats.practicesImplemented / 20) * 40)
        return Math.min(100, p5)

      case 6: // Did We Get There?
        // Benefits realized (50%), metrics tracked (30%), metrics on target (20%)
        let p6 = 0
        if (stats.totalBenefits > 0) {
          const benefitProgress = ((stats.benefitsInProgress * 0.5) + stats.benefitsRealized) / stats.totalBenefits
          p6 += benefitProgress * 50
        }
        if (stats.metricsTracked > 0) p6 += Math.min(30, (stats.metricsTracked / 10) * 30)
        if (stats.metricsOnTarget > 0 && stats.metricsTracked > 0) {
          p6 += (stats.metricsOnTarget / stats.metricsTracked) * 20
        }
        return Math.min(100, p6)

      case 7: // How Do We Keep Momentum?
        // Improvements identified (30%), approved (20%), in progress (25%), completed (25%)
        let p7 = 0
        if (stats.totalImprovements > 0) {
          p7 += 30 // Base score for having improvements
          if (stats.improvementsApproved > 0) p7 += Math.min(20, (stats.improvementsApproved / stats.totalImprovements) * 20)
          if (stats.improvementsInProgress > 0) p7 += Math.min(25, (stats.improvementsInProgress / stats.totalImprovements) * 25)
          if (stats.improvementsCompleted > 0) p7 += Math.min(25, (stats.improvementsCompleted / stats.totalImprovements) * 25)
        }
        return Math.min(100, p7)

      default:
        return 0
    }
  }

  // Determine current phase based on progress
  const currentPhase = useMemo(() => {
    for (let i = 1; i <= 7; i++) {
      if (getPhaseProgress(i) < 100) return i
    }
    return 7
  }, [stats])

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const total = phases.reduce((sum, phase) => sum + getPhaseProgress(phase.id), 0)
    return Math.round(total / 7)
  }, [stats])

  return (
    <div className="space-y-6 max-w-7xl" data-testid={TEST_IDS.DASHBOARD.CONTAINER}>
      {/* Header with Overall Progress */}
      <div className="gradient-teal text-white p-8 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Home className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold" data-testid={TEST_IDS.DASHBOARD.TITLE}>COBIT 2019 Governance Dashboard</h1>
              <p className="text-teal-100 text-lg">
                Enterprise IT Governance and Management Implementation Platform
              </p>
            </div>
          </div>
          <ExportButton appData={appData} updateAppData={updateAppData} />
        </div>

        {/* Overall Progress Indicator */}
        <div className="mt-6 bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Overall Implementation Progress</span>
            </div>
            <span className="text-2xl font-bold">{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-white transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-teal-100">
            <span>Currently in Phase {currentPhase}: {phases[currentPhase - 1]?.name}</span>
            <span>Last updated: {appData.lastUpdated ? new Date(appData.lastUpdated).toLocaleString() : 'Never'}</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <DisclaimerBanner variant="full" />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-blue-600" />
            <span className={`text-2xl font-bold ${stats.contextDefined ? 'text-green-600' : 'text-gray-400'}`}>
              {stats.contextDefined ? '✓' : '○'}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Enterprise Context</h3>
          <p className="text-sm text-gray-600">
            {stats.contextDefined ? 'Defined' : 'Not defined'}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">
              {stats.governanceObjectivesSelected}/5
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Governance Objectives</h3>
          <p className="text-sm text-gray-600">EDM processes selected</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <GitBranch className="w-8 h-8 text-teal-600" />
            <span className="text-2xl font-bold text-teal-600">
              {stats.managementObjectivesSelected}/35
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Management Objectives</h3>
          <p className="text-sm text-gray-600">APO/BAI/DSS/MEA selected</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {stats.metricsTracked}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Performance Metrics</h3>
          <p className="text-sm text-gray-600">KPIs being tracked</p>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase Progress Visualization */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-600" />
            Implementation Progress
          </h2>
          <PhaseProgressChart
            phases={phases.map(p => ({
              id: p.id,
              name: `Phase ${p.id}`,
              progress: getPhaseProgress(p.id),
              color: p.color
            }))}
          />
        </div>

        {/* Capability Maturity Radar */}
        {stats.capabilitiesAssessed && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Capability Maturity (5 Domains)
            </h2>
            <CapabilityRadarChart capabilities={appData.capabilities || []} />
          </div>
        )}

        {/* Metrics Progress */}
        {stats.metricsTracked > 0 && (
          <div className="card lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Performance Metrics Progress
            </h2>
            <MetricsProgressChart metrics={appData.metrics || []} maxMetrics={8} />
          </div>
        )}
      </div>

      {/* 7-Phase Implementation Timeline */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-teal-600" />
          7-Phase Implementation Journey
        </h2>

        {/* Visual Timeline */}
        <div className="relative mb-8">
          {/* Timeline connector line */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded" />
          <div
            className="absolute top-6 left-6 h-1 bg-teal-500 rounded transition-all duration-500"
            style={{ width: `${Math.max(0, ((currentPhase - 1) / 6) * 100)}%` }}
          />

          {/* Phase circles */}
          <div className="relative flex justify-between">
            {phases.map((phase) => {
              const progress = getPhaseProgress(phase.id)
              const isComplete = progress === 100
              const isCurrent = phase.id === currentPhase
              const isPast = phase.id < currentPhase
              const colors = phaseColors[phase.id]

              return (
                <div key={phase.id} className="flex flex-col items-center" style={{ width: '13%' }}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                      isComplete
                        ? 'bg-teal-500 text-white'
                        : isCurrent
                        ? `${colors.bg} ${colors.text} ring-4 ring-teal-200`
                        : isPast
                        ? 'bg-teal-200 text-teal-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      phase.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${isCurrent ? 'text-teal-700' : 'text-gray-600'}`}>
                      Phase {phase.id}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Phase Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {phases.map((phase) => {
            const progress = getPhaseProgress(phase.id)
            const isComplete = progress === 100
            const isCurrent = phase.id === currentPhase
            const colors = phaseColors[phase.id]

            return (
              <div
                key={phase.id}
                data-testid={TEST_IDS.DASHBOARD.PHASE_CARD(phase.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? `${colors.bg} ${colors.border}`
                    : isComplete
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                    Phase {phase.id}
                  </span>
                  <span className={`text-sm font-bold ${isComplete ? 'text-green-600' : colors.text}`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{phase.name}</h4>
                <p className="text-xs text-gray-500 italic mb-3">{phase.question}</p>

                {/* Mini progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isComplete ? 'bg-green-500' : isCurrent ? 'bg-teal-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Status indicator */}
                <div className="mt-2 flex items-center gap-1">
                  {isComplete ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">Completed</span>
                    </>
                  ) : isCurrent ? (
                    <>
                      <Clock className="w-3 h-3 text-teal-500" />
                      <span className="text-xs text-teal-600">In Progress</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Upcoming</span>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Getting Started */}
      {!stats.contextDefined && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Getting Started</h3>
              <p className="text-sm text-blue-800 mb-4">
                Begin your COBIT 2019 governance implementation by defining your enterprise context.
                This foundational step aligns IT governance objectives with your enterprise goals and
                stakeholder needs.
              </p>
              <button className="btn-primary">
                Start with Governance Context →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resources */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-teal-600" />
          COBIT 2019 Resources
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.isaca.org/resources/cobit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Official COBIT 2019 Framework from ISACA
          </a>
          <a
            href="https://www.isaca.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            ISACA Official Website
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
