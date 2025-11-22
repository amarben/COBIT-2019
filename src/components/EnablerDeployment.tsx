import React from 'react'
import { Wrench, CheckCircle, Clock, FileText, Laptop, GraduationCap, Users } from 'lucide-react'
import { AppData } from '../types'
import DisclaimerBanner from './DisclaimerBanner'

interface EnablerDeploymentProps {
  appData: AppData
  updateAppData: (updates: Partial<AppData>) => void
}

const EnablerDeployment: React.FC<EnablerDeploymentProps> = () => {
  // TechCorp Financial Services Enabler Deployment Data
  const policies = [
    {
      name: 'IT Governance Policy',
      status: 'Completed',
      version: 'v2.1',
      approved: 'March 2024',
      scope: 'Governance framework, roles, decision rights'
    },
    {
      name: 'Enterprise Risk Management Policy',
      status: 'Completed',
      version: 'v3.0',
      approved: 'January 2024',
      scope: 'Risk appetite, assessment, treatment'
    },
    {
      name: 'Information Security Policy Framework',
      status: 'Completed',
      version: 'Multiple',
      approved: '2024',
      scope: '15 security policies, annual review cycle'
    },
    {
      name: 'Change Management SOPs',
      status: 'Completed',
      version: 'v1.5',
      approved: '2024',
      scope: '8 procedures, CAB charter, escalation'
    },
    {
      name: 'Business Continuity & DR Plans',
      status: 'Completed',
      version: 'Multiple',
      approved: '2024',
      scope: '25 app-specific BC/DR plans, bi-annual testing'
    },
    {
      name: 'Vendor Management Policy',
      status: 'Completed',
      version: 'v2.0',
      approved: '2024',
      scope: 'Vendor lifecycle, risk assessment'
    },
    {
      name: 'Data Governance Policy',
      status: 'In Progress',
      version: 'Draft',
      approved: 'Pending',
      scope: 'Data classification, privacy, quality'
    }
  ]

  const tools = [
    {
      name: 'ServiceNow GRC Platform',
      status: 'Completed',
      deployed: 'February 2024',
      modules: 'Risk, Compliance, Policy, Audit',
      users: '150 licenses',
      investment: '$800K'
    },
    {
      name: 'ServiceNow ITSM Platform',
      status: 'Completed',
      deployed: 'Production',
      modules: 'Incident, Problem, Change, Service Catalog',
      users: 'All IT staff',
      investment: '$1.2M'
    },
    {
      name: 'Splunk Enterprise Security (SIEM)',
      status: 'Completed',
      deployed: 'Production',
      modules: '500+ log sources, 75 correlation searches',
      users: 'SOC team',
      investment: '$1.5M'
    },
    {
      name: 'Cloud Security Posture Management',
      status: 'Completed',
      deployed: 'Production',
      modules: 'Palo Alto Prisma Cloud - AWS, Azure',
      users: 'Security & Cloud teams',
      investment: '$400K'
    },
    {
      name: 'Identity and Access Management',
      status: 'In Progress (75%)',
      deployed: 'Phased rollout',
      modules: 'Okta Enterprise - Target: Full SSO Q4 2024',
      users: 'All employees',
      investment: '$600K'
    },
    {
      name: 'Cloud FinOps Platform',
      status: 'In Progress (60%)',
      deployed: 'Implementation',
      modules: 'CloudHealth - Target: Q3 2024',
      users: 'FinOps team',
      investment: '$300K'
    },
    {
      name: 'Enterprise Architecture Tool',
      status: 'In Progress (50%)',
      deployed: 'Implementation',
      modules: 'LeanIX - Target: Q4 2024',
      users: 'Architecture team',
      investment: '$250K'
    }
  ]

  const skillsPrograms = [
    {
      name: 'COBIT 2019 Foundation Training',
      status: 'Completed',
      participants: '45 IT leaders and governance team',
      certifications: '12 COBIT certified',
      investment: '$50K'
    },
    {
      name: 'Cloud Certifications Program',
      status: 'In Progress',
      participants: 'Target: 50 cloud-certified engineers',
      certifications: '32 certified (AWS, Azure, GCP)',
      investment: '$200K annually'
    },
    {
      name: 'Cybersecurity Skills Development',
      status: 'Completed',
      participants: 'Security team',
      certifications: '18 (CISSP, CISM, Security+, CEH)',
      investment: '$150K'
    },
    {
      name: 'Agile and DevOps Training',
      status: 'Completed',
      participants: '200 IT staff trained',
      certifications: 'CSM, DevOps Foundation',
      investment: '$100K'
    },
    {
      name: 'Risk Management Training',
      status: 'Completed',
      participants: '85 risk owners and first-line',
      certifications: 'Internal certification',
      investment: '$40K'
    },
    {
      name: 'Data Privacy and GDPR Training',
      status: 'Completed',
      participants: 'Mandatory for all IT staff',
      certifications: '98% completion rate',
      investment: '$30K'
    }
  ]

  const cultureInitiatives = [
    {
      name: 'Governance Culture Initiative',
      status: 'In Progress',
      activities: 'Town halls, governance champions, awareness campaigns',
      goal: 'Embed governance mindset across IT',
      metrics: 'Governance awareness: 78%'
    },
    {
      name: 'Cybersecurity Awareness Program',
      status: 'Completed',
      activities: 'Monthly phishing sims, quarterly training, 50 security champions',
      goal: 'Security-first culture',
      metrics: 'Phishing click rate: <5%'
    },
    {
      name: 'Continuous Improvement Program',
      status: 'In Progress',
      activities: 'Retrospectives, kaizen events, improvement boards',
      goal: '100 improvements implemented annually',
      metrics: 'Current: 65 improvements YTD'
    },
    {
      name: 'Customer-Centric Service Culture',
      status: 'In Progress',
      activities: 'Service design thinking, customer journey mapping',
      goal: 'IT as trusted business partner',
      metrics: 'Customer satisfaction: 3.8/5.0'
    }
  ]

  const policiesCompleted = policies.filter(p => p.status === 'Completed').length
  const toolsCompleted = tools.filter(t => t.status.includes('Completed')).length
  const skillsCompleted = skillsPrograms.filter(s => s.status === 'Completed').length
  const cultureCompleted = cultureInitiatives.filter(c => c.status === 'Completed').length

  const totalCompleted = policiesCompleted + toolsCompleted + skillsCompleted + cultureCompleted
  const totalEnablers = policies.length + tools.length + skillsPrograms.length + cultureInitiatives.length

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="gradient-teal text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <Wrench className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Enabler Deployment</h1>
        </div>
        <p className="text-teal-100">Deploy supporting enablers for governance objectives</p>
        <p className="text-teal-200 text-sm mt-2">TechCorp Financial Services - Q2 2024 Status</p>
      </div>

      <DisclaimerBanner />

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold">Policies</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">{policiesCompleted}/{policies.length}</div>
          <div className="text-sm text-gray-600">85% Complete</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Laptop className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold">Tools</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">{toolsCompleted}/{tools.length}</div>
          <div className="text-sm text-gray-600">$5.05M Invested</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold">Skills</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">{skillsCompleted}/{skillsPrograms.length}</div>
          <div className="text-sm text-gray-600">$570K Annually</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold">Culture</h3>
          </div>
          <div className="text-2xl font-bold text-orange-600">{cultureCompleted}/{cultureInitiatives.length}</div>
          <div className="text-sm text-gray-600">50% Complete</div>
        </div>
      </div>

      {/* Policies and Procedures */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Policies and Procedures</h2>
          <span className="ml-auto text-sm font-semibold text-blue-600">85% Complete</span>
        </div>
        <div className="space-y-3">
          {policies.map((policy, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {policy.status === 'Completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  )}
                  <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  policy.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {policy.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 ml-7">
                <div><strong>Version:</strong> {policy.version} | <strong>Approved:</strong> {policy.approved}</div>
                <div className="mt-1"><strong>Scope:</strong> {policy.scope}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools and Technologies */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Laptop className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold">Tools and Technologies</h2>
          <span className="ml-auto text-sm font-semibold text-purple-600">$5.05M Investment</span>
        </div>
        <div className="space-y-3">
          {tools.map((tool, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {tool.status.includes('Completed') ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  )}
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  tool.status.includes('Completed') ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {tool.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 ml-7">
                <div><strong>Modules:</strong> {tool.modules}</div>
                <div className="mt-1"><strong>Investment:</strong> {tool.investment} | <strong>Users:</strong> {tool.users}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Development */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold">Skills Development Programs</h2>
          <span className="ml-auto text-sm font-semibold text-green-600">$570K Annually</span>
        </div>
        <div className="space-y-3">
          {skillsPrograms.map((program, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {program.status === 'Completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  )}
                  <h3 className="font-semibold text-gray-900">{program.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  program.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {program.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 ml-7">
                <div><strong>Participants:</strong> {program.participants}</div>
                <div className="mt-1"><strong>Certifications:</strong> {program.certifications}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Culture and Behavior */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-bold">Culture and Behavior Initiatives</h2>
          <span className="ml-auto text-sm font-semibold text-orange-600">50% Complete</span>
        </div>
        <div className="space-y-3">
          {cultureInitiatives.map((initiative, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {initiative.status === 'Completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  )}
                  <h3 className="font-semibold text-gray-900">{initiative.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  initiative.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {initiative.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 ml-7">
                <div><strong>Activities:</strong> {initiative.activities}</div>
                <div className="mt-1"><strong>Goal:</strong> {initiative.goal}</div>
                <div className="mt-1"><strong>Current Metrics:</strong> {initiative.metrics}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Summary */}
      <div className="card bg-teal-50 border-teal-200">
        <h3 className="text-xl font-bold text-teal-900 mb-4">Deployment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-teal-900 mb-2">Overall Progress</h4>
            <div className="space-y-2 text-sm text-teal-800">
              <div className="flex justify-between">
                <span>Total Enablers Deployed:</span>
                <span className="font-semibold">{totalCompleted}/{totalEnablers} ({Math.round((totalCompleted/totalEnablers)*100)}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Technology Investment:</span>
                <span className="font-semibold">$5.05M</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Training Budget:</span>
                <span className="font-semibold">$570K</span>
              </div>
              <div className="flex justify-between">
                <span>Total Investment:</span>
                <span className="font-semibold">$5.6M + ongoing</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-teal-900 mb-2">Next Steps</h4>
            <ul className="text-sm text-teal-800 space-y-1">
              <li>• Complete Data Governance Policy (Q3 2024)</li>
              <li>• Full SSO rollout with Okta (Q4 2024)</li>
              <li>• Cloud FinOps Platform go-live (Q3 2024)</li>
              <li>• Continue culture transformation initiatives</li>
              <li>• Monitor enabler effectiveness and ROI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnablerDeployment
