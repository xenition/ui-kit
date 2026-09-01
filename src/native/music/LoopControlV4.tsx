import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';
import type { LoopControlProps } from './LoopControl';

/** Drop-in for {@link LoopControlProps} — same props, the V4 "session" design. */
export type LoopControlV4Props = LoopControlProps;

/**
 * LoopControl — **V4** "session" design (native parity of the web V4). The
 * tactile loop control: a rounded toggle whose on state reads through a
 * soft-primary fill **and** a `🔁` glyph + "On"/"Off" label (never color
 * alone), plus — in the `bar` variant — a chunky region strip over `totalBars`
 * with the `[start, end]` region lit, driven by 44px −/＋ steppers reporting
 * through `onRegionChange`. The `inline` variant collapses to a bold tabular
 * `Bars s–e` readout. All bounds clamp/guard; `enabled`/`disabled` honored. No
 * gradient — clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
export function LoopControlV4({
  enabled,
  start = 1,
  end = 4,
  totalBars = 8,
  variant = 'bar',
  disabled = false,
  onToggle,
  onRegionChange,
  style,
}: LoopControlV4Props): React.ReactElement {
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
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={enabled ? 'Turn loop off' : 'Turn loop on'}
        accessibilityState={{ selected: enabled, disabled }}
        disabled={disabled}
        onPress={() => onToggle?.(!enabled)}
        style={({ pressed }) => ({
          minHeight: 44,
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
        <Text style={{ color: enabled ? colors.primary : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          Loop {enabled ? 'On' : 'Off'}
        </Text>
      </Pressable>

      {variant === 'bar' ? (
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View
            accessibilityRole="image"
            accessibilityLabel={`Loop region bars ${s} to ${e} of ${bars}`}
            style={{ flexDirection: 'row', gap: 2, height: 20 }}
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
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
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
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : colors.surface,
    opacity: disabled ? 0.4 : 1,
  });
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Decrease ${label.toLowerCase()} bar`} disabled={disabled} onPress={onDec} style={btn}>
        <Icon glyph="−" size="sm" color="onSurface" />
      </Pressable>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', minWidth: 20, textAlign: 'center', fontVariant: ['tabular-nums'] }}>
        {value}
      </Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Increase ${label.toLowerCase()} bar`} disabled={disabled} onPress={onInc} style={btn}>
        <Icon glyph="＋" size="sm" color="onSurface" />
      </Pressable>
    </View>
  );
}
