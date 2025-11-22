import * as XLSX from 'xlsx'
import { AppData } from '../types'

/**
 * Export Implementation Tracker as Excel
 */
export function exportImplementationTrackerExcel(appData: AppData) {
  const workbook = XLSX.utils.book_new()

  // Sheet 1: Governance Objectives
  const govData = [
    ['Objective ID', 'Name', 'Enabled', 'Practices Total', 'Practices Implemented', 'Implementation %'],
    ...appData.governanceObjectives.map(obj => [
      obj.id,
      obj.name,
      obj.enabled ? 'Yes' : 'No',
      obj.practices.length,
      obj.practices.filter(p => p.implemented).length,
      obj.practices.length > 0
        ? Math.round((obj.practices.filter(p => p.implemented).length / obj.practices.length) * 100)
        : 0
    ])
  ]
  const govSheet = XLSX.utils.aoa_to_sheet(govData)
  XLSX.utils.book_append_sheet(workbook, govSheet, 'Governance Objectives')

  // Sheet 2: Management Objectives
  const mgmtData = [
    ['Objective ID', 'Name', 'Domain', 'Enabled', 'Priority', 'Practices Total', 'Practices Implemented'],
    ...appData.managementObjectives.map(obj => [
      obj.id,
      obj.name,
      obj.domain,
      obj.enabled ? 'Yes' : 'No',
      obj.priority,
      obj.practices.length,
      obj.practices.filter(p => p.implemented).length
    ])
  ]
  const mgmtSheet = XLSX.utils.aoa_to_sheet(mgmtData)
  XLSX.utils.book_append_sheet(workbook, mgmtSheet, 'Management Objectives')

  // Sheet 3: Capability Assessment
  const capData = [
    ['Domain', 'Objective ID', 'Name', 'Current Level', 'Target Level', 'Gap', 'Priority'],
    ...appData.capabilities.map(cap => [
      cap.domain,
      cap.objectiveId,
      cap.name,
      cap.currentLevel,
      cap.targetLevel,
      cap.gap,
      cap.priority
    ])
  ]
  const capSheet = XLSX.utils.aoa_to_sheet(capData)
  XLSX.utils.book_append_sheet(workbook, capSheet, 'Capability Assessment')

  // Sheet 4: Components
  const compData = [
    ['Type', 'Name', 'Description', 'Status'],
    ...appData.components.map(comp => [
      comp.type,
      comp.name,
      comp.description,
      comp.status
    ])
  ]
  const compSheet = XLSX.utils.aoa_to_sheet(compData)
  XLSX.utils.book_append_sheet(workbook, compSheet, 'Components')

  // Sheet 5: Performance Metrics
  const metricsData = [
    ['Metric ID', 'Name', 'Type', 'Objective ID', 'Current', 'Target', 'Unit', 'Progress %'],
    ...appData.metrics.map(m => [
      m.id,
      m.name,
      m.type,
      m.objectiveId,
      m.current,
      m.target,
      m.unit,
      m.target > 0 ? Math.round((m.current / m.target) * 100) : 0
    ])
  ]
  const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData)
  XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Performance Metrics')

  // Sheet 6: Summary
  const summaryData = [
    ['COBIT 2019 Implementation Tracker'],
    [''],
    ['Report Generated', new Date().toLocaleString()],
    [''],
    ['Governance Overview'],
    ['Governance Objectives Enabled', appData.governanceObjectives.filter(o => o.enabled).length + '/5'],
    ['Management Objectives Enabled', appData.managementObjectives.filter(o => o.enabled).length + '/35'],
    [''],
    ['Implementation Status'],
    ['Total Components', appData.components.length],
    ['Completed Components', appData.components.filter(c => c.status === 'completed').length],
    ['In Progress Components', appData.components.filter(c => c.status === 'in-progress').length],
    ['Planned Components', appData.components.filter(c => c.status === 'planned').length],
    [''],
    ['Capability Assessment'],
    ['Processes Assessed', appData.capabilities.length],
    [
      'Average Current Level',
      appData.capabilities.length > 0
        ? (appData.capabilities.reduce((sum, c) => sum + c.currentLevel, 0) / appData.capabilities.length).toFixed(2)
        : '0'
    ],
    [
      'Average Target Level',
      appData.capabilities.length > 0
        ? (appData.capabilities.reduce((sum, c) => sum + c.targetLevel, 0) / appData.capabilities.length).toFixed(2)
        : '0'
    ],
    ['High Priority Gaps', appData.capabilities.filter(c => c.priority === 'high' && c.gap > 0).length],
    [''],
    ['Performance Metrics'],
    ['Total Metrics', appData.metrics.length],
    [
      'Metrics On Track (≥80%)',
      appData.metrics.filter(m => m.target > 0 && m.current / m.target >= 0.8).length
    ],
    [''],
    ['Organization Information'],
    ['Organization', appData.context?.organizationName || 'Not specified'],
    ['Industry', appData.context?.industry || 'Not specified'],
    ['Size', appData.context?.size || 'Not specified'],
    [''],
    ['DISCLAIMER'],
    ['COBIT® 2019 is a registered trademark of ISACA®'],
    ['This tool is not affiliated with or endorsed by ISACA'],
    ['For official COBIT guidance, visit www.isaca.org']
  ]
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
  // Insert summary sheet at the beginning
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary')

  // Reorder sheets to put Summary first
  const sheets = workbook.SheetNames
  workbook.SheetNames = ['Summary', ...sheets.filter(s => s !== 'Summary')]

  // Write file
  XLSX.writeFile(workbook, 'COBIT-Implementation-Tracker.xlsx')
}

/**
 * Export all data as JSON backup
 */
export function exportDataAsJSON(appData: AppData) {
  const dataStr = JSON.stringify(appData, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `COBIT-Data-Backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Import data from JSON backup
 */
export function importDataFromJSON(file: File): Promise<AppData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        resolve(data)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
