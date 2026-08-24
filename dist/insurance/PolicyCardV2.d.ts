import * as React from 'react';
import type { PolicyCardProps } from './PolicyCard';
/** Same public contract as {@link PolicyCard} — a drop-in alternate design. */
export type PolicyCardV2Props = PolicyCardProps;
/**
 * PolicyCard, redesigned (**V2**) — an **elevated hero card**. A large tinted
 * glyph tile anchors the top row beside the plan name and a status pill; a
 * full-width tinted **coverage band** makes the benefit amount the visual
 * anchor, with the premium and renewal as a quiet footer. Status is conveyed by
 * glyph + text + color (never color-alone); coverage/premium stay integer cents
 * via `formatMoney`. Becomes a keyboard-operable button only when `onClick` is
 * set. Same `PolicyCardProps`; drops in for `PolicyCard`. Token-pure.
 */
export declare const PolicyCardV2: React.ForwardRefExoticComponent<PolicyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PolicyCardV2.d.ts.map