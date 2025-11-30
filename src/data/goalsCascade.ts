// COBIT 2019 Goals Cascade
// Enterprise Goals -> Alignment Goals -> Governance/Management Objectives
// P = Primary relationship, S = Secondary relationship

export interface AlignmentGoal {
  id: string
  name: string
  category: 'value' | 'risk' | 'resource'
}

export interface GoalMapping {
  enterpriseGoalId: string
  alignmentGoalId: string
  relationship: 'P' | 'S' // Primary or Secondary
}

export interface ObjectiveMapping {
  alignmentGoalId: string
  objectiveId: string
  relationship: 'P' | 'S'
}

// 13 Alignment Goals (AG) from COBIT 2019
export const alignmentGoals: AlignmentGoal[] = [
  // Value/Benefits Realization
  { id: 'AG01', name: 'I&T compliance and support for business compliance with external laws and regulations', category: 'value' },
  { id: 'AG02', name: 'Managed I&T-related risk', category: 'risk' },
  { id: 'AG03', name: 'Realized benefits from I&T-enabled investments and services portfolio', category: 'value' },
  { id: 'AG04', name: 'Quality of technology-related financial information', category: 'value' },
  { id: 'AG05', name: 'Delivery of I&T services in line with business requirements', category: 'value' },
  { id: 'AG06', name: 'Agility to turn business requirements into operational solutions', category: 'value' },
  { id: 'AG07', name: 'Security of information, processing infrastructure and applications, and privacy', category: 'risk' },
  { id: 'AG08', name: 'Enabling and supporting business processes by integrating applications and technology', category: 'value' },
  { id: 'AG09', name: 'Delivery of programs on time, on budget and meeting requirements and quality standards', category: 'value' },
  { id: 'AG10', name: 'Quality of I&T management information', category: 'value' },
  { id: 'AG11', name: 'I&T compliance with internal policies', category: 'risk' },
  { id: 'AG12', name: 'Competent and motivated staff with mutual understanding of technology and business', category: 'resource' },
  { id: 'AG13', name: 'Knowledge, expertise and initiatives for business innovation', category: 'resource' },
]

