import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Kinds of staged attachment, driving the fallback glyph. */
export type AttachmentKind = 'image' | 'video' | 'file' | 'audio';
export interface StagedAttachment {
    /** Stable identifier passed back to `onRemove`. */
    id: string;
    /** Display name (file name / caption). */
    name?: string;
    /** Attachment kind → fallback glyph when there's no thumbnail. */
    kind?: AttachmentKind;
    /** Optional thumbnail URI (shown for image/video). */
    thumbnailUri?: string;
}
export interface AttachmentBarProps {
    /** Staged attachments to preview before sending. */
    attachments: StagedAttachment[];
    /** Called with an attachment id when its remove button is tapped. */
    onRemove?: (id: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal strip of staged attachments shown above the composer before a
 * message is sent. Each tile shows a thumbnail (or a kind glyph) and a remove
 * button. Scrolls horizontally; renders nothing when empty. No literal colors.
 */
export declare function AttachmentBar({ attachments, onRemove, style, }: AttachmentBarProps): React.ReactElement | null;
//# sourceMappingURL=AttachmentBar.d.ts.map