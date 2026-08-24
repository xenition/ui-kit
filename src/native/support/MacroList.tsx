import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './internal';

export interface Macro {
  /** Stable id, returned to `onApply`. */
  id: string;
  /** Macro name (e.g. "Close + notify"). */
  name: string;
  /** Optional one-line description of what it does. */
  description?: string;
  /** Optional count of actions the macro runs. */
  actionCount?: number;
  /** Optional glyph/emoji leading the row. */
  glyph?: string;
  /** Mark unavailable (rendered dimmed, non-tappable). */
  disabled?: boolean;
}

export interface MacroListProps {
  /** The macros to list. */
  macros: Macro[];
  /** Fires with the macro when a row is tapped. */
  onApply?: (macro: Macro) => void;
  /** Loading state (renders placeholder rows). */
  loading?: boolean;
  /** Text shown when the list is empty. */
  emptyText?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tappable list of agent macros (bundled actions that mutate a ticket). Each
 * row shows a glyph, name, optional description, and an action-count hint;
 * tapping a row reports the macro via `onApply`. Handles `loading` (placeholder
 * rows) and empty states, and skips `disabled` macros with a dimmed,
 * non-interactive row. Indexing is guarded and colors come from tokens only.
 */
export function MacroList({
  macros,
  onApply,
  loading = false,
  emptyText = 'No macros available.',
  style,
}: MacroListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityLabel="Loading macros" style={style}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.md,
              padding: tokens.spacing.md,
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
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
    <View accessibilityRole="menu" style={style}>
      {macros.map((macro) => {
        const isDisabled = macro.disabled === true;
        const count =
          typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
        const row = (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            <Icon glyph={macro.glyph ?? '⚡'} size="lg" color={isDisabled ? 'muted' : 'primary'} />
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
          </View>
        );

        return (
          <Pressable
            key={macro.id}
            accessibilityRole="menuitem"
            accessibilityState={{ disabled: isDisabled }}
            accessibilityLabel={`Apply macro ${macro.name}`}
            disabled={isDisabled || !onApply}
            onPress={onApply ? () => onApply(macro) : undefined}
            style={({ pressed }) => ({
              padding: tokens.spacing.md,
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
              opacity: isDisabled ? 0.5 : pressed ? 0.7 : 1,
              backgroundColor: pressed && !isDisabled ? withAlpha(colors.primary, 0.06) : 'transparent',
            })}
          >
            {row}
          </Pressable>
        );
      })}
    </View>
  );
}
