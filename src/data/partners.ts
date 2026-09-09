export type PartnerType = 'GSI' | 'PowerUP' | 'MSSP';
export type BlueprintMode = 'cf1' | 'ai' | 'dual';

export interface PillarMetrics {
  pioPerUnit: number;
  partnerMrrPerUnit: number;
  asdHealthScore: number;
  managedServiceTitle: string;
  marginRatio: number;
  automationBoost: string;
  telemetryStatus: string;
  healthLabel: string;
  healthSubtext: string;
  pioSubtext: string;
  revenueSubtext: string;
}

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  /** Their real, publicly documented Cloudflare motion. */
  motion: string;
  /** Cloudflare One (SASE/SSE) stack. */
  cf1Stack: string[];
  /** AI Infrastructure & Protection stack (Workers AI, AI Gateway, LLM Guardrails). */
  aiStack: string[];
  /** What one deployed unit represents for this partner. */
  unit: string;         // singular
  unitPlural: string;
  /** How they operate multi-customer. */
  orgModel: string;
  /** A realistic fleet default for the demo. */
  defaultFleet: number;
  /** Terraform module name used in the snippet. */
  moduleName: string;
  /** Mode-specific economics and operational parameters. */
  modes: Record<BlueprintMode, PillarMetrics>;
  /** Partner's Accelerated Services Delivery (ASD) Joint Managed Offering name (dual default). */
  managedServiceTitle: string;
  /** Directional Partner-Influenced Opportunity (PIO) generated per account / yr (dual default). */
  pioPerUnit: number;
  /** Directional Partner Managed Services MRR per account / mo (dual default). */
  partnerMrrPerUnit: number;
  /** ASD Telemetry Health Score (baseline %). */
  asdHealthScore: number;
}

export function getPartnerMetrics(partner: Partner, mode: BlueprintMode): PillarMetrics {
  return partner.modes?.[mode] ?? partner.modes.dual;
}

/**
 * All partners below are real, publicly named Cloudflare partners; motions
 * reflect their documented alliance focus. Figures in the app are directional
 * planning values, not commitments.
 */
