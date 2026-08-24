import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, type BadgeTone } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRange } from './SalaryRange';
import { SkillTag } from './SkillTag';
import { ApplyButton } from './ApplyButton';
import { formatRelative } from './format';
import type { JobCardProps } from './JobCard';

/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV2Props = JobCardProps;

const TYPE_TONE: Record<EmploymentType, BadgeTone> = {
  'full-time': 'primary',
  'part-time': 'neutral',
  contract: 'warn',
  remote: 'success',
};

/**
 * JobCard — design V2. An elevated, shadowed card led by a big rounded company
 * logo tile, a full-width tinted salary rail, and a wrapped skill-chip shelf.
 * Same props as {@link JobCardProps} (drop-in), same token discipline: fills are
 * `withAlpha` tints of theme tokens, depth is the shared elevation scale, the
 * employment type is a `Badge` tone plus its text label. Mount enter + press
 * spring via the shared motion hooks (reduced-motion aware).
 */
export function JobCardV2({
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
}: JobCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();

  const surface: ViewStyle = {
    ...appearanceStyle('elevated', colors, tokens),
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  };

  if (loading) {
    const bar = (w: number, h: number): React.ReactElement => (
      <View style={{ width: w, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
    );
    return (
      <Animated.View
        accessibilityLabel="Loading job"
        style={[surface, { opacity: enter.opacity, transform: enter.transform }, style]}
      >
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
          <View style={{ width: 64, height: 64, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
          <View style={{ gap: tokens.spacing.xs, flex: 1 }}>
            {bar(180, 14)}
            {bar(120, 12)}
          </View>
        </View>
        {bar(140, 12)}
      </Animated.View>
    );
  }

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, maxSkills));
  const overflow = skills.length - shown.length;
  const showApply = applyState != null || onApply != null;
  const posted = formatRelative(job.postedAt);

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={`${job.title} at ${job.companyName}, ${EMPLOYMENT_LABEL[job.type]}`}
        disabled={!onPress}
        onPress={onPress ? () => onPress(job) : undefined}
        onPressIn={onPress ? press.onPressIn : undefined}
        onPressOut={onPress ? press.onPressOut : undefined}
        style={({ pressed }) => [surface, pressed && onPress ? { opacity: 0.95 } : null, style]}
      >
        {/* Header: big logo tile + title/company + save */}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: tokens.radius.md,
              backgroundColor: withAlpha(colors.primary, 0.08),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar src={job.companyLogoUrl} name={job.companyName} size="lg" shape="rounded" />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={2}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
            >
              {job.title}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {job.companyName}
              {job.location ? ` · ${job.location}` : ''}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
              <Badge tone={TYPE_TONE[job.type]}>{EMPLOYMENT_LABEL[job.type]}</Badge>
              {posted ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{posted}</Text>
              ) : null}
            </View>
          </View>
          {onSave ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={saved ? 'Saved — tap to remove' : 'Save job'}
              accessibilityState={{ selected: !!saved }}
              onPress={() => onSave(job)}
              hitSlop={8}
            >
              <Text style={{ fontSize: tokens.typography.scale.lg, color: saved ? colors.primaryText : colors.muted }}>
                {saved ? '★' : '☆'}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* Salary rail — a full-width tinted band. */}
        {job.salary ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: withAlpha(colors.primary, 0.06),
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
            }}
          >
            <SalaryRange salary={job.salary} size="md" />
          </View>
        ) : null}

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
    </Animated.View>
  );
}
