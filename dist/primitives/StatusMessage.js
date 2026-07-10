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
exports.StatusMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
/**
 * The spinner ring is token-only (`border` track, `primary` head) and rotates
 * via CSS; `prefers-reduced-motion` freezes it (the ring still reads as a busy
 * indicator). No colors here — only transform.
 */
const STATUS_MESSAGE_CSS = `
@keyframes xen-spin { to { transform: rotate(360deg); } }
[data-xen-spinner] {
  display: inline-block; width: 1.25rem; height: 1.25rem; border-radius: 9999px;
  border: 2px solid var(--xen-border); border-top-color: var(--xen-primary);
  animation: xen-spin 0.7s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-spinner] { animation: none; }
}
`;
const DEFAULTS = {
    loading: 'Loading…',
    empty: 'Nothing here yet.',
    error: 'Something went wrong.',
};
/**
 * Loading / empty / error feedback — the templates' hand-rolled `Status` block
 * as a token-only primitive. `loading` shows a CSS spinner (reduced-motion
 * safe) with an optional message and is announced via `role="status"`;
 * `empty` is a muted message; `error` is a `danger`-token message announced via
 * `role="alert"`. Pairs with `@xenition/ui/data`'s `useResource`.
 */
exports.StatusMessage = React.forwardRef(function StatusMessage({ state, message, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-status-message-styles', STATUS_MESSAGE_CSS);
    const base = (0, cn_1.cn)('flex flex-col items-center justify-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xl)] text-center text-sm', className);
    if (state === 'loading') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-busy": "true", "data-xen-status-message": "loading", className: (0, cn_1.cn)(base, 'text-muted'), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-spinner": "", "aria-hidden": "true" }), message ? (0, jsx_runtime_1.jsx)("span", { children: message }) : null] }));
    }
    if (state === 'error') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "alert", "data-xen-status-message": "error", className: (0, cn_1.cn)(base, 'text-danger'), ...rest, children: (0, jsx_runtime_1.jsx)("span", { children: message ?? DEFAULTS.error }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-status-message": "empty", className: (0, cn_1.cn)(base, 'text-muted'), ...rest, children: (0, jsx_runtime_1.jsx)("span", { children: message ?? DEFAULTS.empty }) }));
});
//# sourceMappingURL=StatusMessage.js.map