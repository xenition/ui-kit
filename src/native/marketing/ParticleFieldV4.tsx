import * as React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { ParticleFieldProps, ParticleMood } from './ParticleField';

export type { ParticleMood };

/** Drop-in for {@link ParticleFieldProps} — same props, the V4 "showcase" design. */
export type ParticleFieldV4Props = ParticleFieldProps;

/** One dot's deterministic geometry (percent positions + px size). */
interface NativeParticle {
  x: string;
  y: string;
  size: number;
  opacity: number;
}

const GOLDEN = 0.618033988749895;

interface MoodTuning {
  sizeMin: number;
  sizeMax: number;
  /** Ramp role + step for the dot fill (token-only). */
  role: 'primary' | 'accent' | 'neutral';
  step: 100 | 200 | 300 | 400 | 500;
  /** Per-mood default density — the V4 tuning (only used when `density` unset). */
  defaultDensity: number;
}

/*
 * Same mood → role/step/size mapping as the native base, with V4-tuned size
 * ranges (a touch larger, cleaner cores) and a confident per-mood default
 * density. Token-only: fill color is always a ramp step.
 */
const TUNING: Record<ParticleMood, MoodTuning> = {
  ember: { sizeMin: 3.5, sizeMax: 9, role: 'primary', step: 400, defaultDensity: 16 },
  sparks: { sizeMin: 2, sizeMax: 5, role: 'accent', step: 500, defaultDensity: 26 },
  snow: { sizeMin: 3, sizeMax: 7, role: 'neutral', step: 200, defaultDensity: 22 },
  fireflies: { sizeMin: 3, sizeMax: 6, role: 'accent', step: 400, defaultDensity: 20 },
};

const clampDensity = (density: number): number =>
  Math.max(0, Math.min(80, Math.round(density)));

/**
 * Deterministic golden-ratio low-discrepancy scatter — the same pure math the
 * native base inlines (its web sibling's `computeParticles` pulls DOM helpers
 * at import), so the same `(mood, density, seed)` lands the same layout on
 * every device and matches the base.
 */
function computeNativeParticles(
  mood: ParticleMood,
  density: number,
  seed: number
): NativeParticle[] {
  const tune = TUNING[mood];
  return Array.from({ length: clampDensity(density) }, (_, i) => {
    const t = ((i + seed) * GOLDEN) % 1;
    const u = ((i + seed + 7) * GOLDEN) % 1;
    const v = ((i + seed + 13) * GOLDEN) % 1;
    return {
      x: `${(t * 100).toFixed(1)}%`,
      y: `${(8 + v * 84).toFixed(1)}%`,
      size: Number((tune.sizeMin + u * (tune.sizeMax - tune.sizeMin)).toFixed(1)),
      // Slightly bolder peak than the base for the "showcase" read.
      opacity: Number((0.4 + t * 0.4).toFixed(2)),
    };
  });
}

/**
 * ParticleField — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: a **static, deterministic scatter** of
 * small fully-rounded token-colored dot Views — React Native has no CSS
 * keyframe engine here, so nothing animates and there is nothing to honor for
 * reduced motion (it is already the reduced-motion rest pose). The V4 *refines*
 * the look: V4-tuned size ranges + confident per-mood default density, and a
 * soft two-stop token core (bright center → translucent edge) so each dot reads
 * cleaner and bolder than the base's flat alpha disc.
 *
 * `mood`/`density`/`seed` are honored exactly as in the base: `mood` selects the
 * dot color + size range, `density`/`seed` drive the same golden-ratio layout.
 * An explicit `density` overrides the per-mood default. Token-only colors.
 */
export function ParticleFieldV4({
  mood = 'ember',
  density,
  seed = 1,
  children,
  style,
}: ParticleFieldV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const tune = TUNING[mood];
  const resolvedDensity = density ?? tune.defaultDensity;
  const particles = React.useMemo(
    () => computeNativeParticles(mood, resolvedDensity, seed),
    [mood, resolvedDensity, seed]
  );
  const core = tokens.ramps[tune.role][tune.step];

  return (
    <View
      testID="xen-particle-field-v4"
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { overflow: 'hidden' }, style]}
    >
      {particles.map((p, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: p.x as ViewStyle['left'],
            top: p.y as ViewStyle['top'],
            width: p.size,
            height: p.size,
            borderRadius: 9999,
            backgroundColor: withAlpha(core, p.opacity),
            // Bright inner core → soft token halo, without a gradient dep.
            borderWidth: p.size > 4 ? 0.5 : 0,
            borderColor: withAlpha(core, Math.min(1, p.opacity + 0.25)),
          }}
        />
      ))}
      {children !== undefined && children !== null ? (
        <View style={StyleSheet.absoluteFill}>{children}</View>
      ) : null}
    </View>
  );
}
