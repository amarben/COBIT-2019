# TechCorp Financial Services - COBIT 2019 Demo Tests

This directory contains comprehensive Playwright demo tests that showcase the complete COBIT 2019 implementation journey for TechCorp Financial Services Inc., a model company utilizing all features of the COBIT 2019 Implementation Platform.

## Overview

**Organization:** TechCorp Financial Services Inc.
**Industry:** Banking and Financial Technology (FinTech)
**Size:** 8,500 employees, $3.2B annual revenue
**Goal:** Establish world-class IT governance using COBIT 2019 framework

## Test Files

### End-to-End Walkthrough
- **`00-end-to-end-workflow-techcorp.spec.ts`** - Complete journey through all 13 steps in a single test (15 minutes)

### Phase 1: Foundation & Assessment
- **`01-governance-context-techcorp.spec.ts`** - Step 1: Define enterprise context, goals, and stakeholders
- **`02-capability-assessment-techcorp.spec.ts`** - Step 2: Assess current maturity across 40 objectives
- **`03-governance-design-techcorp.spec.ts`** - Step 3: Design governance framework and structures

### Phase 2: Process & Practice Definition
- **`04-governance-objectives-techcorp.spec.ts`** - Step 4: Configure 5 EDM governance objectives
- **`05-management-objectives-techcorp.spec.ts`** - Step 5: Select 32 management objectives
- **`06-component-definition-techcorp.spec.ts`** - Step 6: Define 48 governance components

### Phase 3: Implementation & Operationalization
- **`07-priority-implementation-techcorp.spec.ts`** - Step 7: Implement in 4 prioritized waves
- **`08-performance-measurement-techcorp.spec.ts`** - Step 8: Establish 30 KPIs and metrics
- **`09-enabler-deployment-techcorp.spec.ts`** - Step 9: Deploy 26 enablers across 4 categories

### Phase 4: Monitoring & Improvement
- **`10-continuous-monitoring-techcorp.spec.ts`** - Step 10: Monitor governance, risk, compliance, performance
- **`11-internal-assessment-techcorp.spec.ts`** - Step 11: Conduct Q2 2024 capability assessment
- **`12-performance-analysis-techcorp.spec.ts`** - Step 12: Analyze performance and root causes
- **`13-continuous-improvement-techcorp.spec.ts`** - Step 13: Launch 6 strategic improvement initiatives

## Running the Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Start the development server:
```bash
npm run dev
```

### Run Individual Tests

Run a specific step demo:
```bash
# End-to-end complete walkthrough (recommended first watch)
npx playwright test 00-end-to-end-workflow-techcorp.spec.ts

# Individual steps
npx playwright test 01-governance-context-techcorp.spec.ts
npx playwright test 06-component-definition-techcorp.spec.ts
npx playwright test 13-continuous-improvement-techcorp.spec.ts
```

### Run All TechCorp Demos in Sequence

Run all tests in order:
```bash
# Run all TechCorp tests
npx playwright test tests/*-techcorp.spec.ts --workers=1

# With headed browser (watch the automation)
npx playwright test tests/*-techcorp.spec.ts --workers=1 --headed

# Slow motion for better visibility
npx playwright test tests/*-techcorp.spec.ts --workers=1 --headed --slow-mo=1000
```

### Run by Phase

Run specific phases:
```bash
# Phase 1 tests (Steps 1-3)
npx playwright test tests/0[1-3]-*-techcorp.spec.ts --workers=1

# Phase 2 tests (Steps 4-6)
npx playwright test tests/0[4-6]-*-techcorp.spec.ts --workers=1

# Phase 3 tests (Steps 7-9)
npx playwright test tests/0[7-9]-*-techcorp.spec.ts --workers=1

# Phase 4 tests (Steps 10-13)
npx playwright test tests/1[0-3]-*-techcorp.spec.ts --workers=1
```

## Test Features

### Console Narratives
All tests include detailed console logging that provides a narrative walkthrough:
- Step-by-step progress indicators
- Data being entered/configured
- Metrics and analysis results
- Success confirmations
- Visual separators for clarity

### Cursor Tracking
All tests use visual cursor tracking (red circle) to help viewers follow the automation.

### Realistic Timings
Tests include appropriate wait times to simulate realistic user interactions and make demos easier to follow.

## What Each Test Demonstrates

### Step 1: Governance Context
- Organization profile (TechCorp Financial Services)
- All 13 enterprise goals across 4 BSC perspectives
- Key stakeholders (Board, CEO, CRO) with their needs
- Design factors (strategic enabler role)

### Step 2: Capability Assessment
- 40 COBIT objectives assessed (0-5 scale)
- Domain-level maturity (EDM, APO, BAI, DSS, MEA)
- Capability gaps identified
- Target maturity levels set

### Step 3: Governance Design
- Governance principles defined
- IT Steering Committee established
- Decision rights and structures
- Governance charter

### Step 4: Governance Objectives
- 5 EDM objectives enabled
- 15 governance practices
- High-priority focus areas
- Practice implementation status

### Step 5: Management Objectives
- 32 of 40 objectives enabled (80% coverage)
- Domain-specific priorities
- APO12 (Risk), APO13 (Security), DSS05 (Security Services)
- 112 management practices defined

### Step 6: Component Definition
- 48 components across 6 categories
- Organizational structures (IT Steering Committee, SOC, ARB)
- Processes (Portfolio, Risk, Change management)
- Information flows (Dashboards, reports)
- Culture programs (Security awareness)
- Skills development (Certifications, training)
- Technology platforms (GRC, ITSM, SIEM)

