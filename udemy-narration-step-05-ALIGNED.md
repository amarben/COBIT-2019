# Step 5: Management Objectives (APO/BAI/DSS/MEA) - Demo Narration
## Video Demo: Selecting Management Objectives (Demonstration Version)

**Source:** Based on actual test implementation `tests/05-management-objectives-techcorp.spec.ts`
**Duration:** ~3-4 minutes
**Audience:** IT Management, Process Owners, Governance Teams

---

## **IMPORTANT NOTE**

This is the **demonstration version** that shows the workflow with a simplified dataset. The Udemy course describes a comprehensive enterprise implementation with all 32 objectives. Both versions are valid - this demo prioritizes clarity and execution speed.

---

## Video Narration

Welcome to Step 5: Management Objectives in the COBIT 2019 Implementation Platform. Having completed our governance objectives in Step 4, we now select the management objectives across APO, BAI, DSS, and MEA domains. For this demonstration, we'll select 12 key objectives that represent TechCorp's priorities.

### APO Domain: Align, Plan, Organize

We begin with the APO domain. Click the sidebar item "APO: Align, Plan, Organize" to navigate to this domain. The platform displays all 14 APO objectives as cards. We'll select 4 strategic objectives that are critical for TechCorp.

**APO01: IT Management Framework** - We click the toggle button to enable this objective. This is HIGH priority because it provides the foundational management structure. We see the card highlight to show it's selected.

**APO02: Strategy** - We enable this HIGH priority objective. IT strategy must be aligned with enterprise strategy, making this critical for TechCorp's digital transformation goals.

**APO11: Quality** - We enable this objective and set the priority dropdown to MEDIUM. Quality management is important but TechCorp already has a mature baseline, so it's not highest priority.

**APO13: Security** - We enable this HIGH priority objective. As a financial services firm, information security is paramount. TechCorp targets level 5 maturity for security.

We've now selected 4 APO objectives showing HIGH, HIGH, MEDIUM, HIGH priorities.

### BAI Domain: Build, Acquire, Implement

Now we navigate to the BAI domain by clicking "BAI: Build, Acquire, Implement" in the sidebar. We'll select 3 objectives focused on solution delivery and change management.

**BAI02: Requirements Definition** - We enable this HIGH priority objective. Clear requirements are essential for successful solution delivery and avoiding rework.

**BAI06: Manage Changes** - We enable this HIGH priority objective. Change management is critical for minimizing service disruptions. TechCorp already has mature change processes but wants to reach predictable levels.

**BAI10: Configuration Management** - We enable this objective and set priority to MEDIUM. CMDB accuracy needs improvement from 87% to 95%, but this is planned for Wave 3 implementation.

We've now selected 3 BAI objectives.

### DSS Domain: Deliver, Service, Support

We navigate to the DSS domain by clicking "DSS: Deliver, Service, Support." This is TechCorp's strongest domain operationally. We'll select 3 key operational objectives.

**DSS01: Manage Operations** - We enable this HIGH priority objective. Operational excellence is a strength that TechCorp wants to maintain and improve to Level 4 predictability.

**DSS05: Manage Security Services** - We enable this HIGH priority objective. The 24/7 Security Operations Center provides critical security services requiring continuous improvement.

**DSS06: Manage Business Process Controls** - We enable this HIGH priority objective. As a regulated financial institution, business process controls are essential for SOX compliance and operational integrity.

We've now selected 3 DSS objectives, all high priority reflecting operational criticality.

### MEA Domain: Monitor, Evaluate, Assess

Finally, we navigate to the MEA domain by clicking "MEA: Monitor, Evaluate, Assess." We'll select 2 objectives focused on performance and compliance monitoring.

**MEA01: Performance Monitoring** - We enable this HIGH priority objective. TechCorp needs comprehensive performance monitoring with 30 KPIs across the IT Balanced Scorecard.

**MEA02: Internal Control System** - We enable this HIGH priority objective. Internal controls are essential for SOX compliance and maintaining control effectiveness.

