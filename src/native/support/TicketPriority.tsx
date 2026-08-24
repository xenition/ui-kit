import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from './internal';

/** Ticket priority levels, low → urgent. */
export type Priority = 'low' | 'normal' | 'high' | 'urgent';
/** `chip` = pill with label; `bars` = a compact signal-strength indicator. */
export type TicketPriorityVariant = 'chip' | 'bars';
export type TicketPrioritySize = 'sm' | 'md';

export interface TicketPriorityProps {
  /** The priority level. */
  level: Priority;
  /** Visual treatment (default `chip`). */
  variant?: TicketPriorityVariant;
  /** Size scale (default `md`). */
  size?: TicketPrioritySize;
  /** Hide the text label (glyph/bars only). Label still drives a11y. */
  hideLabel?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface LevelSpec {
  slot: keyof SemanticColors;
  glyph: string;
  label: string;
  /** Filled bars out of 4 for the `bars` variant. */
  rank: number;
}

// urgent → danger, high → warn, normal → primary, low → muted. Distinct glyph +
// bar count so priority is never conveyed by color alone.
const LEVEL: Record<Priority, LevelSpec> = {
  low: { slot: 'muted', glyph: '▽', label: 'Low', rank: 1 },
  normal: { slot: 'primary', glyph: '▷', label: 'Normal', rank: 2 },
  high: { slot: 'warn', glyph: '△', label: 'High', rank: 3 },
  urgent: { slot: 'danger', glyph: '⚑', label: 'Urgent', rank: 4 },
};

const TOTAL_BARS = 4;

/**
 * Ticket priority indicator (`low`/`normal`/`high`/`urgent`). Two variants: a
 * `chip` (glyph + label pill) and `bars` (a four-step signal indicator whose
 * filled count encodes the level). Tone maps to `SemanticColors`
 * (`danger`/`warn`/`primary`/`muted`) via a token tint; the glyph and the bar
 * count carry the level independently of color. No literal hex. Presentational.
 */
export function TicketPriority({
  level,
  variant = 'chip',
  size = 'md',
  hideLabel = false,
  style,
}: TicketPriorityProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = LEVEL[level] ?? LEVEL.normal;
  const accent = colors[spec.slot];
  const textKey = size === 'sm' ? 'xs' : 'sm';
  const a11y = `Priority ${spec.label}`;

  if (variant === 'bars') {
    const barH = size === 'sm' ? 10 : 14;
    return (
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={a11y}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
          {Array.from({ length: TOTAL_BARS }, (_, i) => (
            <View
              key={i}
              style={{
                width: size === 'sm' ? 3 : 4,
                height: Math.round((barH * (i + 1)) / TOTAL_BARS),
                borderRadius: 1,
                backgroundColor: i < spec.rank ? accent : withAlpha(colors.onSurface, 0.16),
              }}
            />
          ))}
        </View>
        {hideLabel ? null : (
          <Text
            style={{ color: accent, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }}
          >
            {spec.label}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={a11y}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(accent, 0.14),
          borderRadius: tokens.radius.full,
          paddingVertical: size === 'sm' ? 1 : 3,
          paddingHorizontal: tokens.spacing[size === 'sm' ? 'xs' : 'sm'],
        },
        style,
      ]}
    >
      <Text style={{ color: accent, fontSize: tokens.typography.scale[textKey] }}>{spec.glyph}</Text>
      {hideLabel ? null : (
        <Text
          style={{ color: accent, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }}
        >
          {spec.label}
        </Text>
      )}
    </View>
  );
}
