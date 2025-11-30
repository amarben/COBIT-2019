# Video 3: Phase 3 - Goals Cascade (10-12 minutes)

## Video Objectives
By the end of this video, students will:
- Understand the COBIT 2019 Goals Cascade methodology
- Know how to map Enterprise Goals to Alignment Goals to Objectives
- Understand Primary (P) vs Secondary (S) relationships
- Be able to get AI-recommended objectives based on their goals
- Know how to incorporate Design Factors

---

## Script

### INTRO (30 seconds)

**[Screen: Dashboard, Phase 3 expanded]**

"Welcome to Phase 3: Where Do We Want to Be? This is where we define our target state using one of COBIT's most powerful tools - the Goals Cascade.

The Goals Cascade helps you translate high-level enterprise goals into specific, actionable COBIT objectives. Let's see how it works!"

---

### SECTION 1: Understanding the Goals Cascade (2 minutes)

**[Screen: Navigate to Phase 3 > Goals Cascade or Target State]**

"The COBIT 2019 Goals Cascade is a three-level hierarchy:

**[Show the visual cascade if available, or explain while showing the interface]**

#### Level 1: Enterprise Goals
At the top, we have 13 Enterprise Goals. These are high-level business objectives that any organization might have, such as:
- Stakeholder value of business investments
- Portfolio of competitive products and services
- Managed business risk
- Compliance with external laws and regulations

These are BUSINESS goals, not IT goals.

#### Level 2: Alignment Goals
In the middle, we have 13 Alignment Goals. These are I&T-related goals that support the enterprise goals:
- I&T compliance and support for business compliance
- Managed I&T-related risk
- Realized benefits from I&T investments
- Security of information and privacy

These bridge the gap between business and IT.

#### Level 3: Governance & Management Objectives
At the bottom, we have 40 COBIT objectives (5 governance EDM + 35 management):
- EDM01, EDM02, EDM03, EDM04, EDM05
- APO01 through APO14
- BAI01 through BAI11
- DSS01 through DSS06
- MEA01 through MEA04

These are the specific practices you'll implement.

#### Relationships: Primary vs Secondary

Each connection in the cascade is labeled:
- **P (Primary):** Strong, direct relationship - this is critical
- **S (Secondary):** Supporting relationship - this helps

This helps you prioritize which objectives matter most for your goals."

---

### SECTION 2: Selecting Enterprise Goals (3 minutes)

**[Screen: Show Enterprise Goals section]**

"Let's start by selecting the Enterprise Goals that matter most to Acme Financial Services.

Remember our business drivers from Phase 1:
- Regulatory compliance
- Digital transformation
- Risk management

Let me select relevant Enterprise Goals:

**[Click to select/check EG03]**

**EG03: Managed Business Risk**
This directly supports our risk management driver. Essential for financial services!

**[Click to select/check EG04]**

**EG04: Compliance with External Laws and Regulations**
Critical for our regulatory compliance driver - GDPR, PCI-DSS, financial regulations.

**[Click to select/check EG02]**

**EG02: Portfolio of Competitive Products and Services**
Supports our digital transformation initiative - we need to innovate.

**[Click to select/check EG06]**

**EG06: Business Service Continuity and Availability**
Banking services must be highly available. Downtime costs money and reputation.

**[Click to select/check EG08]**

**EG08: Quality of Management Information**
Board needs accurate information for decision-making. Regulatory requirement as well.

**[Show the 5 selected enterprise goals highlighted]**

These 5 enterprise goals represent Acme's strategic priorities. Now let's see which Alignment Goals support them."

---

### SECTION 3: Viewing Recommended Alignment Goals (2 minutes)

**[Screen: Scroll down or click 'Show Recommendations']**

"Once you select Enterprise Goals, the system automatically calculates which Alignment Goals are most important.

**[Point to the Alignment Goals section showing recommendations]**

Look at this! The system shows:

**[Point to first few alignment goals]**

