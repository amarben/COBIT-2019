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
  Wrench,
  Eye,
  ClipboardCheck,
  LineChart,
  RefreshCcw
} from 'lucide-react'
import { Step } from '../types'

export const allSteps: Step[] = [
  {
    id: 'dashboard',
    title: 'Governance Dashboard',
    description: 'Overview of IT governance implementation',
    icon: Home
  },

  // Phase 1: Foundation & Assessment
  {
    id: 'context',
    title: 'Step 1: Governance Context',
    description: 'Define enterprise goals and stakeholder needs',
    icon: Target
  },
  {
    id: 'assessment',
    title: 'Step 2: Capability Assessment',
    description: 'Assess current governance maturity',
    icon: BarChart3
  },
  {
    id: 'design',
    title: 'Step 3: Governance Design',
    description: 'Design tailored governance framework',
    icon: Layers
  },

  // Phase 2: Process & Practice Definition
  {
    id: 'governance-objectives',
    title: 'Step 4: Governance Objectives',
    description: 'Configure EDM governance objectives',
    icon: Shield,
    subItems: [
      {
        id: 'edm01',
        title: 'EDM01: Governance Framework',
        description: 'Evaluate, Direct, Monitor governance',
        icon: Settings
      },
      {
        id: 'edm02',
        title: 'EDM02: Benefits Delivery',
        description: 'Ensure value optimization',
        icon: TrendingUp
      },
      {
        id: 'edm03',
        title: 'EDM03: Risk Optimization',
        description: 'Manage risk appropriately',
        icon: AlertTriangle
      },
      {
        id: 'edm04',
        title: 'EDM04: Resource Optimization',
        description: 'Optimize IT resources',
        icon: Database
      },
      {
        id: 'edm05',
        title: 'EDM05: Stakeholder Engagement',
        description: 'Engage stakeholders effectively',
        icon: Users
      }
    ]
  },

  {
    id: 'management-objectives',
    title: 'Step 5: Management Objectives',
    description: 'Select from 35 management objectives',
    icon: GitBranch,
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
    title: 'Step 6: Component Definition',
    description: 'Define governance components',
    icon: Grid
  },

  // Phase 3: Implementation & Operationalization
  {
    id: 'implementation',
    title: 'Step 7: Priority Implementation',
    description: 'Implement selected objectives',
    icon: CheckCircle
  },
  {
    id: 'metrics',
    title: 'Step 8: Performance Measurement',
    description: 'Establish KPIs and metrics',
    icon: BarChart
  },
  {
    id: 'enablers',
    title: 'Step 9: Enabler Deployment',
    description: 'Deploy supporting enablers',
    icon: Wrench
  },

  // Phase 4: Monitoring & Improvement
  {
    id: 'monitoring',
    title: 'Step 10: Continuous Monitoring',
    description: 'Monitor governance effectiveness',
    icon: Eye
  },
  {
    id: 'internal-assessment',
    title: 'Step 11: Internal Assessment',
    description: 'Conduct capability assessments',
    icon: ClipboardCheck
  },
  {
    id: 'analysis',
    title: 'Step 12: Performance Analysis',
    description: 'Analyze governance performance',
    icon: LineChart
  },
  {
    id: 'improvement',
    title: 'Step 13: Continuous Improvement',
    description: 'Optimize governance framework',
    icon: RefreshCcw
  }
]

export const phases = [
  {
    id: 1,
    name: 'Foundation & Assessment',
    description: 'Governance System Design',
    steps: ['context', 'assessment', 'design'],
    color: 'blue'
  },
  {
    id: 2,
    name: 'Process & Practice Definition',
    description: 'Framework Customization',
    steps: ['governance-objectives', 'management-objectives', 'components'],
    color: 'purple'
  },
  {
    id: 3,
    name: 'Implementation & Operationalization',
    description: 'Build & Deploy',
    steps: ['implementation', 'metrics', 'enablers'],
    color: 'green'
  },
  {
    id: 4,
    name: 'Monitoring & Improvement',
    description: 'Optimize & Sustain',
    steps: ['monitoring', 'internal-assessment', 'analysis', 'improvement'],
    color: 'orange'
  }
]
