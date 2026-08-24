import * as React from 'react';
export interface SymptomOption {
    /** Stable identifier returned through `onChange`. */
    id: string;
    /** Human-readable symptom name. */
    label: string;
    /** Optional leading glyph/emoji. */
    glyph?: string;
}
export interface SymptomSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The selectable symptoms. */
    options: SymptomOption[];
    /** Currently selected symptom ids (controlled). */
    value: string[];
    /** Fires with the next full selection when a chip is toggled. */
    onChange: (next: string[]) => void;
    /** Optional heading above the chips. */
    title?: string;
    /** Message shown when `options` is empty. */
    emptyLabel?: string;
}
/**
 * A multi-select symptom chip grid for intake / triage flows — the web mirror
 * of the native `SymptomSelector`. Tap a chip to toggle a symptom on/off. Fully
 * controlled: `value` is the list of selected ids and `onChange` receives the
 * next list. Selected chips are marked with a check glyph as well as a filled
 * tone, so selection never relies on color alone. Each chip is a
 * `role="checkbox"` button (keyboard + `aria-checked`). Renders an empty note
 * when there are no options. Token-only colors. Informational UI only — not a
 * medical device.
 */
export declare const SymptomSelector: React.ForwardRefExoticComponent<SymptomSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SymptomSelector.d.ts.map