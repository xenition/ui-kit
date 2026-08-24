import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, type BadgeTone } from '../primitives';
import type { EmploymentType, Job } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton, type ApplyButtonProps } from './ApplyButton';
import { formatRelative } from './format';

/** Employment type → primitive `Badge` tone (tokens only). */
const TYPE_TONE: Record<EmploymentType, BadgeTone> = {
  'full-time': 'primary',
  'part-time': 'neutral',
  contract: 'warn',
  remote: 'success',
};

export interface JobCardProps {
  /** The posting to render. */
  job: Job;
  /** Bookmark state; when set, a save toggle is shown. */
  saved?: boolean;
  /** Fired when the save/bookmark toggle is pressed. */
  onSave?: (job: Job) => void;
  /** Apply CTA state; when set (or `onApply` given) the button renders. */
  applyState?: ApplyButtonProps['state'];
  /** Fired when the apply CTA is pressed. */
  onApply?: (job: Job) => void;
  /** Fired to withdraw when `applyState === 'applied'`. */
  onWithdraw?: (job: Job) => void;
  /** Whether the apply CTA shows a spinner. */
  applyLoading?: boolean;
  /** Fired when the card body is pressed (open detail). */
  onPress?: (job: Job) => void;
  /** Render a skeleton placeholder instead of content. */
  loading?: boolean;
  /** Cap the number of skill chips shown; the rest collapse to `+N`. */
  maxSkills?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A job-posting card — the module's headline component. Variant-rich via the
 * job's `type` (`full-time` / `part-time` / `contract` / `remote`), each mapped
 * to a token `Badge` tone. Composes `Avatar` (company logo), `SalaryRange`,
 * `SkillTag`s, and an `ApplyButton`, plus an optional save/bookmark toggle.
 * Data + callbacks only; supports a `loading` skeleton. All colors are tokens.
 */
export function JobCard({
  job,
  saved,
  onSave,
  applyState,
  onApply,
  onWithdraw,
  applyLoading,
  onPress,
  loading = false,
  maxSkills = 4,
  style,
}: JobCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const surface: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  };

  if (loading) {
    const bar = (w: number | string, h: number): React.ReactElement => (
      <View style={{ width: w as number, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
    );
    return (
      <View accessibilityLabel="Loading job" style={[surface, style]}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
          <View style={{ gap: tokens.spacing.xs, flex: 1 }}>
            {bar('70%' as unknown as number, 14)}
            {bar('45%' as unknown as number, 12)}
          </View>
        </View>
        {bar('55%' as unknown as number, 12)}
      </View>
    );
  }

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, maxSkills));
  const overflow = skills.length - shown.length;
  const showApply = applyState != null || onApply != null;
  const posted = formatRelative(job.postedAt);

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${job.title} at ${job.companyName}, ${EMPLOYMENT_LABEL[job.type]}`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(job) : undefined}
      style={({ pressed }) => [surface, pressed && onPress ? { opacity: 0.9 } : null, style]}
    >
      {/* Header: logo + title/company + save */}
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
        <Avatar src={job.companyLogoUrl} name={job.companyName} size="md" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {job.title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {job.companyName}
            {job.location ? ` · ${job.location}` : ''}
          </Text>
        </View>
        {onSave ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={saved ? 'Saved — tap to remove' : 'Save job'}
            accessibilityState={{ selected: !!saved }}
            onPress={() => onSave(job)}
            hitSlop={8}
          >
            <Text style={{ fontSize: tokens.typography.scale.lg, color: saved ? colors.primary : colors.muted }}>
              {saved ? '★' : '☆'}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Meta row: type badge + posted age */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        <Badge tone={TYPE_TONE[job.type]}>{EMPLOYMENT_LABEL[job.type]}</Badge>
        {posted ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{posted}</Text>
        ) : null}
      </View>

      {job.salary ? <SalaryRange salary={job.salary} size="sm" /> : null}

      {shown.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {shown.map((s, i) => (
            <SkillTag key={`${s}-${i}`} label={s} />
          ))}
          {overflow > 0 ? (
            <View
              style={{
                alignSelf: 'flex-start',
                borderRadius: tokens.radius.sm,
                paddingVertical: 3,
                paddingHorizontal: tokens.spacing.sm,
                backgroundColor: colors.border,
              }}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>{`+${overflow}`}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {showApply ? (
        <ApplyButton
          state={applyState}
          loading={applyLoading}
          onApply={onApply ? () => onApply(job) : undefined}
          onWithdraw={onWithdraw ? () => onWithdraw(job) : undefined}
          block
        />
      ) : null}
    </Pressable>
  );
}
