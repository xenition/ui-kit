import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Avatar } from '../primitives';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton } from './ApplyButton';
import { formatRelative } from './format';
import type { JobCardProps } from './JobCard';

/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV3Props = JobCardProps;

/** Employment type → a semantic fill slot for the left accent rail (tokens). */
const TYPE_ACCENT: Record<EmploymentType, keyof SemanticColors> = {
  'full-time': 'primary',
  'part-time': 'accent',
  contract: 'warn',
  remote: 'success',
};

/**
 * JobCard — design V3. A minimal, borderless line item: a thin colored accent
 * rail on the left keyed to the employment type, then the title, a single inline
 * `company · location · type · posted` meta line, salary, and a tight skill row.
 * Separation comes from spacing, not a box. Same props as {@link JobCardProps}
 * (drop-in). Token-pure — the accent color is resolved from the semantic slots.
 */
export function JobCardV3({
  job,
  saved,
  onSave,
  applyState,
  onApply,
  onWithdraw,
  applyLoading,
  onPress,
  loading = false,
  maxSkills = 3,
  style,
}: JobCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Cast to a string-keyed record so the accent slot can be indexed dynamically.
  const colorMap = colors as unknown as Record<string, string>;

  const wrap: ViewStyle = {
    flexDirection: 'row',
    gap: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
  };

  if (loading) {
    const bar = (w: number, h: number): React.ReactElement => (
      <View style={{ width: w, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
    );
    return (
      <View accessibilityLabel="Loading job" style={[wrap, style]}>
        <View style={{ width: 4, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          {bar(180, 14)}
          {bar(120, 12)}
        </View>
      </View>
    );
  }

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, maxSkills));
  const overflow = skills.length - shown.length;
  const showApply = applyState != null || onApply != null;
  const posted = formatRelative(job.postedAt);
  const accent = colorMap[TYPE_ACCENT[job.type]] ?? colors.primary;
  const meta = [job.companyName, job.location, EMPLOYMENT_LABEL[job.type], posted]
    .filter(Boolean)
    .join(' · ');

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${job.title} at ${job.companyName}, ${EMPLOYMENT_LABEL[job.type]}`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(job) : undefined}
      style={({ pressed }) => [wrap, pressed && onPress ? { opacity: 0.9 } : null, style]}
    >
      <View style={{ width: 4, borderRadius: tokens.radius.full, backgroundColor: accent }} />
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <Avatar src={job.companyLogoUrl} name={job.companyName} size="xs" shape="rounded" />
          <Text
            numberOfLines={2}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {job.title}
          </Text>
          {onSave ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={saved ? 'Saved — tap to remove' : 'Save job'}
              accessibilityState={{ selected: !!saved }}
              onPress={() => onSave(job)}
              hitSlop={8}
            >
              <Text style={{ fontSize: tokens.typography.scale.base, color: saved ? colors.primaryText : colors.muted }}>
                {saved ? '★' : '☆'}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}

        {job.salary ? <SalaryRange salary={job.salary} size="sm" /> : null}

        {shown.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
            {shown.map((s, i) => (
              <SkillTag key={`${s}-${i}`} label={s} />
            ))}
            {overflow > 0 ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`+${overflow}`}</Text>
            ) : null}
          </View>
        ) : null}

        {showApply ? (
          <ApplyButton
            state={applyState}
            loading={applyLoading}
            size="sm"
            onApply={onApply ? () => onApply(job) : undefined}
            onWithdraw={onWithdraw ? () => onWithdraw(job) : undefined}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
