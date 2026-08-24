import * as React from 'react';
export interface LoadingOverlayProps {
    /** When false the overlay renders nothing. */
    visible: boolean;
    /** Optional label beneath the spinner. */
    label?: string;
    className?: string;
}
/**
 * Blocking loading overlay — an absolute-fill dim layer with a centered spinner
 * (from the `primary` token) and an optional label card. The dim is a faded
 * neutral scrim; the label card is `surface`. Fills its nearest positioned
 * ancestor, so wrap it in a `relative` parent (or let it cover the screen).
 * Announces a polite busy live region. No literal colors.
 */
export declare function LoadingOverlay({ visible, label, className, }: LoadingOverlayProps): React.ReactElement | null;
//# sourceMappingURL=LoadingOverlay.d.ts.map