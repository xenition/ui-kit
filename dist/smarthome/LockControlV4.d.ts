import * as React from 'react';
import type { LockControlProps } from './LockControl';
/** Drop-in for {@link LockControlProps} — same props, the V4 "ambient" design. */
export type LockControlV4Props = LockControlProps;
/**
 * LockControl — **V4** "ambient" design (web parity of the native V4). A calm
 * control-panel lock: a **big state glyph sits in a state-tinted disc** — `locked`
 * takes the primary slot, `unlocked` glows softly (warn wash + shadow) so an open
 * lock reads at a glance, `jammed`→danger, `offline`→muted. A status {@link Badge}
 * + optional low-battery hint keep the meaning textual (never color alone), over a
 * single big lock/unlock {@link Button} (≥44px, full width). The action flips
 * between "Lock"/"Unlock", uses the `danger` variant when unlocking, and is
 * disabled when `offline`/`jammed` or `busy` (the web {@link Button} has no
 * `loading`, so busy maps to disabled + a "Working…" label). Same props/behavior
 * as {@link LockControlProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export declare const LockControlV4: React.ForwardRefExoticComponent<LockControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LockControlV4.d.ts.map