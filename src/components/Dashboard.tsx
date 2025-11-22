import React from 'react'
import { Home, Target, Shield, GitBranch, TrendingUp, AlertCircle, ExternalLink } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'
import ExportButton from './ExportButton'
import { phases } from '../data/steps'
import PhaseProgressChart from './charts/PhaseProgressChart'
import CapabilityRadarChart from './charts/CapabilityRadarChart'
import MetricsProgressChart from './charts/MetricsProgressChart'

interface DashboardProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const Dashboard: React.FC<DashboardProps> = ({ appData, updateAppData }) => {
  const stats = {
    contextDefined: appData.context !== null,
    capabilitiesAssessed: (appData.capabilities || []).length > 0,
    governanceObjectivesSelected: (appData.governanceObjectives || []).filter(o => o.enabled).length,
    managementObjectivesSelected: (appData.managementObjectives || []).filter(o => o.enabled).length,
    componentsImplemented: (appData.components || []).filter(c => c.status === 'completed').length,
    totalComponents: (appData.components || []).length,
    metricsTracked: (appData.metrics || []).length
  }

  const getPhaseProgress = (phaseId: number): number => {
    switch (phaseId) {
      case 1:
        return stats.contextDefined ? (stats.capabilitiesAssessed ? 100 : 50) : 0
      case 2:
        return stats.governanceObjectivesSelected > 0 || stats.managementObjectivesSelected > 0 ? 50 : 0
      case 3:
        return stats.totalComponents > 0 ? (stats.componentsImplemented / stats.totalComponents) * 100 : 0
      case 4:
        return stats.metricsTracked > 0 ? 33 : 0
      default:
        return 0
    }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="gradient-teal text-white p-8 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Home className="w-10 h-10" />
            <h1 className="text-4xl font-bold">COBIT 2019 Governance Dashboard</h1>
          </div>
          <ExportButton appData={appData} updateAppData={updateAppData} />
        </div>
        <p className="text-teal-100 text-lg">
          Enterprise IT Governance and Management Implementation Platform
        </p>
        <p className="text-teal-200 text-sm mt-2">
          Last updated: {appData.lastUpdated ? new Date(appData.lastUpdated).toLocaleString() : 'Never'}
        </p>
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

      {/* Implementation Phases */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-teal-600" />
          Implementation Phases
        </h2>
        <div className="space-y-6">
          {phases.map((phase) => {
            const progress = getPhaseProgress(phase.id)
            return (
              <div key={phase.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Phase {phase.id}: {phase.name}
                    </h3>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${phase.color}-600 transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  />
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
