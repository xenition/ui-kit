import * as React from 'react';
import type { TechnicianCardProps } from './TechnicianCard';
/**
 * Alternate design (v3) of {@link TechnicianCard} — a drop-in with the **same
 * props**. The *compact roster row*: a small avatar with a presence dot, the
 * name + role stacked, an availability badge, and trailing **Call / Assign**
 * icon-taps. Availability is a text + glyph badge (never color alone).
 * Token-pure.
 */
export type TechnicianCardV3Props = TechnicianCardProps;
export declare function TechnicianCardV3({ name, role, status, avatarUrl, jobsToday, phone, onCall, onAssign, style, }: TechnicianCardV3Props): React.ReactElement;
//# sourceMappingURL=TechnicianCardV3.d.ts.map