**AG02: Managed I&T-Related Risk** - IMPORTANCE: HIGH
- Primary relationship to EG03 and EG06
- This is critical because it has multiple primary connections

**AG07: Security of Information, Privacy** - IMPORTANCE: HIGH
- Primary relationship to EG03
- Secondary to EG04 and EG06
- Essential for both risk and compliance goals

**AG01: I&T Compliance and Support for Compliance** - IMPORTANCE: HIGH
- Primary to EG04
- Directly supports our regulatory compliance need

**AG05: Delivery of I&T Services in Line with Requirements** - IMPORTANCE: HIGH
- Primary to EG06
- Critical for service continuity

**[Point to importance indicator]**

The importance rating is calculated based on:
- How many primary (P) relationships
- How many secondary (S) relationships
- Primary relationships are weighted higher

#### Selecting Alignment Goals

**[Click to select the high-importance alignment goals]**

I'm going to select all the HIGH importance goals:
- AG01 (Compliance)
- AG02 (Risk)
- AG05 (Service Delivery)
- AG07 (Security & Privacy)

**[Also select a couple medium importance ones]**

And a couple MEDIUM importance goals that support our digital transformation:
- AG06 (Agility)
- AG08 (Integration)

**[Show selection summary]**

We now have 6 Alignment Goals selected that bridge our enterprise goals to specific COBIT objectives."

---

### SECTION 4: Recommended COBIT Objectives (2 minutes)

**[Screen: Scroll down to Recommended Objectives section]**

"This is where it all comes together! Based on our Alignment Goals, the system recommends specific COBIT objectives.

**[Show the recommended objectives list]**

Look at this prioritized list:

#### High Priority Objectives (RED/DARK color)

**[Point to high priority items]**

- **EDM03: Ensured Risk Optimization** - Primary to AG02 (Risk)
- **APO12: Managed Risk** - Primary to AG02
- **APO13: Managed Security** - Primary to AG07 (Security)
- **DSS05: Managed Security Services** - Primary to AG07
- **DSS02: Managed Service Requests and Incidents** - Primary to AG05

These HIGH priority objectives have multiple primary relationships - they're critical!

#### Medium Priority Objectives (ORANGE/YELLOW color)

**[Point to medium priority]**

- **EDM01: Governance Framework** - Supports multiple goals
- **APO01: I&T Management Framework** - Foundation for all
- **BAI05: Managed Organizational Change** - Supports AG06 (Agility)

#### Low Priority Objectives (GREEN/LIGHT color)

**[Point to low priority if visible]**

These have mainly secondary relationships - still relevant but lower urgency.

#### Filtering by Domain

**[Show domain filter if available]**

You can filter by domain:
- Governance (EDM)
- Align, Plan, Organize (APO)
- Build, Acquire, Implement (BAI)
- Deliver, Service, Support (DSS)
- Monitor, Evaluate, Assess (MEA)

**[Point to the mix of domains]**

Notice we have recommendations across all domains - that's normal! Governance is holistic."

---

### SECTION 5: Design Factors (2 minutes)

**[Screen: Navigate to Design Factors section or scroll down]**

"Before we finalize our scope, let's consider Design Factors. COBIT defines 11 design factors that influence how you implement governance:

**[Show the 11 design factors]**

1. Enterprise Strategy
2. Enterprise Goals
3. Risk Profile
4. I&T-Related Issues
5. Threat Landscape
6. Compliance Requirements
7. Role of IT
8. Sourcing Model for IT
9. IT Implementation Methods
10. Technology Adoption Strategy
11. Enterprise Size

Let me set a few relevant to Acme:

**[Click to expand DF3: Risk Profile]**

**[Select 'High' risk appetite, or appropriate settings]**

Risk Profile: High risk environment
- Financial services is highly regulated
- Recent cybersecurity incidents
- External threat landscape

**[Click to expand DF4: I&T-Related Issues]**

**[The issues from Phase 2 should auto-populate here if integrated]**

