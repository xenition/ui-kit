import * as React from 'react';
import type { ContactCardProps } from './ContactCard';
/** V3 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV3Props = ContactCardProps;
/**
 * ContactCard **design V3** — a *compact directory row*: small avatar, name with
 * title·company beneath, and (when present) the first tag as a trailing muted
 * chip. No card surface, no action pills — the densest possible list item for an
 * A–Z contacts index. Same props as {@link ContactCard}; a `loading` skeleton is
 * supported. Token-pure.
 */
export declare function ContactCardV3({ name, title, company, avatarUrl, tags, loading, onPress, testID, style, }: ContactCardV3Props): React.ReactElement;
//# sourceMappingURL=ContactCardV3.d.ts.map