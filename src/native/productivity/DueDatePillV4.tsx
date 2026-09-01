import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { DueDatePillProps, DueDateTone } from './DueDatePill';

/** Drop-in for {@link DueDatePillProps} — same props, the V4 "flow" design. */
export type DueDatePillV4Props = DueDatePillProps;

/**
 * Maps a due tone to its `[tint-source, legible-foreground]` semantic slots:
 * `overdue` escalates to danger, `today` warns, `upcoming` rests on a calm
 * primary wash. The tint slot is softened with `withAlpha`; urgency reads by
 * color *and* glyph, never color alone. No literals.
 */
const TONE: Record<DueDateTone, [keyof SemanticColors, keyof SemanticColors]> = {
  overdue: ['danger', 'dangerText'],
  today: ['warn', 'warnText'],
  upcoming: ['primary', 'primaryText'],
};

const GLYPH: Record<DueDateTone, string> = {
  overdue: '⚠',
  today: '●',
  upcoming: '🗓',
};

/**
 * DueDatePill — **V4** "flow" design. The focused-workspace take on a deadline:
 * a rounded **soft-tint** pill with a leading calendar/clock glyph and the date,
 * colored by urgency `tone`. Calm by default (a gentle primary wash), escalating
 * to danger/warn only when the date demands it — and always paired with a glyph
 * so urgency never rides on color alone. Same props/behavior as
 * {@link DueDatePillProps}; token-only colors via `useXenitionTheme()`.
 */
export function DueDatePillV4({ label, tone = 'upcoming', glyph, style }: DueDatePillV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [tint, fg] = TONE[tone] ?? TONE.upcoming;
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Due ${label}${tone === 'overdue' ? ', overdue' : ''}`}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(colors[tint], 0.12),
          borderRadius: tokens.radius.full,
          paddingVertical: 4,
          paddingHorizontal: tokens.spacing.sm + 2,
        },
        style,
      ]}
    >
      <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.sm }}>
        {glyph ?? GLYPH[tone] ?? GLYPH.upcoming}
      </Text>
      <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {label}
      </Text>
    </View>
  );
}
