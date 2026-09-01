import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from '../commerce/internal/Gradient';
import type { AnnouncementBarProps } from './AnnouncementBar';

/** Drop-in for {@link AnnouncementBarProps} — same props, the V4 "showcase" design. */
export type AnnouncementBarV4Props = AnnouncementBarProps;

/**
 * AnnouncementBar — **V4** "showcase" design (native mirror of the web V4). A
 * compact, conversion-forward top banner: the `primary` promotional tone rides
 * the reserved vibrant primary→accent brand gradient (via the shared
 * `expo-linear-gradient` wrapper — the CTABannerV4 technique) with near-white
 * ink, while `accent`/`neutral` stay as refined solid bands. Honors every prop
 * of {@link AnnouncementBarProps} (`message`/`action`/`actionLabel`/`onPress`/
 * `tone`/`dismissible`/`closeLabel`/`onDismiss`); dismissal is session state
 * only; token-only colors via `useXenitionTheme()`, dark-mode safe.
 */
export function AnnouncementBarV4({
  message,
  action,
  actionLabel,
  onPress,
  tone = 'primary',
  dismissible = true,
  closeLabel = 'Dismiss announcement',
  onDismiss,
  style,
}: AnnouncementBarV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  // `primary` is the reserved gradient (promotional) moment; `accent` is a
  // filled band; `neutral` is a bordered light band.
  const gradient = tone === 'primary';
  const bg =
    tone === 'accent' ? colors.accent : tone === 'neutral' ? r.neutral[100] : r.primary[600];
  const fg = tone === 'neutral' ? colors.onSurface : tone === 'accent' ? colors.onAccent : r.primary[50];

  return (
    <View
      testID="xen-announcement-bar"
      accessibilityRole="summary"
      accessibilityLabel="Announcement"
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
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
      {gradient ? (
        <Gradient
          colors={[r.primary[500], r.primary[600], r.accent[500]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}

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
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        ) : (
          message
        )}

        {actionLabel !== undefined ? (
          <Pressable accessibilityRole="link" onPress={onPress} hitSlop={8}>
            <Text
              style={{
                color: fg,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '700',
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
          <Text style={{ color: fg, fontSize: tokens.typography.scale.sm }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
