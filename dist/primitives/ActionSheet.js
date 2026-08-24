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
exports.ActionSheet = ActionSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const cn_1 = require("./cn");
/**
 * iOS-style action sheet — a bottom-anchored dialog presenting a token-bound
 * list of choices plus a separated Cancel affordance, over a scrim. Portals to
 * `<body>`; closes on scrim click or Escape. Distinct from `Drawer(side="bottom")`
 * (arbitrary content) by the grouped list + destructive/cancel convention.
 * Destructive actions use the `danger` token. No literal colors.
 */
function ActionSheet({ open, onClose, title, actions, cancelLabel = 'Cancel', className, }) {
    const panelRef = React.useRef(null);
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        panelRef.current?.focus();
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open || typeof document === 'undefined')
        return null;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50 flex flex-col justify-end", role: "dialog", "aria-modal": "true", "aria-label": title ?? 'Actions', children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-neutral-950/50", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { ref: panelRef, tabIndex: -1, className: (0, cn_1.cn)('relative flex flex-col gap-2 p-3 outline-none', className), children: [(0, jsx_runtime_1.jsxs)("div", { role: "menu", className: "overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface", children: [title && ((0, jsx_runtime_1.jsx)("div", { className: "border-b border-border px-4 py-3 text-center text-sm text-muted", children: title })), actions.map((action, i) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "menuitem", disabled: action.disabled, onClick: () => {
                                    action.onSelect?.();
                                    onClose();
                                }, className: (0, cn_1.cn)('w-full px-4 py-3 text-center text-base font-medium transition-colors', 'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50', i === 0 && !title ? '' : 'border-t border-border', action.destructive ? 'text-danger' : 'text-primary'), children: action.label }, i)))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-lg)] border border-border bg-surface px-4 py-3', 'text-base font-semibold text-on-surface transition-colors hover:bg-neutral-100'), children: cancelLabel })] })] }), document.body);
}
//# sourceMappingURL=ActionSheet.js.map