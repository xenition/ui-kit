import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  /** Fallback initials source when there's no image. */
  name?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

const DIAMETER: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 56 };
const FONT: Record<AvatarSize, 'xs' | 'sm' | 'lg'> = { sm: 'xs', md: 'sm', lg: 'lg' };

function initials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}

/**
 * User avatar — the native mirror of the web `Avatar`: image with an initials
 * fallback, bound to the theme tokens. No literal colors.
 */
export function Avatar({ src, name, size = 'md', style }: AvatarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const d = DIAMETER[size];
  return (
    <View
      style={[
        {
          width: d,
          height: d,
          borderRadius: d / 2,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
        },
        style,
      ]}
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
  );
}
