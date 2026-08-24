import * as React from 'react';
import type { PolicyCardProps } from './PolicyCard';
/** Same public contract as {@link PolicyCard} — a drop-in alternate design. */
export type PolicyCardV3Props = PolicyCardProps;
/**
 * PolicyCard, redesigned (**V3**) — a **minimal single line**. A tinted category
 * disc (a decorative hue, reinforced by the glyph and the line label — never
 * color-alone) leads into the plan name and number; the coverage sits quietly on
 * the right, with the policy status shown as a small glyph + label. No card
 * chrome — separation comes from spacing. Becomes a keyboard-operable button
 * only when `onClick` is set. Same `PolicyCardProps`; drops in for dense policy
 * lists. Token-pure.
 */
export declare const PolicyCardV3: React.ForwardRefExoticComponent<PolicyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PolicyCardV3.d.ts.map