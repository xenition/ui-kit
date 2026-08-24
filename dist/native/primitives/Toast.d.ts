import * as React from 'react';
export type ToastTone = 'info' | 'success' | 'warn' | 'danger';
export interface ToastOptions {
    title?: React.ReactNode;
    description?: React.ReactNode;
    tone?: ToastTone;
    /** Auto-dismiss after this many ms (default 4000; 0 = sticky). */
    duration?: number;
}
export interface ToastContextValue {
    /** Show a toast. Returns its id (dismiss with `dismiss(id)`). */
    toast: (options: ToastOptions) => number;
    dismiss: (id: number) => void;
}
/** Access the toast API. Must be used within a `<ToastProvider>`. */
export declare function useToast(): ToastContextValue;
/**
 * Provider + viewport for transient notifications — the native mirror of the web
 * `ToastProvider`. Wrap the app once, then call `useToast().toast({ title, tone })`
 * anywhere. Where the web viewport portals to `<body>`, native renders the stack
 * in an absolutely-positioned, top-anchored `View` overlay (`pointerEvents="box-none"`
 * so it never blocks the app beneath it). Each toast auto-dismisses on a timer
 * (default 4000ms; 0 = sticky). Token-bound; no literal colors.
 */
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.ReactElement;
//# sourceMappingURL=Toast.d.ts.map