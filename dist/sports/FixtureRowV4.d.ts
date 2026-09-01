import * as React from 'react';
import type { FixtureRowProps } from './FixtureRow';
/** Drop-in for {@link FixtureRowProps} — same props, the V4 "broadcast" design. */
export type FixtureRowV4Props = FixtureRowProps;
/**
 * FixtureRow — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a fixture line: a clean, elevated row with teams flanking a
 * bold center scoreline / kickoff, and a soft-tint status pill (a pulsing
 * `danger` dot reinforces "LIVE" — never color alone). One accent: `primary`.
 * Same props/behavior as {@link FixtureRowProps} (drop-in); all colors from
 * `--xen-*` token classes (no literals). Activated via `onClick`.
 */
export declare const FixtureRowV4: React.ForwardRefExoticComponent<FixtureRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FixtureRowV4.d.ts.map