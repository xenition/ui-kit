import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from './internal';
import type { SLABadgeProps, SLAState, SLABadgeSize } from './SLABadge';

/** Drop-in for {@link SLABadgeProps} — same props, the V4 "calm console" design. */
export type SLABadgeV4Props = SLABadgeProps;

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

const SIZE: Record<SLABadgeSize, { text: 'xs' | 'sm'; hint: 'sm' | 'base'; padV: number; padKey: 'xs' | 'sm' }> = {
  sm: { text: 'xs', hint: 'sm', padV: 2, padKey: 'xs' },
  md: { text: 'sm', hint: 'base', padV: 4, padKey: 'sm' },
};

/**
 * SLABadge — **V4** "calm console" design (native twin, drop-in for
 * {@link SLABadgeProps}). An SLA status badge rendered as a soft-tint pill
 * (`withAlpha(color, 0.12)`) carrying a glyph + state label and, when supplied, a
 * big legible remaining-time `hint` in `tabular-nums`. Encodes `on-track` →
 * success, `at-risk` → warn, `breached` → danger with a distinct glyph **and**
 * color, so the state reads without relying on color (colorblind-safe /
 * screen-reader announced). Same props/behavior as the base; token-only colors
 * via `useXenitionTheme()` — no literal hex. Presentational.
 */
export function SLABadgeV4({
  state,
  hint,
  size = 'md',
  label,
  style,
}: SLABadgeV4Props): React.ReactElement {
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
          backgroundColor: withAlpha(accent, 0.12),
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
        <Text
          style={{
            color: accent,
            fontSize: tokens.typography.scale[sz.hint],
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