### Step 7: Priority Implementation
- 4-wave implementation approach
- Wave 1 complete (foundation)
- Wave 2 in progress (value & performance)
- 68/127 practices implemented (54%)

### Step 8: Performance Measurement
- 30 comprehensive KPIs
- IT Balanced Scorecard
- Governance, strategic, operational, compliance metrics
- Current vs. target performance
- Red/Yellow/Green status indicators

### Step 9: Enabler Deployment
- 26 enablers across 4 categories
- Policies (7 completed, including security framework)
- Tools ($5.05M investment: ServiceNow GRC, Splunk SIEM)
- Skills ($570K annual training budget, 32 cloud certs)
- Culture (Security awareness, governance champions)

### Step 10: Continuous Monitoring
- 4 monitoring areas operational
- Governance dashboard (3.2/5.0 effectiveness)
- 45 active risks tracked
- 5 regulatory frameworks monitored
- IT Balanced Scorecard (mixed performance)

### Step 11: Internal Assessment
- Q2 2024 assessment results
- Current capability: 2.4, Target: 4.0
- Domain-level analysis
- Critical gaps identified (EDM02, APO04)
- 2024-2025 improvement roadmap

### Step 12: Performance Analysis
- 30 KPIs analyzed (7 Green, 15 Yellow, 8 Red)
- Root cause analysis for 9 priority KPIs
- Corrective actions defined
- Industry benchmarking
- Performance improvement targets

### Step 13: Continuous Improvement
- 6 strategic improvement initiatives
- Total investment: $13.6M
- Expected benefits: $12M+ savings
- Initiatives 15-50% complete
- Lessons learned captured
- 2025 roadmap defined

### End-to-End Workflow
- Complete journey through all 13 steps
- Condensed narrative format
- Phase summaries
- Final implementation summary
- Achievement metrics
- Next steps for TechCorp

## Test Data Highlights

### TechCorp by the Numbers
- **Enterprise Goals:** 13/13 selected (comprehensive coverage)
- **COBIT Objectives:** 32/40 enabled (80%)
- **Governance Components:** 48 defined
- **Practices:** 127 tracked, 68 implemented (54%)
- **KPIs:** 30 comprehensive metrics
- **Enablers:** 26 deployed (66% complete)
- **Investment:** $5.6M (enablers) + $13.6M (improvements)
- **Maturity Journey:** 2.4 → 3.5 target by 2025
- **Strategic Initiatives:** 6 active improvement programs

### Key Stakeholders
- Board of Directors
- Chief Executive Officer
- Chief Risk Officer
- Chief Information Officer
- Chief Information Security Officer
- Chief Data Officer

### Critical Objectives (High Priority)
- EDM01: Governance Framework
- EDM02: Benefits Delivery
- EDM03: Risk Optimization
- APO12: Managed Risk
- APO13: Managed Security
- DSS05: Managed Security Services
- MEA03: Managed Compliance

## Use Cases

### 1. Product Demonstrations
Perfect for showcasing the COBIT 2019 Implementation Platform to:
- Potential clients
- Executive stakeholders
- Governance professionals
- IT auditors
- Compliance teams

### 2. Training and Education
Use these demos to:
- Train new users on the platform
- Teach COBIT 2019 framework concepts
- Demonstrate best practices
- Show real-world implementation examples

### 3. Quality Assurance
- Comprehensive end-to-end testing
- Verify all features work as expected
- Regression testing after updates
- Integration testing

### 4. Documentation
- Living documentation of features
- Examples of proper data input
- Reference for implementation guidance

## Customization

To create demos for your own organization:

1. Copy a TechCorp test file
2. Replace organization details:
   - Company name and profile
   - Industry and size
   - Enterprise goals
   - Stakeholder information
3. Adjust capability levels based on your maturity
4. Customize objectives, components, and metrics
5. Update timelines and budgets

## Tips for Best Demo Experience

1. **Use Headed Mode:** `--headed` flag shows the browser
2. **Slow Motion:** `--slow-mo=1000` makes actions visible
3. **Full Screen:** Maximize browser window during demo
4. **Console Visible:** Keep terminal/console visible for narrative
5. **Sequential Execution:** Use `--workers=1` to run tests in order
6. **Start with End-to-End:** Run `00-end-to-end` first for overview
7. **Then Dive Deep:** Run individual steps for detailed walkthroughs

## Expected Test Duration

- **End-to-End Workflow:** ~15 minutes
- **Individual Steps:** 3-8 minutes each
- **All 13 Steps Sequentially:** ~60 minutes
- **Single Phase:** 10-20 minutes

## Troubleshooting

**Tests fail with "element not found":**
- Ensure dev server is running on `http://localhost:5173`
- Check that app components use expected placeholders/labels
- Verify localStorage is cleared at test start

**Tests run too fast:**
- Add `--slow-mo=1000` or higher for slower execution
- Increase `waitForTimeout` values in test files

**Can't see what's happening:**
- Use `--headed` flag to show browser
- Maximize browser window
- Ensure cursor tracking is enabled

## Contributing

When adding new TechCorp demo tests:
1. Follow the naming convention: `##-step-name-techcorp.spec.ts`
2. Include cursor tracking: `await enableCursorTracking(page)`
3. Add comprehensive console logging
4. Use realistic wait times
5. Include success indicators (✅ ❌ 🔄)
6. Update this README with test description

## License

This demonstration code is part of the COBIT 2019 Implementation Platform. COBIT® 2019 is a registered trademark of ISACA®. This implementation is not affiliated with or endorsed by ISACA.

---

**Happy Demoing! 🎬**

For questions or issues, please refer to the main project README or implementation status documentation.
