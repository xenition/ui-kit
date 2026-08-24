import * as React from 'react';
/** Family role. Drives the role chip. */
export type FamilyRole = 'parent' | 'guardian' | 'child' | 'sibling' | 'grandparent' | 'caregiver' | 'other';
export interface FamilyMemberRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Member's name. */
    name: string;
    /** Family role; drives the role chip. */
    role?: FamilyRole;
    /** Photo URL for the avatar; falls back to initials. */
    photoUrl?: string;
    /** Relationship detail line, e.g. "Mom" or "Age 8". */
    relationLabel?: string;
    /** Presence — shown as an online/offline dot + text (not color alone). */
    online?: boolean;
    /** Fires when the row is activated. */
    onClick?: () => void;
}
/**
 * A roster row for a family member: avatar, name, an optional relationship line,
 * a role chip, and an optional presence indicator (dot + "Online"/"Offline"
 * text, never color alone). When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Token-bound throughout — no literal
 * colors.
 */
export declare const FamilyMemberRow: React.ForwardRefExoticComponent<FamilyMemberRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FamilyMemberRow.d.ts.map