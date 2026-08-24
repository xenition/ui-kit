import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CodeBlockProps {
    /** Source text to render verbatim in a monospace face. */
    code: string;
    /** Language label shown in the header (display only — no highlighting). */
    language?: string;
    /** Show a left gutter of line numbers (default true). */
    lineNumbers?: boolean;
    /**
     * Fires when the copy button is pressed with the full `code` string. Clipboard
     * writing is left to the host app (the kit takes no clipboard dependency).
     * Omit to hide the copy button.
     */
    onCopy?: (code: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Monospace code surface with an optional header (language label + copy button)
 * and an optional line-number gutter. Horizontally scrollable for long lines.
 * `fontFamily: 'monospace'` is a font family, not a color. All colors, radii and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
export declare function CodeBlock({ code, language, lineNumbers, onCopy, style, }: CodeBlockProps): React.ReactElement;
//# sourceMappingURL=CodeBlock.d.ts.map