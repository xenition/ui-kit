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
exports.CannedResponseV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * CannedResponse — **V4** "calm console" design (web parity of the native V4).
 * A saved-reply card reimagined as an elevated rounded surface: title with an
 * optional shortcut/category chip, the body preview set on a calm inset panel,
 * and a full-width-friendly primary **Insert** affordance (≥44px tap target).
 * Activating the body fires `onClick` (click + keyboard); **Insert** reports the
 * full response via `onInsert`. One accent = primary; selection/hover use a
 * soft-primary tint. Same props/behavior as {@link CannedResponseProps}; all
 * colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
exports.CannedResponseV4 = React.forwardRef(function CannedResponseV4({ response, previewLines = 2, onInsert, onClick, insertLabel = 'Insert', className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    const activate = interactive ? () => onClick(response) : undefined;
    const lines = Math.max(1, previewLines);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Canned response: ${response.title}` : undefined, onClick: activate, onKeyDown: activate ? (0, internal_1.activateOnKey)(activate) : undefined, className: (0, cn_1.cn)('flex flex-col gap-2', interactive &&
                    'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 hover:bg-primary/10'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink text-base font-bold text-on-surface", children: response.title }), response.shortcut ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary", children: response.shortcut })) : null, response.category ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: response.category })) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "overflow-hidden rounded-[var(--xen-radius-md)] bg-on-surface/[0.03] px-3 py-2 text-sm leading-relaxed text-muted", style: { display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' }, children: response.body })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: !onInsert, onClick: onInsert ? () => onInsert(response) : undefined, className: (0, cn_1.cn)('inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--xen-radius-md)] bg-primary px-4 text-sm font-bold text-on-primary', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', onInsert ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50'), children: insertLabel })] }));
});
//# sourceMappingURL=CannedResponseV4.js.map