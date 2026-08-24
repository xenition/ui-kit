import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AttachmentKind = 'image' | 'pdf' | 'doc' | 'sheet' | 'audio' | 'video' | 'zip' | 'file';
export interface AttachmentChipProps {
    /** File name shown as the label. */
    name: string;
    /** File kind → leading glyph. Default `'file'`. */
    kind?: AttachmentKind;
    /** Human-readable size (e.g. "1.2 MB"). */
    size?: string;
    /** Uploading progress 0–1; renders a loading state and disables actions. */
    uploadProgress?: number;
    /** Tap the chip (preview / open). */
    onPress?: () => void;
    /** Download affordance; shown when provided. */
    onDownload?: () => void;
    /** Remove affordance (compose staging); shown when provided. */
    onRemove?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single mail attachment as a compact chip — kind glyph, file name, optional
 * size, and optional download / remove affordances. While `uploadProgress` is
 * between 0 and 1 it reads as loading and suppresses the trailing actions.
 * Surface, border, and the soft icon well all resolve from theme tokens. No
 * literal colors.
 */
export declare function AttachmentChip({ name, kind, size, uploadProgress, onPress, onDownload, onRemove, style, }: AttachmentChipProps): React.ReactElement;
//# sourceMappingURL=AttachmentChip.d.ts.map