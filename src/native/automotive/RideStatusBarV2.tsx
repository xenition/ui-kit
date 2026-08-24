import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { RideStatusBarProps, RideStage } from './RideStatusBar';

/** Canonical stage order + glyph + human label. */
const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '🔍' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🧭' },
  { key: 'completed', label: 'Completed', glyph: '🏁' },
];

/**
 * Alternate design (v2) of {@link RideStatusBar} — a drop-in with the **same
 * props**. Where the original is a thin inline stepper, V2 is a *big elevated
 * stepper*: an overall progress meter, large numbered stage circles with labels,
 * and a prominent **status strip** foregrounding the active stage glyph + label +
 * `detail`. Completed/active stages use a ✓ / stage glyph plus a spelled-out
 * label + a11y label, so progress never rests on color. A `cancelled` flag
 * overrides. Token-pure: semantic slots + `withAlpha` tints only.
 */
export type RideStatusBarV2Props = RideStatusBarProps;

export function RideStatusBarV2({ stage, detail, cancelled = false, style }: RideStatusBarV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));

  const surface = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    ...shadow('md', tokens),
  };

  if (cancelled) {
    return (
      <View
        accessible
        accessibilityLabel="Ride cancelled"
        style={[
          surface,
          {
            gap: tokens.spacing.sm,
            backgroundColor: withAlpha(colors.danger, 0.1),
          },
          style,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.danger, 0.18),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: tokens.typography.scale.lg, color: colors.danger, fontWeight: '800' }}>✕</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>Cancelled</Text>
            {detail ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{detail}</Text> : null}
          </View>
        </View>
      </View>
    );
  }

  const current = STAGES[activeIndex] ?? STAGES[0]!;
  const pct = ((activeIndex + 1) / STAGES.length) * 100;
  const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${detail ? `, ${detail}` : ''}`;

  return (
    <View accessible accessibilityLabel={a11y} style={[surface, style]}>
      <Progress value={pct} tone="primary" size="md" />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {STAGES.map((s, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <View key={s.key} style={{ alignItems: 'center', flex: 1, gap: tokens.spacing.xs }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: done ? colors.primary : active ? withAlpha(colors.primary, 0.16) : withAlpha(colors.muted, 0.14),
                  borderWidth: active ? 2 : 0,
                  borderColor: colors.primary,
                }}
              >
                <Text style={{ fontSize: tokens.typography.scale.base, color: done ? colors.onPrimary : colors.onSurface, fontWeight: '800' }}>
                  {done ? '✓' : s.glyph}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: active ? '800' : '500',
                  color: active ? colors.onSurface : colors.muted,
                }}
              >
                {s.label}
              </Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: withAlpha(colors.primary, 0.1),
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.18),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.lg }}>{current.glyph}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{current.label}</Text>
          {detail ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{detail}</Text> : null}
        </View>
      </View>
    </View>
  );
}
