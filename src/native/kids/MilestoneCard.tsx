import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';

export type MilestoneCategory =
  | 'physical'
  | 'cognitive'
  | 'social'
  | 'language'
  | 'emotional'
  | 'other';

interface CategoryMeta {
  glyph: string;
  label: string;
}

const CATEGORY_META: Record<MilestoneCategory, CategoryMeta> = {
  physical: { glyph: '🏃', label: 'Physical' },
  cognitive: { glyph: '🧠', label: 'Cognitive' },
  social: { glyph: '🤝', label: 'Social' },
  language: { glyph: '💬', label: 'Language' },
  emotional: { glyph: '❤️', label: 'Emotional' },
  other: { glyph: '🌟', label: 'Milestone' },
};

export interface MilestoneCardProps {
  /** Milestone title, e.g. "First steps". */
  title: string;
  /** Developmental category; drives the icon + label. */
  category?: MilestoneCategory;
  /** Date the milestone was reached (or is expected). */
  date?: string;
  /** Typical age band, e.g. "12–15 mo". */
  ageLabel?: string;
  /** Free-text description / note. */
  description?: string;
  /** Whether the milestone has been achieved. */
  achieved?: boolean;
  /** Loading placeholder state. */
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A developmental milestone: a category icon, title, date/age band, an optional
 * note, and an achieved/upcoming chip. State is conveyed by glyph + text + a11y
 * label (never color alone). Renders a muted skeleton while `loading`.
 * Token-only colors.
 */
export function MilestoneCard({
  title,
  category = 'other',
  date,
  ageLabel,
  description,
  achieved = false,
  loading = false,
  onPress,
  style,
}: MilestoneCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CATEGORY_META[category] ?? CATEGORY_META.other;

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.sm,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading milestone" style={container}>
        <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const subParts = [ageLabel, date].filter(Boolean) as string[];

  const inner = (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          {meta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[meta.label, ...subParts].join(' · ')}
          </Text>
        </View>
        <Badge tone={achieved ? 'success' : 'neutral'} variant="soft" size="sm">
          {achieved ? '✓ Achieved' : '◦ Upcoming'}
        </Badge>
      </View>

      {description ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
      ) : null}
    </View>
  );

  const a11y = `${title}, ${meta.label}, ${achieved ? 'achieved' : 'upcoming'}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
