import * as React from 'react';
import type { CountdownProps } from './Countdown';
/** Drop-in for {@link CountdownProps} — same props, the V4 "showcase" design. */
export type CountdownV4Props = CountdownProps;
/**
 * Countdown — **V4** "showcase" design (native mirror of the web V4). Four big
 * extra-bold **tabular-nums** digit tiles (days/hrs/min/sec) seated in
 * **soft-primary wells** (`withAlpha(colors.primary, 0.06)`) with muted
 * uppercase labels — refined and high-impact without a brand gradient. The 1s
 * `setInterval` and `onComplete` fire-once behavior are preserved exactly from
 * the base (the digits are information, not decorative motion, so they keep
 * ticking under reduced motion). Same props/behavior as {@link CountdownProps};
 * token-only colors via `useXenitionTheme()`, dark-mode safe.
 */
export declare function CountdownV4({ to, onComplete, labels, style, }: CountdownV4Props): React.ReactElement;
//# sourceMappingURL=CountdownV4.d.ts.map