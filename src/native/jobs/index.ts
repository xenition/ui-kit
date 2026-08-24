/**
 * `@xenition/ui/native/jobs` — presentational React Native components for job
 * boards, applicant tracking, and recruiting flows. Mobile-first and data-only:
 * an app passes shaped records ({@link Job}, {@link Company}, {@link Application},
 * {@link Resume}, {@link Interview}, {@link RecruiterMessagePayload}) plus
 * callbacks, and every color/radius/spacing comes from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors, so a seed change (dark mode
 * included) restyles the whole module. Components compose the shared native
 * primitives (`Card`, `Button`, `Badge`, `Avatar`, `Steps`, …) and native event
 * idioms (`onPress`). No fetching, no navigation, no global state.
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

export { CompanyCard } from './CompanyCard';
export type { CompanyCardProps } from './CompanyCard';

export { ApplicationRow } from './ApplicationRow';
export type { ApplicationRowProps } from './ApplicationRow';

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

export { SavedJobRow } from './SavedJobRow';
export type { SavedJobRowProps } from './SavedJobRow';

export { RecruiterMessage } from './RecruiterMessage';
export type { RecruiterMessageProps } from './RecruiterMessage';
