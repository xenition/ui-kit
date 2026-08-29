import * as React from 'react';
import { cn } from '../primitives/cn';
import { ALIGN_CLASSES, JUSTIFY_CLASSES, SPACE_GAP, type SpaceKey } from './_tokens';
import type { ClusterProps } from './Cluster';

/*
  Split gap classes, written out as whole literals for the same reason
  `_tokens.ts` writes its own out in full: Tailwind's content scanner reads
  source text and cannot follow a composed string. They live here rather than in
  `_tokens.ts` because `rowGap` is a `Cluster` concern — nothing else in the
  module wraps — and every value still traces to a `--xen-space-*` token, so the
  no-literal-spacings rule (§1.1) holds.

  When `rowGap` is set the component emits `gap-x` + `gap-y` rather than `gap`
  plus an override, so which rule wins never depends on the order Tailwind
  happens to emit its gap utilities in.
*/
const SPACE_GAP_X: Record<SpaceKey, string> = {
  xs: 'gap-x-[var(--xen-space-xs)]',
  sm: 'gap-x-[var(--xen-space-sm)]',
  md: 'gap-x-[var(--xen-space-md)]',
  lg: 'gap-x-[var(--xen-space-lg)]',
  xl: 'gap-x-[var(--xen-space-xl)]',
  '2xl': 'gap-x-[var(--xen-space-2xl)]',
};

const SPACE_GAP_Y: Record<SpaceKey, string> = {
  xs: 'gap-y-[var(--xen-space-xs)]',
  sm: 'gap-y-[var(--xen-space-sm)]',
  md: 'gap-y-[var(--xen-space-md)]',
  lg: 'gap-y-[var(--xen-space-lg)]',
  xl: 'gap-y-[var(--xen-space-xl)]',
  '2xl': 'gap-y-[var(--xen-space-2xl)]',
};

export interface ClusterV4Props extends ClusterProps {
  /**
   * Vertical space between **wrapped lines**, from the same spacing scale as
   * `gap`. Undefined by default, which leaves `gap` governing both axes exactly
   * as today (§1.4).
   *
   * A cluster is the one primitive in the module that wraps, and a wrapped
   * cluster is the one place where the two axes genuinely want different
   * numbers: chips sit at `gap="sm"` horizontally (§4.1, "chip gaps
   * `spacing.sm`") but a second row of them reads as crowded against the first
   * at the same 8. `rowGap="md"` is the fix, and without it the only way to say
   * it was an arbitrary `className`.
   */
  rowGap?: SpaceKey;
}

/**
 * **V4 cluster** — the wrapping inline group (tags, chips, a row of buttons),
 * on the V4 design line. **Web only, deliberately**: there is no native twin of
 * `Cluster` and V4 does not add one. React Native wraps with
 * `Flex wrap direction="row"`, and the native row of chips is a horizontal
 * `ScrollArea` rather than a wrapping box (§5's `Bleed edge` note is about
 * exactly that scroll), so a native `Cluster` would be a component with no
 * caller. The web/native parity rule (§1.3) binds twins that exist; it does not
 * require inventing one.
 *
 * ## No visual change to what exists
 *
 * The base is already token-pure and its defaults are already right for the
 * V4 line — `gap="sm"` is §4.1's chip gap, `align="center"` is what keeps a
 * chip and a taller button optically aligned, `wrap` defaults on because a
 * cluster that cannot wrap is a `RowV4`. With `rowGap` left off this renders
 * byte-for-byte what `Cluster` renders, and the spec asserts that against the
 * base.
 *
 * ## What V4 adds
 *
 * **`rowGap`** — see the prop. It is additive, it is bound to the spacing
 * scale, and it defaults to "whatever `gap` says", so no existing cluster
 * moves.
 *
 * The `data-xen-v4-cluster` marker carries no styling; it is the house handle
 * for finding a V4 cluster in the tree.
 */
export const ClusterV4 = React.forwardRef<HTMLDivElement, ClusterV4Props>(function ClusterV4(
  { gap = 'sm', rowGap, align = 'center', justify = 'start', wrap = true, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-v4-cluster=""
      className={cn(
        'flex flex-row',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        ALIGN_CLASSES[align],
        JUSTIFY_CLASSES[justify],
        rowGap ? cn(SPACE_GAP_X[gap], SPACE_GAP_Y[rowGap]) : SPACE_GAP[gap],
        className
      )}
      {...rest}
    />
  );
});
