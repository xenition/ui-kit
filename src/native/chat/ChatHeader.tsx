import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { PresenceDot, type Presence } from './PresenceDot';

export interface ChatHeaderAction {
  /** Stable identifier. */
  id: string;
  /** Glyph/emoji rendered via `Icon`. */
  glyph: string;
  /** Accessible label (e.g. "Call", "Video"). */
  label: string;
  onPress?: () => void;
}

export interface ChatHeaderProps {
  /** Conversation title (contact / group name). */
  title: string;
  /** Secondary line (e.g. "last seen 09:41", "3 members"). */
  subtitle?: string;
  /** Avatar image URI. */
  avatarUri?: string;
  /** Presence badge on the avatar. */
  presence?: Presence;
  /** When true, the subtitle is replaced by a "typing…" caption. */
  typing?: boolean;
  /** Fires when the back affordance is tapped; hidden when omitted. */
  onBack?: () => void;
  /** Fires when the title/avatar block is tapped (open profile). */
  onPressTitle?: () => void;
  /** Trailing action buttons (call, video, info…). */
  actions?: ChatHeaderAction[];
  /**
   * Visual treatment for the header surface (diversity system). Defaults to
   * `classic` — the historical surface fill with a bottom divider.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * Top bar for a conversation screen — optional back button, tappable
 * avatar+title block with a presence badge and subtitle (or a "typing…"
 * caption), and trailing action buttons. Uses the `header` role. No literal
 * colors.
 */
export function ChatHeader({
  title,
  subtitle,
  avatarUri,
  presence,
  typing = false,
  onBack,
  onPressTitle,
  actions,
  appearance = 'classic',
  style,
}: ChatHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="header"
      style={[
        // Appearance FIRST; classic keeps the historical surface + bottom divider.
        appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: appearance === 'classic' ? colors.surface : undefined,
        },
        style,
      ]}
    >
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          hitSlop={8}
        >
          <Icon glyph="‹" color="primary" size="2xl" />
        </Pressable>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPressTitle}
        disabled={!onPressTitle}
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
      >
        <View>
          <Avatar size="md" src={avatarUri} name={title} />
          {presence ? (
            <View style={{ position: 'absolute', bottom: -1, right: -1 }}>
              <PresenceDot status={presence} />
            </View>
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {title}
          </Text>
          {typing ? (
            <Text
              accessibilityLiveRegion="polite"
              numberOfLines={1}
              style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs }}
            >
              typing…
            </Text>
          ) : subtitle ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </Pressable>

      {actions?.map((action) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.onPress}
          hitSlop={8}
          style={{ padding: tokens.spacing.xs }}
        >
          <Icon glyph={action.glyph} color="primary" />
        </Pressable>
      ))}
    </View>
  );
}
