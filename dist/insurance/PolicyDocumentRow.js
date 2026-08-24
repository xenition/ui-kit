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
exports.PolicyDocumentRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const pressable_1 = require("./internal/pressable");
const KIND_GLYPH = {
    policy: '📄',
    declaration: '📋',
    'id-card': '🪪',
    invoice: '🧾',
    letter: '✉️',
};
/**
 * One document in a policy's document list: a tinted kind glyph, a title with a
 * kind · size · date meta line, and an optional download action. The row opens
 * on click when `onClick` is supplied (keyboard-operable); the download action
 * is a real `<button>` (via `Button`) that only renders with `onDownload` and
 * stops propagation so it never also triggers the row. Token-bound throughout —
 * no literal colors. Web parity of the native `PolicyDocumentRow`.
 */
exports.PolicyDocumentRow = React.forwardRef(function PolicyDocumentRow({ title, kind = 'policy', size, date, downloadLabel = 'Download', onClick, onDownload, className, ...rest }, ref) {
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.policy;
    const meta = [kind.replace('-', ' '), size, date].filter((v) => v != null && v !== '').join(' · ');
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${title} document` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, "aria-label": `${kind} document` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: title }), meta !== '' ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null] }), onDownload != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", size: "sm", onClick: (event) => {
                    event.stopPropagation();
                    onDownload();
                }, children: downloadLabel })) : null] }));
});
//# sourceMappingURL=PolicyDocumentRow.js.map