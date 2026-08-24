import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SymptomOption {
    /** Stable identifier returned through `onChange`. */
    id: string;
    /** Human-readable symptom name. */
    label: string;
    /** Optional leading glyph/emoji. */
    glyph?: string;
}
export interface SymptomSelectorProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A multi-select symptom chip grid for intake / triage flows: tap to toggle
 * each symptom on or off. Fully controlled — `value` is the list of selected
 * ids and `onChange` receives the next list. Selected chips are marked with a
 * check glyph as well as a filled tone so selection never relies on color
 * alone. Renders an empty note when there are no options. Informational UI only
 * — not a medical device. Token-only colors.
 */
export declare function SymptomSelector({ options, value, onChange, title, emptyLabel, style, }: SymptomSelectorProps): React.ReactElement;
//# sourceMappingURL=SymptomSelector.d.ts.map