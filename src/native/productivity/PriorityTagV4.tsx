import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { PriorityLevel, PriorityTagProps } from './PriorityTag';

/** Drop-in for {@link PriorityTagProps} — same props, the V4 "flow" design. */
export type PriorityTagV4Props = PriorityTagProps;

/**
 * Per level, its `[fill slot, text slot, glyph]`. Per the token contract,
 * priority is carried by color **and** a leading glyph — never color alone:
 * `urgent` → danger, `high` → warn, `med` → primary, `low` → neutral/muted.
 * The fill is used as a soft tint via `withAlpha`; the text is a
 * contrast-safe `*Text` slot. Never a literal color.
 */
const LEVEL: Record<PriorityLevel, { fill: keyof SemanticColors; text: keyof SemanticColors; glyph: string }> = {
  low: { fill: 'border', text: 'mutedText', glyph: '▾' },
  med: { fill: 'primary', text: 'primaryText', glyph: '◆' },
  high: { fill: 'warn', text: 'warnText', glyph: '▲' },
  urgent: { fill: 'danger', text: 'dangerText', glyph: '⚑' },
};

const DEFAULT_LABEL: Record<PriorityLevel, string> = {
  low: 'Low',
  med: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/**
 * PriorityTag — **V4** "flow" design. The focused-workspace take on a priority
 * chip: a **soft-tint pill** colored by level with a leading glyph so urgency
 * reads by shape as well as color, keeping the base levels and the `dotOnly`
 * dense mode. Same props/behavior as {@link PriorityTagProps}; token-only colors
 * via `useXenitionTheme()` + `withAlpha`.
 */
export function PriorityTagV4({ level, label, dotOnly = false, style }: PriorityTagV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { fill, text: textSlot, glyph } = LEVEL[level] ?? LEVEL.low;
  const text = label ?? DEFAULT_LABEL[level] ?? 'Low';

  if (dotOnly) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel={`${text} priority`}
        style={[
          { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[fill] },
          style,
        ]}
      />
    );
  }

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`${text} priority`}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(colors[fill], 0.16),
          borderRadius: tokens.radius.full,
          paddingVertical: 3,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ color: colors[textSlot], fontSize: tokens.typography.scale.xs }}>{glyph}</Text>
      <Text style={{ color: colors[textSlot], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {text}
      </Text>
    </View>
  );
}
