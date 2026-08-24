import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Badge } from '../primitives';

/** Herd / flock health — colors the count and pairs with a text chip. */
export type LivestockHealth = 'healthy' | 'monitor' | 'sick';

export interface LivestockRowProps {
  /** Species / group name (e.g. "Dairy Cows", "Layer Hens"). */
  species: string;
  /** Head count for the group. Guarded; shown as "—" when omitted. */
  count?: number;
  /** Leading glyph/emoji. Default `'🐄'`. */
  icon?: string;
  /** Pen / paddock / barn location (e.g. "Barn 2"). */
  location?: string;
  /** Herd health — colors the count and shows a text status chip. */
  health?: LivestockHealth;
  /** Optional secondary metric line (e.g. "avg 640 kg"). */
  detail?: string;
  /** Hide the bottom divider (last row in a list). */
  last?: boolean;
  /** Fires when the row is tapped. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const HEALTH_META: Record<
  LivestockHealth,
  { label: string; color: keyof SemanticColors; tone: 'success' | 'warn' | 'danger' }
> = {
  healthy: { label: 'Healthy', color: 'onSurface', tone: 'success' },
  monitor: { label: 'Monitor', color: 'warn', tone: 'warn' },
  sick: { label: 'Sick', color: 'danger', tone: 'danger' },
};

/**
 * A livestock group row — species glyph, name, head count (emphasized), and an
 * optional location, closed by a health {@link Badge}. Health colors the count
 * but is always paired with a text chip so an at-risk group reads without
 * color. `count` is guarded (renders "—" when absent). A hairline divider
 * separates rows unless `last`. Tappable via `onPress`. Token-bound throughout.
 */
export function LivestockRow({
  species,
  count,
  icon = '🐄',
  location,
  health = 'healthy',
  detail,
  last = false,
  onPress,
  style,
}: LivestockRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = HEALTH_META[health];
  const shownCount = typeof count === 'number' ? String(count) : '—';

  const Body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Icon glyph={icon} size="xl" color="onSurface" />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {species}
        </Text>
        {(location != null || detail != null) ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[location, detail].filter((s) => s != null && s !== '').join(' · ')}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
          {shownCount}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>
    </View>
  );

  if (!onPress) return Body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${species}, ${shownCount} head, ${meta.label}`}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {Body}
    </Pressable>
  );
}
