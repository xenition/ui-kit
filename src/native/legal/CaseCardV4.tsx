import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import { CASE_PRIORITY_META, CASE_STATUS_META, PRACTICE_AREA_META } from './internal';
import type { CaseCardProps } from './CaseCard';

/** Drop-in for {@link CaseCardProps} — same props, the V4 "chambers" design. */
export type CaseCardV4Props = CaseCardProps;

/**
 * CaseCard — **V4** "chambers" design (native twin of the web V4). The
 * distinguished, chambers take on a matter file: an elevated rounded card with a
 * soft shadow, a docket-number eyebrow over a strong caption, the client, a
 * labelled glyph + word status pill (never color alone), and a soft-primary chip
 * strip carrying practice area + priority. `compact` trims to the header row;
 * `detailed` adds lead attorney + next event. An optional `onOpen` renders an
 * "Open case" affordance. Reuses the base `variant`
 * (`default` / `compact` / `detailed`). Token-only colors via `useXenitionTheme()`.
 */
export function CaseCardV4({
  caseNumber,
  title,
  client,
  practiceArea,
  status,
  priority,
  leadAttorney,
  nextEvent,
  variant = 'default',
  loading = false,
  onPress,
  onOpen,
  testID,
  style,
}: CaseCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const detailed = variant === 'detailed';
  const closed = status === 'closed';
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: compact ? tokens.spacing.md : tokens.spacing.lg,
    gap: tokens.spacing.md,
    opacity: closed ? 0.7 : 1,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading case" testID={testID} style={[shell, style]}>
        <View style={{ height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: tokens.typography.scale.base, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 0.4, fontVariant: ['tabular-nums'] }}>{caseNumber}</Text>
          <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{title}</Text>
          {client ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{client}</Text> : null}
        </View>
        {status ? <StatusPill meta={CASE_STATUS_META[status]} size="sm" /> : null}
      </View>

      {!compact && (practiceArea || priority) ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
          {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
          {priority ? <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" /> : null}
        </View>
      ) : null}

      {detailed && (leadAttorney || nextEvent) ? (
        <View style={{ gap: 2 }}>
          {leadAttorney ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Lead: {leadAttorney}</Text> : null}
          {nextEvent ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>⏭ {nextEvent}</Text> : null}
        </View>
      ) : null}

      {onOpen ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open case ${caseNumber}`}
          onPress={onOpen}
          style={({ pressed }) => ({ alignSelf: 'flex-start', paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.md, borderWidth: 1, borderColor: colors.border, opacity: pressed ? 0.7 : 1 })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Open case</Text>
        </Pressable>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Case ${caseNumber}: ${title}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : closed ? 0.7 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
