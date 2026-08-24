/**
 * `@xenition/ui/native/dashboard` — composed React Native blocks for admin /
 * dashboard / account screens: the stat strips, feeds, settings groups, rows,
 * empty states, and onboarding surfaces that generated screens otherwise
 * hand-roll. Every block is styled exclusively from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors — and follows the design.md
 * principles (one dominant action, clear hierarchy, real empty states).
 */

export { StatCard } from './StatCard';
export type { StatCardProps } from './StatCard';

export { KpiRow } from './KpiRow';
export type { KpiRowProps } from './KpiRow';

export { ActivityFeed } from './ActivityFeed';
export type { ActivityFeedProps, ActivityItem } from './ActivityFeed';

export { NotificationItem } from './NotificationItem';
export type { NotificationItemProps } from './NotificationItem';

export { ProfileHeader } from './ProfileHeader';
export type { ProfileHeaderProps } from './ProfileHeader';

export { SettingsRow } from './SettingsRow';
export type { SettingsRowProps } from './SettingsRow';

export { SettingsSection } from './SettingsSection';
export type { SettingsSectionProps } from './SettingsSection';

export { ListRow } from './ListRow';
export type { ListRowProps } from './ListRow';

export { PageContainer } from './PageContainer';
export type { PageContainerProps } from './PageContainer';

export { FilterChips } from './FilterChips';
export type { FilterChipsProps, FilterChipOption } from './FilterChips';

export { SearchHeader } from './SearchHeader';
export type { SearchHeaderProps } from './SearchHeader';

export { EmptyDashboard } from './EmptyDashboard';
export type { EmptyDashboardProps } from './EmptyDashboard';

export { SectionCard } from './SectionCard';
export type { SectionCardProps } from './SectionCard';

export { MetricTile } from './MetricTile';
export type { MetricTileProps, MetricTileTone } from './MetricTile';

export { QuickActions } from './QuickActions';
export type { QuickActionsProps, QuickAction } from './QuickActions';

export { OnboardingChecklist } from './OnboardingChecklist';
export type { OnboardingChecklistProps, OnboardingStep } from './OnboardingChecklist';
