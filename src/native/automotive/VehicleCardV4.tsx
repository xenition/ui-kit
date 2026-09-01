import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine, skeletonFill, type ToneV4 } from './internal/fleet-v4';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';

export interface VehicleCardV4Props extends VehicleCardProps {
  /** Override the status words — four English phrases lived inside. */
  statusLabels?: Partial<Record<VehicleStatus, string>>;
}

/** Status → tone and default word. Genuinely a status, so the tones stay. */
const STATUS_META: Record<VehicleStatus, { label: string; tone: ToneV4 }> = {
  available: { label: 'Available', tone: 'success' },
  'in-use': { label: 'In use', tone: 'primary' },
  maintenance: { label: 'Maintenance', tone: 'warn' },
  offline: { label: 'Offline', tone: 'neutral' },
};

/**
 * **V4 vehicle card** — same props as {@link VehicleCard} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The plate is monospaced-by-figures and boxed.** A registration is an
 *    identifier a user matches against a real car in a car park; the base set
 *    it as ordinary caption text among the other specs.
 * 2. **The spec list is a real definition list**, announced as label/value
 *    pairs rather than as a run of loose strings.
 * 3. **Press is a state layer**, not `opacity` on the card's content.
 * 4. **The skeleton is opaque** and the ground is `card`, so the tile reads as
 *    an object on a dark page instead of a bordered region.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function VehicleCardV4({
  name,
  plate,
  vehicleClass,
  color,
  year,
  status = 'available',
  specs = [],
  variant = 'default',
  statusLabels,
  onPress,
  loading = false,
  style,
}: VehicleCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
        {[55, 35].map((w) => (
          <View
            key={w}
            style={{
              height: tokens.typography.scale.base,
              width: `${w}%`,
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        ))}
      </CardV4>
    );
  }

  if (!name) return null;

  const meta = STATUS_META[status];
  const word = statusLabels?.[status] ?? meta.label;
  const compact = variant === 'compact';
  const caption = metaLine([vehicleClass, color, year]);

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {caption ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {caption}
            </TextV4>
          ) : null}
        </View>
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {word}
        </BadgeV4>
      </View>

      {/*
        A registration is an identifier a user matches against a real car, so
        it gets a box and tabular figures rather than sitting in the run of
        specs the way the base had it.
      */}
      {plate ? (
        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
          }}
        >
          <TextV4 size="sm" weight="bold" tone="onCard" numeric="tabular">
            {plate}
          </TextV4>
        </View>
      ) : null}

      {!compact && specs.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }}>
          {specs.map((spec) => (
            <View key={spec.label} accessible accessibilityLabel={`${spec.label}: ${spec.value}`}>
              <TextV4 size="xs" tone="mutedText">
                {spec.label}
              </TextV4>
              <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
                {spec.value}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([name, plate, word, caption])}
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      })}
    >
      <CardV4 style={style}>{body}</CardV4>
    </Pressable>
  );
}
