import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import type { InterestOption } from './types';

export interface InterestPickerProps {
  /** Choosable topics. Empty renders the empty state. */
  options: InterestOption[];
  /** Currently selected ids (controlled). */
  selectedIds: string[];
  /** Fires with the full next selection set on each toggle. */
  onChange: (selectedIds: string[]) => void;
  /** Optional heading above the chips. */
  title?: string;
  /** Optional helper line (e.g. `'Pick at least 3'`). */
  helper?: string;
  /** Cap on selections; chips past the cap disable when unselected. */
  maxSelections?: number;
  /** Accessible name for the chip group. Default `'Interests'`. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Multi-select interest chips — the "personalize your feed" onboarding step. A
 * wrap of toggleable chips where a selected chip fills with the primary token
 * and shows a check; selection state is announced per-chip (`selected`) and the
 * running count is exposed on the group so screen-reader users hear their
 * progress. Enforces an optional `maxSelections` cap. Guards an empty option
 * list. No literal colors.
 */
export function InterestPicker({
  options,
  selectedIds,
  onChange,
  title,
  helper,
  maxSelections,
  accessibilityLabel = 'Interests',
  style,
}: InterestPickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const atCap = maxSelections != null && selectedSet.size >= maxSelections;

  const toggle = (id: string): void => {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else {
      if (atCap) return;
      next.add(id);
    }
    onChange(Array.from(next));
  };

  if (options.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          No topics to choose from.
        </Text>
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {title ? (
        <Text accessibilityRole="header" style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
          {title}
        </Text>
      ) : null}
      {helper ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{helper}</Text>
      ) : null}

      <View
        accessibilityRole="list"
        accessibilityLabel={`${accessibilityLabel}, ${selectedSet.size} selected`}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}
      >
        {options.map((opt) => {
          const selected = selectedSet.has(opt.id);
          const disabled = !selected && atCap;
          return (
            <Pressable
              key={opt.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected, disabled }}
              accessibilityLabel={opt.label}
              disabled={disabled}
              onPress={() => toggle(opt.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? colors.primary : colors.surface,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.45 : 1,
              }}
            >
              {selected ? <Icon glyph="✓" size="sm" color="onPrimary" /> : opt.icon ? <Icon glyph={opt.icon} size="sm" color="onSurface" /> : null}
              <Text
                style={{
                  color: selected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
