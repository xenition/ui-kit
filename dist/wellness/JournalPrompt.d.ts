import * as React from 'react';
export type JournalCategory = 'reflection' | 'gratitude' | 'intention' | 'growth' | 'emotion';
export interface JournalPromptProps {
    /** The reflective prompt / question. */
    prompt: string;
    /** Category — drives the icon, tag, and accent tone. Default `'reflection'`. */
    category?: JournalCategory;
    /** The user's saved response, if any (rendered as a preview). */
    response?: string;
    /** Whether the prompt has been answered (shows a done affordance). */
    answered?: boolean;
    /** Fires when the write / continue action is tapped. */
    onWrite?: () => void;
    /** Fires when the shuffle control is tapped (omit to hide it). */
    onShuffle?: () => void;
    /** Write button label. Defaults to "Write" (or "Continue" when answered). */
    writeLabel?: string;
    className?: string;
}
/**
 * A journaling prompt card (web parity of the native block): a category-tinted
 * header, the prompt itself, an optional saved-response preview, and a write /
 * continue action with an optional shuffle control for a fresh prompt.
 * `answered` adds a "✓ Done" marker and flips the CTA to continue (state via
 * marker + label, not color alone). Token-only colors.
 */
export declare const JournalPrompt: React.ForwardRefExoticComponent<JournalPromptProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JournalPrompt.d.ts.map