import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export type AnnouncementTone = 'primary' | 'accent' | 'neutral';

export interface AnnouncementBarProps {
  /** Banner message. */
  message: React.ReactNode;
  /**
   * Optional trailing call-to-action. On web this is a link/button node; the
   * native mirror renders `actionLabel` + `onPress` as a pressable link, and
   * also accepts an arbitrary `action` node for parity.
   */
  action?: React.ReactNode;
  /** Label for the built-in trailing link (paired with `onPress`). */
  actionLabel?: string;
  /** Called when the trailing link is pressed (web `href` → native `onPress`). */
  onPress?: () => void;
  /** Color treatment. */
  tone?: AnnouncementTone;
  /** Hide the dismiss control. */
  dismissible?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Called after the bar is dismissed. */
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Compact dismissible top banner — the native mirror of the web
 * `AnnouncementBar`. A message with an optional trailing link (`href` →
 * `onPress`) and a dismiss control; dismissal is session state only. Token-only.
 */
export function AnnouncementBar({
  message,
  action,
  actionLabel,
  onPress,
  tone = 'primary',
  dismissible = true,
  closeLabel = 'Dismiss announcement',
  onDismiss,
  style,
}: AnnouncementBarProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  // `neutral` is a bordered light band; `primary`/`accent` are filled bands.
  const bg =
    tone === 'accent'
      ? colors.accent
      : tone === 'neutral'
        ? tokens.ramps.neutral[100]
        : colors.primary;
  const fg = tone === 'neutral' ? colors.onSurface : colors.onPrimary;

  return (
    <View
      testID="xen-announcement-bar"
      accessibilityRole="summary"
      accessibilityLabel="Announcement"
      style={[
        {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.sm,
          backgroundColor: bg,
          ...(tone === 'neutral'
            ? { borderBottomWidth: 1, borderBottomColor: colors.border }
            : null),
        },
        style,
      ]}
    >
      <View
        style={{
          flexShrink: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
        }}
      >
        {typeof message === 'string' ? (
          <Text
            style={{
              color: fg,
              fontSize: tokens.typography.scale.sm,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        ) : (
          message
        )}

        {actionLabel !== undefined ? (
          <Pressable
            accessibilityRole="link"
            onPress={onPress}
            hitSlop={8}
          >
            <Text
              style={{
                color: fg,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}
            >
              {actionLabel}
            </Text>
          </Pressable>
        ) : action !== undefined ? (
          action
        ) : null}
      </View>

      {dismissible ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={closeLabel}
          hitSlop={8}
          onPress={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          style={{
            marginLeft: 'auto',
            height: 24,
            width: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.lg,
          }}
        >
          <Text style={{ color: fg, fontSize: tokens.typography.scale.sm }}>
            ✕
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
