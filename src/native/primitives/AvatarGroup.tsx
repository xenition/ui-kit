import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, type AvatarSize } from './Avatar';

export interface AvatarGroupProps {
  avatars: { name?: string; src?: string }[];
  /** Max avatars before collapsing into a +N chip (default 4). */
  max?: number;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
}

const DIAMETER: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const FONT: Record<AvatarSize, 'xs' | 'sm' | 'lg'> = { xs: 'xs', sm: 'xs', md: 'sm', lg: 'lg', xl: 'lg' };

/**
 * Overlapping avatar stack with a +N overflow chip — the native mirror of the
 * web `AvatarGroup`. Each avatar carries a token-bound surface ring; overflow
 * collapses into a neutral +N chip. No literal colors.
 */
export function AvatarGroup({ avatars, max = 4, size = 'md', style }: AvatarGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const shown = avatars.slice(0, max);
  const extra = avatars.length - shown.length;
  const d = DIAMETER[size];
  const ring = { borderWidth: 2, borderColor: colors.surface, borderRadius: tokens.radius.full };
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {shown.map((a, i) => (
        <View key={i} style={[{ marginLeft: i === 0 ? 0 : -8 }, ring]}>
          <Avatar name={a.name} src={a.src} size={size} />
        </View>
      ))}
      {extra > 0 ? (
        <View
          style={[
            {
              marginLeft: -8,
              width: d,
              height: d,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.border,
            },
            ring,
          ]}
        >
          <Text
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale[FONT[size]], fontWeight: '500' }}
          >
            +{extra}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
