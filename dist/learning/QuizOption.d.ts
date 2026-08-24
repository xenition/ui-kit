import * as React from 'react';
/**
 * Answer-review state. `correct`/`incorrect` are surfaced with an explicit glyph
 * and text — never color alone — so they're distinguishable without color vision.
 */
export type QuizOptionState = 'default' | 'selected' | 'correct' | 'incorrect';
export interface QuizOptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** The answer text. */
    label: string;
    /** Optional lead-in marker, e.g. "A". */
    marker?: string;
    /** Review/selection state. */
    state?: QuizOptionState;
    /** Whether this option is currently the chosen one (drives the radio a11y state). */
    selected?: boolean;
    disabled?: boolean;
    /** Fires when the option is chosen. */
    onSelect?: () => void;
}
/**
 * A single selectable quiz answer, rendered as an accessibility `radio`.
 * Correct/incorrect states carry an explicit glyph (`✓` / `✕`) and spoken
 * suffix so they never rely on color alone. Activates on click and on
 * Enter/Space. Token-only colors (`--xen-*`).
 */
export declare const QuizOption: React.ForwardRefExoticComponent<QuizOptionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuizOption.d.ts.map