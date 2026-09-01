import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { SymptomSelectorProps, SymptomOption } from './SymptomSelector';

/** Drop-in for {@link SymptomSelectorProps} — same props, the V4 "clinic" design. */
export type SymptomSelectorV4Props = SymptomSelectorProps;

/**
 * SymptomSelector — **V4** "clinic" design. A multi-select symptom chip grid
 * for intake / triage flows, presented inside a calm, elevated rounded card
 * with a soft shadow. Tap a pill to toggle a symptom; fully controlled via
 * `value` + `onChange`. A selected chip reads with a soft-primary → primary
 * fill **and** a ✓ marker, so selection never relies on color alone. Each chip
 * is a `role="checkbox"` (≥44px tap target). Renders an empty note when there
 * are no options. Identical props/behavior to {@link SymptomSelectorProps}.
 * Token-only colors via `useXenitionTheme()`. Informational UI only — not a
 * medical device.
 */
export function SymptomSelectorV4({
  options,
  value,
  onChange,
  title,
  emptyLabel = 'No symptoms to choose from',
  style,
}: SymptomSelectorV4Props): React.ReactElement {
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

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  return (
    <View style={[shell, style]}>
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
                  minHeight: 44,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.full,
                  borderWidth: 1,
                  borderColor: on ? colors.primary : colors.border,
                  backgroundColor: on ? colors.primary : withAlpha(colors.primary, 0.1),
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                {on ? (
                  <Icon glyph="✓" size="xs" style={{ color: colors.onPrimary }} />
                ) : opt.glyph ? (
                  <Icon glyph={opt.glyph} size="sm" />
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
