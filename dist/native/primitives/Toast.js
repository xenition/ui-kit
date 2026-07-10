"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToast = useToast;
exports.ToastProvider = ToastProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ToastContext = React.createContext(null);
/** Access the toast API. Must be used within a `<ToastProvider>`. */
function useToast() {
    const ctx = React.useContext(ToastContext);
    if (!ctx)
        throw new Error('useToast must be used within <ToastProvider>.');
    return ctx;
}
function ToastCard({ item, onDismiss }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = {
        info: colors.primary,
        success: colors.success,
        warn: colors.accent,
        danger: colors.danger,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: {
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
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [item.title != null ? (typeof item.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: item.title })) : (item.title)) : null, item.description != null ? (typeof item.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: item.description })) : (item.description)) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: () => onDismiss(item.id), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: colors.muted }, children: "\u2715" }) })] }));
}
/**
 * Provider + viewport for transient notifications — the native mirror of the web
 * `ToastProvider`. Wrap the app once, then call `useToast().toast({ title, tone })`
 * anywhere. Where the web viewport portals to `<body>`, native renders the stack
 * in an absolutely-positioned, top-anchored `View` overlay (`pointerEvents="box-none"`
 * so it never blocks the app beneath it). Each toast auto-dismisses on a timer
 * (default 4000ms; 0 = sticky). Token-bound; no literal colors.
 */
function ToastProvider({ children }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const [items, setItems] = React.useState([]);
    const idRef = React.useRef(0);
    const timers = React.useRef(new Map());
    const dismiss = React.useCallback((id) => {
        const t = timers.current.get(id);
        if (t) {
            clearTimeout(t);
            timers.current.delete(id);
        }
        setItems((list) => list.filter((item) => item.id !== id));
    }, []);
    const toast = React.useCallback((options) => {
        const id = (idRef.current += 1);
        setItems((list) => [...list, { ...options, id }]);
        const duration = options.duration ?? 4000;
        if (duration > 0) {
            timers.current.set(id, setTimeout(() => dismiss(id), duration));
        }
        return id;
    }, [dismiss]);
    React.useEffect(() => {
        const map = timers.current;
        return () => {
            map.forEach((t) => clearTimeout(t));
            map.clear();
        };
    }, []);
    const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
    return ((0, jsx_runtime_1.jsxs)(ToastContext.Provider, { value: value, children: [children, (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "box-none", style: {
                    position: 'absolute',
                    top: tokens.spacing.xl,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: items.map((item) => ((0, jsx_runtime_1.jsx)(ToastCard, { item: item, onDismiss: dismiss }, item.id))) })] }));
}
//# sourceMappingURL=Toast.js.map