import { LucideIcon } from 'lucide-react'

// Navigation and UI Types
export interface Step {
  id: string
  title: string
  description: string
  icon: LucideIcon
  phase?: number
  subItems?: Step[]
}

export interface Phase {
  id: number
  name: string
  question: string
  description: string
  steps: string[]
  color: string
}

// Enterprise Context Types
export interface EnterpriseContext {
  organizationName: string
  industry: string
  size: 'small' | 'medium' | 'large' | 'enterprise' | ''
  itRole: string
  challenges: string[]
  enterpriseGoals: EnterpriseGoal[]
  alignmentGoals: AlignmentGoalSelection[]
  stakeholders: Stakeholder[]
  designFactors: DesignFactors
  selectedFocusAreas: string[]
}

export interface EnterpriseGoal {
  id: string
  name: string
  perspective: 'Financial' | 'Customer' | 'Internal' | 'Learning'
  selected: boolean
}

export interface AlignmentGoalSelection {
  id: string
  name: string
  category: 'value' | 'risk' | 'resource'
  importance: 'high' | 'medium' | 'low'
  selected: boolean
}

export interface Stakeholder {
  name: string
  needs: string
  priority: 'high' | 'medium' | 'low'
}

// COBIT 2019 Design Factors (all 11)
export interface DesignFactors {
  // DF1: Enterprise Strategy
  enterpriseStrategy: 'growth' | 'innovation' | 'cost-leadership' | 'client-service' | ''
  enterpriseStrategyDescription: string

  // DF2: Enterprise Goals (handled via enterpriseGoals array)
  enterpriseGoalsAlignment: string

  // DF3: Risk Profile
  riskProfile: 'risk-averse' | 'risk-neutral' | 'risk-seeking' | ''
  riskProfileDescription: string

  // DF4: I&T-Related Issues (NEW)
  itRelatedIssues: ITRelatedIssue[]

  // DF5: Threat Landscape
  threatLandscape: 'low' | 'normal' | 'high' | ''
  threatLandscapeDescription: string

  // DF6: Compliance Requirements
  complianceRequirements: string[]
  complianceLevel: 'low' | 'normal' | 'high' | ''

  // DF7: Role of IT
  itRole: 'support' | 'factory' | 'turnaround' | 'strategic' | ''
  itRoleDescription: string

  // DF8: Sourcing Model (NEW)
  sourcingModel: 'insourced' | 'outsourced' | 'hybrid' | 'cloud' | ''
  sourcingModelDescription: string

  // DF9: IT Implementation Methods (NEW)
  itImplementationMethods: 'waterfall' | 'agile' | 'devops' | 'hybrid' | ''
  itImplementationDescription: string

  // DF10: Technology Adoption Strategy
  technologyAdoption: 'first-mover' | 'follower' | 'slow-adopter' | ''
  technologyAdoptionDescription: string

  // DF11: Enterprise Size (NEW - explicit)
  enterpriseSize: 'small' | 'medium' | 'large' | 'enterprise' | ''
}

// I&T-Related Issues for Design Factor 4
export interface ITRelatedIssue {
  id: string
  category: 'frustration' | 'incident' | 'risk' | 'opportunity'
  description: string
  priority: 'high' | 'medium' | 'low'
  relatedObjectives: string[]
}

// Process Capability Assessment
export interface ProcessCapability {
  objectiveId: string
  domain: 'EDM' | 'APO' | 'BAI' | 'DSS' | 'MEA'
  name: string
  currentLevel: 0 | 1 | 2 | 3 | 4 | 5
  targetLevel: 0 | 1 | 2 | 3 | 4 | 5
  priority: 'high' | 'medium' | 'low'
  gap: number
  rationale?: string
  focusAreaRecommendation?: number
  cascadeImportance?: 'high' | 'medium' | 'low'
}

// Governance and Management Objectives
export interface GovernanceObjective {
  id: string
  name: string
  purpose: string
  practices: Practice[]
  inputsFrom: string[]
  outputsTo: string[]
  color: string
  enabled: boolean
  cascadeImportance?: 'high' | 'medium' | 'low'
}

export interface ManagementObjective {
  id: string
  name: string
  domain: 'APO' | 'BAI' | 'DSS' | 'MEA'
  purpose: string
  practices: Practice[]
  enabled: boolean
  priority: 'high' | 'medium' | 'low'
  cascadeImportance?: 'high' | 'medium' | 'low'
}

export interface Practice {
  id: string
  name: string
  description?: string
  implemented: boolean
}

// COBIT 2019 Governance Components (7 Enablers)
export interface Component {
  type: ComponentType
  name: string
  description: string
  status: 'planned' | 'in-progress' | 'completed'
  relatedObjectives?: string[]
}

