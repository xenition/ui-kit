import * as React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type ParticleMood = 'ember' | 'snow' | 'fireflies' | 'sparks';

export interface ParticleFieldProps {
  /** Particle character: embers, snow, fireflies, or sparks (drives color + size). */
  mood?: ParticleMood;
  /** Particle count (clamped 0–80; default 18). */
  density?: number;
  /** Layout seed — same seed, same scatter (deterministic, no `Math.random`). */
  seed?: number;
  /** Decorative content layered above the scatter (rendered absolute-fill). */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

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
  /** Ramp role + steps for the dot fill (token-only). */
  role: 'primary' | 'accent' | 'neutral';
  step: 100 | 200 | 300 | 400 | 500;
}

const TUNING: Record<ParticleMood, MoodTuning> = {
  ember: { sizeMin: 3, sizeMax: 8, role: 'primary', step: 400 },
  sparks: { sizeMin: 2, sizeMax: 4.5, role: 'accent', step: 500 },
  snow: { sizeMin: 2.5, sizeMax: 6.5, role: 'neutral', step: 200 },
  fireflies: { sizeMin: 3, sizeMax: 5.5, role: 'accent', step: 400 },
};

const clampDensity = (density: number): number =>
  Math.max(0, Math.min(80, Math.round(density)));

/**
 * Deterministic golden-ratio low-discrepancy scatter — replicated from the web
 * `computeParticles` (its module pulls DOM helpers at import, so we inline the
 * pure math here). Same (mood, density, seed) → same layout on every device.
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
      opacity: Number((0.35 + t * 0.4).toFixed(2)),
    };
  });
}

/**
 * Native mirror of the web `ParticleField`. The web version animates each
 * particle on an infinite CSS keyframe path (rise/fall/blink). React Native
 * gets a **static, deterministic scatter** of small fully-rounded token-colored
 * dot Views — no animation loop, so there is nothing to honor for reduced
 * motion (it is already the reduced-motion rest pose). The `mood`/`density`/
 * `seed` props are preserved: `mood` selects the dot color + size range,
 * `density`/`seed` drive the same golden-ratio layout as web. Token-only.
 */
export function ParticleField({
  mood = 'ember',
  density = 18,
  seed = 1,
  children,
  style,
}: ParticleFieldProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const particles = React.useMemo(
    () => computeNativeParticles(mood, density, seed),
    [mood, density, seed]
  );
  const base = tokens.ramps[TUNING[mood].role][TUNING[mood].step];

  return (
    <View
      testID="xen-particle-field"
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
            backgroundColor: withAlpha(base, p.opacity),
          }}
        />
      ))}
      {children !== undefined && children !== null ? (
        <View style={StyleSheet.absoluteFill}>{children}</View>
      ) : null}
    </View>
  );
}