I&T-Related Issues: (Auto-populated from Phase 2)
- Ransomware attack
- No data retention policy
- Legacy systems

**[Click to expand DF6: Compliance Requirements]**

Compliance Requirements: Extensive
- GDPR (data protection)
- PCI-DSS (payment card security)
- Financial services regulations
- Annual external audits required

**[Click to expand DF7: Role of IT]**

Role of IT: Support
- IT primarily supports business operations
- Enabling digital transformation
- Not a pure technology company

**[Click to expand DF8: Sourcing Model]**

Sourcing Model: Hybrid
- Core systems internal
- Cloud services for email, collaboration
- Some outsourced infrastructure management

**[Show summary]**

These design factors will influence:
- Which practices you prioritize within each objective
- How you tailor the implementation
- Your target capability levels"

---

### SECTION 6: Finalizing Scope (1 minute)

**[Screen: Show the final recommended objectives or summary view]**

"Now we have everything we need to finalize our Phase 3 scope:

**[Show summary or create a list]**

✅ **Selected Enterprise Goals:** 5 goals (Risk, Compliance, Innovation, Availability, Information Quality)

✅ **Selected Alignment Goals:** 6 goals (Compliance, Risk, Service Delivery, Security, Agility, Integration)

✅ **Recommended Objectives:** 15-20 prioritized COBIT objectives across all domains

✅ **Design Factors:** Defined for high-risk, highly-regulated financial services environment

**[Point to objectives list]**

This list of objectives becomes our implementation scope for Phase 5. But first, we need Phase 4 - planning and business case!"

---

### SECTION 7: Comparison with Capability Assessment (1 minute)

**[Screen: Switch between Goals Cascade view and Capability Assessment]**

"One powerful check is to compare the Goals Cascade recommendations with your Capability Assessment from Phase 2.

**[Show capability assessment with high-gap objectives highlighted]**

Remember in Phase 2, we identified objectives with large capability gaps? Let's compare:

**From Capability Assessment (Phase 2) - High Gaps:**
- EDM03 (Risk): Gap of 2 levels
- APO01 (Framework): Gap of 2 levels
- APO13 (Security): Gap of 2 levels

**From Goals Cascade (Phase 3) - High Priority:**
- EDM03 (Risk): HIGH priority
- APO13 (Security): HIGH priority
- APO01 (Framework): MEDIUM priority

**[Point out the alignment]**

Perfect alignment! The objectives we need to improve most (from capability assessment) are the same ones the Goals Cascade recommends (from business goals).

This validates our approach - we're on the right track!"

---

### SECTION 8: Next Steps (30 seconds)

**[Screen: Dashboard]**

"Let's check our progress.

**[Point to Phase 3 completion indicator]**

Phase 3 is now complete! We have:
✅ Selected strategic Enterprise Goals
✅ Identified supporting Alignment Goals
✅ Generated recommended COBIT Objectives
✅ Documented Design Factors
✅ Validated against Capability Assessment

Next up is Phase 4: What Needs to Be Done? We'll build the business case, identify quick wins, and create an implementation roadmap."

---

### OUTRO (30 seconds)

**[Screen: Dashboard or Goals Cascade visualization]**

"The Goals Cascade is one of the most powerful tools in COBIT 2019. It ensures your IT governance implementation is directly linked to business goals - not just 'IT for IT's sake.'

This top-down approach:
- Gets buy-in from business stakeholders
- Justifies the investment
- Focuses effort on what matters most
- Creates clear line of sight from strategy to execution

In the next video, we'll build the business case and plan our implementation. See you there!"

---

## Recording Status

- **Playwright Test:** ✅ PASSING - Automated recording successful!
- **Video Generated:** ✅ `video-output/03-phase3-goals-cascade.webm` (5.0MB, ~50s)
- **Test Command:** `npm run test:video:03:headless` (test) / `npm run test:video:03` (generate video)
- **Last Regenerated:** 2024-11-28
- **Generation Method:** Automated Playwright with conditional checks and generous waits

### Automation Success

