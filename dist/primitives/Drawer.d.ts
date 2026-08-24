import * as React from 'react';
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    side?: DrawerSide;
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
/** Side sheet / drawer bound to the theme tokens. Portals to <body>; closes on backdrop / Escape. */
export declare function Drawer({ open, onClose, side, title, children, className, }: DrawerProps): React.ReactElement | null;
//# sourceMappingURL=Drawer.d.ts.map