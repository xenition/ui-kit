import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SymptomOption {
  /** Stable identifier returned through `onChange`. */
  id: string;
  /** Human-readable symptom name. */
  label: string;
  /** Optional leading glyph/emoji. */
  glyph?: string;
}

export interface SymptomSelectorProps {
  /** The selectable symptoms. */
  options: SymptomOption[];
  /** Currently selected symptom ids (controlled). */
  value: string[];
  /** Fires with the next full selection when a chip is toggled. */
  onChange: (next: string[]) => void;
  /** Optional heading above the chips. */
  title?: string;
  /** Message shown when `options` is empty. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A multi-select symptom chip grid for intake / triage flows: tap to toggle
 * each symptom on or off. Fully controlled — `value` is the list of selected
 * ids and `onChange` receives the next list. Selected chips are marked with a
 * check glyph as well as a filled tone so selection never relies on color
 * alone. Renders an empty note when there are no options. Informational UI only
 * — not a medical device. Token-only colors.
 */
export function SymptomSelector({
  options,
  value,
  onChange,
  title,
  emptyLabel = 'No symptoms to choose from',
  style,
}: SymptomSelectorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selected = new Set(value);

  const toggle = (id: string): void => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(options.filter((o) => next.has(o.id)).map((o) => o.id));
  };

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {title}
        </Text>
      ) : null}

      {options.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {options.map((opt) => {
            const on = selected.has(opt.id);
            return (
              <Pressable
                key={opt.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
                accessibilityLabel={opt.label}
                onPress={() => toggle(opt.id)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.full,
                  borderWidth: 1,
                  borderColor: on ? colors.primary : colors.border,
                  backgroundColor: on ? colors.primary : colors.surface,
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                {on ? (
                  <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                    ✓
                  </Text>
                ) : opt.glyph ? (
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
                    {opt.glyph}
                  </Text>
                ) : null}
                <Text
                  style={{
                    color: on ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: on ? '700' : '500',
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
