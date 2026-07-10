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
const react_dom_1 = require("react-dom");
const cn_1 = require("./cn");
const ToastContext = React.createContext(null);
/** Access the toast API. Must be used within a `<ToastProvider>`. */
function useToast() {
    const ctx = React.useContext(ToastContext);
    if (!ctx)
        throw new Error('useToast must be used within <ToastProvider>.');
    return ctx;
}
const TONE = {
    info: 'border-primary',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
};
/**
 * Provider + viewport for transient notifications. Wrap the app once, then call
 * `useToast().toast({ title, tone })` anywhere. Token-bound; portals to <body>.
 */
function ToastProvider({ children }) {
    const [items, setItems] = React.useState([]);
    const idRef = React.useRef(0);
    const dismiss = React.useCallback((id) => {
        setItems((list) => list.filter((t) => t.id !== id));
    }, []);
    const toast = React.useCallback((options) => {
        const id = (idRef.current += 1);
        setItems((list) => [...list, { ...options, id }]);
        const duration = options.duration ?? 4000;
        if (duration > 0) {
            window.setTimeout(() => dismiss(id), duration);
        }
        return id;
    }, [dismiss]);
    const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
    return ((0, jsx_runtime_1.jsxs)(ToastContext.Provider, { value: value, children: [children, typeof document !== 'undefined' &&
                (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4", children: items.map((t) => ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: (0, cn_1.cn)('pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--xen-radius-md)]', 'border-l-4 bg-surface p-3 shadow-lg', TONE[t.tone ?? 'info']), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [t.title != null && ((0, jsx_runtime_1.jsx)("div", { className: "text-sm font-semibold text-on-surface", children: t.title })), t.description != null && ((0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted", children: t.description }))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: () => dismiss(t.id), className: "shrink-0 text-muted transition-colors hover:text-on-surface", children: "\u00D7" })] }, t.id))) }), document.body)] }));
}
//# sourceMappingURL=Toast.js.map