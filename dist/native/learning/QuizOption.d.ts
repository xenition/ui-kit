import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * Answer-review state. `correct`/`incorrect` are surfaced with an explicit glyph
 * and text — never color alone — so they're distinguishable without color vision.
 */
export type QuizOptionState = 'default' | 'selected' | 'correct' | 'incorrect';
export interface QuizOptionProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A single selectable quiz answer, rendered as an accessibility `radio`.
 * Correct/incorrect states carry an explicit glyph (`✓` / `✕`) and spoken
 * suffix so they never rely on color alone. Token-only colors.
 */
export declare function QuizOption({ label, marker, state, selected, disabled, onSelect, style, }: QuizOptionProps): React.ReactElement;
//# sourceMappingURL=QuizOption.d.ts.map