import * as React from 'react';
import type { LightboxThumbProps } from './LightboxThumb';
/** Drop-in for {@link LightboxThumbProps} — same props, the V4 "studio" design. */
export type LightboxThumbV4Props = LightboxThumbProps;
/**
 * LightboxThumb — **V4** "studio" design (web parity of the native V4). A
 * **matted** filmstrip thumbnail — the photo sits inside a thin inset mat ring
 * (`ring-1 ring-inset ring-border`) over a `bg-neutral-100` ground, with **no
 * gradient** (the studio line reserves gradient for the gallery hero). When
 * `active`, the mat ring turns primary and a small `✓` glyph badge appears, so
 * selection is never carried by color alone; it is also reported via
 * `aria-pressed`. Both `sm` (56px) and `md` (80px) sizes are honored and stay
 * ≥44px so a pressable thumb is a valid tap target. Renders a real keyboard-
 * operable `<button>` when `onClick` is set. Identical props/behavior to
 * {@link LightboxThumbProps}; all colors from `--xen-*` token classes.
 */
export declare const LightboxThumbV4: React.ForwardRefExoticComponent<LightboxThumbProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LightboxThumbV4.d.ts.map