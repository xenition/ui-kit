import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One face on the scale: the glyph and its spoken meaning. */
export interface EmojiOption {
    /** The emoji glyph to render (e.g. `'🙂'`). */
    emoji: string;
    /** Spoken/visible label for the face (e.g. `'Good'`). Carries the meaning so it's never color-only. */
    label: string;
}
/** Default 5-face satisfaction set, Terrible → Great. */
export declare const DEFAULT_EMOJI_OPTIONS: readonly EmojiOption[];
export interface EmojiScaleProps {
    /** Selected option index. `null`/`undefined` → nothing selected. */
    value?: number | null;
    /** Fires with the chosen option index (0-based). */
    onChange: (value: number) => void;
    /** The faces to show. Default {@link DEFAULT_EMOJI_OPTIONS} (a 5-face set). */
    options?: readonly EmojiOption[];
    /** Accessible name for the group. Default `'Satisfaction'`. */
    accessibilityLabel?: string;
    /** Non-interactive + dimmed when `true`. Default `false`. */
    disabled?: boolean;
    /** Extra style on the root. */
    style?: StyleProp<ViewStyle>;
}
/**
 * EmojiScale — **V4** "clean form / focus" emoji-face satisfaction picker. A row
 * of big emoji buttons on a calm neutral surface; the selected face gets the
 * single signature accent — a `primary` ring plus a soft `primary` tint
 * (`withAlpha`) — and scales up slightly, with its label shown beneath the row.
 * The face label carries the meaning so selection is never conveyed by color
 * alone. Exposed as a `radiogroup` of `radio`s with spoken labels. Controlled
 * via `value` + `onChange`; token-only colors via `useXenitionTheme()`.
 */
export declare function EmojiScale({ value, onChange, options, accessibilityLabel, disabled, style, }: EmojiScaleProps): React.ReactElement;
//# sourceMappingURL=EmojiScale.d.ts.map