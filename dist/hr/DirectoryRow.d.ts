import * as React from 'react';
import { type Presence } from './internal';
export type DirectoryRowVariant = 'default' | 'compact';
export interface DirectoryRowProps {
    /** Person's name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Department / team. */
    department?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Work email — shown on the default variant. */
    email?: string;
    /** Phone / extension — shown on the default variant. */
    phone?: string;
    /** Live presence — shown as a glyph + word, never color alone. */
    presence?: Presence;
    /** Density. `compact` drops the contact meta. */
    variant?: DirectoryRowVariant;
    /** Click handler for the row (web parity of native `onPress`). */
    onClick?: () => void;
    /** Trailing quick-action (a message icon button). */
    onMessage?: () => void;
    className?: string;
}
/**
 * Dense people-directory row: avatar, name, title / department, and contact meta
 * (email / phone). Presence is conveyed by a glyph + word so it never depends on
 * color alone. `compact` trims to name + title. Optional trailing message
 * affordance renders as a real `<button>`. When `onClick` is set the row becomes
 * a keyboard-operable `role="button"`. All colors are `--xen-*` token classes —
 * no literals. `forwardRef` to the root `<div>`.
 */
export declare const DirectoryRow: React.ForwardRefExoticComponent<DirectoryRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DirectoryRow.d.ts.map