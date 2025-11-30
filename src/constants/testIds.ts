/**
 * Test IDs for Playwright automated testing
 *
 * Naming convention: {component}-{element}-{type}
 * - component: The React component or logical section
 * - element: Specific UI element (button, input, etc.)
 * - type: Element type (button, input, select, etc.)
 */

export const TEST_IDS = {
  // Dashboard
  DASHBOARD: {
    CONTAINER: 'dashboard-container',
    TITLE: 'dashboard-title',
    PHASE_CARD: (phaseNumber: number) => `dashboard-phase${phaseNumber}-card`,
    EXPORT_BUTTON: 'dashboard-export-button',
  },

  // Sidebar Navigation
  SIDEBAR: {
    CONTAINER: 'sidebar-container',
    TOGGLE_BUTTON: 'sidebar-toggle-button',
    DASHBOARD_LINK: 'sidebar-dashboard-link',

    // Phase buttons (expand/collapse)
    PHASE_BUTTON: (phaseNumber: number) => `sidebar-phase${phaseNumber}-button`,

    // Phase step links
    PROGRAMME_INITIATION_LINK: 'sidebar-programme-initiation-link',
    GOVERNANCE_CONTEXT_LINK: 'sidebar-governance-context-link',
    CAPABILITY_ASSESSMENT_LINK: 'sidebar-capability-assessment-link',
    ISSUES_IDENTIFICATION_LINK: 'sidebar-issues-identification-link',
    GOALS_CASCADE_LINK: 'sidebar-goals-cascade-link',
    DESIGN_FACTORS_LINK: 'sidebar-design-factors-link',
    PHASE4_PLANNING_LINK: 'sidebar-phase4-planning-link',
    GOVERNANCE_OBJECTIVES_LINK: 'sidebar-governance-objectives-link',
    COMPONENT_DEFINITION_LINK: 'sidebar-component-definition-link',
    RACI_CHART_LINK: 'sidebar-raci-chart-link',
    BENEFITS_REALIZATION_LINK: 'sidebar-benefits-realization-link',
    PERFORMANCE_MEASUREMENT_LINK: 'sidebar-performance-measurement-link',
    REVIEW_EFFECTIVENESS_LINK: 'sidebar-review-effectiveness-link',
  },

  // Programme Initiation (Phase 1)
  PROGRAMME_INITIATION: {
    CONTAINER: 'programme-init-container',

    // Business Drivers
    DRIVER_INPUT: (index: number) => `driver-${index}-input`,
    ADD_DRIVER_BUTTON: 'add-driver-button',
    REMOVE_DRIVER_BUTTON: (index: number) => `remove-driver-${index}-button`,

    // Stakeholders
    STAKEHOLDER_NAME_INPUT: (index: number) => `stakeholder-${index}-name-input`,
    STAKEHOLDER_ROLE_INPUT: (index: number) => `stakeholder-${index}-role-input`,
    STAKEHOLDER_INFLUENCE_SELECT: (index: number) => `stakeholder-${index}-influence-select`,
    ADD_STAKEHOLDER_BUTTON: 'add-stakeholder-button',
    REMOVE_STAKEHOLDER_BUTTON: (index: number) => `remove-stakeholder-${index}-button`,

    // Programme Details
    PROGRAMME_NAME_INPUT: 'programme-name-input',
    PROGRAMME_DESCRIPTION_TEXTAREA: 'programme-description-textarea',
    TIMELINE_INPUT: 'programme-timeline-input',
    SCOPE_TEXTAREA: 'programme-scope-textarea',
  },

  // Governance Context (Phase 2)
  GOVERNANCE_CONTEXT: {
    CONTAINER: 'governance-context-container',

    // Organization Details
    ORG_NAME_INPUT: 'org-name-input',
    ORG_SIZE_INPUT: 'org-size-input',
    IT_STAFF_INPUT: 'it-staff-input',
    INDUSTRY_SELECT: 'org-industry-select',

    // Focus Areas
    FOCUS_AREA_CHECKBOX: (area: string) => `focus-area-${area.toLowerCase().replace(/\s+/g, '-')}-checkbox`,
  },

  // Capability Assessment
  CAPABILITY_ASSESSMENT: {
    CONTAINER: 'capability-assessment-container',

    // Objective Assessment
    OBJECTIVE_CARD: (objectiveId: string) => `objective-${objectiveId}-card`,
    CURRENT_LEVEL_SELECT: (objectiveId: string) => `objective-${objectiveId}-current-select`,
    TARGET_LEVEL_SELECT: (objectiveId: string) => `objective-${objectiveId}-target-select`,
    GAP_DISPLAY: (objectiveId: string) => `objective-${objectiveId}-gap-display`,
    NOTES_TEXTAREA: (objectiveId: string) => `objective-${objectiveId}-notes-textarea`,

    // Domain Filters
    DOMAIN_FILTER_EDM: 'domain-filter-edm',
    DOMAIN_FILTER_APO: 'domain-filter-apo',
    DOMAIN_FILTER_BAI: 'domain-filter-bai',
    DOMAIN_FILTER_DSS: 'domain-filter-dss',
    DOMAIN_FILTER_MEA: 'domain-filter-mea',
  },

  // Issues Identification
  ISSUES: {
    CONTAINER: 'issues-container',
    ADD_ISSUE_BUTTON: 'add-issue-button',

    ISSUE_TITLE_INPUT: (index: number) => `issue-${index}-title-input`,
    ISSUE_TYPE_SELECT: (index: number) => `issue-${index}-type-select`,
    ISSUE_SEVERITY_SELECT: (index: number) => `issue-${index}-severity-select`,
    ISSUE_DESCRIPTION_TEXTAREA: (index: number) => `issue-${index}-description-textarea`,
    ISSUE_OBJECTIVE_SELECT: (index: number) => `issue-${index}-objective-select`,
    REMOVE_ISSUE_BUTTON: (index: number) => `remove-issue-${index}-button`,
  },

  // Goals Cascade (Phase 3)
  GOALS_CASCADE: {
    CONTAINER: 'goals-cascade-container',

    // Enterprise Goals
    ENTERPRISE_GOAL_CHECKBOX: (goalId: string) => `eg-${goalId}-checkbox`,

    // Alignment Goals
    ALIGNMENT_GOAL_CHECKBOX: (goalId: string) => `ag-${goalId}-checkbox`,
    ALIGNMENT_GOAL_IMPORTANCE: (goalId: string) => `ag-${goalId}-importance-badge`,

    // Recommended Objectives
    OBJECTIVE_RECOMMENDATION: (objectiveId: string) => `objective-${objectiveId}-recommendation`,
    OBJECTIVE_PRIORITY: (objectiveId: string) => `objective-${objectiveId}-priority-badge`,
  },

  // Design Factors
  DESIGN_FACTORS: {
    CONTAINER: 'design-factors-container',
    FACTOR_SECTION: (factorId: string) => `design-factor-${factorId}-section`,
    FACTOR_INPUT: (factorId: string, fieldName: string) => `design-factor-${factorId}-${fieldName}-input`,
  },

  // Phase 4 Planning
  PHASE4_PLANNING: {
    CONTAINER: 'phase4-planning-container',

    // Business Case
    PROBLEM_STATEMENT_TEXTAREA: 'business-case-problem-textarea',
    SOLUTION_TEXTAREA: 'business-case-solution-textarea',

    // Benefits
    ADD_BENEFIT_BUTTON: 'add-benefit-button',
    BENEFIT_CATEGORY_INPUT: (index: number) => `benefit-${index}-category-input`,
    BENEFIT_DESCRIPTION_TEXTAREA: (index: number) => `benefit-${index}-description-textarea`,
    BENEFIT_VALUE_INPUT: (index: number) => `benefit-${index}-value-input`,
    REMOVE_BENEFIT_BUTTON: (index: number) => `remove-benefit-${index}-button`,

    // Quick Wins
    ADD_QUICK_WIN_BUTTON: 'add-quick-win-button',
    QUICK_WIN_TITLE_INPUT: (index: number) => `quick-win-${index}-title-input`,
    QUICK_WIN_EFFORT_SELECT: (index: number) => `quick-win-${index}-effort-select`,
    QUICK_WIN_IMPACT_SELECT: (index: number) => `quick-win-${index}-impact-select`,
    REMOVE_QUICK_WIN_BUTTON: (index: number) => `remove-quick-win-${index}-button`,
  },

  // Governance Objectives (EDM)
  GOVERNANCE_OBJECTIVES: {
    CONTAINER: 'governance-objectives-container',

    OBJECTIVE_CARD: (objectiveId: string) => `edm-${objectiveId}-card`,
    STATUS_SELECT: (objectiveId: string) => `edm-${objectiveId}-status-select`,
    COMPLETION_INPUT: (objectiveId: string) => `edm-${objectiveId}-completion-input`,
    NOTES_TEXTAREA: (objectiveId: string) => `edm-${objectiveId}-notes-textarea`,

    // Practices
    PRACTICE_STATUS: (objectiveId: string, practiceId: string) =>
      `edm-${objectiveId}-practice-${practiceId}-status`,
  },

  // Component Definition (APO/BAI/DSS/MEA)
  COMPONENT_DEFINITION: {
    CONTAINER: 'component-definition-container',

    OBJECTIVE_SELECT: 'component-objective-select',
    COMPONENT_TYPE_SELECT: 'component-type-select',
    DESCRIPTION_TEXTAREA: 'component-description-textarea',
    SAVE_BUTTON: 'component-save-button',
  },

  // RACI Chart
  RACI_CHART: {
    CONTAINER: 'raci-chart-container',

    ACTIVITY_INPUT: (index: number) => `raci-activity-${index}-input`,
    ROLE_SELECT: (activityIndex: number, roleIndex: number) =>
      `raci-activity-${activityIndex}-role-${roleIndex}-select`,
    ADD_ACTIVITY_BUTTON: 'raci-add-activity-button',
    ADD_ROLE_BUTTON: 'raci-add-role-button',
  },

  // Benefits Realization (Phase 6)
  BENEFITS_REALIZATION: {
    CONTAINER: 'benefits-realization-container',

    BENEFIT_CARD: (index: number) => `benefit-tracking-${index}-card`,
    STATUS_UPDATE_INPUT: (index: number) => `benefit-${index}-status-input`,
    ACHIEVEMENT_INPUT: (index: number) => `benefit-${index}-achievement-input`,
    EVIDENCE_TEXTAREA: (index: number) => `benefit-${index}-evidence-textarea`,
  },

  // Performance Measurement
  PERFORMANCE_MEASUREMENT: {
    CONTAINER: 'performance-measurement-container',

    ADD_METRIC_BUTTON: 'add-metric-button',
    METRIC_NAME_INPUT: (index: number) => `metric-${index}-name-input`,
    METRIC_TYPE_SELECT: (index: number) => `metric-${index}-type-select`,
    METRIC_TARGET_INPUT: (index: number) => `metric-${index}-target-input`,
    METRIC_ACTUAL_INPUT: (index: number) => `metric-${index}-actual-input`,
    REMOVE_METRIC_BUTTON: (index: number) => `remove-metric-${index}-button`,
  },

  // Review Effectiveness (Phase 7)
  REVIEW_EFFECTIVENESS: {
    CONTAINER: 'review-effectiveness-container',

    EFFECTIVENESS_RATING_SELECT: 'effectiveness-rating-select',
    LESSONS_LEARNED_TEXTAREA: 'lessons-learned-textarea',
    IMPROVEMENTS_TEXTAREA: 'improvements-textarea',
    SUBMIT_REVIEW_BUTTON: 'submit-review-button',
  },

  // Common Elements
  COMMON: {
    SAVE_BUTTON: 'save-button',
    CANCEL_BUTTON: 'cancel-button',
    EXPORT_BUTTON: 'export-button',
    IMPORT_BUTTON: 'import-button',
    LOADING_SPINNER: 'loading-spinner',
    ERROR_MESSAGE: 'error-message',
    SUCCESS_MESSAGE: 'success-message',
  },
} as const
