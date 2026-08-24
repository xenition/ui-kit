import * as React from 'react';
export type ProfilePromptVariant = 'card' | 'quote' | 'plain';
export interface ProfilePromptProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The prompt question (e.g. "A perfect Sunday is…"). */
    prompt: string;
    /** The person's answer. When absent, the placeholder/empty copy shows. */
    answer?: string;
    /** Presentation. Defaults to `card`. */
    variant?: ProfilePromptVariant;
    /** Optional glyph beside the prompt. */
    glyph?: string;
    /** Show a like affordance on the answer (dating "like this prompt"). */
    liked?: boolean;
    /** Fires when the whole prompt is clicked (e.g. to like/comment). */
    onClick?: () => void;
    /** Fires the heart affordance. Rendering it requires this handler. */
    onLike?: () => void;
    /** Copy when there is no answer yet. */
    emptyLabel?: string;
}
/**
 * A profile prompt + answer block — the web parity of a dating "prompt" card
 * ("My simple pleasures → …"). The prompt is styled quietly, the answer is the
 * emphasis. The optional like affordance is a real `<button>` whose pressed state
 * is surfaced via `aria-pressed`, not color. When `onClick` is set the whole block
 * becomes a keyboard-operable `role="button"` container so the nested like button
 * stays independently focusable. Token classes only — graceful empty state when
 * the answer is missing.
 */
export declare const ProfilePrompt: React.ForwardRefExoticComponent<ProfilePromptProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfilePrompt.d.ts.map