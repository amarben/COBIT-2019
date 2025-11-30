// COBIT 2019 RACI Chart Data
// Standard roles and templates based on COBIT 2019 Framework

import { RACIRole, RACIValue } from '../types'

// Standard COBIT 2019 Governance and Management Roles
export const standardRoles: RACIRole[] = [
  // Governance Roles
  {
    id: 'board',
    name: 'Board of Directors',
    description: 'Highest governing body responsible for enterprise governance and oversight',
    category: 'governance'
  },
  {
    id: 'exec-committee',
    name: 'Executive Committee',
    description: 'Senior executives responsible for strategic decision-making',
    category: 'governance'
  },
  {
    id: 'ceo',
    name: 'CEO',
    description: 'Chief Executive Officer - overall enterprise leadership',
    category: 'governance'
  },
  {
    id: 'cfo',
    name: 'CFO',
    description: 'Chief Financial Officer - financial governance and reporting',
    category: 'governance'
  },

  // IT Governance Roles
  {
    id: 'cio',
    name: 'CIO',
    description: 'Chief Information Officer - IT strategy and governance',
    category: 'management'
  },
  {
    id: 'cto',
    name: 'CTO',
    description: 'Chief Technology Officer - technology direction and architecture',
    category: 'management'
  },
  {
    id: 'ciso',
    name: 'CISO',
    description: 'Chief Information Security Officer - information security governance',
    category: 'management'
  },
  {
    id: 'cdo',
    name: 'CDO',
    description: 'Chief Data Officer - data governance and management',
    category: 'management'
  },
  {
    id: 'cro',
    name: 'CRO',
    description: 'Chief Risk Officer - enterprise risk management',
    category: 'management'
  },

  // IT Management Roles
  {
    id: 'it-steering',
    name: 'IT Steering Committee',
    description: 'Cross-functional committee for IT investment and priority decisions',
    category: 'management'
  },
  {
    id: 'architecture-board',
    name: 'Architecture Board',
    description: 'Governance body for enterprise and IT architecture decisions',
    category: 'management'
  },
  {
    id: 'it-ops-manager',
    name: 'IT Operations Manager',
    description: 'Manages day-to-day IT operations and service delivery',
    category: 'operational'
  },
  {
    id: 'dev-manager',
    name: 'Development Manager',
    description: 'Manages software development and application teams',
    category: 'operational'
  },
  {
    id: 'infra-manager',
    name: 'Infrastructure Manager',
    description: 'Manages IT infrastructure and platform services',
    category: 'operational'
  },
  {
    id: 'security-manager',
    name: 'Security Manager',
    description: 'Manages security operations and controls',
    category: 'operational'
  },
  {
    id: 'service-desk',
    name: 'Service Desk Manager',
    description: 'Manages IT service desk and user support',
    category: 'operational'
  },
  {
    id: 'project-manager',
    name: 'Project/Program Manager',
    description: 'Manages IT projects and programs',
    category: 'operational'
  },

  // Business Roles
  {
    id: 'business-owner',
    name: 'Business Process Owner',
    description: 'Owns and is accountable for specific business processes',
    category: 'operational'
  },
  {
    id: 'data-owner',
    name: 'Data Owner',
    description: 'Accountable for data quality and governance of specific data domains',
    category: 'operational'
  },

  // External Roles
  {
    id: 'external-auditor',
    name: 'External Auditor',
    description: 'Independent external audit function',
    category: 'external'
  },
  {
    id: 'internal-auditor',
    name: 'Internal Auditor',
    description: 'Internal audit function providing assurance',
    category: 'external'
  },
  {
    id: 'regulator',
    name: 'Regulator',
    description: 'External regulatory bodies',
    category: 'external'
  },
  {
    id: 'vendor',
    name: 'External Vendor/Provider',
    description: 'Third-party service providers and vendors',
    category: 'external'
  }
]

