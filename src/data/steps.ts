import {
  Home,
  Target,
  BarChart3,
  Layers,
  Shield,
  Settings,
  TrendingUp,
  AlertTriangle,
  Database,
  Users,
  GitBranch,
  Compass,
  Package,
  Headphones,
  Activity,
  Grid,
  CheckCircle,
  BarChart,
  Eye,
  ClipboardCheck,
  LineChart,
  PlayCircle,
  MapPin,
  Route,
  ListChecks,
  Rocket,
  Award,
  Repeat
} from 'lucide-react'
import { Step, Phase } from '../types'

// COBIT 2019 Official Implementation Guide - 7 Phases
export const phases: Phase[] = [
  {
    id: 1,
    name: 'Initiate Programme',
    question: 'What Are the Drivers?',
    description: 'Identify drivers, create desire to change, obtain management commitment',
    steps: ['programme-initiation', 'drivers'],
    color: 'blue'
  },
  {
    id: 2,
    name: 'Define Problems and Opportunities',
    question: 'Where Are We Now?',
    description: 'Assess current state, identify pain points, define scope',
    steps: ['current-state', 'capability-assessment', 'issues-identification'],
    color: 'orange'
  },
  {
    id: 3,
    name: 'Define Road Map',
    question: 'Where Do We Want to Be?',
    description: 'Define target state, perform gap analysis, prioritize improvements',
    steps: ['target-state', 'gap-analysis', 'design-factors'],
    color: 'purple'
  },
  {
    id: 4,
    name: 'Plan Programme',
    question: 'What Needs to Be Done?',
    description: 'Define business cases, create project plans, identify quick wins',
    steps: ['business-case', 'project-planning', 'quick-wins'],
    color: 'teal'
  },
  {
    id: 5,
    name: 'Execute Plan',
    question: 'How Do We Get There?',
    description: 'Implement improvements, operate and use solutions, embed new approaches',
    steps: ['governance-objectives', 'management-objectives', 'components', 'implementation'],
    color: 'green'
  },
  {
    id: 6,
    name: 'Realize Benefits',
    question: 'Did We Get There?',
    description: 'Measure benefits, ensure value delivery, report progress',
    steps: ['benefits-tracking', 'metrics', 'value-reporting'],
    color: 'emerald'
  },
  {
    id: 7,
    name: 'Review Effectiveness',
    question: 'How Do We Keep the Momentum Going?',
    description: 'Review effectiveness, identify lessons, sustain improvements',
    steps: ['effectiveness-review', 'lessons-learned', 'continuous-improvement'],
    color: 'indigo'
  }
]

