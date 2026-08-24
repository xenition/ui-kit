import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV3Props = PrescriptionRowProps;

interface StatusMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<PrescriptionStatus, StatusMeta> = {
  active: { glyph: '●', label: 'Active', color: 'successText' },
  'refill-due': { glyph: '↻', label: 'Refill due', color: 'warnText' },
  paused: { glyph: '⏸', label: 'Paused', color: 'muted' },
  expired: { glyph: '✕', label: 'Expired', color: 'dangerText' },
};

/**
 * PrescriptionRow, redesigned (v3): a **dense line with a status chip**. The
 * drug name and (middot-joined) dose / directions share one flexible line, and
 * a compact tinted status chip (glyph + word) hugs the right edge. No pill tile,
 * no card, no separate refill button — a lean formulary line tuned for long med
 * lists (a refill-due row still reads its "↻ Refill due" chip). Distinct at a
 * glance from v1's row and v2's card. Same props, token-pure.
 */
export function PrescriptionRowV3({
  name,
  dose,
  frequency,
  refillsLeft,
  status = 'active',
  onRefill,
  onPress,
  style,
}: PrescriptionRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];

  const detail = [dose, frequency, refillsLeft != null ? `${refillsLeft} left` : undefined]
    .filter(Boolean)
    .join(' · ');
  const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
  // A refill-due row prefers the refill handler; otherwise the row press.
  const handler = status === 'refill-due' && onRefill ? onRefill : onPress;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          minHeight: 44,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        {detail !== '' ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(statusColor, 0.1),
          borderWidth: 1,
          borderColor: withAlpha(statusColor, 0.2),
        }}
      >
        <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          {meta.label}
        </Text>
      </View>
    </View>
  );

  if (!handler) {
    return <View accessibilityLabel={a11y}>{body}</View>;
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={handler}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
