import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LoadingOverlayProps {
    /** When false the overlay renders nothing. */
    visible: boolean;
    /** Optional label beneath the spinner. */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Blocking loading overlay — an absolute-fill dim layer with a centered spinner
 * (tinted from the `primary` token) and an optional label. The dim is the
 * `onSurface` token faded via opacity; the label card is `surface`. Fills its
 * nearest positioned ancestor, so wrap it in a `position: relative` parent (or
 * let it cover the screen). Announces a polite busy live region. No literals.
 */
export declare function LoadingOverlay({ visible, label, style }: LoadingOverlayProps): React.ReactElement | null;
//# sourceMappingURL=LoadingOverlay.d.ts.map