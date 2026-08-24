/**
 * Shared data shapes + variant/state unions for the `@xenition/ui/native/jobs`
 * module. Nothing here fetches or holds state — these are the plain records an
 * app passes down, plus the small string unions that drive component variants.
 * Instants are ISO-8601 strings (same convention as the booking module).
 */

/** Employment arrangement — the primary `JobCard` variant axis. */
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'remote';

/** Human labels for each employment type. */
export const EMPLOYMENT_LABEL: Record<EmploymentType, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  remote: 'Remote',
};

/** The employment types in display order (for filter bars, pickers). */
export const EMPLOYMENT_TYPES: readonly EmploymentType[] = [
  'full-time',
  'part-time',
  'contract',
  'remote',
];

/** Where an application currently sits in the hiring funnel. Ordered. */
export type ApplicationStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired';

/** The canonical funnel order, used by {@link ApplicationStage}-driven UI. */
export const APPLICATION_STAGES: readonly ApplicationStage[] = [
  'applied',
  'screening',
  'interview',
  'offer',
  'hired',
];

/** Human labels for each stage (never rely on color alone to convey these). */
export const STAGE_LABEL: Record<ApplicationStage, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
};

/** The three states an {@link import('./ApplyButton').ApplyButton} can show. */
export type ApplyState = 'apply' | 'applied' | 'withdrawn';

/** How an interview is conducted. */
export type InterviewMode = 'onsite' | 'video' | 'phone';

/** Pay cadence for a {@link import('./SalaryRange').SalaryRange}. */
export type SalaryPeriod = 'hour' | 'day' | 'month' | 'year';

/** A company/employer record. */
export interface Company {
  id: string;
  name: string;
  /** Logo image URL; falls back to initials when absent. */
  logoUrl?: string;
  industry?: string;
  location?: string;
  /** Free-form headcount label, e.g. `'51–200'`. */
  size?: string;
  /** Count of currently open roles, if known. */
  openRoles?: number;
}

/** A salary band. Either bound may be omitted (open-ended / undisclosed). */
export interface Salary {
  min?: number;
  max?: number;
  /** ISO-4217 code, e.g. `'USD'`. Default `'USD'`. */
  currency?: string;
  period?: SalaryPeriod;
}

/** A job posting. */
export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl?: string;
  location?: string;
  type: EmploymentType;
  salary?: Salary;
  /** Skill/keyword labels. */
  skills?: string[];
  /** When it was posted (ISO-8601). */
  postedAt?: string;
}

/** A submitted application. */
export interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  stage: ApplicationStage;
  /** When it was submitted (ISO-8601). */
  appliedAt?: string;
  /** Set when the pipeline ended in rejection at some stage. */
  rejected?: boolean;
}

/** An uploaded résumé / CV file. */
export interface Resume {
  id: string;
  name: string;
  /** When last updated (ISO-8601). */
  updatedAt?: string;
  /** Pre-formatted size label, e.g. `'248 KB'`. */
  sizeLabel?: string;
  /** Whether this is the applicant's default résumé. */
  isDefault?: boolean;
}

/** A scheduled (or proposed) interview slot. */
export interface Interview {
  id: string;
  startsAt: string;
  endsAt?: string;
  mode: InterviewMode;
  /** Interviewer name / panel label. */
  interviewer?: string;
}

/** A message from a recruiter. */
export interface RecruiterMessagePayload {
  id: string;
  senderName: string;
  senderAvatarUrl?: string;
  /** Company the recruiter represents. */
  company?: string;
  /** Message body (may be truncated by the component). */
  preview: string;
  /** When it was sent (ISO-8601). */
  sentAt?: string;
  /** Unread → gets an emphasis marker. */
  unread?: boolean;
}
