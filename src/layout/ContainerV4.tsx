import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_PX, type SpaceKey } from './_tokens';

/** `maxWidth="none"` lets the column run the full width of its parent. */
export type ContainerV4MaxWidth = number | 'none';

export interface ContainerV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Max content width in px, or `'none'` to uncap. Content is centered within
   * it. Defaults to `480` — the **mobile reading measure**, not a page width.
   *
   * 480 is the base `Container`'s value and it is kept so the default renders
   * exactly as it does today, but it is a phone-shaped number: a dashboard on a
   * tablet reads as a narrow ribbon down the middle of the screen at 480. Pass
   * a wider cap, or `'none'` and let a parent do the capping, for anything that
   * is not a column of reading copy.
   */
  maxWidth?: ContainerV4MaxWidth;
  /**
   * Horizontal page gutter, from the spacing scale. Defaults to `lg` (24) —
   * the brief's §4.1 page gutter, which is also M3's medium-window margin.
   */
  padding?: SpaceKey;
  /**
   * Grow the gutter by the device's horizontal safe-area inset. Default
   * `false`, so today's rendering is unchanged.
   *
   * HIG asks every layout to respect the system-defined safe areas, and nothing
   * in this module did. A landscape phone with a notch puts a real inset on the
   * leading edge; without this the first character of every line sits under it.
   *
   * The gutter is paid **on top of** the inset (`gutter + inset`) rather than
   * `max(gutter, inset)`, so content keeps its breathing room against the safe
   * edge instead of being flush with it — the same arithmetic
   * `AuthStickyFooterV4` uses for the bottom inset.
   */
  safeArea?: boolean;
}

/**
 * Gutter classes with the safe-area inset folded in.
 *
 * Written out per key rather than built from a template literal because
 * Tailwind's scanner is static and cannot see an interpolated string — the same
 * reason `_tokens.ts` spells its maps out in full. Every length in here is a
 * `--xen-*` token or the browser's own `env()`; the `0px` is the fallback an
 * `env()` needs so the whole declaration does not drop on a browser without
 * safe-area support, and zero is not a spacing decision.
 */
const SAFE_PX: Record<SpaceKey, string> = {
  xs: 'pl-[calc(var(--xen-space-xs)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-xs)+env(safe-area-inset-right,0px))]',
  sm: 'pl-[calc(var(--xen-space-sm)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-sm)+env(safe-area-inset-right,0px))]',
  md: 'pl-[calc(var(--xen-space-md)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-md)+env(safe-area-inset-right,0px))]',
  lg: 'pl-[calc(var(--xen-space-lg)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-lg)+env(safe-area-inset-right,0px))]',
  xl: 'pl-[calc(var(--xen-space-xl)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-xl)+env(safe-area-inset-right,0px))]',
  '2xl': 'pl-[calc(var(--xen-space-2xl)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-2xl)+env(safe-area-inset-right,0px))]',
};

/**
 * **V4 container** — the web twin of the native `ContainerV4`, the base
 * `Container`'s props plus two, a different design line.
 *
 * This is the page-gutter component and the anchor for the brief's §4.1
 * rhythm: `padding="lg"` (24) is the distance from the screen edge to the
 * content, everywhere, and no other component in `layout` gets to invent one.
 * That default is already right, so V4 does not move it.
 *
 * ## What V4 changes
 *
 * 1. **`maxWidth` can be turned off.** The base types it as `number`, so the
 *    only way out of the 480 cap was to pass a number large enough to be a lie.
 *    `'none'` says what it means, and the doc comment now records that 480 is a
 *    *reading measure* rather than a page width — the reason a dashboard at the
 *    default looks stranded on a tablet.
 * 2. **`safeArea` exists.** See the prop. Off by default, because turning it on
 *    for every existing caller would move their layout.
 *
 * Everything else is the base: `w-full mx-auto`, the gutter off `--xen-space-*`,
 * and the numeric cap as the one layout literal (a caller's own number, not a
 * value this file chose). It paints nothing — no ground, no border, no radius —
 * so there is no state layer, no motion sheet and no depth here. A container
 * that acknowledged a pointer would be a container doing something it is not
 * for.
 *
 * ### Platform divergence
 *
 * None in the props. `safeArea` reads the device insets through
 * `useSafeAreaInsets()` on native and through CSS `env(safe-area-inset-*)` here;
 * both add the inset to the gutter, so the two twins land on the same number on
 * the same device. Documented identically in `src/native/layout/ContainerV4.tsx`.
 */
export const ContainerV4 = React.forwardRef<HTMLDivElement, ContainerV4Props>(
  function ContainerV4(
    { maxWidth = 480, padding = 'lg', safeArea = false, className, style, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-xen-v4-container=""
        className={cn(
          'w-full mx-auto',
          safeArea ? SAFE_PX[padding] : SPACE_PX[padding],
          className
        )}
        style={maxWidth === 'none' ? style : { maxWidth, ...style }}
        {...rest}
      />
    );
  }
);