// All steps organized by COBIT 2019 Implementation Phases
export const allSteps: Step[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Implementation Dashboard',
    description: 'Overview of COBIT 2019 implementation progress',
    icon: Home
  },

  // ==========================================
  // PHASE 1: What Are the Drivers?
  // ==========================================
  {
    id: 'programme-initiation',
    title: 'Programme Initiation',
    description: 'Define implementation programme and obtain sponsorship',
    icon: PlayCircle,
    phase: 1
  },
  {
    id: 'drivers',
    title: 'Identify Drivers',
    description: 'Identify internal and external drivers for governance improvement',
    icon: Target,
    phase: 1
  },

  // ==========================================
  // PHASE 2: Where Are We Now?
  // ==========================================
  {
    id: 'current-state',
    title: 'Current State Assessment',
    description: 'Define enterprise context, goals, and stakeholder needs',
    icon: MapPin,
    phase: 2
  },
  {
    id: 'capability-assessment',
    title: 'Capability Assessment',
    description: 'Assess current governance and management capability levels (0-5)',
    icon: BarChart3,
    phase: 2
  },
  {
    id: 'issues-identification',
    title: 'Issues Identification',
    description: 'Identify I&T-related issues, pain points, and risks',
    icon: AlertTriangle,
    phase: 2
  },

  // ==========================================
  // PHASE 3: Where Do We Want to Be?
  // ==========================================
  {
    id: 'target-state',
    title: 'Target State Definition',
    description: 'Define target capability levels using Goals Cascade',
    icon: Route,
    phase: 3
  },
  {
    id: 'gap-analysis',
    title: 'Gap Analysis',
    description: 'Analyze gaps between current and target states',
    icon: TrendingUp,
    phase: 3
  },
  {
    id: 'design-factors',
    title: 'Design Factors',
    description: 'Apply all 11 COBIT 2019 design factors',
    icon: Layers,
    phase: 3
  },

  // ==========================================
  // PHASE 4: What Needs to Be Done?
  // ==========================================
  {
    id: 'business-case',
    title: 'Business Case',
    description: 'Develop business case for governance improvements',
    icon: ListChecks,
    phase: 4
  },
  {
    id: 'project-planning',
    title: 'Project Planning',
    description: 'Create implementation project plans and timelines',
    icon: Compass,
    phase: 4
  },
  {
    id: 'quick-wins',
    title: 'Quick Wins',
    description: 'Identify and plan quick win initiatives',
    icon: Rocket,
    phase: 4
  },

  // ==========================================
  // PHASE 5: How Do We Get There?
  // ==========================================
  {
    id: 'governance-objectives',
    title: 'Governance Objectives (EDM)',
    description: 'Configure 5 EDM governance objectives',
    icon: Shield,
    phase: 5,
    subItems: [
      {
        id: 'edm01',
        title: 'EDM01: Governance Framework',
        description: 'Ensured Governance Framework Setting and Maintenance',
        icon: Settings
      },
      {
        id: 'edm02',
        title: 'EDM02: Benefits Delivery',
        description: 'Ensured Benefits Delivery',
        icon: TrendingUp
      },
      {
        id: 'edm03',
        title: 'EDM03: Risk Optimization',
        description: 'Ensured Risk Optimization',
        icon: AlertTriangle
      },
      {
        id: 'edm04',
        title: 'EDM04: Resource Optimization',
        description: 'Ensured Resource Optimization',
        icon: Database
      },
      {
        id: 'edm05',
        title: 'EDM05: Stakeholder Engagement',
        description: 'Ensured Stakeholder Engagement',
        icon: Users
      }
    ]
  },
  {
    id: 'management-objectives',
    title: 'Management Objectives',
    description: 'Select and configure 35 management objectives (APO, BAI, DSS, MEA)',
    icon: GitBranch,
    phase: 5,
    subItems: [
      {
        id: 'apo',
        title: 'APO: Align, Plan, Organize',
        description: '14 alignment objectives',
        icon: Compass
      },
      {
        id: 'bai',
        title: 'BAI: Build, Acquire, Implement',
        description: '11 delivery objectives',
        icon: Package
      },
      {
        id: 'dss',
        title: 'DSS: Deliver, Service, Support',
        description: '6 service objectives',
        icon: Headphones
      },
      {
        id: 'mea',
        title: 'MEA: Monitor, Evaluate, Assess',
        description: '4 monitoring objectives',
        icon: Activity
      }
    ]
  },
  {
    id: 'components',
    title: 'Governance Components',
    description: 'Define 7 governance enabler components',
    icon: Grid,
    phase: 5
  },
  {
    id: 'implementation',
    title: 'Enabler Deployment',
    description: 'Deploy governance enablers (policies, tools, skills, culture)',
    icon: CheckCircle,
    phase: 5
  },

  // ==========================================
  // PHASE 6: Did We Get There?
  // ==========================================
  {
    id: 'benefits-tracking',
    title: 'Benefits Tracking',
    description: 'Track and verify realized benefits',
    icon: Award,
    phase: 6
  },
  {
    id: 'metrics',
    title: 'Performance Metrics',
    description: 'Measure performance with lag and lead indicators',
    icon: BarChart,
    phase: 6
  },
  {
    id: 'value-reporting',
    title: 'Continuous Monitoring',
    description: 'Monitor governance performance and compliance',
    icon: Eye,
    phase: 6
  },

  // ==========================================
  // PHASE 7: How Do We Keep the Momentum?
  // ==========================================
  {
    id: 'effectiveness-review',
    title: 'Review Effectiveness',
    description: 'Review governance effectiveness and outcomes',
    icon: ClipboardCheck,
    phase: 7
  },
  {
    id: 'lessons-learned',
    title: 'Internal Assessment',
    description: 'Conduct internal capability assessment',
    icon: LineChart,
    phase: 7
  },
  {
    id: 'continuous-improvement',
    title: 'Continuous Improvement',
    description: 'Strategic improvement initiatives and roadmap',
    icon: Repeat,
    phase: 7
  }
]

// Helper function to get steps by phase
export function getStepsByPhase(phaseId: number): Step[] {
  return allSteps.filter(step => step.phase === phaseId)
}

// Helper function to get phase by step ID
export function getPhaseByStepId(stepId: string): Phase | undefined {
  const step = allSteps.find(s => s.id === stepId)
  if (step?.phase) {
    return phases.find(p => p.id === step.phase)
  }
  return undefined
}

// Helper function to get phase progress
export function getPhaseProgress(phaseId: number, completedSteps: string[]): number {
  const phaseSteps = getStepsByPhase(phaseId)
  if (phaseSteps.length === 0) return 0
  const completed = phaseSteps.filter(step => completedSteps.includes(step.id)).length
  return (completed / phaseSteps.length) * 100
}

// Phase colors for UI
export const phaseColors: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  2: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  3: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  4: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300' },
  5: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  6: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  7: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' }
}
