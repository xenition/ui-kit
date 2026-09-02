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
exports.RouteStopV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
/**
 * RouteStop — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a delivery-route stop: an elevated rounded
 * card with a soft shadow, a numbered sequence marker (filled with the status
 * tone once completed), the address + recipient, an ETA/window, a package count,
 * and a labelled glyph + word status badge (never color alone). Clickable when
 * `onClick` is set. Honors the V4 `variant` — `full` (card, default) and
 * `compact` (a dense single row) — identical props/behavior to
 * {@link RouteStopProps}. All colors from `--xen-*` token classes (no literals).
 */
exports.RouteStopV4 = React.forwardRef(function RouteStopV4({ sequence, address, recipient, status, eta, packages, connected, variant = 'full', onClick, className, ...rest }, ref) {
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const done = status === 'completed';
    const interactive = (0, internal_1.pressableProps)(onClick);
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const a11y = `Stop ${sequence}, ${address}, ${meta.label}`;
    const marker = (size, text) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full font-bold tabular-nums', size, text, done
            ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone])
            : (0, cn_1.cn)('border-2 bg-transparent', internal_1.TONE_BORDER[meta.tone], internal_1.TONE_TEXT[meta.tone])), children: done ? '✓' : sequence }));
    const statusBadge = ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }));
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-route-stop": "", "aria-label": interactive ? a11y : undefined, className: (0, cn_1.cn)(shell, 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
                'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [marker('h-6 w-6 text-xs', 'text-xs'), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: address }), eta ? (0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs tabular-nums text-muted", children: eta }) : null, statusBadge] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-route-stop": "", "aria-label": interactive ? a11y : undefined, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [marker('h-9 w-9 text-sm', 'text-sm'), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-semibold text-on-surface", children: address }), eta ? (0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs tabular-nums text-muted", children: eta }) : null] }), recipient ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: recipient }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex items-center gap-[var(--xen-space-sm)]", children: [statusBadge, packages != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${packages} pkg` }) : null] })] })] }));
});
//# sourceMappingURL=RouteStopV4.js.map