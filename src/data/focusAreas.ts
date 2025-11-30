// COBIT 2019 Focus Areas
// Predefined configurations for specific use cases and industry scenarios

export interface FocusArea {
  id: string
  name: string
  description: string
  category: 'industry' | 'topic' | 'size'
  // Design factor adjustments
  designFactorGuidance: {
    factorId: string
    recommendation: string
    suggestedValue?: string
  }[]
  // Recommended objectives with target capability levels
  priorityObjectives: {
    objectiveId: string
    minimumCapability: number
    rationale: string
  }[]
  // Key governance components to establish
  keyComponents: {
    type: string
    examples: string[]
  }[]
}

export const focusAreas: FocusArea[] = [
  // Small and Medium Enterprises (SME)
  {
    id: 'sme',
    name: 'Small and Medium Enterprises',
    description: 'Tailored governance approach for organizations with limited IT resources and simpler structures',
    category: 'size',
    designFactorGuidance: [
      { factorId: 'DF7', recommendation: 'IT likely plays Support or Factory role', suggestedValue: 'support' },
      { factorId: 'DF8', recommendation: 'Higher reliance on outsourcing and cloud services', suggestedValue: 'outsourced' },
      { factorId: 'DF11', recommendation: 'Simplified governance structures appropriate', suggestedValue: 'small' },
    ],
    priorityObjectives: [
      { objectiveId: 'EDM01', minimumCapability: 2, rationale: 'Basic governance framework essential' },
      { objectiveId: 'EDM03', minimumCapability: 2, rationale: 'Risk management proportionate to size' },
      { objectiveId: 'APO01', minimumCapability: 2, rationale: 'Clear IT management structure' },
      { objectiveId: 'APO12', minimumCapability: 2, rationale: 'Basic risk management' },
      { objectiveId: 'APO13', minimumCapability: 2, rationale: 'Security essentials' },
      { objectiveId: 'DSS01', minimumCapability: 2, rationale: 'Operational stability' },
      { objectiveId: 'DSS05', minimumCapability: 2, rationale: 'Security services' },
      { objectiveId: 'MEA01', minimumCapability: 1, rationale: 'Basic performance monitoring' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['IT Manager/Director role', 'Part-time IT steering committee'] },
      { type: 'processes', examples: ['Simplified change management', 'Basic incident management'] },
      { type: 'services', examples: ['Cloud-based infrastructure', 'Managed security services'] },
    ]
  },

  // Cybersecurity Focus Area
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Enhanced security governance for organizations facing elevated cyber threats or handling sensitive data',
    category: 'topic',
    designFactorGuidance: [
      { factorId: 'DF3', recommendation: 'Conservative risk profile for security matters' },
      { factorId: 'DF5', recommendation: 'Thorough threat landscape assessment required' },
      { factorId: 'DF6', recommendation: 'Security-related compliance requirements (ISO 27001, NIST, SOC2)' },
    ],
    priorityObjectives: [
      { objectiveId: 'EDM03', minimumCapability: 4, rationale: 'Strong risk governance essential' },
      { objectiveId: 'APO12', minimumCapability: 4, rationale: 'Comprehensive risk management' },
      { objectiveId: 'APO13', minimumCapability: 4, rationale: 'ISMS implementation' },
      { objectiveId: 'APO14', minimumCapability: 3, rationale: 'Data protection and classification' },
      { objectiveId: 'BAI06', minimumCapability: 3, rationale: 'Secure change management' },
      { objectiveId: 'DSS01', minimumCapability: 3, rationale: 'Secure operations' },
      { objectiveId: 'DSS04', minimumCapability: 4, rationale: 'Business continuity for security incidents' },
      { objectiveId: 'DSS05', minimumCapability: 4, rationale: 'Comprehensive security services' },
      { objectiveId: 'DSS06', minimumCapability: 3, rationale: 'Process controls' },
      { objectiveId: 'MEA02', minimumCapability: 3, rationale: 'Security control monitoring' },
      { objectiveId: 'MEA03', minimumCapability: 3, rationale: 'Security compliance' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['CISO role', 'Security Operations Center', 'Security steering committee'] },
      { type: 'processes', examples: ['Incident response', 'Vulnerability management', 'Security awareness training'] },
      { type: 'information', examples: ['Threat intelligence', 'Security metrics dashboard', 'Risk register'] },
      { type: 'services', examples: ['SIEM', 'Identity management', 'Endpoint protection'] },
    ]
  },

  // Cloud Computing Focus Area
  {
    id: 'cloud',
    name: 'Cloud Computing',
    description: 'Governance considerations for organizations adopting or operating in cloud environments',
    category: 'topic',
    designFactorGuidance: [
      { factorId: 'DF8', recommendation: 'Cloud-first or hybrid sourcing model', suggestedValue: 'cloud' },
      { factorId: 'DF9', recommendation: 'Agile/DevOps implementation methods suitable' },
      { factorId: 'DF10', recommendation: 'Early adopter or follower technology strategy' },
    ],
    priorityObjectives: [
      { objectiveId: 'APO03', minimumCapability: 3, rationale: 'Cloud architecture alignment' },
      { objectiveId: 'APO09', minimumCapability: 3, rationale: 'Cloud service agreements' },
      { objectiveId: 'APO10', minimumCapability: 4, rationale: 'Cloud vendor management critical' },
      { objectiveId: 'APO13', minimumCapability: 3, rationale: 'Cloud security' },
      { objectiveId: 'APO14', minimumCapability: 3, rationale: 'Data governance in cloud' },
      { objectiveId: 'BAI03', minimumCapability: 3, rationale: 'Cloud solution development' },
      { objectiveId: 'BAI04', minimumCapability: 3, rationale: 'Cloud capacity management' },
      { objectiveId: 'BAI09', minimumCapability: 3, rationale: 'Cloud asset management' },
      { objectiveId: 'BAI10', minimumCapability: 3, rationale: 'Cloud configuration management' },
      { objectiveId: 'DSS01', minimumCapability: 3, rationale: 'Cloud operations' },
      { objectiveId: 'DSS04', minimumCapability: 3, rationale: 'Cloud continuity' },
      { objectiveId: 'MEA03', minimumCapability: 3, rationale: 'Cloud compliance' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['Cloud Center of Excellence', 'Cloud architect role'] },
      { type: 'processes', examples: ['Cloud governance', 'FinOps', 'Cloud security reviews'] },
      { type: 'information', examples: ['Cloud cost reports', 'Service level dashboards'] },
      { type: 'services', examples: ['Cloud management platform', 'Cloud access security broker'] },
    ]
  },

  // DevOps Focus Area
  {
    id: 'devops',
    name: 'DevOps',
    description: 'Governance adaptations for organizations adopting DevOps practices and continuous delivery',
    category: 'topic',
    designFactorGuidance: [
      { factorId: 'DF9', recommendation: 'DevOps/Agile implementation methods', suggestedValue: 'devops' },
      { factorId: 'DF7', recommendation: 'IT as strategic enabler of rapid delivery' },
      { factorId: 'DF10', recommendation: 'First mover or early adopter technology approach' },
    ],
    priorityObjectives: [
      { objectiveId: 'APO04', minimumCapability: 3, rationale: 'Innovation enablement' },
      { objectiveId: 'APO11', minimumCapability: 3, rationale: 'Quality in DevOps pipelines' },
      { objectiveId: 'BAI02', minimumCapability: 3, rationale: 'Agile requirements' },
      { objectiveId: 'BAI03', minimumCapability: 4, rationale: 'Continuous integration/delivery' },
      { objectiveId: 'BAI05', minimumCapability: 3, rationale: 'DevOps culture change' },
      { objectiveId: 'BAI06', minimumCapability: 4, rationale: 'Automated change management' },
      { objectiveId: 'BAI07', minimumCapability: 4, rationale: 'Continuous deployment' },
      { objectiveId: 'BAI10', minimumCapability: 4, rationale: 'Infrastructure as Code' },
      { objectiveId: 'DSS02', minimumCapability: 3, rationale: 'Rapid incident response' },
      { objectiveId: 'MEA01', minimumCapability: 3, rationale: 'DevOps metrics and monitoring' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['Cross-functional DevOps teams', 'Platform team', 'SRE function'] },
      { type: 'processes', examples: ['CI/CD pipelines', 'Automated testing', 'Feature flags'] },
      { type: 'culture', examples: ['Blameless postmortems', 'Continuous improvement', 'Shared ownership'] },
      { type: 'services', examples: ['Container orchestration', 'Monitoring/observability stack', 'GitOps tooling'] },
    ]
  },

  // Digital Transformation Focus Area
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    description: 'Governance support for organizations undergoing significant digital business transformation',
    category: 'topic',
    designFactorGuidance: [
      { factorId: 'DF1', recommendation: 'Growth/Acquisition or Innovation strategy alignment' },
      { factorId: 'DF7', recommendation: 'IT as strategic/turnaround - critical for transformation', suggestedValue: 'strategic' },
      { factorId: 'DF10', recommendation: 'First mover or early adopter for competitive advantage' },
    ],
    priorityObjectives: [
      { objectiveId: 'EDM01', minimumCapability: 3, rationale: 'Governance framework for transformation' },
      { objectiveId: 'EDM02', minimumCapability: 4, rationale: 'Benefits realization critical' },
      { objectiveId: 'APO02', minimumCapability: 4, rationale: 'Digital strategy alignment' },
      { objectiveId: 'APO03', minimumCapability: 4, rationale: 'Target architecture for digital' },
      { objectiveId: 'APO04', minimumCapability: 4, rationale: 'Innovation management' },
      { objectiveId: 'APO05', minimumCapability: 4, rationale: 'Digital portfolio management' },
      { objectiveId: 'APO08', minimumCapability: 4, rationale: 'Business-IT partnership' },
      { objectiveId: 'BAI01', minimumCapability: 4, rationale: 'Transformation program management' },
      { objectiveId: 'BAI05', minimumCapability: 4, rationale: 'Organizational change management' },
      { objectiveId: 'BAI11', minimumCapability: 4, rationale: 'Project delivery excellence' },
      { objectiveId: 'MEA01', minimumCapability: 3, rationale: 'Transformation progress monitoring' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['Digital transformation office', 'CDO role', 'Innovation lab'] },
      { type: 'processes', examples: ['Ideation to deployment', 'Customer journey mapping', 'Data-driven decision making'] },
      { type: 'culture', examples: ['Digital-first mindset', 'Customer centricity', 'Experimentation culture'] },
      { type: 'skills', examples: ['Digital literacy', 'Data analytics', 'Agile coaching'] },
    ]
  },

  // Privacy/GDPR Focus Area
  {
    id: 'privacy',
    name: 'Privacy and Data Protection',
    description: 'Governance requirements for organizations subject to privacy regulations (GDPR, CCPA, etc.)',
    category: 'topic',
    designFactorGuidance: [
      { factorId: 'DF6', recommendation: 'Privacy regulations as key compliance driver (GDPR, CCPA, etc.)' },
      { factorId: 'DF3', recommendation: 'Conservative risk profile for personal data handling' },
    ],
    priorityObjectives: [
      { objectiveId: 'EDM01', minimumCapability: 3, rationale: 'Privacy governance framework' },
      { objectiveId: 'EDM03', minimumCapability: 3, rationale: 'Privacy risk governance' },
      { objectiveId: 'APO01', minimumCapability: 3, rationale: 'Privacy policies and procedures' },
      { objectiveId: 'APO12', minimumCapability: 3, rationale: 'Privacy risk management' },
      { objectiveId: 'APO13', minimumCapability: 3, rationale: 'Data protection controls' },
      { objectiveId: 'APO14', minimumCapability: 4, rationale: 'Data governance essential' },
      { objectiveId: 'BAI02', minimumCapability: 3, rationale: 'Privacy by design in requirements' },
      { objectiveId: 'BAI03', minimumCapability: 3, rationale: 'Privacy-aware development' },
      { objectiveId: 'DSS05', minimumCapability: 3, rationale: 'Data protection services' },
      { objectiveId: 'DSS06', minimumCapability: 3, rationale: 'Processing controls' },
      { objectiveId: 'MEA03', minimumCapability: 4, rationale: 'Privacy compliance monitoring' },
      { objectiveId: 'MEA04', minimumCapability: 3, rationale: 'Privacy audits' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['Data Protection Officer', 'Privacy steering committee', 'Data stewards'] },
      { type: 'processes', examples: ['DPIA process', 'Data subject request handling', 'Breach notification'] },
      { type: 'information', examples: ['Data inventory', 'Processing records', 'Consent management'] },
      { type: 'services', examples: ['Data discovery tools', 'Consent management platform', 'Privacy-enhancing technologies'] },
    ]
  },

  // Financial Services Focus Area
  {
    id: 'financial-services',
    name: 'Financial Services',
    description: 'Industry-specific governance for banks, insurance, and financial institutions',
    category: 'industry',
    designFactorGuidance: [
      { factorId: 'DF6', recommendation: 'Heavy regulatory compliance (Basel III, SOX, PCI-DSS, etc.)' },
      { factorId: 'DF3', recommendation: 'Conservative/very conservative risk profile' },
      { factorId: 'DF7', recommendation: 'IT typically strategic - core to business delivery', suggestedValue: 'strategic' },
    ],
    priorityObjectives: [
      { objectiveId: 'EDM01', minimumCapability: 4, rationale: 'Robust governance framework required' },
      { objectiveId: 'EDM03', minimumCapability: 4, rationale: 'Strong risk governance' },
      { objectiveId: 'EDM05', minimumCapability: 3, rationale: 'Regulatory stakeholder engagement' },
      { objectiveId: 'APO01', minimumCapability: 4, rationale: 'Comprehensive IT policies' },
      { objectiveId: 'APO12', minimumCapability: 4, rationale: 'Operational risk management' },
      { objectiveId: 'APO13', minimumCapability: 4, rationale: 'Information security management' },
      { objectiveId: 'DSS04', minimumCapability: 4, rationale: 'Business continuity critical' },
      { objectiveId: 'DSS05', minimumCapability: 4, rationale: 'Security services' },
      { objectiveId: 'MEA02', minimumCapability: 4, rationale: 'Internal control system' },
      { objectiveId: 'MEA03', minimumCapability: 4, rationale: 'Regulatory compliance' },
      { objectiveId: 'MEA04', minimumCapability: 4, rationale: 'Independent assurance' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['Three lines of defense', 'Risk committee', 'Compliance function'] },
      { type: 'processes', examples: ['Regulatory reporting', 'Model risk management', 'Third-party risk management'] },
      { type: 'information', examples: ['Regulatory returns', 'Risk dashboards', 'Audit trails'] },
    ]
  },

  // Healthcare Focus Area
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Industry-specific governance for healthcare organizations handling protected health information',
    category: 'industry',
    designFactorGuidance: [
      { factorId: 'DF6', recommendation: 'HIPAA, HITECH, and healthcare-specific regulations' },
      { factorId: 'DF3', recommendation: 'Conservative risk profile for patient data' },
      { factorId: 'DF5', recommendation: 'Healthcare-targeted cyber threats (ransomware, PHI theft)' },
    ],
    priorityObjectives: [
      { objectiveId: 'EDM03', minimumCapability: 4, rationale: 'Patient safety and privacy risks' },
      { objectiveId: 'APO12', minimumCapability: 4, rationale: 'Healthcare risk management' },
      { objectiveId: 'APO13', minimumCapability: 4, rationale: 'PHI protection' },
      { objectiveId: 'APO14', minimumCapability: 4, rationale: 'Health data governance' },
      { objectiveId: 'BAI04', minimumCapability: 4, rationale: 'System availability for patient care' },
      { objectiveId: 'DSS01', minimumCapability: 4, rationale: 'Clinical system operations' },
      { objectiveId: 'DSS04', minimumCapability: 4, rationale: 'Healthcare continuity' },
      { objectiveId: 'DSS05', minimumCapability: 4, rationale: 'Medical device security' },
      { objectiveId: 'MEA03', minimumCapability: 4, rationale: 'HIPAA compliance' },
    ],
    keyComponents: [
      { type: 'organizational-structures', examples: ['HIPAA Privacy Officer', 'Clinical IT governance', 'Medical device committee'] },
      { type: 'processes', examples: ['PHI access controls', 'Clinical system change management', 'Medical device security'] },
      { type: 'information', examples: ['PHI inventory', 'Access logs', 'Security incident reports'] },
    ]
  }
]

// Helper function to get focus area by ID
export function getFocusArea(id: string): FocusArea | undefined {
  return focusAreas.find(fa => fa.id === id)
}

// Helper function to get focus areas by category
export function getFocusAreasByCategory(category: FocusArea['category']): FocusArea[] {
  return focusAreas.filter(fa => fa.category === category)
}

// Helper function to apply focus area to current configuration
export function applyFocusAreaRecommendations(
  focusAreaId: string,
  currentObjectives: { objectiveId: string; currentLevel: number; targetLevel: number }[]
): { objectiveId: string; currentLevel: number; targetLevel: number; focusAreaRecommendation?: number }[] {
  const focusArea = getFocusArea(focusAreaId)
  if (!focusArea) return currentObjectives

  return currentObjectives.map(obj => {
    const recommendation = focusArea.priorityObjectives.find(po => po.objectiveId === obj.objectiveId)
    return {
      ...obj,
      focusAreaRecommendation: recommendation?.minimumCapability,
      targetLevel: recommendation
        ? Math.max(obj.targetLevel, recommendation.minimumCapability)
        : obj.targetLevel
    }
  })
}
