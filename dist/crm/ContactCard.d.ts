import * as React from 'react';
export type ContactCardVariant = 'default' | 'compact';
export interface ContactAction {
    key: string;
    /** Glyph shown on the pill (e.g. `📞`, `✉`). */
    glyph: string;
    /** Accessible label (e.g. "Call"). */
    label: string;
    onClick: () => void;
}
export interface ContactCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Full name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Company / account. */
    company?: string;
    /** Avatar image URL; initials of `name` are the fallback. */
    avatarUrl?: string;
    /** Free-form labels (segments, interests). */
    tags?: string[];
    /** Quick-action pills (call / email / …). */
    actions?: ContactAction[];
    variant?: ContactCardVariant;
    /** Skeleton placeholder while data loads. */
    loading?: boolean;
    /** Click handler for the card body (renders as a keyboard-accessible button). */
    onClick?: () => void;
}
/**
 * Profile card for a CRM contact: avatar, name, title, company, tag chips and a
 * row of quick-action pills (call / email / etc — caller-supplied glyph +
 * handler). `compact` hides tags and actions for list rows. Guards empty
 * `tags`/`actions` arrays (renders nothing) and offers a `loading` skeleton.
 * When `onClick` is set the body becomes a `role="button"` div with Enter/Space
 * activation. All colors are `--xen-*` token classes.
 */
export declare const ContactCard: React.ForwardRefExoticComponent<ContactCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContactCard.d.ts.map