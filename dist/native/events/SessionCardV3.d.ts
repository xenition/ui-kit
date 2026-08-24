import * as React from 'react';
import type { SessionCardProps } from './SessionCard';
/**
 * Alternate design (V3) for {@link SessionCard}. Same props — a drop-in swap.
 *
 * A **dense schedule line**: the time leads a single compact row, then the
 * title with an inline track badge, a small speaker cluster, a terse
 * `taken/cap` seat count, and the bookmark star at the trailing edge — one or
 * two lines total, no abstract, no meter bar. Sized for a packed agenda list;
 * `highlight` adds a thin primary left rail. Token-pure.
 */
export type SessionCardV3Props = SessionCardProps;
export declare function SessionCardV3({ title, time, room, track, speakers, capacity, seatsTaken, bookmarked, onBookmark, onPress, variant, style, }: SessionCardV3Props): React.ReactElement;
//# sourceMappingURL=SessionCardV3.d.ts.map