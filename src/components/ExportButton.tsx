import React, { useState } from 'react'
import { Download, FileText, Table, Save, Upload } from 'lucide-react'
import { AppData } from '../types'
import {
  exportGovernanceDesignPDF,
  exportCapabilityAssessmentPDF,
  exportPerformanceDashboardPDF
} from '../utils/exportPDF'
import {
  exportImplementationTrackerExcel,
  exportDataAsJSON,
  importDataFromJSON
} from '../utils/exportExcel'

interface ExportButtonProps {
  appData: AppData
  updateAppData?: (updates: Partial<AppData>) => void
  variant?: 'full' | 'minimal'
}

const ExportButton: React.FC<ExportButtonProps> = ({ appData, updateAppData, variant = 'full' }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [importing, setImporting] = useState(false)

  const handleExportGovernanceDesign = () => {
    exportGovernanceDesignPDF(appData)
    setShowMenu(false)
  }

  const handleExportCapabilityAssessment = () => {
    exportCapabilityAssessmentPDF(appData)
    setShowMenu(false)
  }

  const handleExportPerformanceDashboard = () => {
    exportPerformanceDashboardPDF(appData)
    setShowMenu(false)
  }

  const handleExportImplementationTracker = () => {
    exportImplementationTrackerExcel(appData)
    setShowMenu(false)
  }

  const handleExportJSON = () => {
    exportDataAsJSON(appData)
    setShowMenu(false)
  }

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !updateAppData) return

    setImporting(true)
    try {
      const data = await importDataFromJSON(file)
      updateAppData(data)
      alert('Data imported successfully!')
      setShowMenu(false)
    } catch (error) {
      alert('Failed to import data: ' + (error as Error).message)
    } finally {
      setImporting(false)
      event.target.value = '' // Reset file input
    }
  }

  if (variant === 'minimal') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Export Options"
        >
          <Download className="w-5 h-5 text-gray-700" />
        </button>
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <ExportMenuItems
                onExportGovernanceDesign={handleExportGovernanceDesign}
                onExportCapabilityAssessment={handleExportCapabilityAssessment}
                onExportPerformanceDashboard={handleExportPerformanceDashboard}
                onExportImplementationTracker={handleExportImplementationTracker}
                onExportJSON={handleExportJSON}
                onImportJSON={handleImportJSON}
                importing={importing}
                hasUpdateData={!!updateAppData}
              />
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="btn-primary flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export / Import
      </button>
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Export & Import Options</h3>
              <p className="text-xs text-gray-600 mt-1">
                Download reports or backup/restore your data
              </p>
            </div>
            <ExportMenuItems
              onExportGovernanceDesign={handleExportGovernanceDesign}
              onExportCapabilityAssessment={handleExportCapabilityAssessment}
              onExportPerformanceDashboard={handleExportPerformanceDashboard}
              onExportImplementationTracker={handleExportImplementationTracker}
              onExportJSON={handleExportJSON}
              onImportJSON={handleImportJSON}
              importing={importing}
              hasUpdateData={!!updateAppData}
            />
          </div>
        </>
      )}
    </div>
  )
}

interface ExportMenuItemsProps {
  onExportGovernanceDesign: () => void
  onExportCapabilityAssessment: () => void
  onExportPerformanceDashboard: () => void
  onExportImplementationTracker: () => void
  onExportJSON: () => void
  onImportJSON: (event: React.ChangeEvent<HTMLInputElement>) => void
  importing: boolean
  hasUpdateData: boolean
}

const ExportMenuItems: React.FC<ExportMenuItemsProps> = ({
  onExportGovernanceDesign,
  onExportCapabilityAssessment,
  onExportPerformanceDashboard,
  onExportImplementationTracker,
  onExportJSON,
  onImportJSON,
  importing,
  hasUpdateData
}) => {
  return (
    <div className="py-2">
      <div className="px-4 py-1">
        <p className="text-xs font-semibold text-gray-500 uppercase">PDF Reports</p>
      </div>
      <button
        onClick={onExportGovernanceDesign}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
      >
        <FileText className="w-4 h-4 text-purple-600" />
        <div>
          <div className="font-medium text-gray-900">Governance System Design</div>
          <div className="text-xs text-gray-600">Context, goals, design factors</div>
        </div>
      </button>
      <button
        onClick={onExportCapabilityAssessment}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
      >
        <FileText className="w-4 h-4 text-blue-600" />
        <div>
          <div className="font-medium text-gray-900">Capability Assessment Report</div>
          <div className="text-xs text-gray-600">Current vs target, gap analysis</div>
        </div>
      </button>
      <button
        onClick={onExportPerformanceDashboard}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
      >
        <FileText className="w-4 h-4 text-green-600" />
        <div>
          <div className="font-medium text-gray-900">Performance Dashboard</div>
          <div className="text-xs text-gray-600">KPIs, metrics, status summary</div>
        </div>
      </button>

      <div className="border-t border-gray-200 my-2" />

      <div className="px-4 py-1">
        <p className="text-xs font-semibold text-gray-500 uppercase">Excel Reports</p>
      </div>
      <button
        onClick={onExportImplementationTracker}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
      >
        <Table className="w-4 h-4 text-teal-600" />
        <div>
          <div className="font-medium text-gray-900">Implementation Tracker</div>
          <div className="text-xs text-gray-600">Complete data spreadsheet</div>
        </div>
      </button>

      <div className="border-t border-gray-200 my-2" />

      <div className="px-4 py-1">
        <p className="text-xs font-semibold text-gray-500 uppercase">Data Backup</p>
      </div>
      <button
        onClick={onExportJSON}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
      >
        <Save className="w-4 h-4 text-gray-600" />
        <div>
          <div className="font-medium text-gray-900">Export Data (JSON)</div>
          <div className="text-xs text-gray-600">Backup all data</div>
        </div>
      </button>

      {hasUpdateData && (
        <label className="w-full px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-sm cursor-pointer">
          <Upload className="w-4 h-4 text-orange-600" />
          <div>
            <div className="font-medium text-gray-900">
              {importing ? 'Importing...' : 'Import Data (JSON)'}
            </div>
            <div className="text-xs text-gray-600">Restore from backup</div>
          </div>
          <input
            type="file"
            accept=".json"
            onChange={onImportJSON}
            className="hidden"
            disabled={importing}
          />
        </label>
      )}
    </div>
  )
}

export default ExportButton
