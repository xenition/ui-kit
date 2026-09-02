import * as React from 'react';
import type { EnrollButtonProps } from './EnrollButton';
/** Drop-in for {@link EnrollButtonProps} — same props, the V4 "campus" design. */
export type EnrollButtonV4Props = EnrollButtonProps;
/**
 * EnrollButton — **V4** "campus" design (web parity of the native V4). The
 * course enrollment CTA built on the primitive `Button`, mapping the enrollment
 * lifecycle to appearance: `idle` → primary CTA, `enrolling` → disabled
 * "Enrolling…", `enrolled` → a soft-success confirmation pill with a ✓ (not
 * pressable), `full` → a disabled "Class full". State is announced and carried by
 * a word + glyph, never color alone. Identical props/behavior to
 * {@link EnrollButtonProps}. All colors from `--xen-*` token classes (no literals).
 */
export declare function EnrollButtonV4({ state, label, price, onEnroll, block, className, }: EnrollButtonV4Props): React.ReactElement;
//# sourceMappingURL=EnrollButtonV4.d.ts.map