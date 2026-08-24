import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

export type LeagueBadgeSize = 'sm' | 'md' | 'lg';
export type LeagueBadgeVariant = 'solid' | 'soft' | 'outline';

export interface LeagueBadgeProps {
  /** League / competition name (e.g. `Premier League`). */
  name: string;
  /** Crest glyph or emoji; falls back to derived initials. */
  crest?: string;
  /** Short label shown beside the crest (defaults to `name`). Set `''` to hide. */
  label?: string;
  /** Size scale. Default `md`. */
  size?: LeagueBadgeSize;
  /** Fill treatment. Default `soft`. */
  variant?: LeagueBadgeVariant;
  style?: StyleProp<ViewStyle>;
}

const DIAMETER: Record<LeagueBadgeSize, number> = { sm: 24, md: 32, lg: 44 };
const TEXT: Record<LeagueBadgeSize, 'xs' | 'sm' | 'base'> = { sm: 'xs', md: 'sm', lg: 'base' };

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const joined = parts.map((w) => w[0]?.toUpperCase() ?? '').join('');
  return joined || '?';
}

/**
 * A league / competition crest — a small token-styled emblem (crest glyph or
 * derived initials) with an optional name label. Purely presentational and
 * dependency-free; the crest tile is a styled `View`, never an image fetch.
 * `variant` recolors from the primary slot / ramp tints; all colors resolve
 * from the compiled theme — no literals.
 */
export function LeagueBadge({
  name,
  crest,
  label,
  size = 'md',
  variant = 'soft',
  style,
}: LeagueBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const d = DIAMETER[size];
  const text = label === undefined ? name : label;

  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const tileBg = solid ? colors.primary : outline ? colors.surface : tokens.ramps.primary[100];
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
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tileBg,
          borderWidth: outline ? 1 : 0,
          borderColor: outline ? colors.primary : 'transparent',
        }}
      >
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={{ color: tileFg, fontSize: tokens.typography.scale[TEXT[size]], fontWeight: '700' }}
        >
          {crest ?? initials(name)}
        </Text>
      </View>
      {text ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale[TEXT[size]], fontWeight: '600' }}
        >
          {text}
        </Text>
      ) : null}
    </View>
  );
}
