import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Relative due-date urgency. */
export type DueDateTone = 'overdue' | 'today' | 'upcoming';

export interface DueDatePillProps {
  /** Pre-formatted date label (e.g. `'Aug 24'`, `'Tomorrow'`). */
  label: string;
  /** Urgency tone; drives the semantic color. */
  tone?: DueDateTone;
  /** Optional leading glyph override (default a calendar/clock per tone). */
  glyph?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Maps a due tone to its `[background, foreground]` semantic slots: `overdue`
 * escalates to danger, `today` to warn, `upcoming` stays neutral. No literals.
 */
const TONE: Record<DueDateTone, [keyof SemanticColors, keyof SemanticColors]> = {
  overdue: ['danger', 'onDanger'],
  today: ['warn', 'onWarn'],
  upcoming: ['border', 'onSurface'],
};

const GLYPH: Record<DueDateTone, string> = {
  overdue: '⚠',
  today: '●',
  upcoming: '🗓',
};

/**
 * Compact due-date pill — a token-bound background/foreground keyed off the
 * urgency `tone`, with a leading glyph. For deadlines on task rows and cards.
 * Every color traces to a `SemanticColors` slot. No literal colors.
 */
export function DueDatePill({ label, tone = 'upcoming', glyph, style }: DueDatePillProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [bg, fg] = TONE[tone] ?? TONE.upcoming;
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
          backgroundColor: colors[bg],
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs }}>
        {glyph ?? GLYPH[tone] ?? GLYPH.upcoming}
      </Text>
      <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {label}
      </Text>
    </View>
  );
}
