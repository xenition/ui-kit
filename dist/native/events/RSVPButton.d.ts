import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The three RSVP states plus `null` for "no response yet". */
export type RSVPStatus = 'going' | 'maybe' | 'declined';
export type RSVPButtonSize = 'sm' | 'md';
export interface RSVPButtonProps {
    /** The current selection, or `null`/`undefined` when unanswered. */
    value?: RSVPStatus | null;
    /** Fires with the tapped status (tapping the active one keeps it selected). */
    onChange?: (status: RSVPStatus) => void;
    /** Control size. */
    size?: RSVPButtonSize;
    /** Disable the whole control. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Segmented RSVP control with `going` / `maybe` / `declined` states. The
 * selected state is communicated three ways — a filled background, a distinct
 * glyph (✓ / ? / ✕), and `accessibilityState.selected` — so it is never
 * conveyed by color alone (WCAG 1.4.1). Colors come from the compiled theme
 * tokens; no literal colors.
 */
export declare function RSVPButton({ value, onChange, size, disabled, style, }: RSVPButtonProps): React.ReactElement;
//# sourceMappingURL=RSVPButton.d.ts.map