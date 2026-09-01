import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LeagueBadgeProps, LeagueBadgeSize, LeagueBadgeVariant } from './LeagueBadge';

/** Drop-in for {@link LeagueBadgeProps} — same props, the V4 "broadcast" design. */
export type LeagueBadgeV4Props = LeagueBadgeProps;

const DIAMETER: Record<LeagueBadgeSize, number> = { sm: 24, md: 32, lg: 44 };
const TEXT: Record<LeagueBadgeSize, 'xs' | 'sm' | 'base'> = { sm: 'xs', md: 'sm', lg: 'base' };

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const joined = parts.map((w) => w[0]?.toUpperCase() ?? '').join('');
  return joined || '?';
}

/**
 * LeagueBadge — **V4** "broadcast" design. A polished league / competition
 * emblem: the crest glyph (or derived initials) sits in a soft-primary tinted
 * disc beside the name label. `variant` recolors from the single `primary`
 * accent — `solid` fills, `soft` tints, `outline` hairlines. Same props/behavior
 * as {@link LeagueBadgeProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha` — no literals. Purely presentational.
 */
export function LeagueBadgeV4({
  name,
  crest,
  label,
  size = 'md',
  variant = 'soft',
  style,
}: LeagueBadgeV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const d = DIAMETER[size];
  const text = label === undefined ? name : label;

  const variantKey: LeagueBadgeVariant = variant;
  const solid = variantKey === 'solid';
  const outline = variantKey === 'outline';
  const tileBg = solid ? colors.primary : outline ? colors.surface : withAlpha(colors.primary, 0.12);
  const tileFg = solid ? colors.onPrimary : colors.primary;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${name} badge`}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
    >
      <View
        style={{
          width: d,
          height: d,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tileBg,
          borderWidth: outline ? 1 : 0,
          borderColor: outline ? colors.primary : 'transparent',
          ...(solid
            ? {
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }
            : null),
        }}
      >
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={{ color: tileFg, fontSize: tokens.typography.scale[TEXT[size]], fontWeight: '800' }}
        >
          {crest ?? initials(name)}
        </Text>
      </View>
      {text ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale[TEXT[size]], fontWeight: '700' }}
        >
          {text}
        </Text>
      ) : null}
    </View>
  );
}
