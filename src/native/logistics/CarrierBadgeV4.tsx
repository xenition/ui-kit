import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CARRIER_META, toneColor, withAlpha } from './internal';
import type { CarrierBadgeProps } from './CarrierBadge';

/** Drop-in for {@link CarrierBadgeProps} — same props, the V4 "dispatch" design. */
export type CarrierBadgeV4Props = CarrierBadgeProps;

/**
 * CarrierBadge — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on the carrier identity chip: a rounded pill
 * with the carrier glyph tucked in its own tone-tinted well, the carrier name,
 * and an optional service level — so the carrier is never conveyed by color
 * alone. Keeps the base `variant` (`soft` / `solid` / `outline`) and `size`
 * (`sm` / `md`) props. Colors resolve from the carrier's tone token (or a
 * `withAlpha` tint of it); no literal colors.
 */
export function CarrierBadgeV4({
  carrier = 'generic',
  name,
  service,
  variant = 'soft',
  size = 'md',
  style,
}: CarrierBadgeV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CARRIER_META[carrier] ?? CARRIER_META.generic;
  const accent = toneColor(colors, meta.tone);
  const label = name ?? meta.label;

  let bg = 'transparent';
  let fg = accent;
  let borderWidth = 0;
  let borderColor: string = 'transparent';
  let wellBg = withAlpha(accent, 0.18);
  let wellFg = accent;
  if (variant === 'soft') {
    bg = withAlpha(accent, 0.14);
  } else if (variant === 'solid') {
    bg = accent;
    fg = colors.surface;
    wellBg = withAlpha(colors.surface, 0.22);
    wellFg = colors.surface;
  } else {
    borderWidth = 1;
    borderColor = accent;
  }

  const textSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
  const wellSize = size === 'sm' ? 16 : 20;

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Carrier ${label}${service ? `, ${service}` : ''}`}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: bg,
          borderWidth,
          borderColor,
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingLeft: 2,
          paddingRight: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ width: wellSize, height: wellSize, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: wellBg }}>
        <Text allowFontScaling={false} style={{ fontSize: textSize, color: wellFg }}>{meta.glyph}</Text>
      </View>
      <Text style={{ fontSize: textSize, color: fg, fontWeight: '700' }}>{label}</Text>
      {service ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: variant === 'solid' ? fg : colors.muted }}>{`· ${service}`}</Text>
      ) : null}
    </View>
  );
}
