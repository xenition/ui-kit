import * as React from 'react';
import type { TechnicianCardProps } from './TechnicianCard';
/**
 * Alternate design (v2) of {@link TechnicianCard} — a drop-in with the **same
 * props**. Where the original is a left-aligned roster row, V2 is a *centered
 * profile card*: an elevated surface, a large **ringed avatar** with a presence
 * dot, the name / role stacked centrally, an availability badge, centered skill
 * chips, a jobs-today stat, and full-width **Call / Assign** actions.
 * Availability is a text + glyph badge (never color alone). Token-pure.
 */
export type TechnicianCardV2Props = TechnicianCardProps;
export declare function TechnicianCardV2({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, style, }: TechnicianCardV2Props): React.ReactElement;
//# sourceMappingURL=TechnicianCardV2.d.ts.map