import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import { COURT_EVENT_META, COURT_URGENCY_META, toneColor } from './internal';
import type { CourtDateCardProps } from './CourtDateCard';

/** Drop-in for {@link CourtDateCardProps} — same props, the V4 "chambers" design. */
export type CourtDateCardV4Props = CourtDateCardProps;

/**
 * CourtDateCard — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a leading soft-primary event-glyph
 * block, the date + time, event-type and urgency pills (each a glyph + word so
 * nothing rests on color alone), an optional toned countdown, and venue / judge /
 * case metadata. A `today` / `soon` urgency tints the countdown for triage.
 * Tappable when `onPress` is set. Reuses the base `variant` (`default` /
 * `compact`). Token-only colors via `useXenitionTheme()`.
 */
export function CourtDateCardV4({
  type,
  date,
  time,
  court,
  judge,
  caseNumber,
  urgency = 'upcoming',
  countdown,
  variant = 'default',
  onPress,
  testID,
  style,
}: CourtDateCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const typeMeta = COURT_EVENT_META[type];
  const urgencyMeta = COURT_URGENCY_META[urgency];
  const highlighted = urgency === 'today' || urgency === 'soon';
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: compact ? tokens.spacing.md : tokens.spacing.lg,
    gap: tokens.spacing.md,
    opacity: urgency === 'past' ? 0.7 : 1,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <View style={{ minWidth: 52, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>{typeMeta.glyph}</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{date}</Text>
          {time ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{time}</Text> : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }}>
            <StatusPill meta={typeMeta} variant="inline" size="sm" />
            <StatusPill meta={urgencyMeta} variant="soft" size="sm" />
          </View>
        </View>
        {countdown ? (
          <Text style={{ color: highlighted ? toneColor(colors, urgencyMeta.tone) : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{countdown}</Text>
        ) : null}
      </View>

      {!compact && (court || judge || caseNumber) ? (
        <View style={{ gap: 2, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
          {court ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>🏛 {court}</Text> : null}
          {judge ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Before {judge}</Text> : null}
          {caseNumber ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{caseNumber}</Text> : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${typeMeta.label} on ${date}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : urgency === 'past' ? 0.7 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
