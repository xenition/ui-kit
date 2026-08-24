import * as React from 'react';
export interface ProfileField {
    /** Key returned in the values map. */
    id: string;
    /** Field label. */
    label: string;
    /** Placeholder text. */
    placeholder?: string;
    /** Keyboard hint. Default `'default'`. */
    keyboard?: 'default' | 'email-address' | 'phone-pad';
}
export interface ProfileSetupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Display name to seed initials/greeting. */
    name?: string;
    /** Avatar image URL when the user already has one. */
    avatarUri?: string;
    /** Fires when the avatar affordance is clicked (host opens a picker). */
    onEditAvatar?: () => void;
    /** Editable fields (name/bio/etc). Controlled via `values`. */
    fields?: ProfileField[];
    /** Current field values keyed by `ProfileField.id`. */
    values?: Record<string, string>;
    /** Fires with `(id, text)` on each edit. */
    onChangeField?: (id: string, value: string) => void;
    /** Heading. Default `'Set up your profile'`. */
    title?: string;
    /** Save CTA copy. Default `'Save profile'`. */
    saveLabel?: string;
    /** Fires on save. */
    onSave?: () => void;
    /** Save spinner + block. */
    loading?: boolean;
    /** "Skip for now" link copy. Hidden without `onSkip`. */
    skipLabel?: string;
    /** Fires on skip. */
    onSkip?: () => void;
}
/**
 * Profile setup step — an editable avatar plus a token-styled field stack and a
 * save action, with an optional "skip for now" so onboarding never hard-blocks
 * on it (design.md §41). Fully controlled: the host owns `values` and gets
 * `(id, text)` callbacks. Field access is guarded through the `values` map so a
 * missing key renders empty, never crashes. No literal colors.
 */
export declare const ProfileSetup: React.ForwardRefExoticComponent<ProfileSetupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileSetup.d.ts.map