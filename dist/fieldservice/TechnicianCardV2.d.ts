import * as React from 'react';
import type { TechnicianCardProps } from './TechnicianCard';
/**
 * Alternate design (v2) of {@link TechnicianCard} — a drop-in with the **same
 * props**. Where the base is a left-aligned roster row, V2 is a *centered
 * profile card*: an elevated surface, a large **ringed avatar** with a presence
 * dot, name / role stacked centrally, an availability badge, a jobs-today stat,
 * centered skill chips, and full-width **Call / Assign** actions. Availability
 * is a text + glyph badge — never color alone. No literal colors.
 */
export type TechnicianCardV2Props = TechnicianCardProps;
export declare const TechnicianCardV2: React.ForwardRefExoticComponent<TechnicianCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TechnicianCardV2.d.ts.map