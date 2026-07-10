import * as React from 'react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
/** Themed modal dialog. Controlled via `open`/`onClose`; closes on backdrop click or Escape. */
export declare function Modal({ open, onClose, title, children, className, }: ModalProps): React.ReactElement | null;
//# sourceMappingURL=Modal.d.ts.map