We've now completed our selection of 12 management objectives.

### Summary and Next Steps

The platform displays our configuration summary:
- **APO Domain:** 4 of 14 objectives selected
- **BAI Domain:** 3 of 11 objectives selected
- **DSS Domain:** 3 of 6 objectives selected
- **MEA Domain:** 2 of 4 objectives selected
- **Total:** 12 management objectives selected

These 12 objectives represent TechCorp's highest priorities for this demonstration. In a comprehensive enterprise implementation, TechCorp would select approximately 32 of the 35 available management objectives with detailed practice-level configuration.

This demonstration shows the selection workflow - navigating between domains, enabling objectives via toggle buttons, and setting priority levels. The platform makes it easy to configure governance and management scope, ensuring TechCorp focuses resources on objectives that deliver the most business value.

With management objectives selected, we're ready to move to Step 6: Component Definition where we'll define the processes, structures, policies, and technologies that enable these objectives.

---

## Key TechCorp Configuration (Demo Version)

### APO (Align, Plan, Organize)
| Objective | Priority | Current | Target | Gap | Rationale |
|-----------|----------|---------|--------|-----|-----------|
| APO01: IT Management Framework | High | 2 | 4 | 2 | Foundation for integrated management |
| APO02: Strategy Management | High | 3 | 4 | 1 | Alignment with enterprise strategy |
| APO11: Quality Management | Medium | 3 | 4 | 1 | Mature baseline, continuous improvement |
| APO13: Managed Security | High | 3 | 5 | 2 | Critical for financial services |

### BAI (Build, Acquire, Implement)
| Objective | Priority | Current | Target | Gap | Rationale |
|-----------|----------|---------|--------|-----|-----------|
| BAI02: Requirements Definition | High | 2 | 4 | 2 | Reduce defects and rework |
| BAI06: Manage IT Changes | High | 3 | 4 | 1 | Minimize service disruptions |
| BAI10: Configuration Management | Medium | 2 | 4 | 2 | Improve CMDB accuracy to 95% |

### DSS (Deliver, Service, Support)
| Objective | Priority | Current | Target | Gap | Rationale |
|-----------|----------|---------|--------|-----|-----------|
| DSS01: Manage Operations | High | 3 | 4 | 1 | Operational excellence |
| DSS05: Manage Security Services | High | 3 | 5 | 2 | 24/7 SOC operations |
| DSS06: Manage Business Process Controls | High | 3 | 4 | 1 | SOX compliance |

### MEA (Monitor, Evaluate, Assess)
| Objective | Priority | Current | Target | Gap | Rationale |
|-----------|----------|---------|--------|-----|-----------|
| MEA01: Performance Monitoring | High | 2 | 4 | 2 | IT Balanced Scorecard with 30 KPIs |
| MEA02: Internal Control System | High | 3 | 4 | 1 | SOX IT controls |

---

## Platform Features Demonstrated

1. **Domain Navigation:** Sidebar navigation between APO, BAI, DSS, MEA
2. **Objective Cards:** Visual cards for each objective with toggle buttons
3. **Enable/Disable:** Simple toggle to select objectives
4. **Priority Assignment:** Dropdown to set High/Medium/Low priority
5. **Real-Time Summary:** Status display showing selection progress
6. **Responsive UI:** Smooth navigation and state management

---

## Note: Demo vs. Full Implementation

**This Demo Version:**
- 12 objectives selected (simplified for clarity)
- Focus on demonstrating workflow
- Runtime: ~3-4 minutes

**Full Enterprise Implementation (Udemy Course):**
- 32 of 35 objectives selected (91% coverage)
- APO: 12/14, BAI: 10/11, DSS: 6/6, MEA: 4/4
- 110 of 160 practices configured (69%)
- Comprehensive priority distribution: 18 High, 12 Medium, 2 Low
- Detailed practice-level configuration

Both versions are valid - the demo shows HOW to use the platform, the full version shows WHAT a comprehensive implementation looks like.

---

**Next Step:** Step 6 - Component Definition (Define governance components)
