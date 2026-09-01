import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Icon } from '../primitives';
import type { MultipleChoiceProps } from './MultipleChoice';

/** Drop-in for {@link MultipleChoiceProps} — same props, the V4 "focus" design. */
export type MultipleChoiceV4Props = MultipleChoiceProps;

/**
 * MultipleChoice — **V4** "clean form / focus" design. Calm, legible answer rows
 * rendered as big tappable cards (min height 44, generous 8-pt padding). Each row
 * carries a leading radio (`single`) or check (`multiple`) indicator, an optional
 * icon, a label and optional description. The selected row lifts to a soft primary
 * tint with a `primary` edge and a solid **primary** indicator with on-primary
 * glyph; unselected rows sit on `surface` + `border`. One accent throughout. Same
 * props/behavior as {@link MultipleChoiceProps} — the `radiogroup`/`radio` vs.
 * `checkbox` roles, `accessibilityState`, single/multiple selection and the empty
 * state are all preserved; token-only colors via `useXenitionTheme()` (no literal
 * colors).
 */
export function MultipleChoiceV4({
  options,
  value,
  onChange,
  selection = 'single',
  accessibilityLabel = 'Answer options',
  disabled = false,
  style,
}: MultipleChoiceV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const multiple = selection === 'multiple';

  const selectedSet = React.useMemo(() => {
    if (multiple) return new Set(Array.isArray(value) ? value : []);
    return new Set(typeof value === 'string' ? [value] : []);
  }, [multiple, value]);

  const toggle = (id: string): void => {
    if (multiple) {
      const next = new Set(selectedSet);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onChange(Array.from(next));
    } else {
      onChange(id);
    }
  };

  if (options.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          No options available.
        </Text>
      </View>
    );
  }

  return (
    <View
      accessibilityRole={multiple ? 'list' : 'radiogroup'}
      accessibilityLabel={accessibilityLabel}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {options.map((opt) => {
        const selected = selectedSet.has(opt.id);
        return (
          <Pressable
            key={opt.id}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityState={multiple ? { checked: selected, disabled } : { selected, disabled }}
            accessibilityLabel={opt.label}
            disabled={disabled}
            onPress={() => toggle(opt.id)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              minHeight: 44,
              borderRadius: tokens.radius.lg,
              borderWidth: selected ? 2 : 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected ? withAlpha(colors.primary, 0.12) : colors.surface,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
            })}
          >
            {/* Indicator: circle for single, square for multiple. */}
            <View
              style={{
                width: 22,
                height: 22,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: multiple ? tokens.radius.sm : tokens.radius.full,
                borderWidth: selected ? 0 : 1,
                borderColor: colors.border,
                backgroundColor: selected ? colors.primary : colors.surface,
              }}
            >
              {selected ? <Icon glyph={multiple ? '✓' : '●'} size="xs" color="onPrimary" /> : null}
            </View>

            {opt.icon ? <Icon glyph={opt.icon} size="base" color="onSurface" /> : null}

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: selected ? '700' : '500',
                }}
              >
                {opt.label}
              </Text>
              {opt.description ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {opt.description}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
