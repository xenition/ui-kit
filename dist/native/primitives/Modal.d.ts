import * as React from 'react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
}
/**
 * Themed modal dialog — the native mirror of the web `Modal`. Wraps RN's
 * `Modal`; the backdrop scrim is the darkest neutral ramp step faded via
 * `opacity`, so every rendered color stays a pure theme token.
 */
export declare function Modal({ open, onClose, title, children }: ModalProps): React.ReactElement;
//# sourceMappingURL=Modal.d.ts.map