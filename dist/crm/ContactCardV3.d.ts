import * as React from 'react';
import type { ContactCardProps } from './ContactCard';
/** V3 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV3Props = ContactCardProps;
/**
 * ContactCard **design V3** — a *compact directory row*: a small avatar, the
 * name with title·company beneath, and (when present) the first tag as a trailing
 * muted chip. No card surface, no action pills — the densest possible list item
 * for an A–Z contacts index. Same props as {@link ContactCard}; a `loading`
 * skeleton is supported. Token-pure — no literal colors.
 */
export declare const ContactCardV3: React.ForwardRefExoticComponent<ContactCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContactCardV3.d.ts.map