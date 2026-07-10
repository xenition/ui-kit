import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

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

export interface ToastContextValue {
  /** Show a toast. Returns its id (dismiss with `dismiss(id)`). */
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Access the toast API. Must be used within a `<ToastProvider>`. */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>.');
  return ctx;
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent: Record<ToastTone, string> = {
    info: colors.primary,
    success: colors.success,
    warn: colors.accent,
    danger: colors.danger,
  };
  return (
    <View
      accessibilityRole="summary"
      style={{
        width: '100%',
        maxWidth: 420,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: tokens.spacing.sm,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderLeftWidth: 4,
        borderLeftColor: accent[item.tone ?? 'info'],
        borderRadius: tokens.radius.md,
        padding: tokens.spacing.md,
      }}
    >
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {item.title != null ? (
          typeof item.title === 'string' ? (
            <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
              {item.title}
            </Text>
          ) : (
            item.title
          )
        ) : null}
        {item.description != null ? (
          typeof item.description === 'string' ? (
            <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>{item.description}</Text>
          ) : (
            item.description
          )
        ) : null}
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={() => onDismiss(item.id)} hitSlop={8}>
        <Text style={{ fontSize: tokens.typography.scale.base, color: colors.muted }}>✕</Text>
      </Pressable>
    </View>
  );
}

/**
 * Provider + viewport for transient notifications — the native mirror of the web
 * `ToastProvider`. Wrap the app once, then call `useToast().toast({ title, tone })`
 * anywhere. Where the web viewport portals to `<body>`, native renders the stack
 * in an absolutely-positioned, top-anchored `View` overlay (`pointerEvents="box-none"`
 * so it never blocks the app beneath it). Each toast auto-dismisses on a timer
 * (default 4000ms; 0 = sticky). Token-bound; no literal colors.
 */
export function ToastProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);
  const timers = React.useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = React.useCallback((id: number) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
    setItems((list) => list.filter((item) => item.id !== id));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = (idRef.current += 1);
      setItems((list) => [...list, { ...options, id }]);
      const duration = options.duration ?? 4000;
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );

  React.useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          top: tokens.spacing.xl,
          left: 0,
          right: 0,
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        {items.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}
