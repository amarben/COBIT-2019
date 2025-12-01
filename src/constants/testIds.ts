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
    DRIVERS_LINK: 'sidebar-drivers-link',
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

    // Programme Details
    PROGRAMME_NAME_INPUT: 'programme-name-input',
    PROGRAMME_DESCRIPTION_TEXTAREA: 'programme-description-textarea',
    EXECUTIVE_SPONSOR_INPUT: 'programme-executive-sponsor-input',
    TIMELINE_INPUT: 'programme-timeline-input',
    TARGET_START_DATE_INPUT: 'programme-target-start-date-input',
    TARGET_END_DATE_INPUT: 'programme-target-end-date-input',
    SCOPE_TEXTAREA: 'programme-scope-textarea',

    // Objectives
    PROGRAMME_OBJECTIVE_INPUT: (index: number) => `programme-objective-${index}-input`,
    ADD_OBJECTIVE_BUTTON: 'programme-add-objective-button',
    REMOVE_OBJECTIVE_BUTTON: (index: number) => `programme-remove-objective-${index}-button`,

    // Business Drivers
    DRIVER_TYPE_SELECT: (index: number) => `driver-${index}-type-select`,
    DRIVER_URGENCY_SELECT: (index: number) => `driver-${index}-urgency-select`,
    DRIVER_DESCRIPTION_INPUT: (index: number) => `driver-${index}-description-input`,
    DRIVER_INPUT: (index: number) => `driver-${index}-input`,
    ADD_DRIVER_BUTTON: 'add-driver-button',
    REMOVE_DRIVER_BUTTON: (index: number) => `remove-driver-${index}-button`,

    // Stakeholders
    STAKEHOLDER_NAME_INPUT: (index: number) => `stakeholder-${index}-name-input`,
    STAKEHOLDER_ROLE_INPUT: (index: number) => `stakeholder-${index}-role-input`,
    STAKEHOLDER_INFLUENCE_SELECT: (index: number) => `stakeholder-${index}-influence-select`,
    ADD_STAKEHOLDER_BUTTON: 'add-stakeholder-button',
    REMOVE_STAKEHOLDER_BUTTON: (index: number) => `remove-stakeholder-${index}-button`,

    // Risks
    RISK_DESCRIPTION_INPUT: (index: number) => `programme-risk-${index}-description-input`,
    RISK_MITIGATION_INPUT: (index: number) => `programme-risk-${index}-mitigation-input`,
    RISK_LIKELIHOOD_SELECT: (index: number) => `programme-risk-${index}-likelihood-select`,
    RISK_IMPACT_SELECT: (index: number) => `programme-risk-${index}-impact-select`,
    ADD_RISK_BUTTON: 'programme-add-risk-button',
    REMOVE_RISK_BUTTON: (index: number) => `programme-remove-risk-${index}-button`,

    // Resources
    RESOURCE_TYPE_SELECT: (index: number) => `programme-resource-${index}-type-select`,
    RESOURCE_DESCRIPTION_INPUT: (index: number) => `programme-resource-${index}-description-input`,
    RESOURCE_ALLOCATED_CHECKBOX: (index: number) => `programme-resource-${index}-allocated-checkbox`,
    ADD_RESOURCE_BUTTON: 'programme-add-resource-button',
    REMOVE_RESOURCE_BUTTON: (index: number) => `programme-remove-resource-${index}-button`,
  },

  // Governance Context (Phase 2)
  GOVERNANCE_CONTEXT: {
    CONTAINER: 'governance-context-container',

    // Organization Details
    ORG_NAME_INPUT: 'org-name-input',
    ORG_SIZE_INPUT: 'org-size-input',
    ORG_SIZE_SELECT: 'org-size-select',
    IT_STAFF_INPUT: 'it-staff-input',
    IT_ROLE_INPUT: 'org-it-role-input',
    INDUSTRY_INPUT: 'org-industry-input',
    INDUSTRY_SELECT: 'org-industry-select',

    // Enterprise Goals
    ENTERPRISE_GOAL_CHECKBOX: (goalId: string) => `enterprise-goal-${goalId}-checkbox`,

    // Focus Areas
    FOCUS_AREA_CHECKBOX: (area: string) => `focus-area-${area.toLowerCase().replace(/\s+/g, '-')}-checkbox`,

    // Challenges
    ADD_CHALLENGE_INPUT: 'governance-add-challenge-input',
    ADD_CHALLENGE_BUTTON: 'governance-add-challenge-button',
    REMOVE_CHALLENGE_BUTTON: (index: number) => `governance-remove-challenge-${index}-button`,

    // Stakeholders (add form)
    NEW_STAKEHOLDER_NAME_INPUT: 'governance-new-stakeholder-name-input',
    NEW_STAKEHOLDER_NEEDS_INPUT: 'governance-new-stakeholder-needs-input',
    NEW_STAKEHOLDER_PRIORITY_SELECT: 'governance-new-stakeholder-priority-select',

    // Stakeholders (existing)
    STAKEHOLDER_NAME_INPUT: (index: number) => `governance-stakeholder-${index}-name-input`,
    STAKEHOLDER_NEEDS_INPUT: (index: number) => `governance-stakeholder-${index}-needs-input`,
    STAKEHOLDER_PRIORITY_SELECT: (index: number) => `governance-stakeholder-${index}-priority-select`,
    ADD_STAKEHOLDER_BUTTON: 'governance-add-stakeholder-button',
    REMOVE_STAKEHOLDER_BUTTON: (index: number) => `governance-remove-stakeholder-${index}-button`,
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
    BUSINESS_CASE_TITLE_INPUT: 'business-case-title-input',
    BUSINESS_CASE_SPONSOR_INPUT: 'business-case-sponsor-input',
    BUSINESS_CASE_STATUS_SELECT: 'business-case-status-select',
    PROBLEM_STATEMENT_TEXTAREA: 'business-case-problem-textarea',
    SOLUTION_TEXTAREA: 'business-case-solution-textarea',

    // Benefits
    ADD_BENEFIT_BUTTON: 'add-benefit-button',
    BENEFIT_CATEGORY_INPUT: (index: number) => `benefit-${index}-category-input`,
    BENEFIT_DESCRIPTION_TEXTAREA: (index: number) => `benefit-${index}-description-textarea`,
    BENEFIT_VALUE_INPUT: (index: number) => `benefit-${index}-value-input`,
    REMOVE_BENEFIT_BUTTON: (index: number) => `remove-benefit-${index}-button`,

    // Costs
    ADD_COST_BUTTON: 'add-cost-button',
    COST_TYPE_SELECT: (index: number) => `cost-${index}-type-select`,
    COST_DESCRIPTION_INPUT: (index: number) => `cost-${index}-description-input`,
    COST_AMOUNT_INPUT: (index: number) => `cost-${index}-amount-input`,
    REMOVE_COST_BUTTON: (index: number) => `remove-cost-${index}-button`,

    // Risks
    ADD_RISK_BUTTON: 'add-risk-button',
    RISK_DESCRIPTION_INPUT: (index: number) => `risk-${index}-description-input`,
    RISK_MITIGATION_INPUT: (index: number) => `risk-${index}-mitigation-input`,
    REMOVE_RISK_BUTTON: (index: number) => `remove-risk-${index}-button`,

    // Success Criteria
    ADD_SUCCESS_CRITERIA_BUTTON: 'add-success-criteria-button',
    SUCCESS_CRITERIA_INPUT: (index: number) => `success-criteria-${index}-input`,
    REMOVE_SUCCESS_CRITERIA_BUTTON: (index: number) => `remove-success-criteria-${index}-button`,

    // Quick Wins
    ADD_QUICK_WIN_BUTTON: 'add-quick-win-button',
    QUICK_WIN_TITLE_INPUT: (index: number) => `quick-win-${index}-title-input`,
    QUICK_WIN_DESCRIPTION_TEXTAREA: (index: number) => `quick-win-${index}-description-textarea`,
    QUICK_WIN_OWNER_INPUT: (index: number) => `quick-win-${index}-owner-input`,
    QUICK_WIN_TARGET_DATE_INPUT: (index: number) => `quick-win-${index}-target-date-input`,
    QUICK_WIN_STATUS_SELECT: (index: number) => `quick-win-${index}-status-select`,
    QUICK_WIN_EFFORT_SELECT: (index: number) => `quick-win-${index}-effort-select`,
    QUICK_WIN_IMPACT_SELECT: (index: number) => `quick-win-${index}-impact-select`,
    REMOVE_QUICK_WIN_BUTTON: (index: number) => `remove-quick-win-${index}-button`,

    // Projects
    ADD_PROJECT_BUTTON: 'add-project-button',
    PROJECT_NAME_INPUT: (index: number) => `project-${index}-name-input`,
    PROJECT_DESCRIPTION_TEXTAREA: (index: number) => `project-${index}-description-textarea`,
    PROJECT_START_DATE_INPUT: (index: number) => `project-${index}-start-date-input`,
    PROJECT_END_DATE_INPUT: (index: number) => `project-${index}-end-date-input`,
    PROJECT_STATUS_SELECT: (index: number) => `project-${index}-status-select`,
    REMOVE_PROJECT_BUTTON: (index: number) => `remove-project-${index}-button`,
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

    ENABLE_OBJECTIVE_TOGGLE: (objectiveId: string) => `edm-${objectiveId}-enable-toggle`,
    ENABLE_PRACTICE_CHECKBOX: (objectiveId: string, practiceId: string) => `edm-${objectiveId}-practice-${practiceId}-enable-checkbox`,
    TAB_PRACTICES_BUTTON: 'governance-objectives-tab-practices-button',
    TAB_RACI_BUTTON: 'governance-objectives-tab-raci-button',
  },

  // Component Definition (APO/BAI/DSS/MEA)
  COMPONENT_DEFINITION: {
    CONTAINER: 'component-definition-container',

    OBJECTIVE_SELECT: 'component-objective-select',
    COMPONENT_TYPE_SELECT: 'component-type-select',
    DESCRIPTION_TEXTAREA: 'component-description-textarea',
    SAVE_BUTTON: 'component-save-button',

    ADD_COMPONENT_BUTTON: 'component-add-button',
    COMPONENT_NAME_INPUT: 'component-name-input',
    COMPONENT_STATUS_SELECT: (index: number) => `component-${index}-status-select`,
    REMOVE_COMPONENT_BUTTON: (index: number) => `component-${index}-remove-button`,
    QUICK_ADD_EXAMPLE_BUTTON: (exampleId: string) => `component-quick-add-${exampleId}-button`,
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

    BENEFIT_NAME_INPUT: 'benefit-name-input',
    BENEFIT_TYPE_SELECT: 'benefit-type-select',
    BENEFIT_DESCRIPTION_TEXTAREA: 'benefit-description-textarea',
    BENEFIT_TARGET_VALUE_INPUT: 'benefit-target-value-input',
    BENEFIT_UNIT_SELECT: 'benefit-unit-select',
    ADD_BENEFIT_BUTTON: 'benefits-add-button',
    BENEFIT_TARGET_INPUT: (index: number) => `benefit-${index}-target-input`,
    BENEFIT_ACTUAL_VALUE_INPUT: (index: number) => `benefit-${index}-actual-input`,
    BENEFIT_EVIDENCE_NOTES_TEXTAREA: (index: number) => `benefit-${index}-evidence-notes-textarea`,
    REMOVE_BENEFIT_BUTTON: (index: number) => `benefit-${index}-remove-button`,
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

    NEW_METRIC_NAME_INPUT: 'perf-new-metric-name-input',
    NEW_METRIC_TYPE_SELECT: 'perf-new-metric-type-select',
    NEW_METRIC_CATEGORY_SELECT: 'perf-new-metric-category-select',
    NEW_OBJECTIVE_ID_INPUT: 'perf-new-objective-id-input',
    NEW_TARGET_INPUT: 'perf-new-target-input',
    NEW_CURRENT_INPUT: 'perf-new-current-input',
    NEW_UNIT_INPUT: 'perf-new-unit-input',
    METRIC_CURRENT_VALUE_INPUT: (index: number) => `metric-${index}-current-value-input`,
  },

  // Enabler Deployment (Phase 5)
  ENABLER_DEPLOYMENT: {
    CONTAINER: 'enabler-deployment-container',

    // Actions
    LOAD_EXAMPLE_BUTTON: 'enabler-load-example-button',
    ADD_ENABLER_BUTTON: 'enabler-add-button',
    ADD_FIRST_ENABLER_BUTTON: 'enabler-add-first-button',

    // Filters
    FILTER_ALL_BUTTON: 'enabler-filter-all-button',
    FILTER_POLICIES_BUTTON: 'enabler-filter-policies-button',
    FILTER_TOOLS_BUTTON: 'enabler-filter-tools-button',
    FILTER_SKILLS_BUTTON: 'enabler-filter-skills-button',
    FILTER_CULTURE_BUTTON: 'enabler-filter-culture-button',

    // Enabler Cards
    ENABLER_CARD: (index: number) => `enabler-${index}-card`,
    EDIT_ENABLER_BUTTON: (index: number) => `enabler-${index}-edit-button`,
    DELETE_ENABLER_BUTTON: (index: number) => `enabler-${index}-delete-button`,

    // Modal Form
    MODAL_TYPE_SELECT: 'enabler-modal-type-select',
    MODAL_NAME_INPUT: 'enabler-modal-name-input',
    MODAL_STATUS_SELECT: 'enabler-modal-status-select',
    MODAL_VERSION_INPUT: 'enabler-modal-version-input',
    MODAL_APPROVED_DATE_INPUT: 'enabler-modal-approved-date-input',
    MODAL_SCOPE_TEXTAREA: 'enabler-modal-scope-textarea',
    MODAL_DEPLOYED_DATE_INPUT: 'enabler-modal-deployed-date-input',
    MODAL_MODULES_TEXTAREA: 'enabler-modal-modules-textarea',
    MODAL_USERS_INPUT: 'enabler-modal-users-input',
    MODAL_INVESTMENT_INPUT: 'enabler-modal-investment-input',
    MODAL_PARTICIPANTS_INPUT: 'enabler-modal-participants-input',
    MODAL_CERTIFICATIONS_INPUT: 'enabler-modal-certifications-input',
    MODAL_ACTIVITIES_TEXTAREA: 'enabler-modal-activities-textarea',
    MODAL_GOAL_INPUT: 'enabler-modal-goal-input',
    MODAL_METRICS_INPUT: 'enabler-modal-metrics-input',
    MODAL_CANCEL_BUTTON: 'enabler-modal-cancel-button',
    MODAL_SAVE_BUTTON: 'enabler-modal-save-button',
  },

  // Continuous Monitoring (Phase 6)
  CONTINUOUS_MONITORING: {
    CONTAINER: 'continuous-monitoring-container',

    // Actions
    LOAD_EXAMPLE_BUTTON: 'monitoring-load-example-button',
    ADD_METRIC_BUTTON: 'monitoring-add-metric-button',
    ADD_FIRST_METRIC_BUTTON: 'monitoring-add-first-metric-button',

    // Filters
    FILTER_ALL_TAB: 'monitoring-filter-all-tab',
    FILTER_ON_TRACK_TAB: 'monitoring-filter-on-track-tab',
    FILTER_AT_RISK_TAB: 'monitoring-filter-at-risk-tab',
    FILTER_CRITICAL_TAB: 'monitoring-filter-critical-tab',

    // Metric Cards
    METRIC_CARD: (index: number) => `monitoring-metric-${index}-card`,
    EDIT_METRIC_BUTTON: (index: number) => `monitoring-metric-${index}-edit-button`,
    DELETE_METRIC_BUTTON: (index: number) => `monitoring-metric-${index}-delete-button`,

    // Inline Edit Form
    OBJECTIVE_ID_INPUT: (index: number) => `monitoring-metric-${index}-objective-input`,
    METRIC_NAME_INPUT: (index: number) => `monitoring-metric-${index}-name-input`,
    CATEGORY_SELECT: (index: number) => `monitoring-metric-${index}-category-select`,
    FREQUENCY_SELECT: (index: number) => `monitoring-metric-${index}-frequency-select`,
    TARGET_INPUT: (index: number) => `monitoring-metric-${index}-target-input`,
    CURRENT_INPUT: (index: number) => `monitoring-metric-${index}-current-input`,
    UNIT_INPUT: (index: number) => `monitoring-metric-${index}-unit-input`,
    STATUS_SELECT: (index: number) => `monitoring-metric-${index}-status-select`,
    TREND_SELECT: (index: number) => `monitoring-metric-${index}-trend-select`,
    SAVE_EDIT_BUTTON: (index: number) => `monitoring-metric-${index}-save-button`,
    CANCEL_EDIT_BUTTON: (index: number) => `monitoring-metric-${index}-cancel-button`,

    // Add New Metric Form
    NEW_OBJECTIVE_ID_INPUT: 'monitoring-new-objective-input',
    NEW_METRIC_NAME_INPUT: 'monitoring-new-name-input',
    NEW_CATEGORY_SELECT: 'monitoring-new-category-select',
    NEW_FREQUENCY_SELECT: 'monitoring-new-frequency-select',
    NEW_TARGET_INPUT: 'monitoring-new-target-input',
    NEW_CURRENT_INPUT: 'monitoring-new-current-input',
    NEW_UNIT_INPUT: 'monitoring-new-unit-input',
    NEW_STATUS_SELECT: 'monitoring-new-status-select',
    NEW_TREND_SELECT: 'monitoring-new-trend-select',
  },

  // Continuous Improvement (Phase 7)
  CONTINUOUS_IMPROVEMENT: {
    CONTAINER: 'continuous-improvement-container',

    // Actions
    LOAD_EXAMPLE_BUTTON: 'improvement-load-example-button',
    ADD_INITIATIVE_BUTTON: 'improvement-add-initiative-button',
    ADD_FIRST_INITIATIVE_BUTTON: 'improvement-add-first-initiative-button',

    // Filters
    FILTER_ALL_BUTTON: 'improvement-filter-all-button',
    FILTER_CAPABILITY_BUTTON: 'improvement-filter-capability-button',
    FILTER_PERFORMANCE_BUTTON: 'improvement-filter-performance-button',
    FILTER_INNOVATION_BUTTON: 'improvement-filter-innovation-button',
    FILTER_TECHNOLOGY_BUTTON: 'improvement-filter-technology-button',
    FILTER_GOVERNANCE_BUTTON: 'improvement-filter-governance-button',
    FILTER_PROCESS_BUTTON: 'improvement-filter-process-button',
    FILTER_PEOPLE_BUTTON: 'improvement-filter-people-button',

    // Initiative Cards
    INITIATIVE_CARD: (index: number) => `improvement-initiative-${index}-card`,
    EDIT_INITIATIVE_BUTTON: (index: number) => `improvement-initiative-${index}-edit-button`,
    DELETE_INITIATIVE_BUTTON: (index: number) => `improvement-initiative-${index}-delete-button`,

    // Modal Form
    MODAL_NAME_INPUT: 'improvement-modal-name-input',
    MODAL_DESCRIPTION_TEXTAREA: 'improvement-modal-description-textarea',
    MODAL_TYPE_SELECT: 'improvement-modal-type-select',
    MODAL_PRIORITY_SELECT: 'improvement-modal-priority-select',
    MODAL_STATUS_SELECT: 'improvement-modal-status-select',
    MODAL_PROGRESS_INPUT: 'improvement-modal-progress-input',
    MODAL_SPONSOR_INPUT: 'improvement-modal-sponsor-input',
    MODAL_COBIT_REF_INPUT: 'improvement-modal-cobit-ref-input',
    MODAL_TIMELINE_INPUT: 'improvement-modal-timeline-input',
    MODAL_BUDGET_INPUT: 'improvement-modal-budget-input',
    MODAL_TEAM_INPUT: 'improvement-modal-team-input',
    MODAL_EXPECTED_OUTCOME_TEXTAREA: 'improvement-modal-expected-outcome-textarea',
    MODAL_LESSONS_LEARNED_TEXTAREA: 'improvement-modal-lessons-learned-textarea',
    MODAL_CANCEL_BUTTON: 'improvement-modal-cancel-button',
    MODAL_SAVE_BUTTON: 'improvement-modal-save-button',
  },

  // Review Effectiveness (Phase 7)
  REVIEW_EFFECTIVENESS: {
    CONTAINER: 'review-effectiveness-container',

    ADD_INITIATIVE_BUTTON: 'review-add-initiative-button',
    INITIATIVE_NAME_INPUT: 'review-initiative-name-input',
    INITIATIVE_TYPE_SELECT: 'review-initiative-type-select',
    INITIATIVE_PRIORITY_SELECT: 'review-initiative-priority-select',
    INITIATIVE_DESCRIPTION_TEXTAREA: 'review-initiative-description-textarea',
    INITIATIVE_EXPECTED_OUTCOME_TEXTAREA: 'review-initiative-expected-outcome-textarea',
    INITIATIVE_STATUS_SELECT: (index: number) => `review-initiative-${index}-status-select`,
    INITIATIVE_OUTCOME_INPUT: (index: number) => `review-initiative-${index}-outcome-input`,
    INITIATIVE_LESSONS_TEXTAREA: (index: number) => `review-initiative-${index}-lessons-textarea`,
    REMOVE_INITIATIVE_BUTTON: (index: number) => `review-initiative-${index}-remove-button`,
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