export type ComponentType =
  | 'principles-policies-frameworks'  // Enabler 1
  | 'processes'                        // Enabler 2
  | 'organizational-structures'        // Enabler 3
  | 'culture-ethics-behavior'          // Enabler 4
  | 'information'                      // Enabler 5
  | 'services-infrastructure'          // Enabler 6
  | 'people-skills-competencies'       // Enabler 7

// Performance Management with Lag/Lead Indicators
export interface PerformanceMetric {
  id: string
  name: string
  type: 'lag' | 'lead'  // Changed from previous types
  category: 'process-capability' | 'kpi' | 'goal'
  objectiveId: string
  target: number
  current: number
  unit: string
  trend?: 'improving' | 'stable' | 'declining'
  measurementFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly'
}

// Benefits Realization (Phase 6)
export interface Benefit {
  id: string
  name: string
  description: string
  type: 'financial' | 'operational' | 'strategic' | 'compliance'
  status: 'planned' | 'in-progress' | 'realized' | 'not-realized'
  targetValue: number
  actualValue: number
  unit: string
  relatedObjectives: string[]
  evidenceNotes?: string
}

// Improvement Initiative (Phase 7)
export interface ImprovementInitiative {
  id: string
  name: string
  description: string
  type: 'process' | 'capability' | 'governance' | 'technology' | 'innovation' | 'performance'
  priority: 'high' | 'medium' | 'low'
  status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'deferred' | 'on-track' | 'at-risk'
  targetObjectives: string[]
  expectedOutcome: string
  lessons?: string
  sponsor?: string
  team?: string
  timeline?: string
  budget?: string
  progress?: number
  objectives?: string[]
  metrics?: string[]
  cobitRef?: string
}

// Enabler Deployment Item (Phase 5)
export interface EnablerItem {
  id: string
  enablerType: ComponentType
  name: string
  status: 'completed' | 'in-progress' | 'planned'
  version?: string
  approved?: string
  scope?: string
  deployed?: string
  modules?: string
  users?: string
  investment?: string
  participants?: string
  certifications?: string
  activities?: string
  goal?: string
  metricsValue?: string
}

// Implementation Programme (Phase 1 & 4)
export interface ImplementationProgramme {
  name: string
  sponsor: string
  objectives: string[]
  scope: string
  timeline: {
    startDate: string
    targetEndDate: string
    currentPhase: number
  }
  drivers: ProgrammeDriver[]
  risks: ProgrammeRisk[]
  resources: ProgrammeResource[]
}

export interface ProgrammeDriver {
  id: string
  type: 'internal' | 'external'
  description: string
  urgency: 'high' | 'medium' | 'low'
}

export interface ProgrammeRisk {
  id: string
  description: string
  likelihood: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  mitigation: string
}

export interface ProgrammeResource {
  id: string
  type: 'budget' | 'people' | 'technology' | 'external'
  description: string
  allocated: boolean
}

// RACI Chart Types
export type RACIValue = 'R' | 'A' | 'C' | 'I' | ''

export interface RACIRole {
  id: string
  name: string
  description: string
  category: 'governance' | 'management' | 'operational' | 'external'
}

export interface RACIAssignment {
  objectiveId: string
  practiceId: string
  roleId: string
  value: RACIValue
}

export interface RACIChart {
  id: string
  objectiveId: string
  roles: RACIRole[]
  assignments: RACIAssignment[]
  lastUpdated: string
}

// Main Application Data
export interface AppData {
  // Enterprise Context (Phase 1 & 2)
  context: EnterpriseContext | null
  programme: ImplementationProgramme | null

  // Assessment and Design (Phase 2 & 3)
  capabilities: ProcessCapability[]
  governanceObjectives: GovernanceObjective[]
  managementObjectives: ManagementObjective[]

  // Implementation (Phase 4 & 5)
  components: Component[]
  metrics: PerformanceMetric[]
  raciCharts: RACIChart[]
  enablerItems: EnablerItem[]

  // Benefits and Improvement (Phase 6 & 7)
  benefits: Benefit[]
  improvements: ImprovementInitiative[]

  // Metadata
  currentPhase: number
  lastUpdated: string
}

// Default initial context with all design factors
export const defaultDesignFactors: DesignFactors = {
  enterpriseStrategy: '',
  enterpriseStrategyDescription: '',
  enterpriseGoalsAlignment: '',
  riskProfile: '',
  riskProfileDescription: '',
  itRelatedIssues: [],
  threatLandscape: '',
  threatLandscapeDescription: '',
  complianceRequirements: [],
  complianceLevel: '',
  itRole: '',
  itRoleDescription: '',
  sourcingModel: '',
  sourcingModelDescription: '',
  itImplementationMethods: '',
  itImplementationDescription: '',
  technologyAdoption: '',
  technologyAdoptionDescription: '',
  enterpriseSize: ''
}
