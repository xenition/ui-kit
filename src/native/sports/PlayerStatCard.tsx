import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar } from '../primitives';

/** A single labelled stat cell. */
export interface PlayerStat {
  /** Caption (e.g. `Goals`). */
  label: string;
  /** Value (number or preformatted string). */
  value: React.ReactNode;
  /** Optional emphasis — draws the value in the primary accent. */
  highlight?: boolean;
}

export interface PlayerStatCardProps {
  /** Player display name. */
  name: string;
  /** Squad position (e.g. `Forward`). */
  position?: string;
  /** Shirt number. */
  number?: number;
  /** Photo URL (initials fallback when absent). */
  photo?: string;
  /** Team caption under the name. */
  team?: string;
  /** Stat cells laid out in a responsive grid. */
  stats?: PlayerStat[];
  /** `full` card / `compact` header-only. Default `full`. */
  variant?: 'full' | 'compact';
  /** Availability flag — shows an "Injured/Out" chip (text + glyph). */
  status?: 'available' | 'injured' | 'suspended';
  /** Loading skeleton. */
  loading?: boolean;
  /** Fires on tap. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<
  NonNullable<PlayerStatCardProps['status']>,
  { label: string; glyph: string; tone: 'success' | 'danger' | 'warn' }
> = {
  available: { label: 'Available', glyph: '✓', tone: 'success' },
  injured: { label: 'Injured', glyph: '＋', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '⛔', tone: 'warn' },
};

/**
 * A player profile + stat grid — avatar (initials fallback), name/position/
 * number, and a grid of labelled stat cells. Availability is shown as a chip
 * carrying both a glyph and text so it never reads by color alone.
 * Presentational; shaped props plus optional `onPress`. Empty stats and a
 * loading skeleton are handled. Token-only colors.
 */
export function PlayerStatCard({
  name,
  position,
  number,
  photo,
  team,
  stats = [],
  variant = 'full',
  status,
  loading = false,
  onPress,
  style,
}: PlayerStatCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading player" style={[container, style]}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
            <View style={{ height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          </View>
        </View>
      </View>
    );
  }

  const meta = status ? STATUS_META[status] : undefined;
  const metaColor =
    meta?.tone === 'success' ? colors.success : meta?.tone === 'danger' ? colors.danger : colors.warn;

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Avatar src={photo} name={name} size={compact ? 'sm' : 'lg'} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {number !== undefined ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {number}
            </Text>
          ) : null}
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[position, team].filter(Boolean).join(' · ') || 'Player'}
        </Text>
      </View>
      {meta ? (
        <View
          accessibilityLabel={meta.label}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: metaColor,
            backgroundColor: tokens.ramps.neutral[50],
          }}
        >
          <Text allowFontScaling={false} style={{ color: metaColor, fontSize: tokens.typography.scale.xs }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: metaColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      ) : null}
    </View>
  );

  const grid =
    !compact && stats.length > 0 ? (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {stats.map((s, i) => (
          <View
            key={`${s.label}-${i}`}
            style={{
              minWidth: 72,
              flexGrow: 1,
              flexBasis: '28%',
              padding: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.ramps.neutral[50],
            }}
          >
            <Text
              style={{
                color: s.highlight ? colors.primary : colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '700',
              }}
            >
              {s.value}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>
    ) : !compact ? (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No stats recorded</Text>
    ) : null;

  const body = (
    <View style={[container, style]}>
      {header}
      {grid}
    </View>
  );

  const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
