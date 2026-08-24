import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';

export interface ShareTarget {
  id: string;
  /** Target name (e.g. `Messages`, `Copy link`). */
  label: string;
  /** Emoji/glyph icon. */
  icon?: string;
}

export interface ShareSheetProps {
  /** Controls mount — the sheet renders nothing when `false`. */
  visible: boolean;
  /** Sheet heading. Default `Share`. */
  title?: string;
  /** Optional subtitle (e.g. the URL/permalink being shared). */
  subtitle?: string;
  /** Share destinations shown in a wrapping grid. */
  targets: ReadonlyArray<ShareTarget>;
  /** Fires with the chosen target id. */
  onSelect?: (id: string) => void;
  /** Dismiss (backdrop tap or Cancel). */
  onClose?: () => void;
  /** Message shown when `targets` is empty. */
  emptyLabel?: string;
  /**
   * Surface treatment for the sheet panel — fill/border/elevation only; the
   * rounded top corners/padding are unchanged. Default `'classic'`.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A bottom share sheet: a dimmed backdrop and a rounded panel holding a grid of
 * share destinations plus a Cancel action. Self-contained overlay (renders
 * `null` while hidden) — the parent owns `visible`. Handles an empty target
 * list. Token-only.
 */
export function ShareSheet({
  visible,
  title = 'Share',
  subtitle,
  targets,
  onSelect,
  onClose,
  emptyLabel = 'No share options available',
  appearance = 'classic',
  style,
}: ShareSheetProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  // A short rise as the panel appears from the bottom edge.
  const enter = useEnter({ translateY: 16 });
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
          ...appearanceStyle(appearance, colors, tokens),
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
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
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
            {targets.map((t) => (
              <Pressable
                key={t.id}
                accessibilityRole="menuitem"
                accessibilityLabel={t.label}
                onPress={onSelect ? () => onSelect(t.id) : undefined}
                style={({ pressed }) => ({ alignItems: 'center', gap: tokens.spacing.xs, width: 72, opacity: pressed ? 0.7 : 1 })}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: tokens.typography.scale.xl }}>{t.icon ?? '↗'}</Text>
                </View>
                <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
                  {t.label}
                </Text>
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
            paddingVertical: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            Cancel
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
