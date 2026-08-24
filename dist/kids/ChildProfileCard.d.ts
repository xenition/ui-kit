import * as React from 'react';
/** Today's mood — shown as an emoji glyph + word (never color alone). */
export type ChildMood = 'happy' | 'excited' | 'calm' | 'sad' | 'tired' | 'sick';
export interface ChildProfileCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Child's name. */
    name: string;
    /** Photo URL for the avatar; falls back to initials. */
    photoUrl?: string;
    /** Age label already formatted, e.g. "6 yrs" or "18 mo". */
    age?: string;
    /** School grade / class, e.g. "Grade 1". */
    grade?: string;
    /** Birthday label, e.g. "May 4". */
    birthday?: string;
    /** Today's mood; shown as an emoji chip (glyph + word, never color alone). */
    mood?: ChildMood;
    /** Interests / hobbies shown as soft chips. */
    interests?: string[];
    /** Loading placeholder state. */
    loading?: boolean;
    /** Fires when the card is activated. */
    onClick?: () => void;
}
/**
 * Header card for a single child: avatar/photo, name, an age·grade line, an
 * optional mood chip, and a wrapped strip of interest chips. When `onClick` is
 * set the card is an accessible `role="button"` with keyboard activation;
 * renders a muted skeleton while `loading`. Token-bound throughout — no literal
 * colors.
 */
export declare const ChildProfileCard: React.ForwardRefExoticComponent<ChildProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChildProfileCard.d.ts.map