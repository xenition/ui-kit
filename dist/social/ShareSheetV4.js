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
exports.ShareSheetV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * ShareSheet — **V4** "feed" design (web parity of the native V4). A clean,
 * airy bottom share surface: a dimmed backdrop and a rounded panel holding a
 * wrapping grid of share targets — each a soft-primary tinted glyph disc with a
 * ≥44px tap target and a label — plus a full-width copy-link/Cancel row. Same
 * props/behavior as {@link ShareSheetProps} (self-contained overlay, empty-list
 * handling, `onSelect`/`onClose`); all colors from `--xen-*` token classes (no
 * literals). `role="dialog"`.
 */
exports.ShareSheetV4 = React.forwardRef(function ShareSheetV4({ visible, title = 'Share', subtitle, targets, onSelect, onClose, emptyLabel = 'No share options available', className, ...rest }, ref) {
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "dialog", "aria-modal": "true", "aria-label": title, className: (0, cn_1.cn)('fixed inset-0 z-50 flex items-end justify-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onClose, className: "absolute inset-0 bg-on-surface opacity-40" }), (0, jsx_runtime_1.jsxs)("div", { role: "menu", className: "relative flex w-full max-w-md flex-col gap-lg rounded-t-lg border border-border bg-surface p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-extrabold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: subtitle }) : null] }), targets.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "py-md text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-lg", children: targets.map((t) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", "aria-label": t.label, onClick: onSelect ? () => onSelect(t.id) : undefined, className: "group flex w-[4.5rem] flex-col items-center gap-xs transition-opacity hover:opacity-90", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary transition-colors group-hover:bg-primary/20 group-active:bg-primary/20", "aria-hidden": "true", children: t.icon ?? '↗' }), (0, jsx_runtime_1.jsx)("span", { className: "w-full truncate text-center text-xs font-medium text-on-surface", children: t.label })] }, t.id))) })), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Cancel", onClick: onClose, className: "min-h-[44px] rounded-md bg-primary/10 py-md text-center text-base font-semibold text-primary transition-colors hover:bg-primary/20 active:bg-primary/20", children: "Cancel" })] })] }));
});
//# sourceMappingURL=ShareSheetV4.js.map