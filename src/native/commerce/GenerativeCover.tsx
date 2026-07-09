import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from './internal/Gradient';

export interface GenerativeCoverProps {
  /** Stable seed — same seed yields the same cover (product slug/title). */
  seed: string;
  /** Optional label rendered over the art (product initials fallback). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/** Deterministic FNV-1a hash → stable per-seed geometry. */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function initials(label: string): string {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/**
 * Native cover-art placeholder drawn when a product has no image — the native
 * counterpart of the web `GenerativeCover`. A deterministic two-token gradient
 * (seeded from the product slug) via `expo-linear-gradient`, with the product
 * initials overlaid. Token-only: both gradient stops are compiled ramp steps,
 * so it restyles from the seed and works in light + dark.
 */
export function GenerativeCover({
  seed,
  label,
  style,
}: GenerativeCoverProps): React.ReactElement {
  const { tokens, colors } = useXenitionTheme();
  const h = hashSeed(seed);

  // Pick two ramp steps deterministically from primary + accent.
  const primarySteps = [300, 400, 500, 600] as const;
  const accentSteps = [400, 500, 600, 700] as const;
  const from = tokens.ramps.primary[primarySteps[h % primarySteps.length]!];
  const to = tokens.ramps.accent[accentSteps[(h >> 3) % accentSteps.length]!];

  return (
    <Gradient
      colors={[from, to]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      {label ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text
            style={{
              color: colors.onPrimary,
              fontSize: tokens.typography.scale.xl,
              fontWeight: '700',
              opacity: 0.9,
            }}
          >
            {initials(label)}
          </Text>
        </View>
      ) : null}
    </Gradient>
  );
}
