import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MultipleChoiceProps } from './MultipleChoice';

/** Same Props as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV3Props = MultipleChoiceProps;

/**
 * MultipleChoice, design V3 — **stacked minimal rows**. No cards or per-row
 * borders: the options share one hairline-divided list, each row a leading
 * indicator (a hollow circle for `single`, a hollow square for `multiple`) that
 * fills primary and shows a check when picked, with the label going bold and a
 * slim primary accent bar sliding in on the left. Airy and text-forward, unlike
 * the original's bordered rows. `single` = `radiogroup`+`radio`, `multiple` =
 * `list`+`checkbox`, state announced (never color-alone). Empty renders a muted
 * state. Token-pure.
 */
export function MultipleChoiceV3({
  options,
  value,
  onChange,
  selection = 'single',
  accessibilityLabel = 'Answer options',
  disabled = false,
  style,
}: MultipleChoiceV3Props): React.ReactElement {
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
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>No options available.</Text>
      </View>
    );
  }

  return (
    <View
      accessibilityRole={multiple ? 'list' : 'radiogroup'}
      accessibilityLabel={accessibilityLabel}
      style={[{}, style]}
    >
      {options.map((opt, i) => {
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
              gap: tokens.spacing.md,
              paddingVertical: tokens.spacing.md,
              paddingLeft: tokens.spacing.sm,
              paddingRight: tokens.spacing.sm,
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: withAlpha(colors.border, 0.8),
              backgroundColor: pressed ? withAlpha(colors.primary, 0.06) : 'transparent',
              opacity: disabled ? 0.5 : 1,
            })}
          >
            {/* Left accent bar — only present (width) when selected. */}
            <View
              style={{
                width: 3,
                alignSelf: 'stretch',
                borderRadius: tokens.radius.full,
                backgroundColor: selected ? colors.primary : 'transparent',
              }}
            />

            <View
              style={{
                width: 22,
                height: 22,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: multiple ? tokens.radius.sm : tokens.radius.full,
                borderWidth: selected ? 0 : 1.5,
                borderColor: colors.border,
                backgroundColor: selected ? colors.primary : 'transparent',
              }}
            >
              {selected ? <Icon glyph="✓" size="xs" color="onPrimary" /> : null}
            </View>

            {opt.icon ? <Icon glyph={opt.icon} size="base" color="onSurface" /> : null}

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: selected ? '800' : '500',
                }}
              >
                {opt.label}
              </Text>
              {opt.description ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{opt.description}</Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
