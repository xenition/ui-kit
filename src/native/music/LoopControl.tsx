import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';

export type LoopControlVariant = 'bar' | 'inline';

export interface LoopControlProps {
  /** Whether looping is enabled. */
  enabled: boolean;
  /** Loop start bar (1-based). */
  start?: number;
  /** Loop end bar (1-based, inclusive). */
  end?: number;
  /** Total bars in the arrangement (for the region visualization). Default 8. */
  totalBars?: number;
  /**
   * - `bar` — toggle + a region strip over the bar count (default).
   * - `inline` — toggle + `start–end` text only.
   */
  variant?: LoopControlVariant;
  disabled?: boolean;
  /** Fires with the next enabled state when the loop toggle is pressed. */
  onToggle?: (enabled: boolean) => void;
  /** Fires with `[start, end]` when the region steppers change it. */
  onRegionChange?: (start: number, end: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A loop-region control — a UI shell only, it loops no transport. Shows a
 * loop on/off toggle (state via a11y `selected` + fill, not color alone) and,
 * in the `bar` variant, a strip visualizing the `[start, end]` region over
 * `totalBars` with −/＋ steppers that report through `onRegionChange`. All
 * bounds are clamped/guarded. Token-only styling.
 */
export function LoopControl({
  enabled,
  start = 1,
  end = 4,
  totalBars = 8,
  variant = 'bar',
  disabled = false,
  onToggle,
  onRegionChange,
  style,
}: LoopControlProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const bars = Math.max(1, Math.trunc(Number.isFinite(totalBars) ? totalBars : 8));
  const s = clamp(Math.trunc(start), 1, bars);
  const e = clamp(Math.trunc(end), s, bars);

  const setRegion = (ns: number, ne: number): void => {
    if (disabled) return;
    const cs = clamp(ns, 1, bars);
    const ce = clamp(ne, cs, bars);
    onRegionChange?.(cs, ce);
  };

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={enabled ? 'Turn loop off' : 'Turn loop on'}
        accessibilityState={{ selected: enabled, disabled }}
        disabled={disabled}
        onPress={() => onToggle?.(!enabled)}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: enabled ? colors.primary : colors.border,
          backgroundColor: enabled ? withAlpha(colors.primary, 0.16) : 'transparent',
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        })}
      >
        <Icon glyph="🔁" size="sm" color={enabled ? 'primary' : 'muted'} />
        <Text
          style={{
            color: enabled ? colors.primary : colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
          }}
        >
          Loop {enabled ? 'On' : 'Off'}
        </Text>
      </Pressable>

      {variant === 'bar' ? (
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View
            accessibilityRole="image"
            accessibilityLabel={`Loop region bars ${s} to ${e} of ${bars}`}
            style={{ flexDirection: 'row', gap: 2, height: 16 }}
          >
            {Array.from({ length: bars }).map((_, i) => {
              const bar = i + 1;
              const inRegion = bar >= s && bar <= e;
              return (
                <View
                  key={bar}
                  style={{
                    flex: 1,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: inRegion && enabled ? colors.primary : inRegion ? withAlpha(colors.primary, 0.35) : colors.border,
                  }}
                />
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stepper label="Start" value={s} onDec={() => setRegion(s - 1, e)} onInc={() => setRegion(s + 1, e)} disabled={disabled} />
            <Stepper label="End" value={e} onDec={() => setRegion(s, e - 1)} onInc={() => setRegion(s, e + 1)} disabled={disabled} />
          </View>
        </View>
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          Bars {s}–{e}
        </Text>
      )}
    </View>
  );
}

function Stepper({
  label,
  value,
  onDec,
  onInc,
  disabled,
}: {
  label: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  disabled: boolean;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const btn = ({ pressed }: { pressed: boolean }): ViewStyle => ({
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
  });
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Decrease ${label.toLowerCase()} bar`} disabled={disabled} onPress={onDec} style={btn}>
        <Icon glyph="−" size="sm" color="onSurface" />
      </Pressable>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', minWidth: 16, textAlign: 'center' }}>
        {value}
      </Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Increase ${label.toLowerCase()} bar`} disabled={disabled} onPress={onInc} style={btn}>
        <Icon glyph="＋" size="sm" color="onSurface" />
      </Pressable>
    </View>
  );
}
