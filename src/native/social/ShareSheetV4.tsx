import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { ShareSheetProps } from './ShareSheet';

/** Drop-in for {@link ShareSheetProps} — same props, the V4 "feed" design. */
export type ShareSheetV4Props = ShareSheetProps;

/**
 * ShareSheet — **V4** "feed" design. A clean, airy bottom share surface: a
 * dimmed backdrop and a rounded panel holding a wrapping grid of share targets
 * — each a soft-primary tinted glyph disc with a ≥44px tap target and a label —
 * plus a full-width copy-link/Cancel row. Same props/behavior as
 * {@link ShareSheetProps} (self-contained overlay, empty-list handling,
 * `onSelect`/`onClose`); token-only colors via `useXenitionTheme()`. The
 * `appearance` prop is accepted for parity but the panel stays on the clean
 * surface in the feed line.
 */
export function ShareSheetV4({
  visible,
  title = 'Share',
  subtitle,
  targets,
  onSelect,
  onClose,
  emptyLabel = 'No share options available',
  style,
}: ShareSheetV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  // A short rise as the panel appears from the bottom edge.
  const enter = useEnter({ translateY: 16 });
  const softPrimary = withAlpha(colors.primary, 0.12);
  if (!visible) return null;

  return (
    <View
      accessibilityViewIsModal
      style={[{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end' }, style]}
    >
      {/* Backdrop — tap to dismiss. Uses the onSurface token at low opacity. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        onPress={onClose}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.4 }}
      />
      <Animated.View
        accessibilityRole="menu"
        style={{
          opacity: enter.opacity,
          transform: enter.transform,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {targets.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, paddingVertical: tokens.spacing.md }}>
            {emptyLabel}
          </Text>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }}>
            {targets.map((t) => (
              <Pressable
                key={t.id}
                accessibilityRole="menuitem"
                accessibilityLabel={t.label}
                onPress={onSelect ? () => onSelect(t.id) : undefined}
                style={({ pressed }) => ({ alignItems: 'center', gap: tokens.spacing.xs, width: 72, opacity: pressed ? 0.85 : 1 })}
              >
                {({ pressed }) => (
                  <>
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: pressed ? withAlpha(colors.primary, 0.2) : softPrimary,
                      }}
                    >
                      <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl }}>{t.icon ?? '↗'}</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500', textAlign: 'center' }}>
                      {t.label}
                    </Text>
                  </>
                )}
              </Pressable>
            ))}
          </View>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancel"
          onPress={onClose}
          style={({ pressed }) => ({
            alignItems: 'center',
            minHeight: 44,
            justifyContent: 'center',
            paddingVertical: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? withAlpha(colors.primary, 0.2) : softPrimary,
          })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            Cancel
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
