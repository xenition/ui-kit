import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Document kind — drives the leading glyph. */
export type DocumentKind = 'policy' | 'declaration' | 'id-card' | 'invoice' | 'letter';
export interface PolicyDocumentRowProps {
    /** Document title (e.g. "Auto policy declarations"). */
    title: string;
    /** Document kind (default `policy`). */
    kind?: DocumentKind;
    /** Human-readable size (e.g. "1.2 MB"), already formatted by the caller. */
    size?: string;
    /** Localized date string (already formatted by the caller). */
    date?: string;
    /** Download button label (default "Download"). Hidden when no `onDownload`. */
    downloadLabel?: string;
    /** Fires when the row is pressed (open/preview). */
    onPress?: () => void;
    /** Fires when the download action is pressed. */
    onDownload?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One document in a policy's document list: a tinted kind glyph, a title with a
 * kind · size · date meta line, and an optional download action. The row opens
 * on press when `onPress` is supplied; the download `Button` is only shown when
 * `onDownload` is supplied. Token-bound throughout — no literal colors.
 */
export declare function PolicyDocumentRow({ title, kind, size, date, downloadLabel, onPress, onDownload, style, }: PolicyDocumentRowProps): React.ReactElement;
//# sourceMappingURL=PolicyDocumentRow.d.ts.map