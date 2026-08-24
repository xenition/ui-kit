import * as React from 'react';
import type { ContactCardProps } from './ContactCard';
/** V2 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV2Props = ContactCardProps;
/**
 * ContactCard **design V2** — a *centered profile hero*. Where the base is a
 * left-aligned avatar row, V2 stacks a large centered avatar, name and
 * title·company, a centered wrap of tag chips, and a full-width row of quick
 * actions across the footer. Elevated on a token `shadow-md` and lifted on hover.
 * Same props as {@link ContactCard}; empty tag/action arrays render nothing;
 * `loading` shows a skeleton. Token-pure — no literal colors.
 */
export declare const ContactCardV2: React.ForwardRefExoticComponent<ContactCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContactCardV2.d.ts.map