// RACI value descriptions
export const raciDescriptions: Record<RACIValue, { name: string; description: string; color: string }> = {
  'R': {
    name: 'Responsible',
    description: 'The role(s) that perform the activity - "does the work"',
    color: 'bg-blue-500 text-white'
  },
  'A': {
    name: 'Accountable',
    description: 'The role that is ultimately answerable for the activity - "owns the outcome"',
    color: 'bg-red-500 text-white'
  },
  'C': {
    name: 'Consulted',
    description: 'The role(s) whose opinions are sought - "provides input"',
    color: 'bg-yellow-500 text-black'
  },
  'I': {
    name: 'Informed',
    description: 'The role(s) kept up-to-date on progress - "needs to know"',
    color: 'bg-green-500 text-white'
  },
  '': {
    name: 'Not Involved',
    description: 'Role is not involved in this activity',
    color: 'bg-gray-100 text-gray-400'
  }
}

// Standard RACI templates for COBIT 2019 objectives
// Based on COBIT 2019 Framework: Governance and Management Objectives
export interface RACITemplate {
  objectiveId: string
  defaultAssignments: { practiceId: string; roleId: string; value: RACIValue }[]
}

// EDM01 - Ensured Governance Framework Setting and Maintenance
export const edm01Template: RACITemplate = {
  objectiveId: 'EDM01',
  defaultAssignments: [
    // EDM01.01 - Evaluate the governance system
    { practiceId: 'EDM01.01', roleId: 'board', value: 'A' },
    { practiceId: 'EDM01.01', roleId: 'exec-committee', value: 'R' },
    { practiceId: 'EDM01.01', roleId: 'cio', value: 'C' },
    { practiceId: 'EDM01.01', roleId: 'internal-auditor', value: 'C' },
    // EDM01.02 - Direct the governance system
    { practiceId: 'EDM01.02', roleId: 'board', value: 'A' },
    { practiceId: 'EDM01.02', roleId: 'exec-committee', value: 'R' },
    { practiceId: 'EDM01.02', roleId: 'cio', value: 'R' },
    { practiceId: 'EDM01.02', roleId: 'it-steering', value: 'I' },
    // EDM01.03 - Monitor the governance system
    { practiceId: 'EDM01.03', roleId: 'board', value: 'A' },
    { practiceId: 'EDM01.03', roleId: 'internal-auditor', value: 'R' },
    { practiceId: 'EDM01.03', roleId: 'cio', value: 'C' },
    { practiceId: 'EDM01.03', roleId: 'external-auditor', value: 'I' },
  ]
}

// EDM02 - Ensured Benefits Delivery
export const edm02Template: RACITemplate = {
  objectiveId: 'EDM02',
  defaultAssignments: [
    { practiceId: 'EDM02.01', roleId: 'board', value: 'A' },
    { practiceId: 'EDM02.01', roleId: 'exec-committee', value: 'R' },
    { practiceId: 'EDM02.01', roleId: 'cio', value: 'C' },
    { practiceId: 'EDM02.01', roleId: 'cfo', value: 'C' },
    { practiceId: 'EDM02.02', roleId: 'board', value: 'A' },
    { practiceId: 'EDM02.02', roleId: 'cio', value: 'R' },
    { practiceId: 'EDM02.02', roleId: 'business-owner', value: 'R' },
    { practiceId: 'EDM02.03', roleId: 'board', value: 'A' },
    { practiceId: 'EDM02.03', roleId: 'cfo', value: 'R' },
    { practiceId: 'EDM02.03', roleId: 'cio', value: 'C' },
  ]
}

// EDM03 - Ensured Risk Optimization
export const edm03Template: RACITemplate = {
  objectiveId: 'EDM03',
  defaultAssignments: [
    { practiceId: 'EDM03.01', roleId: 'board', value: 'A' },
    { practiceId: 'EDM03.01', roleId: 'cro', value: 'R' },
    { practiceId: 'EDM03.01', roleId: 'ciso', value: 'C' },
    { practiceId: 'EDM03.02', roleId: 'board', value: 'A' },
    { practiceId: 'EDM03.02', roleId: 'exec-committee', value: 'R' },
    { practiceId: 'EDM03.02', roleId: 'cro', value: 'R' },
    { practiceId: 'EDM03.03', roleId: 'board', value: 'A' },
    { practiceId: 'EDM03.03', roleId: 'cro', value: 'R' },
    { practiceId: 'EDM03.03', roleId: 'internal-auditor', value: 'C' },
  ]
}

