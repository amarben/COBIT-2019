import { GovernanceObjective } from '../types'

export const governanceObjectivesData: GovernanceObjective[] = [
  {
    id: 'EDM01',
    name: 'Ensured Governance Framework Setting and Maintenance',
    purpose: 'Provide a consistent, integrated governance approach aligned with the enterprise mission, vision and values',
    practices: [
      {
        id: 'EDM01.01',
        name: 'Evaluate the governance system',
        description: 'Review and evaluate governance practices and performance',
        implemented: false
      },
      {
        id: 'EDM01.02',
        name: 'Direct the governance system',
        description: 'Assign responsibility for governance activities',
        implemented: false
      },
      {
        id: 'EDM01.03',
        name: 'Monitor the governance system',
        description: 'Monitor the effectiveness of the governance system',
        implemented: false
      }
    ],
    inputsFrom: [],
    outputsTo: ['All other processes'],
    color: 'purple',
    enabled: false
  },
  {
    id: 'EDM02',
    name: 'Ensured Benefits Delivery',
    purpose: 'Optimize the value contribution to the business from processes, IT services and IT assets',
    practices: [
      {
        id: 'EDM02.01',
        name: 'Evaluate value optimization',
        description: 'Assess current and future value and risk optimization',
        implemented: false
      },
      {
        id: 'EDM02.02',
        name: 'Direct value optimization',
        description: 'Direct management to optimize value delivery',
        implemented: false
      },
      {
        id: 'EDM02.03',
        name: 'Monitor value optimization',
        description: 'Monitor achievement of value objectives',
        implemented: false
      }
    ],
    inputsFrom: ['APO05', 'APO06', 'BAI01'],
    outputsTo: ['APO02', 'APO05', 'BAI01'],
    color: 'purple',
    enabled: false
  },
  {
    id: 'EDM03',
    name: 'Ensured Risk Optimization',
    purpose: 'Ensure that enterprise risk appetite and tolerance are understood, articulated and communicated',
    practices: [
      {
        id: 'EDM03.01',
        name: 'Evaluate risk management',
        description: 'Examine and judge whether risk appetite is appropriate',
        implemented: false
      },
      {
        id: 'EDM03.02',
        name: 'Direct risk management',
        description: 'Direct management to optimize IT risk management',
        implemented: false
      },
      {
        id: 'EDM03.03',
        name: 'Monitor risk management',
        description: 'Monitor achievement of risk objectives',
        implemented: false
      }
    ],
    inputsFrom: ['APO12'],
    outputsTo: ['APO12'],
    color: 'purple',
    enabled: false
  },
  {
    id: 'EDM04',
    name: 'Ensured Resource Optimization',
    purpose: 'Ensure that adequate and sufficient IT-related capabilities are available to support enterprise objectives',
    practices: [
      {
        id: 'EDM04.01',
        name: 'Evaluate resource management',
        description: 'Examine and judge current and future resource needs',
        implemented: false
      },
      {
        id: 'EDM04.02',
        name: 'Direct resource management',
        description: 'Direct optimization of IT resources',
        implemented: false
      },
      {
        id: 'EDM04.03',
        name: 'Monitor resource management',
        description: 'Monitor achievement of resource objectives',
        implemented: false
      }
    ],
    inputsFrom: ['APO06', 'APO07'],
    outputsTo: ['APO06', 'APO07'],
    color: 'purple',
    enabled: false
  },
  {
    id: 'EDM05',
    name: 'Ensured Stakeholder Engagement',
    purpose: 'Ensure stakeholder engagement, including needs, concerns and views are identified and considered in decision making',
    practices: [
      {
        id: 'EDM05.01',
        name: 'Evaluate stakeholder engagement',
        description: 'Review and evaluate stakeholder reporting requirements',
        implemented: false
      },
      {
        id: 'EDM05.02',
        name: 'Direct stakeholder communication',
        description: 'Direct stakeholder relationship management',
        implemented: false
      },
      {
        id: 'EDM05.03',
        name: 'Monitor stakeholder engagement',
        description: 'Monitor effectiveness of stakeholder engagement',
        implemented: false
      }
    ],
    inputsFrom: ['APO08'],
    outputsTo: ['APO08'],
    color: 'purple',
    enabled: false
  }
]
