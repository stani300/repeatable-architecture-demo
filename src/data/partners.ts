export type PartnerType = 'GSI' | 'PowerUP' | 'MSSP' | 'Service Provider';
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
  {
    id: 'lumen',
    name: 'Lumen',
    type: 'Service Provider',
    motion:
      'Strategic telecommunications alliance delivering Lumen SASE with Cloudflare One — unifying global fiber, edge compute, Magic WAN, Magic Transit, and edge AI protection.',
    cf1Stack: ['Magic WAN', 'Magic Transit', 'Access', 'Gateway', 'DDoS Protection'],
    aiStack: ['AI Gateway', 'Workers AI', 'Vectorize', 'DLP for AI'],
    unit: 'enterprise tenant',
    unitPlural: 'enterprise tenants',
    orgModel: 'Enterprise customer accounts under the Lumen partner Organization',
    defaultFleet: 48,
    moduleName: 'lumen-managed-sase-ai',
    managedServiceTitle: 'Lumen Managed SASE & Edge AI Infrastructure',
    pioPerUnit: 150000,
    partnerMrrPerUnit: 13500,
    asdHealthScore: 99.5,
    modes: {
      dual: {
        pioPerUnit: 150000,
        partnerMrrPerUnit: 13500,
        marginRatio: 0.76,
        asdHealthScore: 99.5,
        managedServiceTitle: 'Lumen Managed SASE & Edge AI Infrastructure',
        automationBoost: '+38% Margin vs Legacy MPLS / Hardware Boxes',
        telemetryStatus: 'Agent PAT Active (Fiber Interconnect & Zero Trust)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated fiber edge & dual-pillar posture sync',
        pioSubtext: 'Combined SASE & Edge AI Subscription ACV',
        revenueSubtext: 'billable managed enterprise network + AI MRR',
      },
      cf1: {
        pioPerUnit: 98000,
        partnerMrrPerUnit: 8500,
        marginRatio: 0.73,
        asdHealthScore: 99.7,
        managedServiceTitle: 'Lumen Managed Cloudflare One & Magic Transit',
        automationBoost: '+34% Margin vs Legacy SD-WAN CPE Hardware',
        telemetryStatus: 'Agent PAT Active (Magic WAN & DDoS Transit)',
        healthLabel: 'SASE Transit Health',
        healthSubtext: 'Automated Magic Transit & Access policy sync',
        pioSubtext: 'Cloudflare One & Magic Transit ACV',
        revenueSubtext: 'billable enterprise SASE & transit MRR',
      },
      ai: {
        pioPerUnit: 52000,
        partnerMrrPerUnit: 5000,
        marginRatio: 0.80,
        asdHealthScore: 98.9,
        managedServiceTitle: 'Lumen Edge AI Gateway & Inference Shield',
        automationBoost: '+44% Margin vs Dedicated Private AI Appliances',
        telemetryStatus: 'Echo Telemetry Active (Edge Token Firewall)',
        healthLabel: 'Inference SLA',
        healthSubtext: 'Edge AI Gateway rate-limit & latency SLA',
        pioSubtext: 'Workers AI, Inference & AI Gateway ACV',
        revenueSubtext: 'billable managed AI gateway operations',
      },
    },
  },
  {
    id: 'att',
    name: 'AT&T',
    type: 'Service Provider',
    motion:
      'Global carrier alliance delivering AT&T Managed SASE with Cloudflare One — combining nationwide fiber & 5G network fabric with Cloudflare Zero Trust, Secure Web Gateway, and AI guardrails.',
    cf1Stack: ['Magic WAN', 'Access', 'Gateway', 'WARP', 'CASB'],
    aiStack: ['AI Gateway', 'Workers AI', 'LLM Guardrails', 'Prompt Firewall'],
    unit: 'enterprise client',
    unitPlural: 'enterprise clients',
    orgModel: 'Enterprise accounts managed under the AT&T carrier Organization',
    defaultFleet: 56,
    moduleName: 'att-managed-sase-ai',
    managedServiceTitle: 'AT&T Managed SASE & Enterprise AI Guard',
    pioPerUnit: 155000,
    partnerMrrPerUnit: 14000,
    asdHealthScore: 99.6,
    modes: {
      dual: {
        pioPerUnit: 155000,
        partnerMrrPerUnit: 14000,
        marginRatio: 0.77,
        asdHealthScore: 99.6,
        managedServiceTitle: 'AT&T Managed SASE & Enterprise AI Guard',
        automationBoost: '+40% Margin vs Telco Truck Rolls & On-Prem Firewalls',
        telemetryStatus: 'Agent PAT Active (5G / Fiber Zero Trust Mesh)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated carrier-grade fleet posture sync',
        pioSubtext: 'Combined SASE & Carrier AI Subscription ACV',
        revenueSubtext: 'billable carrier managed SASE + AI MRR',
      },
      cf1: {
        pioPerUnit: 100000,
        partnerMrrPerUnit: 8800,
        marginRatio: 0.74,
        asdHealthScore: 99.8,
        managedServiceTitle: 'AT&T Managed Cloudflare One & 5G SASE',
        automationBoost: '+36% Margin vs Multi-Box Router Provisioning',
        telemetryStatus: 'Agent PAT Active (WARP & Gateway Telemetry)',
        healthLabel: 'Carrier SASE Health',
        healthSubtext: 'Automated 5G & wireline Zero Trust policy sync',
        pioSubtext: 'Cloudflare One (ZTNA, SWG, CASB) ACV',
        revenueSubtext: 'billable managed Zero Trust networking MRR',
      },
      ai: {
        pioPerUnit: 55000,
        partnerMrrPerUnit: 5200,
        marginRatio: 0.81,
        asdHealthScore: 99.1,
        managedServiceTitle: 'AT&T Enterprise AI Gateway & Safety Shield',
        automationBoost: '+46% Margin vs Custom Edge AI Gateways',
        telemetryStatus: 'Echo Telemetry Active (Carrier AI Guardrails)',
        healthLabel: 'Carrier AI Uptime',
        healthSubtext: 'AI Gateway prompt inspection & quota SLA',
        pioSubtext: 'AI Gateway & Enterprise Inference ACV',
        revenueSubtext: 'billable enterprise AI governance MRR',
      },
    },
  },
  {
    id: 'verizon',
    name: 'Verizon',
    type: 'Service Provider',
    motion:
      'Tier-1 service provider partnership powering Verizon Business Managed Cloud Security — delivering Cloudflare Zero Trust, DDoS protection, edge WAF, and secure AI pipeline governance across enterprise fleets.',
    cf1Stack: ['WAF', 'DDoS', 'Access', 'Gateway', 'Magic WAN'],
    aiStack: ['AI Gateway', 'Workers AI', 'Prompt Firewall', 'Rate Limiting'],
    unit: 'enterprise account',
    unitPlural: 'enterprise accounts',
    orgModel: 'Enterprise customer accounts under the Verizon Business Organization',
    defaultFleet: 52,
    moduleName: 'verizon-business-sec-ai',
    managedServiceTitle: 'Verizon Managed Zero Trust & AI Defense',
    pioPerUnit: 148000,
    partnerMrrPerUnit: 13000,
    asdHealthScore: 99.3,
    modes: {
      dual: {
        pioPerUnit: 148000,
        partnerMrrPerUnit: 13000,
        marginRatio: 0.76,
        asdHealthScore: 99.3,
        managedServiceTitle: 'Verizon Managed Zero Trust & AI Defense',
        automationBoost: '+37% Margin vs Manual SOC & Router Management',
        telemetryStatus: 'Agent PAT Active (MEC & Edge Security Stream)',
        healthLabel: 'Zero Drift',
        healthSubtext: 'Automated Verizon MEC & fleet posture sync',
        pioSubtext: 'Combined SASE & Edge AI Subscription ACV',
        revenueSubtext: 'billable Verizon Business Managed Services MRR',
      },
      cf1: {
        pioPerUnit: 95000,
        partnerMrrPerUnit: 8200,
        marginRatio: 0.73,
        asdHealthScore: 99.5,
        managedServiceTitle: 'Verizon Business Managed SASE & Edge Defense',
        automationBoost: '+33% Margin vs Hardware Appliance Stacking',
        telemetryStatus: 'Agent PAT Active (Edge WAF & DDoS Telemetry)',
        healthLabel: 'Edge Security SLA',
        healthSubtext: 'Automated WAF, DDoS & Access policy sync',
        pioSubtext: 'Cloudflare One & Edge WAF/DDoS ACV',
        revenueSubtext: 'billable managed edge security MRR',
      },
      ai: {
        pioPerUnit: 53000,
        partnerMrrPerUnit: 4800,
        marginRatio: 0.80,
        asdHealthScore: 98.8,
        managedServiceTitle: 'Verizon Enterprise AI Gateway & Threat Shield',
        automationBoost: '+43% Margin vs Unmanaged LLM Endpoints',
        telemetryStatus: 'Echo Telemetry Active (LLM Threat Firewall)',
        healthLabel: 'AI Threat Defense',
        healthSubtext: 'AI Gateway prompt attack & rate-limit SLA',
        pioSubtext: 'Workers AI & AI Gateway Defense ACV',
        revenueSubtext: 'billable enterprise AI protection MRR',
      },
    },
  },
];

export const DISCLAIMER =
  'Real, publicly named Cloudflare partner alliance motions across GSIs, Service Providers / Telcos, PowerUP, and MSSPs. Architecture and fleet figures are directional planning values, not commitments. Multi-customer provisioning uses Cloudflare Organizations for Service Providers & Partners with the Tenant API.';