// APO12 - Managed Risk
export const apo12Template: RACITemplate = {
  objectiveId: 'APO12',
  defaultAssignments: [
    { practiceId: 'APO12.01', roleId: 'cro', value: 'A' },
    { practiceId: 'APO12.01', roleId: 'ciso', value: 'R' },
    { practiceId: 'APO12.01', roleId: 'it-ops-manager', value: 'C' },
    { practiceId: 'APO12.02', roleId: 'cro', value: 'A' },
    { practiceId: 'APO12.02', roleId: 'ciso', value: 'R' },
    { practiceId: 'APO12.02', roleId: 'business-owner', value: 'C' },
    { practiceId: 'APO12.03', roleId: 'cro', value: 'A' },
    { practiceId: 'APO12.03', roleId: 'ciso', value: 'R' },
    { practiceId: 'APO12.03', roleId: 'exec-committee', value: 'I' },
    { practiceId: 'APO12.04', roleId: 'cro', value: 'A' },
    { practiceId: 'APO12.04', roleId: 'ciso', value: 'R' },
    { practiceId: 'APO12.04', roleId: 'it-steering', value: 'I' },
    { practiceId: 'APO12.05', roleId: 'cro', value: 'A' },
    { practiceId: 'APO12.05', roleId: 'ciso', value: 'R' },
    { practiceId: 'APO12.05', roleId: 'project-manager', value: 'C' },
    { practiceId: 'APO12.06', roleId: 'cro', value: 'A' },
    { practiceId: 'APO12.06', roleId: 'ciso', value: 'R' },
    { practiceId: 'APO12.06', roleId: 'security-manager', value: 'R' },
  ]
}

// APO13 - Managed Security
export const apo13Template: RACITemplate = {
  objectiveId: 'APO13',
  defaultAssignments: [
    { practiceId: 'APO13.01', roleId: 'ciso', value: 'A' },
    { practiceId: 'APO13.01', roleId: 'security-manager', value: 'R' },
    { practiceId: 'APO13.01', roleId: 'cio', value: 'C' },
    { practiceId: 'APO13.02', roleId: 'ciso', value: 'A' },
    { practiceId: 'APO13.02', roleId: 'security-manager', value: 'R' },
    { practiceId: 'APO13.02', roleId: 'infra-manager', value: 'C' },
    { practiceId: 'APO13.03', roleId: 'ciso', value: 'A' },
    { practiceId: 'APO13.03', roleId: 'security-manager', value: 'R' },
    { practiceId: 'APO13.03', roleId: 'internal-auditor', value: 'C' },
  ]
}