// Enterprise Goals to Alignment Goals mapping (COBIT 2019 Goals Cascade)
export const enterpriseToAlignmentMapping: GoalMapping[] = [
  // EG01: Stakeholder value of business investments
  { enterpriseGoalId: 'EG01', alignmentGoalId: 'AG03', relationship: 'P' },
  { enterpriseGoalId: 'EG01', alignmentGoalId: 'AG05', relationship: 'S' },
  { enterpriseGoalId: 'EG01', alignmentGoalId: 'AG09', relationship: 'S' },

  // EG02: Portfolio of competitive products and services
  { enterpriseGoalId: 'EG02', alignmentGoalId: 'AG06', relationship: 'P' },
  { enterpriseGoalId: 'EG02', alignmentGoalId: 'AG08', relationship: 'P' },
  { enterpriseGoalId: 'EG02', alignmentGoalId: 'AG13', relationship: 'P' },

  // EG03: Managed business risk
  { enterpriseGoalId: 'EG03', alignmentGoalId: 'AG02', relationship: 'P' },
  { enterpriseGoalId: 'EG03', alignmentGoalId: 'AG07', relationship: 'P' },
  { enterpriseGoalId: 'EG03', alignmentGoalId: 'AG11', relationship: 'S' },

  // EG04: Compliance with external laws and regulations
  { enterpriseGoalId: 'EG04', alignmentGoalId: 'AG01', relationship: 'P' },
  { enterpriseGoalId: 'EG04', alignmentGoalId: 'AG02', relationship: 'S' },
  { enterpriseGoalId: 'EG04', alignmentGoalId: 'AG07', relationship: 'S' },

  // EG05: Customer-oriented service culture
  { enterpriseGoalId: 'EG05', alignmentGoalId: 'AG05', relationship: 'P' },
  { enterpriseGoalId: 'EG05', alignmentGoalId: 'AG06', relationship: 'S' },
  { enterpriseGoalId: 'EG05', alignmentGoalId: 'AG12', relationship: 'S' },

  // EG06: Business service continuity and availability
  { enterpriseGoalId: 'EG06', alignmentGoalId: 'AG05', relationship: 'P' },
  { enterpriseGoalId: 'EG06', alignmentGoalId: 'AG02', relationship: 'P' },
  { enterpriseGoalId: 'EG06', alignmentGoalId: 'AG07', relationship: 'S' },

  // EG07: Agility to respond to changing business environment
  { enterpriseGoalId: 'EG07', alignmentGoalId: 'AG06', relationship: 'P' },
  { enterpriseGoalId: 'EG07', alignmentGoalId: 'AG08', relationship: 'P' },
  { enterpriseGoalId: 'EG07', alignmentGoalId: 'AG13', relationship: 'S' },

  // EG08: Quality of management information
  { enterpriseGoalId: 'EG08', alignmentGoalId: 'AG04', relationship: 'P' },
  { enterpriseGoalId: 'EG08', alignmentGoalId: 'AG10', relationship: 'P' },

  // EG09: Optimization of internal business process functionality
  { enterpriseGoalId: 'EG09', alignmentGoalId: 'AG08', relationship: 'P' },
  { enterpriseGoalId: 'EG09', alignmentGoalId: 'AG05', relationship: 'S' },
  { enterpriseGoalId: 'EG09', alignmentGoalId: 'AG06', relationship: 'S' },

  // EG10: Optimization of business process costs
  { enterpriseGoalId: 'EG10', alignmentGoalId: 'AG03', relationship: 'P' },
  { enterpriseGoalId: 'EG10', alignmentGoalId: 'AG09', relationship: 'S' },

  // EG11: Skilled and motivated people
  { enterpriseGoalId: 'EG11', alignmentGoalId: 'AG12', relationship: 'P' },
  { enterpriseGoalId: 'EG11', alignmentGoalId: 'AG13', relationship: 'S' },

  // EG12: Product and business innovation culture
  { enterpriseGoalId: 'EG12', alignmentGoalId: 'AG13', relationship: 'P' },
  { enterpriseGoalId: 'EG12', alignmentGoalId: 'AG06', relationship: 'S' },
  { enterpriseGoalId: 'EG12', alignmentGoalId: 'AG12', relationship: 'S' },

  // EG13: Management of business change programs
  { enterpriseGoalId: 'EG13', alignmentGoalId: 'AG09', relationship: 'P' },
  { enterpriseGoalId: 'EG13', alignmentGoalId: 'AG06', relationship: 'S' },
  { enterpriseGoalId: 'EG13', alignmentGoalId: 'AG12', relationship: 'S' },
]

