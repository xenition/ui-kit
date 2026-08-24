import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives';

export type PrescriptionStatus = 'active' | 'refill-due' | 'paused' | 'expired';

interface StatusMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<PrescriptionStatus, StatusMeta> = {
  active: { glyph: '●', label: 'Active', color: 'success' },
  'refill-due': { glyph: '↻', label: 'Refill due', color: 'warn' },
  paused: { glyph: '⏸', label: 'Paused', color: 'muted' },
  expired: { glyph: '✕', label: 'Expired', color: 'danger' },
};

export interface PrescriptionRowProps {
  /** Medication name, e.g. "Atorvastatin". */
  name: string;
  /** Strength / dose, e.g. "20 mg". */
  dose?: string;
  /** Directions, e.g. "1 tablet, once daily". */
  frequency?: string;
  /** Refills remaining. */
  refillsLeft?: number;
  /** Dispensing status. Shown by glyph + text, never color alone. Defaults `active`. */
  status?: PrescriptionStatus;
  /** Fires when the refill action is pressed (shown for `refill-due`). */
  onRefill?: () => void;
  /** Fires when the row itself is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A medication list row for a prescription / pharmacy screen: drug name, dose,
 * directions, refills remaining, and a status marker (active / refill-due /
 * paused / expired) drawn as a glyph + label so it never relies on color alone.
 * A "Refill" action surfaces when a refill is due. Informational UI only — not
 * a medical device. Token-only colors.
 */
export function PrescriptionRow({
  name,
  dose,
  frequency,
  refillsLeft,
  status = 'active',
  onRefill,
  onPress,
  style,
}: PrescriptionRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];

  const detailParts = [
    dose,
    frequency,
    refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
  ].filter(Boolean) as string[];

  const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          minHeight: 56,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
        💊
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        {detailParts.length ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {detailParts.join('  ·  ')}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>
      {status === 'refill-due' && onRefill ? (
        <Button size="sm" variant="soft" tone="default" onPress={onRefill}>
          Refill
        </Button>
      ) : null}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{content}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
