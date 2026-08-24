import * as React from 'react';
import type { SessionCardProps } from './SessionCard';
/** Drop-in replacement for {@link SessionCard} — identical props. */
export type SessionCardV3Props = SessionCardProps;
/**
 * SessionCard — **dense schedule line** alternate design (web / React DOM).
 *
 * The time leads a single compact row, then the title with an inline track
 * badge, a small speaker cluster, a terse `taken/cap` seat count, and the
 * bookmark star at the trailing edge — one or two lines total, no abstract, no
 * meter bar. Sized for a packed agenda list; `highlight` adds a thin primary
 * left rail. Same props as {@link SessionCard} — a drop-in swap. Token-pure.
 */
export declare const SessionCardV3: React.ForwardRefExoticComponent<SessionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionCardV3.d.ts.map