// Alignment Goals to Governance/Management Objectives mapping (COBIT 2019)
export const alignmentToObjectiveMapping: ObjectiveMapping[] = [
  // AG01: I&T compliance and support for business compliance
  { alignmentGoalId: 'AG01', objectiveId: 'EDM01', relationship: 'S' },
  { alignmentGoalId: 'AG01', objectiveId: 'EDM03', relationship: 'S' },
  { alignmentGoalId: 'AG01', objectiveId: 'APO01', relationship: 'P' },
  { alignmentGoalId: 'AG01', objectiveId: 'APO12', relationship: 'S' },
  { alignmentGoalId: 'AG01', objectiveId: 'MEA03', relationship: 'P' },
  { alignmentGoalId: 'AG01', objectiveId: 'MEA04', relationship: 'S' },

  // AG02: Managed I&T-related risk
  { alignmentGoalId: 'AG02', objectiveId: 'EDM03', relationship: 'P' },
  { alignmentGoalId: 'AG02', objectiveId: 'APO12', relationship: 'P' },
  { alignmentGoalId: 'AG02', objectiveId: 'APO13', relationship: 'P' },
  { alignmentGoalId: 'AG02', objectiveId: 'BAI06', relationship: 'S' },
  { alignmentGoalId: 'AG02', objectiveId: 'DSS04', relationship: 'P' },
  { alignmentGoalId: 'AG02', objectiveId: 'DSS05', relationship: 'P' },
  { alignmentGoalId: 'AG02', objectiveId: 'MEA02', relationship: 'S' },

  // AG03: Realized benefits from I&T-enabled investments
  { alignmentGoalId: 'AG03', objectiveId: 'EDM02', relationship: 'P' },
  { alignmentGoalId: 'AG03', objectiveId: 'APO05', relationship: 'P' },
  { alignmentGoalId: 'AG03', objectiveId: 'APO06', relationship: 'P' },
  { alignmentGoalId: 'AG03', objectiveId: 'BAI01', relationship: 'P' },
  { alignmentGoalId: 'AG03', objectiveId: 'BAI11', relationship: 'S' },

  // AG04: Quality of technology-related financial information
  { alignmentGoalId: 'AG04', objectiveId: 'APO06', relationship: 'P' },
  { alignmentGoalId: 'AG04', objectiveId: 'APO14', relationship: 'P' },
  { alignmentGoalId: 'AG04', objectiveId: 'MEA01', relationship: 'S' },

  // AG05: Delivery of I&T services in line with business requirements
  { alignmentGoalId: 'AG05', objectiveId: 'APO02', relationship: 'P' },
  { alignmentGoalId: 'AG05', objectiveId: 'APO08', relationship: 'P' },
  { alignmentGoalId: 'AG05', objectiveId: 'APO09', relationship: 'P' },
  { alignmentGoalId: 'AG05', objectiveId: 'APO11', relationship: 'S' },
  { alignmentGoalId: 'AG05', objectiveId: 'DSS01', relationship: 'P' },
  { alignmentGoalId: 'AG05', objectiveId: 'DSS02', relationship: 'P' },
  { alignmentGoalId: 'AG05', objectiveId: 'DSS03', relationship: 'S' },

  // AG06: Agility to turn business requirements into operational solutions
  { alignmentGoalId: 'AG06', objectiveId: 'APO03', relationship: 'P' },
  { alignmentGoalId: 'AG06', objectiveId: 'APO04', relationship: 'P' },
  { alignmentGoalId: 'AG06', objectiveId: 'BAI02', relationship: 'P' },
  { alignmentGoalId: 'AG06', objectiveId: 'BAI03', relationship: 'P' },
  { alignmentGoalId: 'AG06', objectiveId: 'BAI05', relationship: 'S' },
  { alignmentGoalId: 'AG06', objectiveId: 'BAI07', relationship: 'S' },

  // AG07: Security of information, processing infrastructure and applications
  { alignmentGoalId: 'AG07', objectiveId: 'APO13', relationship: 'P' },
  { alignmentGoalId: 'AG07', objectiveId: 'APO14', relationship: 'S' },
  { alignmentGoalId: 'AG07', objectiveId: 'DSS05', relationship: 'P' },
  { alignmentGoalId: 'AG07', objectiveId: 'DSS06', relationship: 'S' },

  // AG08: Enabling and supporting business processes
  { alignmentGoalId: 'AG08', objectiveId: 'APO03', relationship: 'P' },
  { alignmentGoalId: 'AG08', objectiveId: 'BAI03', relationship: 'P' },
  { alignmentGoalId: 'AG08', objectiveId: 'BAI07', relationship: 'P' },
  { alignmentGoalId: 'AG08', objectiveId: 'DSS01', relationship: 'S' },

  // AG09: Delivery of programs on time, on budget
  { alignmentGoalId: 'AG09', objectiveId: 'APO05', relationship: 'S' },
  { alignmentGoalId: 'AG09', objectiveId: 'BAI01', relationship: 'P' },
  { alignmentGoalId: 'AG09', objectiveId: 'BAI11', relationship: 'P' },
  { alignmentGoalId: 'AG09', objectiveId: 'MEA01', relationship: 'S' },

  // AG10: Quality of I&T management information
  { alignmentGoalId: 'AG10', objectiveId: 'APO14', relationship: 'P' },
  { alignmentGoalId: 'AG10', objectiveId: 'BAI08', relationship: 'P' },
  { alignmentGoalId: 'AG10', objectiveId: 'MEA01', relationship: 'P' },

  // AG11: I&T compliance with internal policies
  { alignmentGoalId: 'AG11', objectiveId: 'EDM01', relationship: 'P' },
  { alignmentGoalId: 'AG11', objectiveId: 'APO01', relationship: 'P' },
  { alignmentGoalId: 'AG11', objectiveId: 'MEA01', relationship: 'S' },
  { alignmentGoalId: 'AG11', objectiveId: 'MEA02', relationship: 'P' },

  // AG12: Competent and motivated staff
  { alignmentGoalId: 'AG12', objectiveId: 'APO07', relationship: 'P' },
  { alignmentGoalId: 'AG12', objectiveId: 'BAI05', relationship: 'S' },
  { alignmentGoalId: 'AG12', objectiveId: 'BAI08', relationship: 'S' },

  // AG13: Knowledge, expertise and initiatives for business innovation
  { alignmentGoalId: 'AG13', objectiveId: 'APO04', relationship: 'P' },
  { alignmentGoalId: 'AG13', objectiveId: 'APO07', relationship: 'S' },
  { alignmentGoalId: 'AG13', objectiveId: 'BAI08', relationship: 'P' },
]

