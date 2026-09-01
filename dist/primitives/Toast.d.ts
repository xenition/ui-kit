import * as React from 'react';
export type ToastTone = 'info' | 'success' | 'warn' | 'danger';
export interface ToastOptions {
    title?: React.ReactNode;
    description?: React.ReactNode;
    tone?: ToastTone;
    /** Auto-dismiss after this many ms (default 4000; 0 = sticky). */
    duration?: number;
}
interface ToastContextValue {
    /** Show a toast. Returns its id (dismiss with `dismiss(id)`). */
    toast: (options: ToastOptions) => number;
    dismiss: (id: number) => void;
}
/**
 * The one toast context in the kit.
 *
 * Exported so `ToastProviderV4` can provide THIS context rather than declaring
 * a second one. Two contexts for one API is not a styling difference — every
 * component already calling `useToast()` would read this one, find nothing, and
 * throw. Deliberately kept out of the package barrel: it is shared with the V4
 * twin, not part of the public surface.
 */
export declare const ToastContext: React.Context<ToastContextValue | null>;
/** Access the toast API. Must be used within a `<ToastProvider>`. */
export declare function useToast(): ToastContextValue;
/**
 * Provider + viewport for transient notifications. Wrap the app once, then call
 * `useToast().toast({ title, tone })` anywhere. Token-bound; portals to <body>.
 */
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.ReactElement;
export {};
//# sourceMappingURL=Toast.d.ts.map