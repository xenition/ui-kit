/**
 * `@xenition/ui/jobs` — presentational React DOM (web) components for job
 * boards, applicant tracking, and recruiting flows. Data-only web parity of the
 * `@xenition/ui/native/jobs` module: an app passes shaped records ({@link Job},
 * {@link Company}, {@link Application}, {@link Resume}, {@link Interview},
 * {@link RecruiterMessagePayload}) plus callbacks, and every color/radius/spacing
 * comes from the `--xen-*` theme tokens via the Tailwind preset — no literal
 * colors, so a seed change (dark mode included) restyles the whole module.
 * Components compose the shared web primitives (`Card`, `Button`, `Badge`,
 * `Avatar`, `Steps`, `SearchInput`, …) and DOM event idioms (`onClick`). No
 * fetching, no navigation, no global state.
 */

// ── shared data shapes + variant/state types ──────────────────────────
export type {
  EmploymentType,
  ApplicationStage,
  ApplyState,
  InterviewMode,
  SalaryPeriod,
  Company,
  Salary,
  Job,
  Application,
  Resume,
  Interview,
  RecruiterMessagePayload,
} from './types';
export {
  EMPLOYMENT_LABEL,
  EMPLOYMENT_TYPES,
  APPLICATION_STAGES,
  STAGE_LABEL,
} from './types';

// ── pure formatters ───────────────────────────────────────────────────
export {
  formatSalary,
  formatCompactMoney,
  formatShortDate,
  formatTime,
  formatRelative,
} from './format';

// ── components ────────────────────────────────────────────────────────
export { JobCard } from './JobCard';
export type { JobCardProps } from './JobCard';
export { JobCardV2 } from './JobCardV2';
export type { JobCardV2Props } from './JobCardV2';
export { JobCardV3 } from './JobCardV3';
export type { JobCardV3Props } from './JobCardV3';

export { CompanyCard } from './CompanyCard';
export type { CompanyCardProps } from './CompanyCard';
export { CompanyCardV2 } from './CompanyCardV2';
export type { CompanyCardV2Props } from './CompanyCardV2';
export { CompanyCardV3 } from './CompanyCardV3';
export type { CompanyCardV3Props } from './CompanyCardV3';

export { ApplicationRow } from './ApplicationRow';
export type { ApplicationRowProps } from './ApplicationRow';
export { ApplicationRowV2 } from './ApplicationRowV2';
export type { ApplicationRowV2Props } from './ApplicationRowV2';
export { ApplicationRowV3 } from './ApplicationRowV3';
export type { ApplicationRowV3Props } from './ApplicationRowV3';

export { SalaryRange } from './SalaryRange';
export type { SalaryRangeProps, SalaryRangeSize } from './SalaryRange';

export { SkillTag } from './SkillTag';
export type { SkillTagProps, SkillTagVariant } from './SkillTag';

export { ApplyButton } from './ApplyButton';
export type { ApplyButtonProps } from './ApplyButton';

export { JobFilterBar } from './JobFilterBar';
export type { JobFilterBarProps } from './JobFilterBar';

export { ResumeRow } from './ResumeRow';
export type { ResumeRowProps } from './ResumeRow';

export { InterviewSlot } from './InterviewSlot';
export type { InterviewSlotProps } from './InterviewSlot';

export { StatusPipeline } from './StatusPipeline';
export type { StatusPipelineProps, StatusPipelineVariant } from './StatusPipeline';
export { StatusPipelineV2 } from './StatusPipelineV2';
export type { StatusPipelineV2Props } from './StatusPipelineV2';
export { StatusPipelineV3 } from './StatusPipelineV3';
export type { StatusPipelineV3Props } from './StatusPipelineV3';

export { SavedJobRow } from './SavedJobRow';
export type { SavedJobRowProps } from './SavedJobRow';

export { RecruiterMessage } from './RecruiterMessage';
export type { RecruiterMessageProps } from './RecruiterMessage';
