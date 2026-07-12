import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from './internal/Gradient';

/** Composition variants — accepted for parity with the web `GenerativeCover`. */
export type CoverForm = 'arc' | 'bands' | 'orbit' | 'grid' | 'wave' | 'stack';

export interface GenerativeCoverProps {
  /** Stable seed — same seed yields the same cover (product slug/title). */
  seed: string | number;
  /** Optional label rendered over the art (product initials fallback). */
  label?: string;
  /**
   * Composition — accepted for parity with the web cover. Native renders a
   * seeded gradient (no SVG), so `form` only varies the gradient direction
   * rather than the full geometric composition.
   */
  form?: CoverForm;
  /** Foreground color role (e.g. `primary-700`, `accent`) → the gradient's far stop. */
  ink?: string;
  /** Background color role (e.g. `neutral-100`, `surface`) → the gradient's near stop. */
  paper?: string;
  style?: StyleProp<ViewStyle>;
}

/** Deterministic FNV-1a hash → stable per-seed geometry. */
function hashSeed(seed: string | number): number {
  const s = String(seed);
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const FORM_DIRS: Record<CoverForm, { start: { x: number; y: number }; end: { x: number; y: number } }> = {
  arc: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  bands: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  orbit: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  grid: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  wave: { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
  stack: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};

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
/** Resolve a color role (`primary-700`, `accent`, `surface`, …) to a token color. */
function resolveRole(
  role: string | undefined,
  tokens: ReturnType<typeof useXenitionTheme>['tokens'],
  colors: ReturnType<typeof useXenitionTheme>['colors'],
): string | undefined {
  if (!role) return undefined;
  const ramp = /^(primary|accent|neutral)-(\d+)$/.exec(role);
  if (ramp) {
    const steps = tokens.ramps[ramp[1] as 'primary' | 'accent' | 'neutral'];
    return (steps as Record<number, string>)[Number(ramp[2])];
  }
  return (colors as unknown as Record<string, string>)[role];
}

export function GenerativeCover({
  seed,
  label,
  form,
  ink,
  paper,
  style,
}: GenerativeCoverProps): React.ReactElement {
  const { tokens, colors } = useXenitionTheme();
  const h = hashSeed(seed);

  // Explicit ink/paper roles override the seeded gradient (brand-themed plate,
  // matching the web cover); otherwise pick two ramp steps deterministically.
  const primarySteps = [300, 400, 500, 600] as const;
  const accentSteps = [400, 500, 600, 700] as const;
  const from = resolveRole(paper, tokens, colors)
    ?? tokens.ramps.primary[primarySteps[h % primarySteps.length]!];
  const to = resolveRole(ink, tokens, colors)
    ?? tokens.ramps.accent[accentSteps[(h >> 3) % accentSteps.length]!];
  const dir = FORM_DIRS[form ?? (['arc', 'bands', 'orbit', 'grid', 'wave', 'stack'] as const)[h % 6]!];

  return (
    <Gradient
      colors={[from, to]}
      start={dir.start}
      end={dir.end}
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
