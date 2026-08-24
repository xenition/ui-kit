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
exports.RouteStopV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * RouteStop, alternate design **V2** — a *numbered node card*. Where the classic
 * is a bare rail row, V2 is a shadowed card: a big tone-filled numbered node
 * hangs on the left edge, the address is the headline, the delivery window sits
 * in its own pill, and a status glyph + word chip plus a package count anchor the
 * footer. `connected` still draws a rail down to the next card. Completed fills
 * the node and marks it `✓`; status is always glyph + word (tone reinforces
 * only). Same props. No literal colors.
 */
exports.RouteStopV2 = React.forwardRef(function RouteStopV2({ sequence, address, recipient, status, eta, packages, connected = true, onClick, className, ...rest }, ref) {
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const done = status === 'completed';
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Stop ${sequence}, ${address}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold', done
                            ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone])
                            : (0, cn_1.cn)('border-2', internal_1.TONE_BORDER[meta.tone], internal_1.TONE_TEXT[meta.tone], internal_1.TONE_SOFT_BG[meta.tone])), children: done ? '✓' : sequence }), connected ? (0, jsx_runtime_1.jsx)("span", { className: "mt-[var(--xen-space-xs)] w-0.5 flex-1 bg-border" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-base font-bold text-on-surface", children: address }), eta ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-on-surface", children: eta })) : null] }), recipient ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: recipient }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold', internal_1.TONE_SOFT_STRONG_BG[meta.tone], internal_1.TONE_TEXT[meta.tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] }), packages != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${packages} ${packages === 1 ? 'pkg' : 'pkgs'}` })) : null] })] })] }));
});
//# sourceMappingURL=RouteStopV2.js.map