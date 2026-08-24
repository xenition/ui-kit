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
exports.RouteStopV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * RouteStop, alternate design **V3** — a *dense single line*. A small
 * tone-outlined sequence chip, the address (with a muted status + recipient/pkg
 * meta segment beneath), then the window right-aligned — one compact row with a
 * bottom divider, tuned for a long manifest list. No rail, no card: the inverse
 * of V2's node card. Completed marks the chip `✓`; status stays glyph + word
 * (tone reinforces). Same props. No literal colors.
 */
exports.RouteStopV3 = React.forwardRef(function RouteStopV3({ sequence, address, recipient, status, eta, packages, connected: _connected = true, onClick, className, ...rest }, ref) {
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const done = status === 'completed';
    const metaLine = [recipient, packages != null ? `${packages} pkg` : null].filter(Boolean).join('  ·  ');
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Stop ${sequence}, ${address}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold', done ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone]) : (0, cn_1.cn)('border', internal_1.TONE_BORDER[meta.tone], internal_1.TONE_TEXT[meta.tone])), children: done ? '✓' : sequence }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: address }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT[meta.tone]), children: meta.label }), metaLine ? (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: `· ${metaLine}` }) : null] })] }), eta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: eta }) : null] }));
});
//# sourceMappingURL=RouteStopV3.js.map