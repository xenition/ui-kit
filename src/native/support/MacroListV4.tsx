import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from './internal';
import type { MacroListProps } from './MacroList';

/** Drop-in for {@link MacroListProps} — same props, the V4 "calm console" design. */
export type MacroListV4Props = MacroListProps;

/**
 * MacroList — **V4** "calm console" design. A tidy list of macro rows, each an
 * elevated rounded card (≥44px) with a leading soft-tint glyph disc (one accent =
 * primary), the macro name + optional description, and an action-count run hint.
 * Press paints a soft-primary tint; `disabled` macros dim and stop responding.
 * Tapping reports the macro via `onApply`. Same props/behavior as
 * {@link MacroListProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
export function MacroListV4({
  macros,
  onApply,
  loading = false,
  emptyText = 'No macros available.',
  style,
}: MacroListV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const cardBase = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading macros" style={[{ gap: tokens.spacing.sm }, style]}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{ ...cardBase, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, padding: tokens.spacing.md }}
          >
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
            <View style={{ flex: 1, height: 12, borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          </View>
        ))}
      </View>
    );
  }

  if (macros.length === 0) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={emptyText}
        style={[{ padding: tokens.spacing.xl, alignItems: 'center' }, style]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyText}</Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="menu" style={[{ gap: tokens.spacing.sm }, style]}>
      {macros.map((macro) => {
        const isDisabled = macro.disabled === true;
        const count =
          typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
        const discColor = isDisabled ? colors.muted : colors.primary;
        return (
          <Pressable
            key={macro.id}
            accessibilityRole="menuitem"
            accessibilityState={{ disabled: isDisabled }}
            accessibilityLabel={`Apply macro ${macro.name}`}
            disabled={isDisabled || !onApply}
            onPress={onApply ? () => onApply(macro) : undefined}
            style={({ pressed }) => ({
              ...cardBase,
              minHeight: 44,
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.md,
              padding: tokens.spacing.md,
              opacity: isDisabled ? 0.5 : 1,
              backgroundColor: pressed && !isDisabled && onApply ? withAlpha(colors.primary, 0.1) : colors.card,
            })}
          >
            {/* Leading glyph disc — soft-primary tint, the calm-console signature. */}
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: withAlpha(discColor, 0.12),
              }}
            >
              <Text style={{ color: discColor, fontSize: tokens.typography.scale.base }}>{macro.glyph ?? '⚡'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  color: isDisabled ? colors.muted : colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                }}
              >
                {macro.name}
              </Text>
              {macro.description ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {macro.description}
                </Text>
              ) : null}
            </View>
            {count !== undefined ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {count} action{count === 1 ? '' : 's'}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
