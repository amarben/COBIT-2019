import { LucideIcon } from 'lucide-react'

export interface Step {
  id: string
  title: string
  description: string
  icon: LucideIcon
  subItems?: Step[]
}

export interface EnterpriseContext {
  organizationName: string
  industry: string
  size: string
  itRole: string
  challenges: string[]
  enterpriseGoals: EnterpriseGoal[]
  stakeholders: Stakeholder[]
  designFactors: DesignFactors
}

export interface EnterpriseGoal {
  id: string
  name: string
  perspective: 'Financial' | 'Customer' | 'Internal' | 'Learning'
  selected: boolean
}

export interface Stakeholder {
  name: string
  needs: string
  priority: 'high' | 'medium' | 'low'
}

export interface DesignFactors {
  enterpriseStrategy: string
  enterpriseGoalsAlignment: string
  riskProfile: string
  itRole: string
  complianceRequirements: string[]
  threatLandscape: string
  technologyAdoption: string
}

export interface ProcessCapability {
  objectiveId: string
  domain: 'EDM' | 'APO' | 'BAI' | 'DSS' | 'MEA'
  name: string
  currentLevel: 0 | 1 | 2 | 3 | 4 | 5
  targetLevel: 0 | 1 | 2 | 3 | 4 | 5
  priority: 'high' | 'medium' | 'low'
  gap: number
  rationale?: string
}

export interface GovernanceObjective {
  id: string
  name: string
  purpose: string
  practices: Practice[]
  inputsFrom: string[]
  outputsTo: string[]
  color: string
  enabled: boolean
}

export interface ManagementObjective {
  id: string
  name: string
  domain: 'APO' | 'BAI' | 'DSS' | 'MEA'
  purpose: string
  practices: Practice[]
  enabled: boolean
  priority: 'high' | 'medium' | 'low'
}

export interface Practice {
  id: string
  name: string
  description?: string
  implemented: boolean
}

export interface Component {
  type: 'organizational-structures' | 'processes' | 'information' | 'culture' | 'skills' | 'services'
  name: string
  description: string
  status: 'planned' | 'in-progress' | 'completed'
}

export interface PerformanceMetric {
  id: string
  name: string
  type: 'process-capability' | 'kpi' | 'goal'
  objectiveId: string
  target: number
  current: number
  unit: string
}

export interface AppData {
  context: EnterpriseContext | null
  capabilities: ProcessCapability[]
  governanceObjectives: GovernanceObjective[]
  managementObjectives: ManagementObjective[]
  components: Component[]
  metrics: PerformanceMetric[]
  lastUpdated: string
}
