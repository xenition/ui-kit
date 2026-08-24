import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface VideoEmbedProps {
  /** Video URL (kept for parity; actual playback needs `expo-av`, out of scope). */
  url: string;
  /** Accessible title. */
  title: string;
  /** Poster image shown before playback. */
  poster?: string;
  /** Fired when the play affordance is pressed (wire to a player / deep link). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A 16:9 video card with a poster + play affordance — the native mirror of the
 * web `VideoEmbed`. React Native has no `<iframe>`/`<video>`, so this renders a
 * token-styled poster thumbnail with a circular play button; `onPress` is the
 * hook a caller uses to launch playback. Real inline playback requires
 * `expo-av` (out of scope here); the `url`/`title` props are preserved so a
 * host app can pass them straight through. Token-only.
 */
export function VideoEmbed({
  url: _url,
  title,
  poster,
  onPress,
  style,
}: VideoEmbedProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const content = (
    <View
      style={{
        aspectRatio: 16 / 9,
        width: '100%',
        overflow: 'hidden',
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: tokens.ramps.neutral[900],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {poster ? (
        <Image
          source={{ uri: poster }}
          accessible
          accessibilityLabel={title}
          resizeMode="cover"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      ) : null}
      <View
        style={{
          height: 64,
          width: 64,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          opacity: 0.9,
        }}
      >
        <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'] }}>
          {'▶'}
        </Text>
      </View>
    </View>
  );

  return (
    <Pressable
      testID="xen-video-embed"
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, style]}
    >
      {content}
    </Pressable>
  );
}
