import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SignaturePadProps {
    /** Prompt shown above the signing area (e.g. "Customer signature"). */
    label?: string;
    /**
     * Controlled captured state. When `true` the pad shows the captured
     * signature summary instead of the prompt. The kit ships no drawing canvas
     * (that needs a native gesture/SVG dependency), so this is a dep-free
     * capture-state placeholder: it records *that* a signature was taken and by
     * whom, and the host app supplies the real capture surface if needed.
     */
    signed?: boolean;
    /** Name of the signer, shown once captured. */
    signerName?: string;
    /** Localized capture timestamp, shown once captured. */
    signedAt?: string;
    /** Fires when the empty pad is tapped to capture a signature. */
    onSign?: () => void;
    /** Fires when the Clear action is pressed on a captured signature. */
    onClear?: () => void;
    /** Disables interaction. */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A signature capture block. Because the kit adds no native drawing
 * dependency, this is a dependency-free capture-state surface: an empty state
 * (a dashed baseline + "Tap to sign" prompt that fires `onSign`) and a captured
 * state (the signer name over a baseline, a timestamp, and a Clear action that
 * fires `onClear`). Capture is conveyed by text + a check glyph, not color
 * alone. All colors trace to tokens or a token-derived tint — no literals.
 */
export declare function SignaturePad({ label, signed, signerName, signedAt, onSign, onClear, disabled, style, }: SignaturePadProps): React.ReactElement;
//# sourceMappingURL=SignaturePad.d.ts.map