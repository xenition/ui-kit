import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney } from '../commerce/money';
import { metaLine, onPair, toneFill, type ToneV4 } from './internal/fleet-v4';
import type { ParkingSpotProps, ParkingStatus } from './ParkingSpot';

export interface ParkingSpotV4Props extends ParkingSpotProps {
  /** Override the status words — four English phrases lived inside the component. */
  statusLabels?: Partial<Record<ParkingStatus, string>>;
  /** Build the hourly price. Default `'$4.50/hr'`. */
  formatRate?: (price: string) => string;
  /** Announced for an EV bay. Default `'EV charging'`. */
  evLabel?: string;
}

/** Status → tone, word and glyph. Genuinely a status, so the tones stay. */
const STATUS_META: Record<ParkingStatus, { label: string; tone: ToneV4; glyph: string }> = {
  available: { label: 'Available', tone: 'success', glyph: 'P' },
  occupied: { label: 'Occupied', tone: 'danger', glyph: '✕' },
  reserved: { label: 'Reserved', tone: 'warn', glyph: '★' },
  disabled: { label: 'Out of service', tone: 'neutral', glyph: '—' },
};

/**
 * **V4 parking spot** — same props as {@link ParkingSpot} plus `statusLabels`,
 * `formatRate` and `evLabel`.
 *
 * ## Four changes
 *
 * 1. **The disc's glyph uses its *paired* ink.** The base filled the disc
 *    `colors[tone]` and inked the glyph `onPrimary` regardless — the compiler
 *    guarantees `onSuccess` against `success` and nothing about `onPrimary`
 *    on it. `onPair()` is the fix.
 * 2. **An unavailable spot cannot be pressed**, and dims at M3's 0.38. The
 *    base left `occupied` and `disabled` fully pressable.
 * 3. **Status is a word beside the colour**, not colour and a glyph alone.
 * 4. **The rate is tabular** so a list of bays lines up, and the EV marker is
 *    announced rather than being a bare lightning glyph.
 *
 * **Renders nothing without a `spotId`** (§4.5).
 */
export function ParkingSpotV4({
  spotId,
  level,
  status = 'available',
  priceCentsPerHour,
  currency = 'USD',
  distanceLabel,
  evCharging = false,
  variant = 'tile',
  statusLabels,
  formatRate,
  evLabel = 'EV charging',
  onSelect,
  style,
}: ParkingSpotV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!spotId) return null;

  const meta = STATUS_META[status];
  const word = statusLabels?.[status] ?? meta.label;
  const tile = variant === 'tile';
  // Only an available bay can be taken. The base let a user press "Occupied".
  const selectable = status === 'available' && Boolean(onSelect);
  const unavailable = status === 'occupied' || status === 'disabled';

  const rate =
    typeof priceCentsPerHour === 'number'
      ? (formatRate ?? ((p: string) => `${p}/hr`))(formatMoney(priceCentsPerHour, currency))
      : null;
  const caption = metaLine([level, distanceLabel, evCharging ? evLabel : null]);

  const disc = (
    <View
      style={{
        width: minTap(tokens.spacing),
        height: minTap(tokens.spacing),
        borderRadius: tokens.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: toneFill(theme, meta.tone),
      }}
    >
      {/*
        `onPair()`, not `onPrimary`. The compiler guarantees `onSuccess`
        against `success`; whether `onPrimary` is readable on it is luck.
      */}
      <TextV4 size="base" weight="bold" style={{ color: onPair(theme, meta.tone) }}>
        {meta.glyph}
      </TextV4>
    </View>
  );

  const content = (
    <View
      style={{
        flexDirection: tile ? 'column' : 'row',
        alignItems: tile ? 'flex-start' : 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        padding: tokens.spacing.md,
        opacity: disabledOpacity(theme.state, unavailable),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {disc}
        <View style={{ flex: 1 }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {spotId}
          </TextV4>
          {caption ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {caption}
            </TextV4>
          ) : null}
        </View>
        {evCharging ? <IconV4 name="bolt" size="sm" color="primaryText" /> : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          alignSelf: 'stretch',
        }}
      >
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {word}
        </BadgeV4>
        {rate ? (
          <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
            {rate}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  const name = metaLine([spotId, word, caption, rate]);

  if (!selectable) {
    return (
      <View accessible accessibilityLabel={name} accessibilityState={{ disabled: unavailable }} style={style}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onSelect}
      style={({ pressed }) => [
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
        },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
