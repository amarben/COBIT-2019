import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { AppData } from '../types'
import { SHORT_DISCLAIMER } from '../constants/disclaimer'

/**
 * Export Governance System Design Document as PDF
 */
export function exportGovernanceDesignPDF(appData: AppData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Title
  doc.setFontSize(20)
  doc.setTextColor(13, 148, 136) // Teal color
  doc.text('COBIT 2019 Governance System Design', pageWidth / 2, yPos, { align: 'center' })
  yPos += 15

  // Disclaimer
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  const disclaimerLines = doc.splitTextToSize(SHORT_DISCLAIMER, pageWidth - 40)
  doc.text(disclaimerLines, 20, yPos)
  yPos += disclaimerLines.length * 3 + 10

  if (!appData.context) {
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('No governance context defined yet.', 20, yPos)
    doc.save('COBIT-Governance-Design.pdf')
    return
  }

  // Enterprise Information
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text('Enterprise Information', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  const enterpriseInfo = [
    ['Organization', appData.context.organizationName || 'Not specified'],
    ['Industry', appData.context.industry || 'Not specified'],
    ['Size', appData.context.size || 'Not specified'],
    ['IT Role', appData.context.itRole || 'Not specified']
  ]

  autoTable(doc, {
    startY: yPos,
    head: [['Field', 'Value']],
    body: enterpriseInfo,
    theme: 'striped',
    headStyles: { fillColor: [13, 148, 136] }
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Enterprise Goals
  doc.setFontSize(16)
  doc.text('Selected Enterprise Goals', 20, yPos)
  yPos += 10

  const selectedGoals = appData.context.enterpriseGoals.filter(g => g.selected)
  const goalsData = selectedGoals.map(g => [g.id, g.name, g.perspective])

  autoTable(doc, {
    startY: yPos,
    head: [['ID', 'Goal', 'BSC Perspective']],
    body: goalsData.length > 0 ? goalsData : [['None', 'No goals selected', '-']],
    theme: 'striped',
    headStyles: { fillColor: [13, 148, 136] }
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage()
    yPos = 20
  }

  // Stakeholders
  doc.setFontSize(16)
  doc.text('Stakeholder Needs', 20, yPos)
  yPos += 10

  const stakeholderData = appData.context.stakeholders.map(s => [s.name, s.needs, s.priority])

  autoTable(doc, {
    startY: yPos,
    head: [['Stakeholder', 'Needs', 'Priority']],
    body: stakeholderData.length > 0 ? stakeholderData : [['None', 'No stakeholders defined', '-']],
    theme: 'striped',
    headStyles: { fillColor: [13, 148, 136] }
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Design Factors (if available)
  if (appData.context.designFactors) {
    if (yPos > 220) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(16)
    doc.text('COBIT Design Factors', 20, yPos)
    yPos += 10

    const designFactors = [
      ['Enterprise Strategy', appData.context.designFactors.enterpriseStrategy || 'Not defined'],
      ['Risk Profile', appData.context.designFactors.riskProfile || 'Not defined'],
      ['IT Role', appData.context.designFactors.itRole || 'Not defined'],
      ['Compliance Requirements', appData.context.designFactors.complianceRequirements.join(', ') || 'None'],
      ['Threat Landscape', appData.context.designFactors.threatLandscape || 'Not defined']
    ]

    autoTable(doc, {
      startY: yPos,
      head: [['Design Factor', 'Description']],
      body: designFactors,
      theme: 'striped',
      headStyles: { fillColor: [13, 148, 136] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 120 }
      }
    })
  }

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `COBIT 2019 Governance System Design - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    )
  }

  doc.save('COBIT-Governance-System-Design.pdf')
}

/**
 * Export Capability Assessment Report as PDF
 */
export function exportCapabilityAssessmentPDF(appData: AppData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Title
  doc.setFontSize(20)
  doc.setTextColor(13, 148, 136)
  doc.text('COBIT 2019 Capability Assessment Report', pageWidth / 2, yPos, { align: 'center' })
  yPos += 15

  // Disclaimer
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  const disclaimerLines = doc.splitTextToSize(SHORT_DISCLAIMER, pageWidth - 40)
  doc.text(disclaimerLines, 20, yPos)
  yPos += disclaimerLines.length * 3 + 10

  if (appData.capabilities.length === 0) {
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('No capability assessments performed yet.', 20, yPos)
    doc.save('COBIT-Capability-Assessment.pdf')
    return
  }

  // Summary Statistics
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text('Assessment Summary', 20, yPos)
  yPos += 10

  const avgCurrent = appData.capabilities.reduce((sum, c) => sum + c.currentLevel, 0) / appData.capabilities.length
  const avgTarget = appData.capabilities.reduce((sum, c) => sum + c.targetLevel, 0) / appData.capabilities.length
  const avgGap = appData.capabilities.reduce((sum, c) => sum + c.gap, 0) / appData.capabilities.length
  const highPriorityGaps = appData.capabilities.filter(c => c.priority === 'high' && c.gap > 0).length

  const summaryData = [
    ['Processes Assessed', appData.capabilities.length.toString()],
    ['Average Current Level', avgCurrent.toFixed(2)],
    ['Average Target Level', avgTarget.toFixed(2)],
    ['Average Gap', avgGap.toFixed(2)],
    ['High Priority Gaps', highPriorityGaps.toString()]
  ]

  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [13, 148, 136] }
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Capability Details
  doc.setFontSize(16)
  doc.text('Process Capability Details', 20, yPos)
  yPos += 10

  const capabilityData = appData.capabilities.map(c => [
    c.domain,
    c.objectiveId,
    c.currentLevel.toString(),
    c.targetLevel.toString(),
    c.gap.toString(),
    c.priority
  ])

  autoTable(doc, {
    startY: yPos,
    head: [['Domain', 'Objective', 'Current', 'Target', 'Gap', 'Priority']],
    body: capabilityData,
    theme: 'striped',
    headStyles: { fillColor: [13, 148, 136] },
    columnStyles: {
      2: { halign: 'center' },
      3: { halign: 'center' },
      4: { halign: 'center' }
    }
  })

  // Domain Analysis
  doc.addPage()
  yPos = 20

  doc.setFontSize(16)
  doc.text('Domain Analysis', 20, yPos)
  yPos += 10

  const domains = ['EDM', 'APO', 'BAI', 'DSS', 'MEA']
  const domainStats = domains.map(domain => {
    const domainCaps = appData.capabilities.filter(c => c.domain === domain)
    if (domainCaps.length === 0) return [domain, '0', '0', '0', '0']

    const avgCur = domainCaps.reduce((sum, c) => sum + c.currentLevel, 0) / domainCaps.length
    const avgTar = domainCaps.reduce((sum, c) => sum + c.targetLevel, 0) / domainCaps.length
    const avgG = domainCaps.reduce((sum, c) => sum + c.gap, 0) / domainCaps.length

    return [
      domain,
      domainCaps.length.toString(),
      avgCur.toFixed(1),
      avgTar.toFixed(1),
      avgG.toFixed(1)
    ]
  })

  autoTable(doc, {
    startY: yPos,
    head: [['Domain', 'Processes', 'Avg Current', 'Avg Target', 'Avg Gap']],
    body: domainStats,
    theme: 'grid',
    headStyles: { fillColor: [13, 148, 136] }
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `COBIT 2019 Capability Assessment - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    )
  }

  doc.save('COBIT-Capability-Assessment-Report.pdf')
}

/**
 * Export Performance Dashboard as PDF
 */
export function exportPerformanceDashboardPDF(appData: AppData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Title
  doc.setFontSize(20)
  doc.setTextColor(13, 148, 136)
  doc.text('COBIT 2019 Performance Dashboard', pageWidth / 2, yPos, { align: 'center' })
  yPos += 15

  // Disclaimer
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  const disclaimerLines = doc.splitTextToSize(SHORT_DISCLAIMER, pageWidth - 40)
  doc.text(disclaimerLines, 20, yPos)
  yPos += disclaimerLines.length * 3 + 10

  // Governance Status
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text('Governance Status', 20, yPos)
  yPos += 10

  const enabledGovernance = appData.governanceObjectives.filter(o => o.enabled).length
  const enabledManagement = appData.managementObjectives.filter(o => o.enabled).length
  const totalComponents = appData.components.length
  const completedComponents = appData.components.filter(c => c.status === 'completed').length

  const statusData = [
    ['Governance Objectives (EDM)', `${enabledGovernance}/5`],
    ['Management Objectives', `${enabledManagement}/35`],
    ['Components Defined', totalComponents.toString()],
    ['Components Completed', completedComponents.toString()],
    ['Performance Metrics', appData.metrics.length.toString()]
  ]

  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Status']],
    body: statusData,
    theme: 'striped',
    headStyles: { fillColor: [13, 148, 136] }
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Performance Metrics
  if (appData.metrics.length > 0) {
    doc.setFontSize(16)
    doc.text('Performance Metrics', 20, yPos)
    yPos += 10

    const metricsData = appData.metrics.map(m => {
      const progress = m.target > 0 ? Math.round((m.current / m.target) * 100) : 0
      return [
        m.name,
        m.objectiveId,
        `${m.current}${m.unit}`,
        `${m.target}${m.unit}`,
        `${progress}%`
      ]
    })

    autoTable(doc, {
      startY: yPos,
      head: [['Metric', 'Objective', 'Current', 'Target', 'Progress']],
      body: metricsData,
      theme: 'striped',
      headStyles: { fillColor: [13, 148, 136] }
    })
  }

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `COBIT 2019 Performance Dashboard - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth - 20,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    )
  }

  doc.save('COBIT-Performance-Dashboard.pdf')
}
