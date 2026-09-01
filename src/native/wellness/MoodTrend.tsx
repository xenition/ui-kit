import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import type { Mood } from './MoodCheckIn';

export interface MoodTrendPoint {
  label: string;
  mood: Mood;
}

export interface MoodTrendProps {
  data: MoodTrendPoint[];
  title?: string;
  style?: StyleProp<ViewStyle>;
}

interface MoodBarMeta {
  level: number;
  color: keyof SemanticColors;
}

const MOOD_BAR: Record<Mood, MoodBarMeta> = {
  awful: { level: 1, color: 'danger' },
  bad: { level: 2, color: 'warn' },
  okay: { level: 3, color: 'muted' },
  good: { level: 4, color: 'primary' },
  great: { level: 5, color: 'success' },
};

const MAX_BAR_HEIGHT = 96;

/**
 * MoodTrend — a week of mood at a glance: a clean card with one vertical bar per
 * day, its height set by the mood level (awful→great, 1..5 of a fixed max) and
 * its fill the mood's semantic color. The card stays calm (surface + border);
 * only the bars carry color, and each day's mood is announced (state, not color
 * alone). Empty data shows a muted note. Token-only colors.
 */
export function MoodTrend({ data, title = 'Mood this week', style }: MoodTrendProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Text
        accessibilityRole="header"
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
      >
        {title}
      </Text>

      {data.length === 0 ? (
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
          No mood data yet.
        </Text>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: tokens.spacing.xs,
            height: MAX_BAR_HEIGHT + tokens.spacing.md,
          }}
        >
          {data.map((point, i) => {
            const meta = MOOD_BAR[point.mood] ?? MOOD_BAR.okay;
            const height = Math.max(4, (meta.level / 5) * MAX_BAR_HEIGHT);
            return (
              <View
                key={`${point.label}-${i}`}
                accessibilityRole="text"
                accessibilityLabel={`${point.label}: ${point.mood}`}
                style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}
              >
                <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'stretch' }}>
                  <View
                    style={{
                      height,
                      borderRadius: tokens.radius.sm,
                      backgroundColor: colors[meta.color],
                    }}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}
                >
                  {point.label}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
