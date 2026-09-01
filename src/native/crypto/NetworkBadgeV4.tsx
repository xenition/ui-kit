import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { spokenLine, toneFill, toneInk, type ToneV4 } from './internal/market-v4';
import type { NetworkBadgeProps, NetworkStatus } from './NetworkBadge';

/**
 * The identity slot the chain's dot is painted from.
 *
 * The base twins disagreed about what `tone` even was: native took the whole
 * of `keyof SemanticColors`, web took `IconColor`. Same prop, same component,
 * two unions — so `tone="accent"` compiled on the phone and not on the laptop.
 * V4 settles on web's ten, which is the intersection and the set both twins
 * can actually paint.
 */
export type NetworkBadgeV4Tone =
  | 'onSurface'
  | 'onPrimary'
  | 'primary'
  | 'muted'
  | 'success'
  | 'onSuccess'
  | 'warn'
  | 'onWarn'
  | 'danger'
  | 'onDanger';

export interface NetworkBadgeV4Props extends NetworkBadgeProps {
  /** Identity slot for the chain's dot. See {@link NetworkBadgeV4Tone}. */
  tone?: NetworkBadgeV4Tone;
  /** Wording for the health readings. Defaults `Connected` / `Congested` / `Offline`. */
  statusLabels?: Partial<Record<NetworkStatus, string>>;
}

/** Health is genuinely a status, so it is genuinely the status tones. */
const STATUS_TONE: Record<NetworkStatus, ToneV4> = {
  connected: 'success',
  congested: 'warn',
  disconnected: 'danger',
};

const STATUS_WORD: Record<NetworkStatus, string> = {
  connected: 'Connected',
  congested: 'Congested',
  disconnected: 'Offline',
};

/**
 * **V4 network badge** — same props as {@link NetworkBadge} plus
 * `statusLabels`, with `tone` narrowed to the union its web twin already had.
 *
 * ## Three changes
 *
 * 1. **The health word carries the health.** Native drew `Congested` in
 *    `muted` — a ramp step with no contrast promise and no meaning — so the
 *    signal lived entirely in an 8px dot, and only the web twin put it in
 *    text. The word now takes its status ink, which is the same reading on
 *    both platforms.
 * 2. **`tone` is one union across the twins.** See {@link NetworkBadgeV4Tone}.
 * 3. **Nothing is off the scale.** `paddingVertical: 2` and `gap: 3` were
 *    invented numbers; the pill is now composed from `spacing`, its ground is
 *    `card` rather than a raw ramp index, and the two dots — which say nothing
 *    a reader cannot already hear in the name — are hidden from the reader.
 */
export function NetworkBadgeV4({
  name,
  status,
  tone = 'primary',
  glyph,
  size = 'md',
  statusLabels,
  style,
}: NetworkBadgeV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const textKey = size === 'sm' ? 'xs' : 'sm';
  // The same expression `BadgeV4` sizes its dot with, so a chain pill and a
  // status badge beside it carry the same mark rather than two near-identical
  // circles.
  const dotSize = size === 'sm' ? tokens.spacing.sm * 0.75 : tokens.spacing.sm;

  const statusWord = status ? (statusLabels?.[status] ?? STATUS_WORD[status]) : undefined;
  const statusTone = status ? STATUS_TONE[status] : undefined;

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={spokenLine([name, statusWord])}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.full,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {glyph != null ? (
        <TextV4 size={textKey} style={{ color: colors[tone] }}>
          {glyph}
        </TextV4>
      ) : (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: colors[tone],
          }}
        />
      )}

      <TextV4 size={textKey} weight="semibold" tone="onCard" numberOfLines={1}>
        {name}
      </TextV4>

      {statusTone !== undefined && statusWord !== undefined ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: toneFill(theme, statusTone),
            }}
          />
          {/* The word, in the health's own ink — where the base drew it
              `muted` and left the whole signal to the dot. */}
          <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, statusTone) }}>
            {statusWord}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}
