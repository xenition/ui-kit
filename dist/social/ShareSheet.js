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
exports.ShareSheet = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A bottom share sheet: a dimmed backdrop and a rounded panel holding a grid of
 * share destinations plus a Cancel action. Self-contained overlay (renders
 * `null` while hidden) — the parent owns `visible`. Handles an empty target
 * list. Web parity of the native `ShareSheet`; token-only, `role="dialog"`.
 */
exports.ShareSheet = React.forwardRef(function ShareSheet({ visible, title = 'Share', subtitle, targets, onSelect, onClose, emptyLabel = 'No share options available', className, ...rest }, ref) {
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "dialog", "aria-modal": "true", "aria-label": title, className: (0, cn_1.cn)('fixed inset-0 z-50 flex items-end justify-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: onClose, className: "absolute inset-0 bg-on-surface opacity-40" }), (0, jsx_runtime_1.jsxs)("div", { role: "menu", className: "relative flex w-full max-w-md flex-col gap-md rounded-t-lg border border-border bg-surface p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: subtitle }) : null] }), targets.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "py-md text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-md", children: targets.map((t) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "menuitem", "aria-label": t.label, onClick: onSelect ? () => onSelect(t.id) : undefined, className: "flex w-[4.5rem] flex-col items-center gap-xs transition-opacity hover:opacity-70", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-xl", "aria-hidden": "true", children: t.icon ?? '↗' }), (0, jsx_runtime_1.jsx)("span", { className: "w-full truncate text-center text-xs text-on-surface", children: t.label })] }, t.id))) })), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Cancel", onClick: onClose, className: "rounded-md border border-border py-md text-center text-base font-semibold text-on-surface transition-opacity hover:opacity-80", children: "Cancel" })] })] }));
});
//# sourceMappingURL=ShareSheet.js.map