// DSS05 - Managed Security Services
export const dss05Template: RACITemplate = {
  objectiveId: 'DSS05',
  defaultAssignments: [
    { practiceId: 'DSS05.01', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.01', roleId: 'security-manager', value: 'R' },
    { practiceId: 'DSS05.01', roleId: 'infra-manager', value: 'C' },
    { practiceId: 'DSS05.02', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.02', roleId: 'security-manager', value: 'R' },
    { practiceId: 'DSS05.02', roleId: 'it-ops-manager', value: 'C' },
    { practiceId: 'DSS05.03', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.03', roleId: 'security-manager', value: 'R' },
    { practiceId: 'DSS05.04', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.04', roleId: 'security-manager', value: 'R' },
    { practiceId: 'DSS05.04', roleId: 'business-owner', value: 'C' },
    { practiceId: 'DSS05.05', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.05', roleId: 'infra-manager', value: 'R' },
    { practiceId: 'DSS05.05', roleId: 'security-manager', value: 'C' },
    { practiceId: 'DSS05.06', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.06', roleId: 'security-manager', value: 'R' },
    { practiceId: 'DSS05.06', roleId: 'data-owner', value: 'C' },
    { practiceId: 'DSS05.07', roleId: 'ciso', value: 'A' },
    { practiceId: 'DSS05.07', roleId: 'security-manager', value: 'R' },
    { practiceId: 'DSS05.07', roleId: 'internal-auditor', value: 'I' },
  ]
}

// MEA01 - Managed Performance and Conformance Monitoring
export const mea01Template: RACITemplate = {
  objectiveId: 'MEA01',
  defaultAssignments: [
    { practiceId: 'MEA01.01', roleId: 'cio', value: 'A' },
    { practiceId: 'MEA01.01', roleId: 'it-ops-manager', value: 'R' },
    { practiceId: 'MEA01.01', roleId: 'business-owner', value: 'C' },
    { practiceId: 'MEA01.02', roleId: 'cio', value: 'A' },
    { practiceId: 'MEA01.02', roleId: 'it-ops-manager', value: 'R' },
    { practiceId: 'MEA01.03', roleId: 'cio', value: 'A' },
    { practiceId: 'MEA01.03', roleId: 'it-ops-manager', value: 'R' },
    { practiceId: 'MEA01.03', roleId: 'exec-committee', value: 'I' },
    { practiceId: 'MEA01.04', roleId: 'cio', value: 'A' },
    { practiceId: 'MEA01.04', roleId: 'it-ops-manager', value: 'R' },
    { practiceId: 'MEA01.04', roleId: 'it-steering', value: 'I' },
    { practiceId: 'MEA01.05', roleId: 'cio', value: 'A' },
    { practiceId: 'MEA01.05', roleId: 'it-ops-manager', value: 'R' },
    { practiceId: 'MEA01.05', roleId: 'board', value: 'I' },
  ]
}

// MEA04 - Managed Assurance
export const mea04Template: RACITemplate = {
  objectiveId: 'MEA04',
  defaultAssignments: [
    { practiceId: 'MEA04.01', roleId: 'board', value: 'A' },
    { practiceId: 'MEA04.01', roleId: 'internal-auditor', value: 'R' },
    { practiceId: 'MEA04.01', roleId: 'external-auditor', value: 'R' },
    { practiceId: 'MEA04.01', roleId: 'cio', value: 'C' },
    { practiceId: 'MEA04.01', roleId: 'exec-committee', value: 'I' },
    { practiceId: 'MEA04.02', roleId: 'cio', value: 'A' },
    { practiceId: 'MEA04.02', roleId: 'internal-auditor', value: 'R' },
    { practiceId: 'MEA04.02', roleId: 'it-ops-manager', value: 'C' },
    { practiceId: 'MEA04.02', roleId: 'security-manager', value: 'C' },
    { practiceId: 'MEA04.03', roleId: 'board', value: 'A' },
    { practiceId: 'MEA04.03', roleId: 'internal-auditor', value: 'R' },
    { practiceId: 'MEA04.03', roleId: 'external-auditor', value: 'C' },
    { practiceId: 'MEA04.03', roleId: 'regulator', value: 'I' },
  ]
}

// Collect all templates
export const raciTemplates: RACITemplate[] = [
  edm01Template,
  edm02Template,
  edm03Template,
  apo12Template,
  apo13Template,
  dss05Template,
  mea01Template,
  mea04Template,
]

// Helper function to get template by objective ID
export function getRACITemplate(objectiveId: string): RACITemplate | undefined {
  return raciTemplates.find(t => t.objectiveId === objectiveId)
}

// Helper function to get roles by category
export function getRolesByCategory(category: RACIRole['category']): RACIRole[] {
  return standardRoles.filter(r => r.category === category)
}

// Helper function to create a blank RACI chart for an objective
export function createBlankRACIChart(objectiveId: string, practices: { id: string }[]): {
  roles: RACIRole[]
  assignments: { practiceId: string; roleId: string; value: RACIValue }[]
} {
  const template = getRACITemplate(objectiveId)

  // Use template if available, otherwise create blank
  if (template) {
    return {
      roles: standardRoles,
      assignments: template.defaultAssignments
    }
  }

  // Create blank assignments for all practice-role combinations
  const assignments: { practiceId: string; roleId: string; value: RACIValue }[] = []
  practices.forEach(practice => {
    standardRoles.forEach(role => {
      assignments.push({
        practiceId: practice.id,
        roleId: role.id,
        value: ''
      })
    })
  })

  return {
    roles: standardRoles,
    assignments
  }
}
