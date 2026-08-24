import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    /** Sheet height as a fraction of the screen (0–1). Default `0.5`. */
    snap?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Draggable bottom sheet — a bottom-anchored `Modal` panel with a top grabber
 * handle that the user can drag down to dismiss (release past a threshold calls
 * `onClose`). Distinct from the side `Drawer` by the grabber + drag gesture and
 * `snap` height. The panel is the `surface` token, the grabber the `border`
 * token, and the scrim the `onSurface` token faded via opacity. The entry slide
 * is skipped when the OS "Reduce Motion" setting is on. No literal colors.
 */
export declare function BottomSheet({ open, onClose, title, children, snap, style, }: BottomSheetProps): React.ReactElement;
//# sourceMappingURL=BottomSheet.d.ts.map