import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { RideStatusBarProps, RideStage } from './RideStatusBar';

/** Canonical stage order + glyph + human label. */
const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '🔍' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🧭' },
  { key: 'completed', label: 'Completed', glyph: '🏁' },
];

/**
 * Alternate design (v3) of {@link RideStatusBar} — a drop-in with the **same
 * props**. The *compact status pill bar*: a leading pill spelling out the active
 * stage glyph + label + `detail`, trailed by a tiny four-dot progress track. Fits
 * a header or list row in one line. A `cancelled` flag renders an explicit
 * cancelled pill. Progress is conveyed by a glyph + spelled-out label + a11y
 * label (never color alone). Token-pure: semantic slots + `withAlpha` only.
 */
export type RideStatusBarV3Props = RideStatusBarProps;

export function RideStatusBarV3({ stage, detail, cancelled = false, style }: RideStatusBarV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));

  const barStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
  };

  if (cancelled) {
    return (
      <View
        accessible
        accessibilityLabel="Ride cancelled"
        style={[barStyle, { borderColor: withAlpha(colors.danger, 0.5), backgroundColor: withAlpha(colors.danger, 0.1) }, style]}
      >
        <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>✕ Cancelled</Text>
        {detail ? (
          <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
      </View>
    );
  }

  const current = STAGES[activeIndex] ?? STAGES[0]!;
  const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${detail ? `, ${detail}` : ''}`;

  return (
    <View accessible accessibilityLabel={a11y} style={[barStyle, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: withAlpha(colors.primary, 0.12),
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.sm }}>{current.glyph}</Text>
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>{current.label}</Text>
      </View>

      {detail ? (
        <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {detail}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {STAGES.map((s, i) => (
          <View
            key={s.key}
            style={{
              width: i === activeIndex ? 14 : 6,
              height: 6,
              borderRadius: tokens.radius.full,
              backgroundColor: i <= activeIndex ? colors.primary : withAlpha(colors.muted, 0.3),
            }}
          />
        ))}
      </View>
    </View>
  );
}
