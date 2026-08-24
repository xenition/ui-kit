import * as React from 'react';
export interface GratitudeItem {
    /** Stable id. */
    id: string;
    /** The gratitude text. */
    text: string;
}
export interface GratitudeEntryProps {
    /** Heading prompt. Default "What are you grateful for?". */
    prompt?: string;
    /** Controlled draft text. */
    value?: string;
    /** Placeholder for the input. */
    placeholder?: string;
    /** Already-recorded entries (rendered as a chip list above the input). */
    entries?: GratitudeItem[];
    /** Max characters allowed; shows a live counter when set. */
    maxLength?: number;
    /** Fires as the draft changes. */
    onChangeText?: (text: string) => void;
    /** Fires with the trimmed draft when submitted. */
    onSubmit?: (text: string) => void;
    /** Fires when an existing entry's remove control is tapped. */
    onRemove?: (id: string) => void;
    /** Submit button label. Default "Add". */
    submitLabel?: string;
    /** Empty-list note. Default "No entries yet — add your first.". */
    emptyLabel?: string;
    className?: string;
}
/**
 * A gratitude journal entry block (web parity of the native block): a prompt,
 * any existing entries as removable chips (or an empty note), a multi-line input
 * with an optional character counter, and a submit action disabled until the
 * draft is non-empty. `onSubmit` receives the trimmed text. Token-only colors.
 */
export declare const GratitudeEntry: React.ForwardRefExoticComponent<GratitudeEntryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GratitudeEntry.d.ts.map