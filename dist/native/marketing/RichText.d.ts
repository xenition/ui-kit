import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface RichTextProps {
    /** Trusted CMS body HTML (e.g. a cms page's `bodyHtml`). */
    html: string;
    /** Optional container style override. */
    style?: StyleProp<ViewStyle>;
}
type Block = {
    kind: 'heading';
    level: number;
    text: string;
} | {
    kind: 'paragraph';
    text: string;
} | {
    kind: 'listitem';
    text: string;
} | {
    kind: 'quote';
    text: string;
};
/**
 * Parse trusted CMS HTML into ordered blocks — headings, paragraphs, list items
 * and blockquotes — preserving document order. Anything outside a recognised
 * block tag (bare inline/plain text) is captured as a trailing paragraph.
 */
export declare function parseRichText(html: string): Block[];
/**
 * The native mirror of the web pattern of rendering a trusted CMS `bodyHtml`
 * (which the web does via `dangerouslySetInnerHTML`). React Native has no DOM,
 * so this dependency-free reader parses the HTML into ordered blocks and renders
 * each as a token-styled `Text`: headings larger/bold, list items with a bullet,
 * blockquotes muted/indented, paragraphs as body copy. Bold/links collapse to
 * their text. Token-only — colors + spacing from the active theme. For trusted,
 * seed-authored content only (it does not sanitise).
 */
export declare function RichText({ html, style }: RichTextProps): React.JSX.Element;
export {};
//# sourceMappingURL=RichText.d.ts.map