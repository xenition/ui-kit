import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { CONFLICT_CHECK_META, INTAKE_STATUS_META, PRACTICE_AREA_META } from './internal';
import type { ClientIntakeRowProps } from './ClientIntakeRow';

/** Drop-in for {@link ClientIntakeRowProps} — same props, the V4 "chambers" design. */
export type ClientIntakeRowV4Props = ClientIntakeRowProps;

/**
 * ClientIntakeRow — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, an avatar + name + source line, a
 * labelled glyph + word intake-stage pill (never color alone), a soft-primary
 * chip strip carrying practice area + conflict-check, and an optional summary.
 * When `actionable` and still open, an accept/decline row of buttons is shown
 * (Accept disabled on a hard conflict). Tappable when `onPress` is set. Reuses
 * the base `variant` (`default` / `compact`). Token-only colors via
 * `useXenitionTheme()`.
 */
export function ClientIntakeRowV4({
  name,
  practiceArea,
  status = 'new',
  conflict,
  source,
  summary,
  avatarUrl,
  variant = 'default',
  actionable = false,
  onAccept,
  onDecline,
  onPress,
  testID,
  style,
}: ClientIntakeRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const decided = status === 'retained' || status === 'declined';
  const showActions = actionable && !decided;
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{name}</Text>
          {source ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{source}</Text> : null}
        </View>
        <StatusPill meta={INTAKE_STATUS_META[status]} variant="soft" size="sm" />
      </View>

      {!compact && (practiceArea || conflict) ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
          {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
          {conflict ? <StatusPill meta={CONFLICT_CHECK_META[conflict]} variant="soft" size="sm" /> : null}
        </View>
      ) : null}

      {!compact && summary ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{summary}</Text> : null}

      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {onAccept ? (
            <Button size="sm" variant="primary" disabled={conflict === 'conflict'} onPress={onAccept}>
              Accept
            </Button>
          ) : null}
          {onDecline ? (
            <Button size="sm" variant="outline" onPress={onDecline}>
              Decline
            </Button>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Intake ${name}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
