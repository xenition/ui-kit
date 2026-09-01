import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from './internal';
import type { CannedResponseProps } from './CannedResponse';

/** Drop-in for {@link CannedResponseProps} — same props, the V4 "calm console" design. */
export type CannedResponseV4Props = CannedResponseProps;

/**
 * CannedResponse — **V4** "calm console" design. A saved-reply card reimagined as
 * an elevated rounded surface: title with an optional shortcut/category chip, the
 * body preview set on a calm inset panel, and a primary **Insert** affordance
 * (≥44px tap target). Tapping the body fires `onPress` (e.g. to expand);
 * **Insert** reports the full response via `onInsert`. One accent = primary;
 * press paints a soft-primary tint. Same props/behavior as
 * {@link CannedResponseProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
export function CannedResponseV4({
  response,
  previewLines = 2,
  onInsert,
  onPress,
  insertLabel = 'Insert',
  style,
}: CannedResponseV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.md,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={`Canned response: ${response.title}`}
        onPress={onPress ? () => onPress(response) : undefined}
        disabled={!onPress}
        style={({ pressed }) => ({
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: pressed && onPress ? withAlpha(colors.primary, 0.08) : 'transparent',
        })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }}
          >
            {response.title}
          </Text>
          {response.shortcut ? (
            <View
              style={{
                backgroundColor: withAlpha(colors.primary, 0.12),
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {response.shortcut}
              </Text>
            </View>
          ) : null}
          {response.category ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{response.category}</Text>
          ) : null}
        </View>
        {/* Preview snippet on a calm inset surface. */}
        <Text
          numberOfLines={Math.max(1, previewLines)}
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            backgroundColor: withAlpha(colors.onSurface, 0.03),
            borderRadius: tokens.radius.md,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
          }}
        >
          {response.body}
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={insertLabel}
        accessibilityState={{ disabled: !onInsert }}
        onPress={onInsert ? () => onInsert(response) : undefined}
        disabled={!onInsert}
        style={({ pressed }) => ({
          minHeight: 44,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing.md,
          backgroundColor: colors.primary,
          opacity: !onInsert ? 0.5 : pressed ? 0.9 : 1,
        })}
      >
        <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {insertLabel}
        </Text>
      </Pressable>
    </View>
  );
}