export const PARTNERS: Partner[] = [
  {
    id: 'kyndryl',
    name: 'Kyndryl',
    type: 'GSI',
    motion:
      'Global strategic alliance for enterprise network transformation — Managed WAN-as-a-Service, Cloudflare Zero Trust, and Enterprise AI Gateway Security.',
    cf1Stack: ['Magic WAN', 'Magic Transit', 'Access', 'Gateway', 'WARP'],
    aiStack: ['AI Gateway', 'Workers AI', 'LLM Guardrails', 'DLP for AI'],
    unit: 'enterprise customer',
    unitPlural: 'enterprise customers',
    orgModel: 'Enterprise accounts under the Kyndryl partner Organization',
    defaultFleet: 48,
    moduleName: 'kyndryl-managed-network-ai',
    managedServiceTitle: 'Kyndryl Managed WAN & Enterprise AI Defense',
    pioPerUnit: 145000,
    partnerMrrPerUnit: 12500,
    asdHealthScore: 99.4,
    modes: {
      dual: {
        pioPerUnit: 145000,
        partnerMrrPerUnit: 12500,
        marginRatio: 0.75,
        asdHealthScore: 99.4,
        managedServiceTitle: 'Kyndryl Managed WAN & Enterprise AI Defense',
        automationBoost: '+35% Margin vs Manual Operations',
        telemetryStatus: 'Agent PAT & Echo Active (SASE + AI Guard)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated dual-pillar fleet posture sync',
        pioSubtext: 'Combined SASE & AI Subscription ACV',
        revenueSubtext: 'billable managed SASE + AI revenue',
      },
      cf1: {
        pioPerUnit: 92000,
        partnerMrrPerUnit: 7800,
        marginRatio: 0.72,
        asdHealthScore: 99.6,
        managedServiceTitle: 'Kyndryl Managed Enterprise SASE & Magic WAN',
        automationBoost: '+30% Margin vs Manual WAN Provisioning',
        telemetryStatus: 'Agent PAT Active (Magic WAN & Zero Trust)',
        healthLabel: 'SASE Policy Adherence',
        healthSubtext: 'Automated Magic WAN & WARP posture sync',
        pioSubtext: 'Cloudflare One (SASE / Zero Trust) ACV',
        revenueSubtext: 'billable enterprise network operations',
      },
      ai: {
        pioPerUnit: 53000,
        partnerMrrPerUnit: 4700,
        marginRatio: 0.79,
        asdHealthScore: 98.8,
        managedServiceTitle: 'Kyndryl Enterprise AI Gateway & LLM Shield',
        automationBoost: '+42% Margin vs Custom Proxy Engineering',
        telemetryStatus: 'Echo Telemetry Active (Prompt Firewall)',
        healthLabel: 'Guardrail Uptime',
        healthSubtext: 'AI Gateway rate-limit & prompt safety SLA',
        pioSubtext: 'AI Gateway, Workers AI & Inference ACV',
        revenueSubtext: 'billable LLM defense & proxy operations',
      },
    },
  },
  {
    id: 'ntt-data',
    name: 'NTT DATA',
    type: 'GSI',
    motion:
      'Global system integrator alliance delivering secure network / SASE transformation on Cloudflare One and AI pipeline protection.',
    cf1Stack: ['Gateway', 'CASB', 'DLP', 'Access', 'Magic WAN'],
    aiStack: ['AI Gateway', 'Workers AI', 'Vectorize', 'Rate Limiting'],
    unit: 'enterprise customer',
    unitPlural: 'enterprise customers',
    orgModel: 'Enterprise accounts under the NTT DATA partner Organization',
    defaultFleet: 16,
    moduleName: 'nttdata-sase-ai-baseline',
    managedServiceTitle: 'NTT DATA Secure SASE & AI Pipeline Practice',
    pioPerUnit: 160000,
    partnerMrrPerUnit: 14000,
    asdHealthScore: 98.9,
    modes: {
      dual: {
        pioPerUnit: 160000,
        partnerMrrPerUnit: 14000,
        marginRatio: 0.75,
        asdHealthScore: 98.9,
        managedServiceTitle: 'NTT DATA Secure SASE & AI Pipeline Practice',
        automationBoost: '+35% Margin vs Manual Operations',
        telemetryStatus: 'Agent PAT & Echo Active (SASE + AI Guard)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated dual-pillar fleet posture sync',
        pioSubtext: 'Combined SASE & AI Subscription ACV',
        revenueSubtext: 'billable managed SASE + AI revenue',
      },
      cf1: {
        pioPerUnit: 102000,
        partnerMrrPerUnit: 8800,
        marginRatio: 0.73,
        asdHealthScore: 99.3,
        managedServiceTitle: 'NTT DATA Global SASE & CASB Defense',
        automationBoost: '+31% Margin vs Multi-Vendor Box Stacking',
        telemetryStatus: 'Agent PAT Active (CASB & DLP Sync)',
        healthLabel: 'CASB / DLP Adherence',
        healthSubtext: 'Automated Zero Trust & route policy sync',
        pioSubtext: 'Cloudflare One (Gateway, CASB, DLP) ACV',
        revenueSubtext: 'billable Zero Trust network operations',
      },
      ai: {
        pioPerUnit: 58000,
        partnerMrrPerUnit: 5200,
        marginRatio: 0.78,
        asdHealthScore: 98.4,
        managedServiceTitle: 'NTT DATA Secure AI Pipeline & Vectorize Practice',
        automationBoost: '+40% Margin vs Standalone AI Middleware',
        telemetryStatus: 'Echo Telemetry Active (Vectorize Shield)',
        healthLabel: 'AI Safety SLA',
        healthSubtext: 'Inference latency & vector security SLA',
        pioSubtext: 'Workers AI, Vectorize & AI Gateway ACV',
        revenueSubtext: 'billable enterprise AI pipeline defense',
      },
    },
  },
  {
    id: 'assurance-data',
    name: 'Assurance Data',
    type: 'PowerUP',
    motion:
      'PowerUP partner delivering 100% cloud-native Zero Trust and AI application posture management for next-generation cyber defense.',
    cf1Stack: ['Access', 'Gateway', 'DNS Filtering', 'WARP'],
    aiStack: ['AI Gateway', 'Workers AI', 'LLM Prompt Audit'],
    unit: 'managed customer',
    unitPlural: 'managed customers',
    orgModel: 'Customer accounts managed under the partner Organization',
    defaultFleet: 24,
    moduleName: 'assurance-zero-trust-ai',
    managedServiceTitle: 'Assurance Data Cloud-Native SASE & AI Shield',
    pioPerUnit: 75000,
    partnerMrrPerUnit: 6500,
    asdHealthScore: 99.7,
    modes: {
      dual: {
        pioPerUnit: 75000,
        partnerMrrPerUnit: 6500,
        marginRatio: 0.75,
        asdHealthScore: 99.7,
        managedServiceTitle: 'Assurance Data Cloud-Native SASE & AI Shield',
        automationBoost: '+35% Margin vs Manual Operations',
        telemetryStatus: 'Agent PAT & Echo Active (SASE + AI Guard)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated dual-pillar fleet posture sync',
        pioSubtext: 'Combined SASE & AI Subscription ACV',
        revenueSubtext: 'billable managed SASE + AI revenue',
      },
      cf1: {
        pioPerUnit: 48000,
        partnerMrrPerUnit: 4100,
        marginRatio: 0.74,
        asdHealthScore: 99.8,
        managedServiceTitle: 'Assurance Data Cloud-Native Zero Trust & Access',
        automationBoost: '+32% Margin vs Legacy VPN Migrations',
        telemetryStatus: 'Agent PAT Active (DNS & WARP Telemetry)',
        healthLabel: 'Zero Trust Health',
        healthSubtext: 'Identity-aware Access & Gateway sync',
        pioSubtext: 'Cloudflare Access & DNS Filtering ACV',
        revenueSubtext: 'billable cloud-native security MRR',
      },
      ai: {
        pioPerUnit: 27000,
        partnerMrrPerUnit: 2400,
        marginRatio: 0.77,
        asdHealthScore: 99.2,
        managedServiceTitle: 'Assurance Data AI Application Posture & Audit',
        automationBoost: '+39% Margin vs Manual Compliance Audits',
        telemetryStatus: 'Echo Telemetry Active (Prompt Auditor)',
        healthLabel: 'Prompt Audit SLA',
        healthSubtext: 'Automated LLM prompt & token audit sync',
        pioSubtext: 'Workers AI & LLM Prompt Audit ACV',
        revenueSubtext: 'billable managed AI governance MRR',
      },
    },
  },
  {
    id: 'yakuq',
    name: 'Yakuq',
    type: 'MSSP',
    motion:
      'Cloudflare MSSP standardizing multi-tenant WAF, DDoS, Zero Trust operations, and AI Gateway rate-limiting without policy drift.',
    cf1Stack: ['WAF', 'DDoS', 'Bot Management', 'Access', 'Gateway'],
    aiStack: ['AI Gateway', 'Workers AI', 'Prompt Firewall'],
    unit: 'managed tenant',
    unitPlural: 'managed tenants',
    orgModel: 'Child customer accounts under the MSSP Organization (multi-tier)',
    defaultFleet: 40,
    moduleName: 'yakuq-mssp-sec-ai',
    managedServiceTitle: 'Yakuq Multi-Tenant SOC & AI Safety Practice',
    pioPerUnit: 42000,
    partnerMrrPerUnit: 3800,
    asdHealthScore: 99.1,
    modes: {
      dual: {
        pioPerUnit: 42000,
        partnerMrrPerUnit: 3800,
        marginRatio: 0.75,
        asdHealthScore: 99.1,
        managedServiceTitle: 'Yakuq Multi-Tenant SOC & AI Safety Practice',
        automationBoost: '+35% Margin vs Manual Operations',
        telemetryStatus: 'Agent PAT & Echo Active (SASE + AI Guard)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated dual-pillar fleet posture sync',
        pioSubtext: 'Combined SASE & AI Subscription ACV',
        revenueSubtext: 'billable multi-tenant SOC + AI revenue',
      },
      cf1: {
        pioPerUnit: 27000,
        partnerMrrPerUnit: 2400,
        marginRatio: 0.71,
        asdHealthScore: 99.4,
        managedServiceTitle: 'Yakuq Multi-Tenant Edge WAF & Access SOC',
        automationBoost: '+29% Margin vs Manual SOC Rule Tuning',
        telemetryStatus: 'Agent PAT Active (WAF & DDoS Telemetry)',
        healthLabel: 'Edge WAF Health',
        healthSubtext: 'Tenant WAF, DDoS & Bot policy sync',
        pioSubtext: 'Multi-tenant WAF & DDoS Protection ACV',
        revenueSubtext: 'billable 24/7 edge SOC operations',
      },
      ai: {
        pioPerUnit: 15000,
        partnerMrrPerUnit: 1400,
        marginRatio: 0.81,
        asdHealthScore: 98.7,
        managedServiceTitle: 'Yakuq Multi-Tenant Prompt Firewall & AI Ops',
        automationBoost: '+45% Margin vs Manual Rate-Limiting Config',
        telemetryStatus: 'Echo Telemetry Active (Rate-Limit Stream)',
        healthLabel: 'Firewall Uptime',
        healthSubtext: 'Automated prompt firewall & limit sync',
        pioSubtext: 'AI Gateway & Prompt Firewall ACV',
        revenueSubtext: 'billable AI safety monitoring MRR',
      },
    },
  },
];

export const DISCLAIMER =
  'Real, publicly named Cloudflare partners; motions reflect documented alliance focus. Architecture and fleet figures are directional planning values, not commitments. Multi-customer provisioning uses Cloudflare Organizations for MSSP & Distributors with the Tenant API.';
