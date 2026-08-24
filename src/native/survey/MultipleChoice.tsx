import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import type { SurveyChoice, ChoiceSelection } from './types';

export interface MultipleChoiceProps {
  /** The answer options. Empty renders the empty state. */
  options: SurveyChoice[];
  /**
   * Controlled selection. In `single` mode a string id (or `null`); in
   * `multiple` mode an array of ids.
   */
  value: string | string[] | null;
  /**
   * Fires with the next selection — a string id in `single` mode, an id array
   * in `multiple` mode.
   */
  onChange: (value: string | string[]) => void;
  /** `single` = radios, `multiple` = checkboxes. Default `'single'`. */
  selection?: ChoiceSelection;
  /** Accessible name for the option group. Default `'Answer options'`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A choice list — the native answer control for pick-one (`single`) or
 * pick-many (`multiple`) questions. Each option is a full-width tappable row
 * with a token-bound radio/checkbox indicator; the selected row fills its
 * indicator with the primary token and is announced via `accessibilityState`
 * (`selected`/`checked`), so state is never conveyed by color alone. The group
 * carries the appropriate `radiogroup` (single) role. Empty options render a
 * muted empty state. No literal colors.
 */
export function MultipleChoice({
  options,
  value,
  onChange,
  selection = 'single',
  accessibilityLabel = 'Answer options',
  disabled = false,
  style,
}: MultipleChoiceProps): React.ReactElement {
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
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: colors.surface,
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
