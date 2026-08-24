import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from './internal';

/** The three SLA health states. */
export type SLAState = 'on-track' | 'at-risk' | 'breached';
export type SLABadgeSize = 'sm' | 'md';

export interface SLABadgeProps {
  /** SLA health. Drives glyph + label + tone — never color alone. */
  state: SLAState;
  /**
   * Optional right-hand hint (e.g. a remaining-time string like `"2h left"`
   * or `"12m over"`). Rendered after the state label.
   */
  hint?: string;
  /** Size scale (default `md`). */
  size?: SLABadgeSize;
  /** Override the visible state label (defaults to a humanized state). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

interface StateSpec {
  slot: keyof SemanticColors;
  glyph: string;
  label: string;
}

// breached → danger, at-risk → warn, on-track → success. Each also carries a
// distinct glyph so the state reads without color (a11y / colorblind).
const STATE: Record<SLAState, StateSpec> = {
  'on-track': { slot: 'success', glyph: '●', label: 'On track' },
  'at-risk': { slot: 'warn', glyph: '▲', label: 'At risk' },
  breached: { slot: 'danger', glyph: '■', label: 'Breached' },
};

const SIZE: Record<SLABadgeSize, { text: 'xs' | 'sm'; padV: number; padKey: 'xs' | 'sm' }> = {
  sm: { text: 'xs', padV: 1, padKey: 'xs' },
  md: { text: 'sm', padV: 3, padKey: 'sm' },
};

/**
 * SLA health pill for a helpdesk ticket. Encodes `on-track` / `at-risk` /
 * `breached` with a semantic tint **and** a distinct glyph + text label, so the
 * state is legible without relying on color (colorblind-safe / screen-reader
 * announced). Colors come only from `SemanticColors` (`success`/`warn`/`danger`)
 * via a token-derived soft tint — no literal hex. Purely presentational.
 */
export function SLABadge({
  state,
  hint,
  size = 'md',
  label,
  style,
}: SLABadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = STATE[state] ?? STATE['on-track'];
  const sz = SIZE[size] ?? SIZE.md;
  const accent = colors[spec.slot];
  const text = label ?? spec.label;
  const a11y = hint ? `SLA ${text}, ${hint}` : `SLA ${text}`;

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
          borderColor: accent,
          borderWidth: 1,
          borderRadius: tokens.radius.full,
          paddingVertical: sz.padV,
          paddingHorizontal: tokens.spacing[sz.padKey],
        },
        style,
      ]}
    >
      <Text style={{ color: accent, fontSize: tokens.typography.scale[sz.text] }}>{spec.glyph}</Text>
      <Text style={{ color: accent, fontSize: tokens.typography.scale[sz.text], fontWeight: '600' }}>
        {text}
      </Text>
      {hint ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale[sz.text] }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
