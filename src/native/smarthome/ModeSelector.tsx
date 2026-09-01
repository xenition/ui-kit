import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** One selectable home mode — id, label + an optional glyph. */
export interface ModeOption {
  /** Stable identity, emitted to `onChange` (e.g. `'home'`). */
  id: string;
  /** Human-readable label shown under the glyph (e.g. `'Home'`). */
  label: string;
  /** Leading glyph/emoji for the mode tile (e.g. `'🏠'`). */
  glyph?: string;
}

/** The four canonical home modes when no custom `modes` are supplied. */
export type HomeMode = 'home' | 'away' | 'night' | 'vacation';

/** The default Home / Away / Night / Vacation mode set. */
export const DEFAULT_MODES: readonly ModeOption[] = [
  { id: 'home', label: 'Home', glyph: '🏠' },
  { id: 'away', label: 'Away', glyph: '🚶' },
  { id: 'night', label: 'Night', glyph: '🌙' },
  { id: 'vacation', label: 'Vacation', glyph: '✈️' },
];

export interface ModeSelectorProps {
  /**
   * The id of the currently selected mode (matches a `modes[].id`; defaults to
   * one of {@link HomeMode} when `modes` is omitted). Drives the solid-`primary`
   * selected tile.
   */
  value: HomeMode | string;
  /** Fires with the chosen mode id when a tile is activated. */
  onChange?: (mode: string) => void;
  /**
   * Custom mode tiles, in display order. Defaults to {@link DEFAULT_MODES}
   * (Home / Away / Night / Vacation).
   */
  modes?: readonly ModeOption[];
  /** Accessible label for the radiogroup. Defaults to `'Home mode'`. */
  label?: string;
  /** Disables every tile (e.g. while a mode change is in flight). */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * ModeSelector — **V4** "ambient" home-mode switch. A calm control-panel
 * `radiogroup` of big (≥44px) mode tiles: the **selected** mode is a solid
 * `primary` fill with `on-primary` glyph + label, while the rest stay on a calm
 * surface with a soft tint — one accent, nothing shouting. Each tile is a
 * `radio` with its selected state announced, and the meaning is carried by glyph
 * + label (never color alone). Presentational only: `value` in, `onChange` out.
 * Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
export function ModeSelector({
  value,
  onChange,
  modes = DEFAULT_MODES,
  label = 'Home mode',
  disabled = false,
  style,
}: ModeSelectorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(modes) && modes.length > 0 ? modes : DEFAULT_MODES;

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}
    >
      {list.map((mode) => {
        const selected = mode.id === value;
        return (
          <Pressable
            key={mode.id}
            accessibilityRole="radio"
            accessibilityLabel={mode.label}
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange?.(mode.id)}
            style={({ pressed }) => ({
              flexGrow: 1,
              flexBasis: '46%',
              minHeight: 64,
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.md,
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected
                ? colors.primary
                : pressed
                  ? withAlpha(colors.primary, 0.06)
                  : colors.surface,
              opacity: disabled ? 0.6 : 1,
              ...(selected
                ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                : {}),
            })}
          >
            <Text style={{ fontSize: tokens.typography.scale['2xl'] }}>{mode.glyph ?? '•'}</Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                color: selected ? colors.onPrimary : colors.onSurface,
              }}
            >
              {mode.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
