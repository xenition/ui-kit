import * as React from 'react';
import type { LockControlProps } from './LockControl';
/** Drop-in for {@link LockControlProps} — same props, the V4 "ambient" design. */
export type LockControlV4Props = LockControlProps;
/**
 * LockControl — **V4** "ambient" design. A calm control-panel lock: a **big state
 * glyph sits in a state-tinted disc** — `locked` takes the primary slot,
 * `unlocked` glows softly (warn wash + shadow) so an open lock reads at a glance,
 * `jammed`→danger, `offline`→muted. A status {@link Badge} + optional low-battery
 * hint keep the meaning textual (never color alone), over a single big
 * lock/unlock {@link Button} (≥44px). The action flips between "Lock"/"Unlock",
 * is danger-toned when unlocking, and is disabled when `offline`/`jammed` or
 * `busy` (which also shows a spinner). Same props/behavior as
 * {@link LockControlProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`.
 */
export declare function LockControlV4({ name, state, batteryPct, onToggle, busy, style, }: LockControlV4Props): React.ReactElement;
//# sourceMappingURL=LockControlV4.d.ts.map