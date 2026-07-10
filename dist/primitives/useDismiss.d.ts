import * as React from 'react';
/**
 * Shared dismiss behavior for click-outside overlays (Popover, Menu, Popconfirm).
 * Attach the returned ref to the overlay container; when `open`, an outside
 * mousedown or the Escape key calls `onDismiss`.
 */
export declare function useDismiss<T extends HTMLElement = HTMLDivElement>(open: boolean, onDismiss: () => void): React.RefObject<T>;
//# sourceMappingURL=useDismiss.d.ts.map