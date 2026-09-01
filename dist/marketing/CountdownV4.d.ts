import * as React from 'react';
import type { CountdownProps } from './Countdown';
/** Drop-in for {@link CountdownProps} — same props, the V4 "showcase" design. */
export type CountdownV4Props = CountdownProps;
/**
 * Countdown — **V4** "showcase" design (web parity of the native V4). Four big
 * extra-bold **tabular-nums** digit tiles (days/hrs/min/sec) seated in
 * **soft-primary wells** with muted uppercase labels — refined and high-impact
 * without a brand gradient. The 1s interval and `onComplete` fire-once behavior
 * are preserved exactly from the base; only the skin changes. Same
 * props/behavior as {@link CountdownProps}; every color is a `--xen-*` token
 * (`bg-primary-50`, `text-primary`, `text-muted`) — no literals.
 */
export declare const CountdownV4: React.ForwardRefExoticComponent<CountdownProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CountdownV4.d.ts.map