Automated Playwright recording works by **removing strict assertions** and using **conditional checks with generous waits**. The test demonstrates the UI visually without expecting specific elements to exist.

---

## Recording Notes

### Before Recording:
1. ✅ Continue with data from Video 2 (don't clear localStorage)
2. ✅ Ensure Phase 1 and 2 data is complete
3. ✅ Have the 13 Enterprise Goals reference handy
4. ✅ Review Primary vs Secondary relationship definitions

### Recording Setup:
- **Screen Resolution:** 1920x1080
- **Font size:** May need to zoom out to 90% to show full cascade
- **Highlight clicks** - especially when selecting goals
- **Use cursor emphasis** for P vs S indicators

### Visual Enhancements (Post-Production):
- [ ] Add animated diagram showing cascade flow (Enterprise → Alignment → Objectives)
- [ ] Highlight Primary (P) vs Secondary (S) with colored boxes
- [ ] Add side-by-side comparison of Phase 2 gaps and Phase 3 recommendations
- [ ] Use callout boxes for importance ratings (HIGH/MEDIUM/LOW)
- [ ] Add chapter markers for each section

---

## Key Points to Emphasize

1. **Top-Down Approach** - Start with business goals, not IT objectives
2. **Primary vs Secondary** - Understand relationship strength
3. **Automatic Recommendations** - System calculates importance scores
4. **Cross-Validation** - Compare with Phase 2 capability gaps
5. **Design Factors Matter** - They influence how you implement
6. **Not Everything** - You don't implement all 40 objectives, focus on what matters

---

## Visual Aids to Consider

### Cascade Flow Diagram (Create for overlay):
```
[Enterprise Goals (13)]
        ↓ (P/S relationships)
[Alignment Goals (13)]
        ↓ (P/S relationships)
[COBIT Objectives (40)]
```

### Priority Matrix (Create for overlay):
```
HIGH Priority → Multiple Primary relationships → Implement First
MEDIUM Priority → Mix of Primary/Secondary → Implement Second
LOW Priority → Mostly Secondary → Consider for later phases
```

---

## Estimated Timing

| Section | Duration |
|---------|----------|
| Intro | 0:30 |
| Understanding Goals Cascade | 2:00 |
| Selecting Enterprise Goals | 3:00 |
| Recommended Alignment Goals | 2:00 |
| Recommended COBIT Objectives | 2:00 |
| Design Factors | 2:00 |
| Finalizing Scope | 1:00 |
| Comparison with Assessment | 1:00 |
| Next Steps | 0:30 |
| Outro | 0:30 |
| **Total** | **14:30** |

Target: 10-12 minutes after editing (speed up some sections)

---

## Common Student Questions (Address in Video)

**Q: "Do I have to select all high-priority recommendations?"**
A: No! Use your judgment. High priority means strong alignment to goals, but resource constraints and other factors apply.

**Q: "What if my capability assessment doesn't match the Goals Cascade?"**
A: That's a red flag! Either:
- Your enterprise goals don't match your actual drivers
- Your capability assessment needs revision
- You have other factors (compliance, risk) driving different priorities

**Q: "Should I start with governance (EDM) or management objectives?"**
A: Both! EDM provides the governance framework, but management objectives do the actual work. Implement in parallel where possible.

---

## Reference Information

### 13 Enterprise Goals (Quick Reference):
1. Stakeholder value
2. Competitive products/services
3. Managed business risk
4. Compliance with regulations
5. Customer service culture
6. Business continuity
7. Agility
8. Management information quality
9. Process functionality optimization
10. Process cost optimization
11. Skilled people
12. Innovation culture
13. Change program management

### 13 Alignment Goals (Quick Reference):
1. Compliance support
2. I&T risk management
3. Benefits realization
4. Financial information quality
5. Service delivery
6. Agility
7. Security & privacy
8. Application integration
9. Program delivery
10. I&T information quality
11. Internal policy compliance
12. Competent staff
13. Innovation expertise
