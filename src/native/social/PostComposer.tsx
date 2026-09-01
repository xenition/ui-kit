import * as React from 'react';
import { Pressable, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives';

export interface PostComposerProps {
  /** Composing author's avatar URL; falls back to initials from `authorName`. */
  authorAvatarUrl?: string;
  /** Composing author's name (initials fallback + avatar a11y label). */
  authorName?: string;
  /** Current draft text (controlled). */
  value: string;
  /** Fires with the next draft text on every keystroke. */
  onChangeText: (text: string) => void;
  /** Field placeholder (default `What's on your mind?`). */
  placeholder?: string;
  /** Fires when the primary Post CTA is pressed. */
  onPost?: () => void;
  /** When `true`, the Post CTA shows a busy state and is disabled. */
  posting?: boolean;
  /** Hard character cap; drives the counter + danger state + disabled Post. */
  maxLength?: number;
  /** Fires when the add-photo action glyph is pressed. */
  onAddPhoto?: () => void;
  /** Fires when the add-poll action glyph is pressed. */
  onAddPoll?: () => void;
  /** Fires when the add-emoji action glyph is pressed. */
  onAddEmoji?: () => void;
  /** Optional style override for the outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * PostComposer — the compose-a-post card for the social V4 "feed" line. A clean
 * surface card pairs the author avatar with a growing text field, a row of
 * soft-primary action glyph buttons (photo / poll / emoji), a live character
 * counter that flips to danger when over `maxLength`, and a primary Post CTA that
 * disables while empty, over the limit, or `posting`. Presentational only —
 * controlled `value` + callbacks. Token-only colors via `useXenitionTheme()`;
 * the ≥44px controls stay accessible and dark-mode safe.
 */
export function PostComposer({
  authorAvatarUrl,
  authorName,
  value,
  onChangeText,
  placeholder = "What's on your mind?",
  onPost,
  posting = false,
  maxLength,
  onAddPhoto,
  onAddPoll,
  onAddEmoji,
  style,
}: PostComposerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const softPrimary = tokens.ramps.primary[50];
  const length = value.length;
  const overLimit = maxLength != null && length > maxLength;
  const empty = value.trim().length === 0;
  const disabled = empty || overLimit || posting;

  const Action = ({ label, glyph, onPress }: { label: string; glyph: string; onPress?: () => void }) =>
    onPress ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          backgroundColor: softPrimary,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          {glyph}
        </Text>
      </Pressable>
    ) : null;

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <Avatar src={authorAvatarUrl} name={authorName} size="md" style={{ marginTop: 2 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          accessibilityLabel={placeholder}
          multiline
          textAlignVertical="top"
          style={{
            flex: 1,
            minHeight: 72,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            lineHeight: tokens.typography.scale.base * 1.5,
            padding: 0,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Action label="Add photo" glyph="🖼️" onPress={onAddPhoto} />
          <Action label="Add poll" glyph="📊" onPress={onAddPoll} />
          <Action label="Add emoji" glyph="😊" onPress={onAddEmoji} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {maxLength != null ? (
            <Text
              accessibilityLiveRegion="polite"
              style={{ color: overLimit ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
            >
              {length}/{maxLength}
            </Text>
          ) : null}
          <Button variant="primary" size="md" onPress={onPost} disabled={disabled} accessibilityLabel="Post" style={{ minHeight: 44 }}>
            {posting ? 'Posting…' : 'Post'}
          </Button>
        </View>
      </View>
    </View>
  );
}
