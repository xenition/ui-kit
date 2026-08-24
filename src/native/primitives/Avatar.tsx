import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps {
  src?: string;
  /** Fallback initials source when there's no image. */
  name?: string;
  size?: AvatarSize;
  /** Corner treatment. Defaults to `circle`. */
  shape?: AvatarShape;
  /** Presence indicator dot at the bottom-right. */
  status?: AvatarStatus;
  /** Draw a colored ring (status-colored when a `status` is set). */
  ring?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DIAMETER: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const FONT: Record<AvatarSize, 'xs' | 'sm' | 'lg' | 'xl'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'lg',
  xl: 'xl',
};
const STATUS_SLOT: Record<AvatarStatus, keyof SemanticColors> = {
  online: 'success',
  away: 'warn',
  busy: 'danger',
  offline: 'muted',
};

function initials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}

/**
 * User avatar — the native mirror of the web `Avatar`: image with an initials
 * fallback, bound to the theme tokens. The default (`md`, `circle`, no status,
 * no ring) renders exactly as before; `shape`, the extended `xs`/`xl` sizes, a
 * `status` presence dot, and a `ring` are additive. No literal colors.
 */
export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  status,
  ring = false,
  style,
}: AvatarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const d = DIAMETER[size];
  const cornerRadius =
    shape === 'circle' ? d / 2 : shape === 'rounded' ? tokens.radius.md : tokens.radius.sm;
  const statusColor = status ? colors[STATUS_SLOT[status]] : undefined;
  const ringColor = statusColor ?? colors.primary;
  const dotSize = Math.max(8, Math.round(d * 0.28));

  return (
    <View style={[{ width: d, height: d }, style]}>
      <View
        style={{
          width: d,
          height: d,
          borderRadius: cornerRadius,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          borderWidth: ring ? 2 : 0,
          borderColor: ring ? ringColor : 'transparent',
        }}
      >
        {src ? (
          <Image source={{ uri: src }} style={{ width: d, height: d }} resizeMode="cover" />
        ) : (
          <Text
            style={{
              color: colors.onPrimary,
              fontSize: tokens.typography.scale[FONT[size]],
              fontWeight: '500',
            }}
          >
            {initials(name)}
          </Text>
        )}
      </View>
      {status ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: statusColor,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        />
      ) : null}
    </View>
  );
}
