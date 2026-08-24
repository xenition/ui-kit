import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CARRIER_META, toneColor, withAlpha, type CarrierCode } from './internal';

export type CarrierBadgeVariant = 'soft' | 'solid' | 'outline';
export type CarrierBadgeSize = 'sm' | 'md';

export interface CarrierBadgeProps {
  /** Known carrier code; anything else falls back to the generic carrier. */
  carrier?: CarrierCode;
  /** Override display name (e.g. a regional courier) — replaces the code label. */
  name?: string;
  /** Optional service level line (e.g. `Ground`, `2-Day`, `Priority`). */
  service?: string;
  /** Visual treatment. `soft` (default) tints; `solid` fills; `outline` rings. */
  variant?: CarrierBadgeVariant;
  /** Size scale. Defaults to `md`. */
  size?: CarrierBadgeSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * Compact carrier identity chip — a glyph + carrier name (+ optional service
 * level), so the carrier is never conveyed by color alone. Colors resolve from
 * the carrier's tone token (or a `withAlpha` tint of it); no literal colors.
 * Reused by `ShipmentCard`, `PackageRow`, `ManifestRow` and `DockSchedule`.
 */
export function CarrierBadge({
  carrier = 'generic',
  name,
  service,
  variant = 'soft',
  size = 'md',
  style,
}: CarrierBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CARRIER_META[carrier] ?? CARRIER_META.generic;
  const accent = toneColor(colors, meta.tone);
  const label = name ?? meta.label;

  let bg = 'transparent';
  let fg = accent;
  let borderWidth = 0;
  let borderColor: string = 'transparent';
  if (variant === 'soft') {
    bg = withAlpha(accent, 0.14);
  } else if (variant === 'solid') {
    bg = accent;
    fg = colors.surface;
  } else {
    borderWidth = 1;
    borderColor = accent;
  }

  const textSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;

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
          paddingVertical: size === 'sm' ? 2 : 3,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: textSize, color: fg }}>
        {meta.glyph}
      </Text>
      <Text style={{ fontSize: textSize, color: fg, fontWeight: '700' }}>{label}</Text>
      {service ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: variant === 'solid' ? fg : colors.muted }}>
          {`· ${service}`}
        </Text>
      ) : null}
    </View>
  );
}
