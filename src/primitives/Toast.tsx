import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from './cn';

export type ToastTone = 'info' | 'success' | 'warn' | 'danger';

export interface ToastOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  tone?: ToastTone;
  /** Auto-dismiss after this many ms (default 4000; 0 = sticky). */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
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
export const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Access the toast API. Must be used within a `<ToastProvider>`. */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>.');
  return ctx;
}

const TONE: Record<ToastTone, string> = {
  info: 'border-primary',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
};

/**
 * Provider + viewport for transient notifications. Wrap the app once, then call
 * `useToast().toast({ title, tone })` anywhere. Token-bound; portals to <body>.
 */
export function ToastProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = (idRef.current += 1);
      setItems((list) => [...list, { ...options, id }]);
      const duration = options.duration ?? 4000;
      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
            {items.map((t) => (
              <div
                key={t.id}
                role="status"
                className={cn(
                  'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--xen-radius-md)]',
                  'border-l-4 bg-surface p-3 shadow-lg',
                  TONE[t.tone ?? 'info']
                )}
              >
                <div className="min-w-0 flex-1">
                  {t.title != null && (
                    <div className="text-sm font-semibold text-on-surface">{t.title}</div>
                  )}
                  {t.description != null && (
                    <div className="text-sm text-muted">{t.description}</div>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 text-muted transition-colors hover:text-on-surface"
                >
                  ×
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
