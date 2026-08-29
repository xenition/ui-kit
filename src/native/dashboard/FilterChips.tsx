import * as React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface FilterChipOption {
  value: string;
  label: string;
}

export interface FilterChipsProps {
  /** Options as `{value,label}` objects or bare strings (used as both). */
  options: Array<FilterChipOption | string>;
  /** Currently selected value(s). */
  selected: string | string[];
  /**
   * Fires with the next selection. Shape mirrors `multi` — and in single-select
   * mode the next selection is `''` when the active chip is pressed again, i.e.
   * nothing is selected. A row where a selection is mandatory can simply ignore
   * the empty value: `onChange={(v) => v && setFilter(v as string)}`.
   */
  onChange: (next: string | string[]) => void;
  /** Allow multiple chips selected at once. */
  multi?: boolean;
  /** Lay chips in a horizontal scroller instead of wrapping. */
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

function normalize(o: FilterChipOption | string): FilterChipOption {
  return typeof o === 'string' ? { value: o, label: o } : o;
}

/**
 * A row of selectable filter chips (single- or multi-select). The selected
 * chip(s) fill with the `primary` token. Token-only; wraps by default, or lays
 * out in a horizontal scroller when `scroll` is set. Pressing a selected chip
 * deselects it in either mode — see `onChange`.
 */
export function FilterChips({
  options,
  selected,
  onChange,
  multi = false,
  scroll = false,
  style,
}: FilterChipsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selectedList = Array.isArray(selected) ? selected : [selected];

  /*
    A chip is a toggle in both modes, and the active one turns itself off.

    Multi-select always did this; single-select used to re-fire the value that
    was already selected, which is not a state change at all — so there was no
    way to say "no filter" through the control. Every app worked around it the
    same way, by inventing an "All" option whose value is the empty string, and
    then had to keep that fake option out of anything that iterated the real
    ones. Clearing to `''` is that same escape hatch, minus the fake chip.
  */
  const toggle = (value: string): void => {
    if (multi) {
      const set = new Set(selectedList);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      onChange(Array.from(set));
    } else {
      onChange(selectedList.includes(value) ? '' : value);
    }
  };

  const chips = options.map(normalize).map((opt) => {
    const active = selectedList.includes(opt.value);
    return (
      <Pressable
        key={opt.value}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={opt.label}
        onPress={() => toggle(opt.value)}
        style={({ pressed }) => ({
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: active ? colors.primary : colors.border,
          backgroundColor: active ? colors.primary : colors.surface,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text
          style={{
            color: active ? colors.onPrimary : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: active ? '600' : '500',
          }}
        >
          {opt.label}
        </Text>
      </Pressable>
    );
  });

  if (scroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm, paddingRight: tokens.spacing.md }}
        style={style}
      >
        {chips}
      </ScrollView>
    );
  }

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}>
      {chips}
    </View>
  );
}
