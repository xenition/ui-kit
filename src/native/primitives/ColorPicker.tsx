import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ColorSwatch {
  /** Accessible name for the swatch. */
  label: string;
  /** The token hex reported through `onChange`. */
  value: string;
}

export interface ColorPickerProps {
  /** Controlled selected color (a token hex string). */
  value?: string;
  /** Fires with the chosen swatch's token hex. */
  onChange?: (value: string) => void;
  /**
   * Optional explicit swatches. When omitted, a themed palette is drawn from
   * the semantic color tokens so every swatch is guaranteed token-pure.
   */
  swatches?: ColorSwatch[];
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const SWATCH = 36;

/**
 * Swatch-grid color picker — a dependency-free grid of tappable color chips.
 * With no `swatches` prop it builds its palette straight from the semantic
 * theme tokens (primary, accent, success, warn, danger, plus neutrals), so the
 * rendered colors are always token-pure — no external color engine, no literal
 * colors. The selected chip gets a `primary` selection ring.
 */
export function ColorPicker({
  value,
  onChange,
  swatches,
  disabled = false,
  accessibilityLabel = 'Choose a color',
  style,
}: ColorPickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const palette: ColorSwatch[] = React.useMemo(
    () =>
      swatches ?? [
        { label: 'Primary', value: colors.primary },
        { label: 'Accent', value: colors.accent },
        { label: 'Success', value: colors.success },
        { label: 'Warning', value: colors.warn },
        { label: 'Danger', value: colors.danger },
        { label: 'Foreground', value: colors.onSurface },
        { label: 'Muted', value: colors.muted },
        { label: 'Border', value: colors.border },
        { label: 'Surface', value: colors.surface },
        { label: 'Neutral 300', value: tokens.ramps.neutral[300] },
        { label: 'Neutral 500', value: tokens.ramps.neutral[500] },
        { label: 'Neutral 700', value: tokens.ramps.neutral[700] },
      ],
    [swatches, colors, tokens]
  );

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {palette.map((sw) => {
        const active = value === sw.value;
        return (
          <Pressable
            key={`${sw.label}-${sw.value}`}
            accessibilityRole="radio"
            accessibilityLabel={sw.label}
            accessibilityState={{ selected: active, disabled }}
            disabled={disabled}
            onPress={() => onChange?.(sw.value)}
            style={{
              width: SWATCH,
              height: SWATCH,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              borderWidth: active ? 2 : 1,
              borderColor: active ? colors.primary : colors.border,
            }}
          >
            <View
              style={{
                width: SWATCH - 12,
                height: SWATCH - 12,
                borderRadius: tokens.radius.full,
                backgroundColor: sw.value,
              }}
            />
            {active ? (
              <Text
                style={{
                  position: 'absolute',
                  color: colors.onPrimary,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '700',
                }}
              >
                ✓
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
