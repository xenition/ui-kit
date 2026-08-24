import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

/**
 * Token-derived translucent tint — takes a theme hex, never invents one.
 * Mirrors the helper the domain modules already use for the same job.
 */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface NotificationItemProps {
  title: string;
  /** Optional supporting body line. */
  body?: string;
  /** Timestamp label, e.g. "5m ago". */
  time?: string;
  /** Shows an unread dot and a subtly tinted surface. */
  unread?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Pressable when `onPress` is supplied. Token-only.
 */
export function NotificationItem({
  title,
  body,
  time,
  unread = false,
  onPress,
  style,
}: NotificationItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          /*
            `muted` is the de-emphasised TEXT colour, not a surface tint. Using
            it as the unread background painted the row the same colour as its
            own body line — measured at 1.00:1, literally invisible — and left
            the title at 2.12:1 against it, in light and dark alike.

            A tint is what was wanted, so derive one: the primary at 12% over the
            surface, the same recipe the domain modules use for their tinted
            rows. Unread now reads as a wash of the brand colour, and every text
            colour keeps the contrast it has everywhere else.
          */
          backgroundColor: unread ? withAlpha(colors.primary, 0.12) : colors.surface,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: tokens.radius.full,
          marginTop: 6,
          backgroundColor: unread ? colors.primary : 'transparent',
        }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: unread ? '700' : '500',
          }}
        >
          {title}
        </Text>
        {body ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{body}</Text>
        ) : null}
      </View>
      {time ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessibilityRole="text" accessibilityLabel={`${title}${unread ? ', unread' : ''}`}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}${unread ? ', unread' : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
