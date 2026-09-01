import * as React from 'react';
import type { StatBarProps, StatProps } from './StatBar';
/** Drop-in for {@link StatBarProps} — same props, the V4 "showcase" design. */
export type StatBarV4Props = StatBarProps;
/** Drop-in for {@link StatProps} — same props, the V4 "showcase" design. */
export type StatV4Props = StatProps;
/**
 * StatBar — **V4** "showcase" design (web parity of the native V4). A content
 * section, so NOT a gradient surface: a centered, wrapping row of `StatV4`s on
 * the page ground with generous 8-pt gutters. Same props/behavior as
 * {@link StatBarProps}; token-only colors, no literals.
 */
export declare const StatBarV4: React.ForwardRefExoticComponent<StatBarProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Stat — **V4** "showcase" design (web parity of the native V4). One statistic:
 * a big extra-bold **tabular-nums** numeral (an `AnimatedCounter` with
 * prefix/suffix that counts up as it scrolls into view) over a muted label. Same
 * props/behavior as {@link StatProps}; token-only colors, no literals.
 */
export declare const StatV4: React.ForwardRefExoticComponent<StatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatBarV4.d.ts.map