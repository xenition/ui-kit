import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from './internal/Gradient';
import { resolveCoverPlate } from '../../commerce/internal/cover-v4';
import type { CoverColorRole, CoverForm, CoverPlate } from '../../commerce/internal/cover-v4';

export type { CoverForm, CoverColorRole, CoverPlate };

export interface GenerativeCoverV4Props {
  /** Stable seed — same seed yields the same cover (product slug/title). */
  seed: string | number;
  /**
   * Accessible name. When given the cover is announced as an image; when
   * omitted it is decorative and hidden from the accessibility tree — which is
   * what it is inside a `ProductCardV4`, where the title is printed directly
   * beneath the art.
   */
  label?: string;
  /**
   * Composition. Omitted, it is derived from the seed.
   *
   * **Honest limit, unchanged from the base:** native renders a two-stop
   * gradient, not SVG, so `form` varies the gradient's *direction* rather than
   * drawing the geometry the name promises. The web twin draws the full
   * composition. What the two share is the decision — the same seed picks the
   * same `form`, the same `ink` and the same `paper` on both platforms.
   */
  form?: CoverForm;
  /** Token role for the mark (e.g. `accent-300`). Omitted, seeded. */
  ink?: CoverColorRole;
  /** Token role for the ground (e.g. `primary-600`). Omitted, seeded. */
  paper?: CoverColorRole;
  style?: StyleProp<ViewStyle>;
}

/**
 * Gradient direction per form. The one thing a two-stop gradient can say about
 * a composition, and the base's table kept as-is: a seed that drew `bands` on
 * web keeps drawing top-to-bottom here.
 */
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

type Ramp = 'primary' | 'accent' | 'neutral';

const RAMP_ROLE = /^(primary|accent|neutral)-(\d+)$/;

/**
 * A colour role → a compiled token colour.
 *
 * A ramp step (`primary-600`) reads the ramp; anything else is looked up as a
 * semantic slot (`surface`, `accent`). An unresolvable role throws rather than
 * returning `undefined`: the base's equivalent returned `undefined` on a miss,
 * which reaches the gradient as an invalid stop and renders a **black plate** —
 * a failure that looks like a design decision. The web twin throws on a bad
 * role for the same reason; the two twins now fail the same way.
 */
function resolveRole(
  role: string,
  tokens: ReturnType<typeof useXenitionTheme>['tokens'],
  colors: ReturnType<typeof useXenitionTheme>['colors'],
  prop: 'ink' | 'paper'
): string {
  const step = RAMP_ROLE.exec(role);
  if (step) {
    const ramp = tokens.ramps[step[1] as Ramp] as Record<number, string | undefined>;
    const value = ramp[Number(step[2])];
    if (value !== undefined) return value;
  } else {
    const slot = (colors as unknown as Record<string, string | undefined>)[role];
    if (slot !== undefined) return slot;
  }
  throw new Error(
    `GenerativeCoverV4: invalid ${prop} role "${role}". Use a ramp step like "primary-600" or a semantic slot like "surface" — literal colors are not accepted.`
  );
}

/**
 * **V4 generative cover (native)** — same props as the web
 * `GenerativeCoverV4`, including defaults, and the same seeded decisions.
 *
 * Three changes from the base, and the third is the one that mattered.
 *
 * 1. **The seed decision is shared, not duplicated.** `form`, `ink` and
 *    `paper` come from `commerce/internal/cover-v4.ts`, the one file both
 *    twins read. The base carried its own copy of FNV-1a and its own step
 *    tables; they happened to agree with the web renderer's and nothing was
 *    keeping them agreeing. See that file for the argument.
 * 2. **The plate reads at thumbnail size.** A light `accent` mark on a
 *    saturated `primary` ground, rather than the base's accent-over-primary
 *    mid-tones, which for some seeds landed two similar values on top of each
 *    other and dissolved into a flat rectangle.
 * 3. **The initials are gone.** The base overlaid the label's initials on the
 *    art. They are redundant where this component is actually used — a
 *    `ProductCardV4` prints the full title directly beneath — and they were a
 *    contrast promise nothing could keep, since text centred over a gradient
 *    sits on a different colour for every seed. `label` now does the one job
 *    it can do honestly: it is the accessible name, and its absence makes the
 *    cover decorative.
 *
 * `expo-linear-gradient` stays optional, exactly as the base had it: with no
 * native module present the `Gradient` wrapper degrades to a solid token fill
 * rather than hard-requiring a peer.
 */
export function GenerativeCoverV4({
  seed,
  label,
  form,
  ink,
  paper,
  style,
}: GenerativeCoverV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const plate = resolveCoverPlate(seed, form, ink, paper);

  const paperColor = resolveRole(plate.paper, tokens, colors, 'paper');
  const inkColor = resolveRole(plate.ink, tokens, colors, 'ink');
  const dir = FORM_DIRS[plate.form];

  // Announced as an image when named, invisible to the accessibility tree when
  // not — the same contract the web twin gets from `role="img"` / `aria-hidden`.
  const a11y =
    label !== undefined
      ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel: label }
      : {
          accessibilityElementsHidden: true,
          importantForAccessibility: 'no-hide-descendants' as const,
        };

  return (
    <View {...a11y} style={[{ flex: 1, overflow: 'hidden' }, style]}>
      <Gradient
        colors={[paperColor, inkColor]}
        start={dir.start}
        end={dir.end}
        style={{ flex: 1 }}
      />
    </View>
  );
}
