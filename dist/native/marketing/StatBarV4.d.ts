import * as React from 'react';
import type { StatBarProps, StatItem } from './StatBar';
/** Drop-in for {@link StatBarProps} — same props, the V4 "showcase" design. */
export type StatBarV4Props = StatBarProps;
/** Drop-in for {@link StatItem} — same props, the V4 "showcase" design. */
export type StatV4Props = StatItem;
/**
 * Stat — **V4** "showcase" design (native mirror of the web V4). One statistic:
 * a big extra-bold **tabular-nums** numeral that counts up over a muted label.
 * NOT a gradient surface — clean numerals on the page ground. As on the base,
 * native has no IntersectionObserver, so the count-up runs once on mount via
 * `Animated.timing`. Same props/behavior as the base `StatItem`. Token-only.
 */
export declare function StatV4({ value, to, label, prefix, suffix, duration, format, }: StatV4Props): React.ReactElement;
/**
 * StatBar — **V4** "showcase" design (native mirror of the web V4). A content
 * section: a centered, wrapping row of `StatV4`s. Mirrors the web V4; native
 * takes the base's `stats` data array. Same props/behavior as
 * {@link StatBarProps}. Token-only colors, no literals.
 */
export declare function StatBarV4({ stats, style }: StatBarV4Props): React.ReactElement;
//# sourceMappingURL=StatBarV4.d.ts.map