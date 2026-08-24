import * as React from 'react';
import type { TechnicianCardProps } from './TechnicianCard';
/**
 * Alternate design (v3) of {@link TechnicianCard} — a drop-in with the **same
 * props**. The *compact roster row*: a small avatar with a token-bound presence
 * dot, the name + role / jobs-today collapsed onto a meta line, an availability
 * badge, and trailing **Call / Assign** icon-taps. Bordered surface, no card
 * shadow. Availability is a text + glyph badge — never color alone. No literal
 * colors.
 */
export type TechnicianCardV3Props = TechnicianCardProps;
export declare const TechnicianCardV3: React.ForwardRefExoticComponent<TechnicianCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TechnicianCardV3.d.ts.map