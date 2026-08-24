import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A journaling prompt card: a category-tinted header, the prompt itself, an
 * optional saved-response preview, and a write / continue action with an
 * optional shuffle control for a fresh prompt. `answered` adds a "done" marker
 * and flips the CTA to continue (state via marker + label, not color alone).
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
export declare function JournalPrompt({ prompt, category, response, answered, onWrite, onShuffle, writeLabel, style, }: JournalPromptProps): React.ReactElement;
//# sourceMappingURL=JournalPrompt.d.ts.map