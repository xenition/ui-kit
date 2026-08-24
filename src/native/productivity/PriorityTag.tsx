import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Task priority levels, low → urgent. */
export type PriorityLevel = 'low' | 'med' | 'high' | 'urgent';

export interface PriorityTagProps {
  /** Priority level to render. */
  level: PriorityLevel;
  /** Custom label; defaults to a capitalized level name. */
  label?: string;
  /** Dot-only mode (no text) — for dense rows. */
  dotOnly?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Maps a priority level to its `[background, foreground]` semantic slots. Per the
 * token contract: `urgent` → danger, `high` → warn; `med`/`low` de-escalate to
 * primary/neutral. Never a literal color.
 */
const LEVEL: Record<PriorityLevel, [keyof SemanticColors, keyof SemanticColors]> = {
  low: ['border', 'onSurface'],
  med: ['primary', 'onPrimary'],
  high: ['warn', 'onWarn'],
  urgent: ['danger', 'onDanger'],
};

const DEFAULT_LABEL: Record<PriorityLevel, string> = {
  low: 'Low',
  med: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/**
 * Small priority pill — a token-bound background/foreground per level, with a
 * `dotOnly` mode that collapses to a colored dot for dense task rows. Every
 * color traces to a `SemanticColors` slot. No literal colors.
 */
export function PriorityTag({ level, label, dotOnly = false, style }: PriorityTagProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [bg, fg] = LEVEL[level] ?? LEVEL.low;
  const text = label ?? DEFAULT_LABEL[level] ?? 'Low';

  if (dotOnly) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel={`${text} priority`}
        style={[
          { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[bg] },
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
          backgroundColor: colors[bg],
          borderRadius: tokens.radius.sm,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {text}
      </Text>
    </View>
  );
}
