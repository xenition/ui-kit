import * as React from 'react';
import type { ContactCardProps } from './ContactCard';
/** V2 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV2Props = ContactCardProps;
/**
 * ContactCard **design V2** — a *centered profile card*. Where the original is a
 * left-aligned avatar row, V2 stacks a large centered avatar, name and
 * title·company, a centered wrap of tag chips, and a full-width row of quick
 * actions across the footer — a proper contact "hero". Elevated on a token
 * shadow. Same props as {@link ContactCard}; empty tag/action arrays render
 * nothing; `loading` shows a skeleton. Token-pure.
 */
export declare function ContactCardV2({ name, title, company, avatarUrl, tags, actions, variant, loading, onPress, testID, style, }: ContactCardV2Props): React.ReactElement;
//# sourceMappingURL=ContactCardV2.d.ts.map