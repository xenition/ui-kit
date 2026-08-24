import * as React from 'react';
export interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    /** Sheet height as a fraction of the viewport (0–1). Default `0.5`. */
    snap?: number;
    className?: string;
}
/**
 * Bottom sheet — a bottom-anchored dialog panel with a top grabber handle,
 * sliding up over a scrim. Portals to `<body>`; closes on scrim click, the
 * grabber, or Escape. Distinct from the side `Drawer` by its bottom anchor +
 * grabber and `snap` height. Panel is `surface`, grabber the `border` token.
 * No literal colors.
 */
export declare function BottomSheet({ open, onClose, title, children, snap, className, }: BottomSheetProps): React.ReactElement | null;
//# sourceMappingURL=BottomSheet.d.ts.map