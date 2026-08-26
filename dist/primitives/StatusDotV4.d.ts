import * as React from 'react';
import type { StatusDotProps, StatusDotTone } from './StatusDot';
export type { StatusDotProps as StatusDotV4Props, StatusDotTone };
/**
 * **V4 status dot** — the web twin of the native `StatusDotV4`, same props as
 * {@link StatusDot}, a different design line.
 *
 * ## A mark this small has to be legible
 *
 * The base painted `var(--xen-{tone})` — the raw fill slot. That is the correct
 * colour to put text ON and the wrong colour to draw an eight-pixel mark IN:
 * `warn` on a light page measures barely above the background for many seeds,
 * and the "live" indicator quietly disappears. V4 takes the compiler's
 * contrast-safe `*-text` form of the same hue.
 *
 * `design.md` §35.4 is what makes this a correctness issue rather than a taste
 * one: the dot's colour *is* its meaning. A green dot that cannot be
 * distinguished from an amber one at a glance has not said anything.
 *
 * ## The echo says "live", so it is allowed to loop
 *
 * §36.1 asks motion to be functional and §36.13 warns that a permanent
 * animation is a permanent cost. This one earns it narrowly: an expanding echo
 * is how a dot says *now*, and a static dot only says *is*. It stays cheap —
 * scale and opacity, both compositor properties — it can be switched off per
 * instance with `pulse={false}`, and `prefers-reduced-motion` removes it
 * everywhere.
 */
export declare const StatusDotV4: React.ForwardRefExoticComponent<StatusDotProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusDotV4.d.ts.map