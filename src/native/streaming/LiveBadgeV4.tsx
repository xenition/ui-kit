import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatCount } from './types';
import type { LiveBadgeProps, LiveBadgeVariant } from './LiveBadge';

export type { LiveBadgeVariant };

/** Drop-in for {@link LiveBadgeProps} — same props, the V4 "spotlight" design. */
export type LiveBadgeV4Props = LiveBadgeProps;

/**
 * LiveBadge — **V4** "spotlight" design. A refined LIVE pill: a pulsing-look
 * `danger` dot (a solid core inside a soft-danger halo ring, so live status
 * reads by glyph + color, never color alone) beside a bold "LIVE" label on a
 * soft `withAlpha(danger, 0.12)` tint pill. Keeps the base's three variants
 * (`solid` / `outline` / `dot`) and the optional viewer count. Same
 * props/behavior as {@link LiveBadgeProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` — no literal hex.
 */
export function LiveBadgeV4({
  variant = 'solid',
  label = 'LIVE',
  viewers,
  accessibilityLabel,
  style,
}: LiveBadgeV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const dotOnly = variant === 'dot';

  const countText = viewers != null ? `${formatCount(viewers)} watching` : undefined;
  const a11y = accessibilityLabel ?? [label, countText].filter(Boolean).join(', ');

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={a11y}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          paddingVertical: dotOnly ? 0 : 2,
          paddingHorizontal: dotOnly ? 0 : tokens.spacing.sm,
          // V4 spotlight: soft-danger tint pill for solid, outline keeps its border, dot stays chrome-less.
          backgroundColor: solid ? withAlpha(colors.danger, 0.12) : 'transparent',
          borderWidth: outline ? 1 : 0,
          borderColor: outline ? colors.danger : 'transparent',
        },
        style,
      ]}
    >
      {/* Pulsing-look live dot: a solid danger core inside a soft-danger halo ring. */}
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors.danger, 0.2),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.danger,
          }}
        />
      </View>
      <Text
        style={{
          color: colors.danger,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
          letterSpacing: 0.5,
        }}
      >
        {label.toUpperCase()}
      </Text>
      {countText ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '500',
          }}
        >
          {countText}
        </Text>
      ) : null}
    </View>
  );
}
