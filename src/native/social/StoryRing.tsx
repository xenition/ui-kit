import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, type AvatarSize } from '../primitives/Avatar';

export type StoryState = 'unseen' | 'seen' | 'live' | 'add';

export interface StoryRingProps {
  /** Avatar image URL. */
  src?: string;
  /** Name used for initials fallback + the caption. */
  name?: string;
  /**
   * Ring appearance: `unseen` (primary ring), `seen` (muted ring), `live`
   * (danger ring + LIVE tag), or `add` (dashed ring with a `+` — your own
   * "add story" tile).
   */
  state?: StoryState;
  size?: AvatarSize;
  /** Caption under the ring (defaults to `name`; `'Your story'` for `add`). */
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DIAMETER: Record<AvatarSize, number> = { sm: 44, md: 56, lg: 76 };

/**
 * An avatar wrapped in a story ring. The ring color encodes state — unseen
 * (primary), seen (muted), live (danger with a LIVE badge) — and an `add`
 * variant renders a dashed ring with a `+` for the viewer's own tile. Token-only.
 */
export function StoryRing({
  src,
  name,
  state = 'unseen',
  size = 'md',
  label,
  onPress,
  style,
}: StoryRingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const outer = DIAMETER[size];
  const ringColor =
    state === 'live' ? colors.danger : state === 'seen' ? colors.border : colors.primary;
  const caption = label ?? (state === 'add' ? 'Your story' : name);

  const ring = (
    <View
      style={{
        width: outer,
        height: outer,
        borderRadius: outer / 2,
        borderWidth: 2,
        borderStyle: state === 'add' ? 'dashed' : 'solid',
        borderColor: state === 'add' ? colors.border : ringColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
      }}
    >
      {state === 'add' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
          +
        </Text>
      ) : (
        <Avatar src={src} name={name} size={size} />
      )}
      {state === 'live' ? (
        <View
          style={{
            position: 'absolute',
            bottom: -tokens.spacing.xs,
            backgroundColor: colors.danger,
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: 1,
          }}
        >
          <Text style={{ color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            LIVE
          </Text>
        </View>
      ) : null}
    </View>
  );

  const body = (
    <View style={[{ alignItems: 'center', gap: tokens.spacing.xs, width: outer + tokens.spacing.md }, style]}>
      {ring}
      {caption ? (
        <Text
          numberOfLines={1}
          style={{
            color: state === 'seen' ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.xs,
            textAlign: 'center',
            maxWidth: outer + tokens.spacing.md,
          }}
        >
          {caption}
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      {body}
    </Pressable>
  );
}
