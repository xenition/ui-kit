import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** The ordered lifecycle stages of a ride. */
export type RideStage = 'requested' | 'arriving' | 'in-trip' | 'completed';
/** Presentation for a {@link RideStatusBar}. */
export type RideStatusVariant = 'stepper' | 'compact';

/** Canonical stage order + glyph + human label. */
const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '🔍' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🧭' },
  { key: 'completed', label: 'Completed', glyph: '🏁' },
];

export interface RideStatusBarProps {
  /** The current stage. */
  stage: RideStage;
  /** Contextual detail for the active stage (e.g. `'Driver 3 min away'`). */
  detail?: string;
  /** Whether the ride was cancelled (renders a distinct cancelled state). */
  cancelled?: boolean;
  /** Presentation variant. */
  variant?: RideStatusVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A ride lifecycle progress bar — walks `requested → arriving → in-trip →
 * completed`, marking each stage done / active / pending. Completed and active
 * stages are distinguished by a glyph (✓ / the stage icon) and a spelled-out
 * label plus an a11y label, so progress never rests on color alone. A
 * `cancelled` flag overrides with an explicit cancelled state. Colors come from
 * semantic tokens and `withAlpha` tints — no literal colors. The `stage` is
 * matched against a known set and falls back safely if unrecognised.
 */
export function RideStatusBar({
  stage,
  detail,
  cancelled = false,
  variant = 'stepper',
  style,
}: RideStatusBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
  const compact = variant === 'compact';

  if (cancelled) {
    return (
      <View
        accessible
        accessibilityLabel="Ride cancelled"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: withAlpha(colors.danger, 0.5),
            backgroundColor: withAlpha(colors.danger, 0.1),
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          },
          style,
        ]}
      >
        <Text style={{ fontSize: tokens.typography.scale.base }}>✕</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Cancelled</Text>
          {detail ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{detail}</Text> : null}
        </View>
      </View>
    );
  }

  const current = STAGES[activeIndex] ?? STAGES[0]!;
  const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${
    detail ? `, ${detail}` : ''
  }`;

  return (
    <View accessible accessibilityLabel={a11y} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {STAGES.map((s, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          const dotColor = done || active ? colors.primary : withAlpha(colors.muted, 0.35);
          const isLast = i === STAGES.length - 1;
          return (
            <React.Fragment key={s.key}>
              <View style={{ alignItems: 'center', width: compact ? 30 : 64 }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: done ? colors.primary : active ? withAlpha(colors.primary, 0.16) : withAlpha(colors.muted, 0.14),
                    borderWidth: active ? 2 : 0,
                    borderColor: colors.primary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: tokens.typography.scale.xs,
                      color: done ? colors.onPrimary : colors.onSurface,
                      fontWeight: '800',
                    }}
                  >
                    {done ? '✓' : s.glyph}
                  </Text>
                </View>
                {!compact ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: tokens.spacing.xs,
                      fontSize: tokens.typography.scale.xs,
                      fontWeight: active ? '700' : '500',
                      color: active ? colors.onSurface : colors.muted,
                    }}
                  >
                    {s.label}
                  </Text>
                ) : null}
              </View>
              {!isLast ? (
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    marginTop: 13,
                    borderRadius: tokens.radius.full,
                    backgroundColor: i < activeIndex ? colors.primary : withAlpha(colors.muted, 0.3),
                  }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{current.label}</Text>
        {detail ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>· {detail}</Text> : null}
      </View>
    </View>
  );
}
