import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type DocumentKind, type DocumentStatus } from './internal';
export type DocumentRowVariant = 'default' | 'compact';
export interface DocumentRowProps {
    /** Document title / filename. */
    title: string;
    /** Document kind — drives the leading glyph. */
    kind?: DocumentKind;
    /** Lifecycle state — glyph + word pill, never color alone. */
    status?: DocumentStatus;
    /** Pre-formatted last-modified label. */
    modified?: string;
    /** Version label (e.g. "v3"). */
    version?: string;
    /** File size label (e.g. "1.2 MB"). */
    size?: string;
    /** Author / owner. */
    author?: string;
    /** Density. */
    variant?: DocumentRowVariant;
    /** Tap handler (open / preview the document). */
    onPress?: () => void;
    /** Optional download affordance. */
    onDownload?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One document in a matter's file: kind glyph, title, and a status pill (glyph +
 * word so state never rests on color alone), plus optional version / size /
 * modified metadata. `compact` collapses the metadata line. An optional
 * `onDownload` renders a trailing action. All colors are theme tokens — no
 * literals.
 */
export declare function DocumentRow({ title, kind, status, modified, version, size, author, variant, onPress, onDownload, testID, style, }: DocumentRowProps): React.ReactElement;
//# sourceMappingURL=DocumentRow.d.ts.map