// Helper function to get alignment goals for selected enterprise goals
export function getAlignmentGoalsForEnterpriseGoals(selectedEnterpriseGoalIds: string[]): {
  goal: AlignmentGoal
  importance: 'high' | 'medium' | 'low'
  primaryCount: number
  secondaryCount: number
}[] {
  const alignmentGoalScores: Record<string, { primary: number; secondary: number }> = {}

  // Calculate scores based on mappings
  selectedEnterpriseGoalIds.forEach(egId => {
    const mappings = enterpriseToAlignmentMapping.filter(m => m.enterpriseGoalId === egId)
    mappings.forEach(mapping => {
      if (!alignmentGoalScores[mapping.alignmentGoalId]) {
        alignmentGoalScores[mapping.alignmentGoalId] = { primary: 0, secondary: 0 }
      }
      if (mapping.relationship === 'P') {
        alignmentGoalScores[mapping.alignmentGoalId].primary++
      } else {
        alignmentGoalScores[mapping.alignmentGoalId].secondary++
      }
    })
  })

  // Convert to array with importance rating
  return Object.entries(alignmentGoalScores)
    .map(([agId, scores]) => {
      const goal = alignmentGoals.find(g => g.id === agId)!
      const totalScore = scores.primary * 2 + scores.secondary
      let importance: 'high' | 'medium' | 'low' = 'low'
      if (totalScore >= 4 || scores.primary >= 2) importance = 'high'
      else if (totalScore >= 2) importance = 'medium'

      return {
        goal,
        importance,
        primaryCount: scores.primary,
        secondaryCount: scores.secondary
      }
    })
    .sort((a, b) => {
      const scoreA = a.primaryCount * 2 + a.secondaryCount
      const scoreB = b.primaryCount * 2 + b.secondaryCount
      return scoreB - scoreA
    })
}

// Helper function to get recommended objectives based on alignment goals
export function getRecommendedObjectives(alignmentGoalIds: string[]): {
  objectiveId: string
  importance: 'high' | 'medium' | 'low'
  primaryCount: number
  secondaryCount: number
}[] {
  const objectiveScores: Record<string, { primary: number; secondary: number }> = {}

  alignmentGoalIds.forEach(agId => {
    const mappings = alignmentToObjectiveMapping.filter(m => m.alignmentGoalId === agId)
    mappings.forEach(mapping => {
      if (!objectiveScores[mapping.objectiveId]) {
        objectiveScores[mapping.objectiveId] = { primary: 0, secondary: 0 }
      }
      if (mapping.relationship === 'P') {
        objectiveScores[mapping.objectiveId].primary++
      } else {
        objectiveScores[mapping.objectiveId].secondary++
      }
    })
  })

  return Object.entries(objectiveScores)
    .map(([objId, scores]) => {
      const totalScore = scores.primary * 2 + scores.secondary
      let importance: 'high' | 'medium' | 'low' = 'low'
      if (totalScore >= 4 || scores.primary >= 2) importance = 'high'
      else if (totalScore >= 2) importance = 'medium'

      return {
        objectiveId: objId,
        importance,
        primaryCount: scores.primary,
        secondaryCount: scores.secondary
      }
    })
    .sort((a, b) => {
      const scoreA = a.primaryCount * 2 + a.secondaryCount
      const scoreB = b.primaryCount * 2 + b.secondaryCount
      return scoreB - scoreA
    })
}

// Full cascade: Enterprise Goals -> Recommended Objectives
export function getFullCascade(selectedEnterpriseGoalIds: string[]) {
  const alignmentResults = getAlignmentGoalsForEnterpriseGoals(selectedEnterpriseGoalIds)
  const relevantAlignmentGoalIds = alignmentResults.map(r => r.goal.id)
  const objectiveResults = getRecommendedObjectives(relevantAlignmentGoalIds)

  return {
    alignmentGoals: alignmentResults,
    recommendedObjectives: objectiveResults
  }
}
