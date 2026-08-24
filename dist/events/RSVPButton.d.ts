import * as React from 'react';
/** The three RSVP states. */
export type RSVPStatus = 'going' | 'maybe' | 'declined';
export type RSVPButtonSize = 'sm' | 'md';
export interface RSVPButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The current selection, or `null`/`undefined` when unanswered. */
    value?: RSVPStatus | null;
    /** Fires with the tapped status (tapping the active one keeps it selected). */
    onChange?: (status: RSVPStatus) => void;
    /** Control size. */
    size?: RSVPButtonSize;
    /** Disable the whole control. */
    disabled?: boolean;
}
/**
 * Segmented RSVP control with `going` / `maybe` / `declined` states. The
 * selected state is communicated three ways — a filled token background, a
 * distinct glyph (✓ / ? / ✕), and `aria-checked` on a `radiogroup` — so it is
 * never conveyed by color alone (WCAG 1.4.1). `onChange` is renamed from the DOM
 * `onChange` and reports the chosen status. Colors come from the `--xen-*`
 * tokens; no literal colors.
 */
export declare const RSVPButton: React.ForwardRefExoticComponent<RSVPButtonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RSVPButton.d.ts.map