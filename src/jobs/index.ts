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

// ── the V4 line ───────────────────────────────────────────────────────
export { JobCardV4 } from './JobCardV4';
export type { JobCardV4Props } from './JobCardV4';

export { JobListV4 } from './JobListV4';
export type { JobListV4Props } from './JobListV4';

export { CompanyCardV4 } from './CompanyCardV4';
export type { CompanyCardV4Props } from './CompanyCardV4';

export { ApplicationRowV4 } from './ApplicationRowV4';
export type { ApplicationRowV4Props } from './ApplicationRowV4';

export { SalaryRangeV4 } from './SalaryRangeV4';
export type { SalaryRangeV4Props } from './SalaryRangeV4';

export { SkillTagV4 } from './SkillTagV4';
export type { SkillTagV4Props } from './SkillTagV4';

export { ApplyButtonV4 } from './ApplyButtonV4';
export type { ApplyButtonV4Props } from './ApplyButtonV4';

export { JobFilterBarV4 } from './JobFilterBarV4';
export type { JobFilterBarV4Props } from './JobFilterBarV4';

export { ResumeRowV4 } from './ResumeRowV4';
export type { ResumeRowV4Props } from './ResumeRowV4';

export { InterviewSlotV4 } from './InterviewSlotV4';
export type { InterviewSlotV4Props, InterviewSlotStatus } from './InterviewSlotV4';

export { StatusPipelineV4 } from './StatusPipelineV4';
export type { StatusPipelineV4Props } from './StatusPipelineV4';

export { SavedJobRowV4 } from './SavedJobRowV4';
export type { SavedJobRowV4Props } from './SavedJobRowV4';

export { RecruiterMessageV4 } from './RecruiterMessageV4';
export type { RecruiterMessageV4Props } from './RecruiterMessageV4';

export { OfferCardV4 } from './OfferCardV4';
export type { OfferCardV4Props, OfferStatus, OfferV4 } from './OfferCardV4';

// The module's shared V4 arithmetic — imported verbatim by the native twin.
export {
  salaryParts,
  stageParts,
  relativeParts,
  isAdverse,
} from './hiring-v4';
export type { SalaryParts, StageParts, RelativeParts, RelativeUnit } from './hiring-v4';
