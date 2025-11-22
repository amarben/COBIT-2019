import { ManagementObjective } from '../types'

export const managementObjectivesData: ManagementObjective[] = [
  // APO - Align, Plan and Organize (14 objectives)
  {
    id: 'APO01',
    name: 'Managed IT Management Framework',
    domain: 'APO',
    purpose: 'Clarify and maintain governance enablers',
    practices: [
      { id: 'APO01.01', name: 'Define organizational structure', implemented: false },
      { id: 'APO01.02', name: 'Establish roles and responsibilities', implemented: false },
      { id: 'APO01.03', name: 'Maintain enablers of the management system', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'APO02',
    name: 'Managed Strategy',
    domain: 'APO',
    purpose: 'Provide holistic approach to realize enterprise strategy',
    practices: [
      { id: 'APO02.01', name: 'Understand enterprise direction', implemented: false },
      { id: 'APO02.02', name: 'Assess current environment and capability', implemented: false },
      { id: 'APO02.03', name: 'Define strategic plan and roadmap', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO03',
    name: 'Managed Enterprise Architecture',
    domain: 'APO',
    purpose: 'Establish common architecture for business and IT',
    practices: [
      { id: 'APO03.01', name: 'Develop enterprise architecture vision', implemented: false },
      { id: 'APO03.02', name: 'Define reference architecture', implemented: false },
      { id: 'APO03.03', name: 'Select opportunities and solutions', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO04',
    name: 'Managed Innovation',
    domain: 'APO',
    purpose: 'Maintain awareness of IT trends and identify innovation opportunities',
    practices: [
      { id: 'APO04.01', name: 'Create an environment for innovation', implemented: false },
      { id: 'APO04.02', name: 'Maintain understanding of enterprise environment', implemented: false },
      { id: 'APO04.03', name: 'Monitor and scan technology environment', implemented: false }
    ],
    enabled: false,
    priority: 'low'
  },
  {
    id: 'APO05',
    name: 'Managed Portfolio',
    domain: 'APO',
    purpose: 'Optimize portfolio performance aligned with enterprise strategy',
    practices: [
      { id: 'APO05.01', name: 'Establish target investment mix', implemented: false },
      { id: 'APO05.02', name: 'Determine availability and sources of funds', implemented: false },
      { id: 'APO05.03', name: 'Evaluate and select programs to fund', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO06',
    name: 'Managed Budget and Costs',
    domain: 'APO',
    purpose: 'Manage IT financial activities in both business and IT',
    practices: [
      { id: 'APO06.01', name: 'Manage finance and accounting', implemented: false },
      { id: 'APO06.02', name: 'Prioritize resource allocation', implemented: false },
      { id: 'APO06.03', name: 'Create and maintain budgets', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'APO07',
    name: 'Managed Human Resources',
    domain: 'APO',
    purpose: 'Provide skilled and motivated people to support enterprise objectives',
    practices: [
      { id: 'APO07.01', name: 'Maintain adequate and appropriate staffing', implemented: false },
      { id: 'APO07.02', name: 'Identify key IT personnel', implemented: false },
      { id: 'APO07.03', name: 'Maintain skills and competencies', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO08',
    name: 'Managed Relationships',
    domain: 'APO',
    purpose: 'Manage relationship between business and IT',
    practices: [
      { id: 'APO08.01', name: 'Understand business expectations', implemented: false },
      { id: 'APO08.02', name: 'Identify opportunities for innovation', implemented: false },
      { id: 'APO08.03', name: 'Manage business relationship', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO09',
    name: 'Managed Service Agreements',
    domain: 'APO',
    purpose: 'Align IT services with enterprise needs and expectations',
    practices: [
      { id: 'APO09.01', name: 'Identify IT services', implemented: false },
      { id: 'APO09.02', name: 'Catalogue IT-enabled services', implemented: false },
      { id: 'APO09.03', name: 'Define and prepare service agreements', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO10',
    name: 'Managed Vendors',
    domain: 'APO',
    purpose: 'Manage IT vendors to provide quality services',
    practices: [
      { id: 'APO10.01', name: 'Identify and evaluate vendor relationships', implemented: false },
      { id: 'APO10.02', name: 'Select vendors', implemented: false },
      { id: 'APO10.03', name: 'Manage vendor relationships and contracts', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO11',
    name: 'Managed Quality',
    domain: 'APO',
    purpose: 'Define and communicate quality requirements',
    practices: [
      { id: 'APO11.01', name: 'Establish quality management system', implemented: false },
      { id: 'APO11.02', name: 'Focus quality on customers', implemented: false },
      { id: 'APO11.03', name: 'Maintain continuous improvement', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'APO12',
    name: 'Managed Risk',
    domain: 'APO',
    purpose: 'Identify, assess and reduce IT risk within tolerance levels',
    practices: [
      { id: 'APO12.01', name: 'Collect data', implemented: false },
      { id: 'APO12.02', name: 'Analyze risk', implemented: false },
      { id: 'APO12.03', name: 'Maintain risk profile', implemented: false },
      { id: 'APO12.04', name: 'Articulate risk', implemented: false },
      { id: 'APO12.05', name: 'Define risk management action portfolio', implemented: false },
      { id: 'APO12.06', name: 'Respond to risk', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'APO13',
    name: 'Managed Security',
    domain: 'APO',
    purpose: 'Maintain information security at acceptable levels',
    practices: [
      { id: 'APO13.01', name: 'Establish and maintain information security management system', implemented: false },
      { id: 'APO13.02', name: 'Define and manage information security risk treatment plan', implemented: false },
      { id: 'APO13.03', name: 'Monitor and review ISMS', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'APO14',
    name: 'Managed Data',
    domain: 'APO',
    purpose: 'Manage data assets to optimize their value',
    practices: [
      { id: 'APO14.01', name: 'Define and maintain business data requirements', implemented: false },
      { id: 'APO14.02', name: 'Establish data management practices', implemented: false },
      { id: 'APO14.03', name: 'Manage data assets and lifecycle', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },

  // BAI - Build, Acquire and Implement (11 objectives)
  {
    id: 'BAI01',
    name: 'Managed Programs',
    domain: 'BAI',
    purpose: 'Manage all programs in portfolio aligned with enterprise strategy',
    practices: [
      { id: 'BAI01.01', name: 'Maintain program approach', implemented: false },
      { id: 'BAI01.02', name: 'Initiate program', implemented: false },
      { id: 'BAI01.03', name: 'Manage program', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI02',
    name: 'Managed Requirements Definition',
    domain: 'BAI',
    purpose: 'Identify solutions and analyze requirements',
    practices: [
      { id: 'BAI02.01', name: 'Define and maintain business requirements', implemented: false },
      { id: 'BAI02.02', name: 'Perform feasibility study and formulate alternatives', implemented: false },
      { id: 'BAI02.03', name: 'Manage requirements risk', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI03',
    name: 'Managed Solutions Identification and Build',
    domain: 'BAI',
    purpose: 'Establish and maintain identified solutions',
    practices: [
      { id: 'BAI03.01', name: 'Design high-level solutions', implemented: false },
      { id: 'BAI03.02', name: 'Design detailed solution components', implemented: false },
      { id: 'BAI03.03', name: 'Develop solution components', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI04',
    name: 'Managed Availability and Capacity',
    domain: 'BAI',
    purpose: 'Balance current and future needs for availability and performance',
    practices: [
      { id: 'BAI04.01', name: 'Assess current availability, performance and capacity', implemented: false },
      { id: 'BAI04.02', name: 'Assess future availability, performance and capacity', implemented: false },
      { id: 'BAI04.03', name: 'Plan for new or changed service requirements', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI05',
    name: 'Managed Organizational Change',
    domain: 'BAI',
    purpose: 'Maximize success of organizational change',
    practices: [
      { id: 'BAI05.01', name: 'Establish desire to change', implemented: false },
      { id: 'BAI05.02', name: 'Form implementation team', implemented: false },
      { id: 'BAI05.03', name: 'Communicate desired vision', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI06',
    name: 'Managed IT Changes',
    domain: 'BAI',
    purpose: 'Manage all changes in controlled manner',
    practices: [
      { id: 'BAI06.01', name: 'Evaluate, prioritize and authorize change requests', implemented: false },
      { id: 'BAI06.02', name: 'Manage emergency changes', implemented: false },
      { id: 'BAI06.03', name: 'Track and report change status', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'BAI07',
    name: 'Managed IT Change Acceptance and Transitioning',
    domain: 'BAI',
    purpose: 'Accept and make solutions operational',
    practices: [
      { id: 'BAI07.01', name: 'Establish acceptance criteria', implemented: false },
      { id: 'BAI07.02', name: 'Establish operation and maintenance plan', implemented: false },
      { id: 'BAI07.03', name: 'Transfer to operational state', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI08',
    name: 'Managed Knowledge',
    domain: 'BAI',
    purpose: 'Maintain availability of relevant and current knowledge',
    practices: [
      { id: 'BAI08.01', name: 'Promote knowledge sharing', implemented: false },
      { id: 'BAI08.02', name: 'Enable efficient information access', implemented: false },
      { id: 'BAI08.03', name: 'Evaluate and retire information', implemented: false }
    ],
    enabled: false,
    priority: 'low'
  },
  {
    id: 'BAI09',
    name: 'Managed Assets',
    domain: 'BAI',
    purpose: 'Manage IT assets through their lifecycle',
    practices: [
      { id: 'BAI09.01', name: 'Identify and record assets', implemented: false },
      { id: 'BAI09.02', name: 'Manage critical assets', implemented: false },
      { id: 'BAI09.03', name: 'Manage asset lifecycle', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI10',
    name: 'Managed Configuration',
    domain: 'BAI',
    purpose: 'Define and maintain descriptions and relationships',
    practices: [
      { id: 'BAI10.01', name: 'Establish and maintain configuration model', implemented: false },
      { id: 'BAI10.02', name: 'Establish and maintain configuration repository', implemented: false },
      { id: 'BAI10.03', name: 'Maintain and control configuration items', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'BAI11',
    name: 'Managed Projects',
    domain: 'BAI',
    purpose: 'Deliver projects on time and budget',
    practices: [
      { id: 'BAI11.01', name: 'Initiate project', implemented: false },
      { id: 'BAI11.02', name: 'Manage project quality', implemented: false },
      { id: 'BAI11.03', name: 'Manage project risk', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },

  // DSS - Deliver, Service and Support (6 objectives)
  {
    id: 'DSS01',
    name: 'Managed Operations',
    domain: 'DSS',
    purpose: 'Coordinate and execute activities to deliver services',
    practices: [
      { id: 'DSS01.01', name: 'Execute operational procedures', implemented: false },
      { id: 'DSS01.02', name: 'Manage IT infrastructure', implemented: false },
      { id: 'DSS01.03', name: 'Manage IT environment', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'DSS02',
    name: 'Managed Service Requests and Incidents',
    domain: 'DSS',
    purpose: 'Provide timely response to user requests and incidents',
    practices: [
      { id: 'DSS02.01', name: 'Define incident and service request classification', implemented: false },
      { id: 'DSS02.02', name: 'Record, classify and prioritize requests', implemented: false },
      { id: 'DSS02.03', name: 'Verify, approve and fulfill service requests', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'DSS03',
    name: 'Managed Problems',
    domain: 'DSS',
    purpose: 'Identify and classify problems and root causes',
    practices: [
      { id: 'DSS03.01', name: 'Identify and classify problems', implemented: false },
      { id: 'DSS03.02', name: 'Investigate and diagnose problems', implemented: false },
      { id: 'DSS03.03', name: 'Raise known errors', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'DSS04',
    name: 'Managed Continuity',
    domain: 'DSS',
    purpose: 'Establish and maintain plan to enable response to incidents',
    practices: [
      { id: 'DSS04.01', name: 'Define business continuity policy and objectives', implemented: false },
      { id: 'DSS04.02', name: 'Maintain business continuity strategy', implemented: false },
      { id: 'DSS04.03', name: 'Develop and implement business continuity response', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'DSS05',
    name: 'Managed Security Services',
    domain: 'DSS',
    purpose: 'Protect enterprise information at acceptable security levels',
    practices: [
      { id: 'DSS05.01', name: 'Protect against malware', implemented: false },
      { id: 'DSS05.02', name: 'Manage network and connectivity security', implemented: false },
      { id: 'DSS05.03', name: 'Manage endpoint security', implemented: false },
      { id: 'DSS05.04', name: 'Manage user identity and logical access', implemented: false },
      { id: 'DSS05.05', name: 'Manage physical access', implemented: false },
      { id: 'DSS05.06', name: 'Manage sensitive documents and output devices', implemented: false },
      { id: 'DSS05.07', name: 'Monitor infrastructure for security events', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'DSS06',
    name: 'Managed Business Process Controls',
    domain: 'DSS',
    purpose: 'Define and maintain appropriate business process controls',
    practices: [
      { id: 'DSS06.01', name: 'Align control activities', implemented: false },
      { id: 'DSS06.02', name: 'Verify compliance with internal control requirements', implemented: false },
      { id: 'DSS06.03', name: 'Optimize internal control activities', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },

  // MEA - Monitor, Evaluate and Assess (4 objectives)
  {
    id: 'MEA01',
    name: 'Managed Performance and Conformance Monitoring',
    domain: 'MEA',
    purpose: 'Collect and report on achievement of objectives',
    practices: [
      { id: 'MEA01.01', name: 'Establish monitoring approach', implemented: false },
      { id: 'MEA01.02', name: 'Set performance and conformance targets', implemented: false },
      { id: 'MEA01.03', name: 'Collect and process performance data', implemented: false },
      { id: 'MEA01.04', name: 'Analyze and report performance', implemented: false },
      { id: 'MEA01.05', name: 'Ensure implementation of corrective actions', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'MEA02',
    name: 'Managed System of Internal Control',
    domain: 'MEA',
    purpose: 'Monitor and maintain effective internal controls',
    practices: [
      { id: 'MEA02.01', name: 'Monitor internal controls', implemented: false },
      { id: 'MEA02.02', name: 'Review business process controls effectiveness', implemented: false },
      { id: 'MEA02.03', name: 'Perform control self-assessments', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  },
  {
    id: 'MEA03',
    name: 'Managed Compliance with External Requirements',
    domain: 'MEA',
    purpose: 'Ensure compliance with external requirements',
    practices: [
      { id: 'MEA03.01', name: 'Identify external compliance requirements', implemented: false },
      { id: 'MEA03.02', name: 'Optimize response to external requirements', implemented: false },
      { id: 'MEA03.03', name: 'Confirm external compliance', implemented: false }
    ],
    enabled: false,
    priority: 'high'
  },
  {
    id: 'MEA04',
    name: 'Managed Assurance',
    domain: 'MEA',
    purpose: 'Confirm achievement of objectives through independent assurance',
    practices: [
      { id: 'MEA04.01', name: 'Provide independent assurance services', implemented: false },
      { id: 'MEA04.02', name: 'Operate program for compliance with policies', implemented: false },
      { id: 'MEA04.03', name: 'Provide assurance for compliance with policies', implemented: false }
    ],
    enabled: false,
    priority: 'medium'
  }
]
