import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CannedResponseData {
    /** Stable id, returned to `onInsert`. */
    id: string;
    /** Short human title (e.g. "Password reset"). */
    title: string;
    /** The saved reply body. */
    body: string;
    /** Optional typed shortcut (e.g. `/reset`). Rendered as a mono-ish chip. */
    shortcut?: string;
    /** Optional grouping/category tag. */
    category?: string;
}
export interface CannedResponseProps {
    /** The saved reply to display. */
    response: CannedResponseData;
    /** How many body lines to show before truncating (default 2). */
    previewLines?: number;
    /** Fires with the response when "Insert" is pressed. */
    onInsert?: (response: CannedResponseData) => void;
    /** Fires when the card body (not the button) is tapped — e.g. to expand. */
    onPress?: (response: CannedResponseData) => void;
    /** Insert-button label (default "Insert"). */
    insertLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A saved/canned reply card for agents — title, an optional shortcut + category
 * chip, a truncated body preview, and an "Insert" action that reports the full
 * response back to the composer via `onInsert`. Tapping the body fires
 * `onPress` (e.g. to preview the whole thing). All colors/spacing come from the
 * compiled theme tokens; the shortcut chip uses a token tint, not literal hex.
 */
export declare function CannedResponse({ response, previewLines, onInsert, onPress, insertLabel, style, }: CannedResponseProps): React.ReactElement;
//# sourceMappingURL=CannedResponse.d.ts.map