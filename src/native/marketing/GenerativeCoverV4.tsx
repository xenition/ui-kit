import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from '../commerce/internal/Gradient';
import type { GenerativeCoverProps, CoverForm } from '../commerce/GenerativeCover';

/** Drop-in for {@link GenerativeCoverProps} — same props, the V4 "showcase" design. */
export type GenerativeCoverV4Props = GenerativeCoverProps;

/**
 * GenerativeCover — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base (`native/commerce/GenerativeCover`): React
 * Native has no SVG print-plate engine here, so the cover is a **deterministic
 * two-token `Gradient`** (via the shared `expo-linear-gradient` wrapper) seeded
 * from `seed`, with `form` varying the gradient *direction*. The web twin draws
 * the full geometry; what the two share is the seeded decision.
 *
 * The V4 *refines* the look: crisper, higher-contrast token defaults — a
 * saturated `primary` ground into a light `accent` far stop (rather than the
 * base's primary→accent mid-tones that could land two similar values together
 * and flatten) — plus a soft seeded diagonal so the plate reads bolder and
 * more three-dimensional at thumbnail size. Every `CoverForm` is honored via
 * the direction table. Explicit `ink`/`paper` roles override the V4 defaults.
 *
 * **Native-simplified, web-only note:** unlike web there is no per-form
 * geometry — `form` only steers the gradient axis. Token-only colors via
 * `useXenitionTheme()`, dark-mode safe. Static — no motion, nothing to reduce.
 */

const FORMS: readonly CoverForm[] = ['arc', 'bands', 'orbit', 'grid', 'wave', 'stack'];

/** Gradient axis per form — the one thing a two-stop gradient can say about it. */
const FORM_DIRS: Record<
  CoverForm,
  { start: { x: number; y: number }; end: { x: number; y: number } }
> = {
  arc: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  bands: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  orbit: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  grid: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  wave: { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
  stack: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};

/** FNV-1a — stable per-seed geometry, matching the base's hash. */
function hashSeed(seed: string | number): number {
  const s = String(seed);
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Ramp = 'primary' | 'accent' | 'neutral';
const RAMP_ROLE = /^(primary|accent|neutral)-(\d+)$/;

/** Resolve a color role (`primary-700`, `accent`, `surface`, …) to a token color. */
function resolveRole(
  role: string | undefined,
  tokens: ReturnType<typeof useXenitionTheme>['tokens'],
  colors: ReturnType<typeof useXenitionTheme>['colors']
): string | undefined {
  if (!role) return undefined;
  const step = RAMP_ROLE.exec(role);
  if (step) {
    const ramp = tokens.ramps[step[1] as Ramp] as Record<number, string | undefined>;
    return ramp[Number(step[2])];
  }
  return (colors as unknown as Record<string, string | undefined>)[role];
}

function initials(label: string): string {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

export function GenerativeCoverV4({
  seed,
  label,
  form,
  ink,
  paper,
  style,
}: GenerativeCoverV4Props): React.ReactElement {
  const { tokens, colors } = useXenitionTheme();
  const h = hashSeed(seed);

  // V4 confident defaults: saturated primary ground → light accent far stop for
  // crisper contrast than the base's mid-tone pairing. Explicit roles override.
  const primarySteps = [500, 600, 700] as const;
  const accentSteps = [200, 300, 400] as const;
  const from =
    resolveRole(paper, tokens, colors) ??
    tokens.ramps.primary[primarySteps[h % primarySteps.length]!];
  const to =
    resolveRole(ink, tokens, colors) ??
    // `>>>` (not `>>`): h is a full uint32; a signed shift could go negative and
    // index the step table with a negative key → invalid stop → black plate.
    tokens.ramps.accent[accentSteps[(h >>> 3) % accentSteps.length]!];
  const dir = FORM_DIRS[form ?? FORMS[h % FORMS.length]!];

  const wrapStyle: StyleProp<ViewStyle> = [{ flex: 1, overflow: 'hidden' }, style];

  return (
    <View style={wrapStyle}>
      <Gradient
        colors={[from, to]}
        start={dir.start}
        end={dir.end}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        {label ? (
          <Text
            style={{
              color: colors.onPrimary,
              fontSize: tokens.typography.scale.xl,
              fontWeight: '800',
              letterSpacing: 0.5,
              opacity: 0.92,
            }}
          >
            {initials(label)}
          </Text>
        ) : null}
      </Gradient>
    </View>
  );
}
