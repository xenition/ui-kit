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
exports.ScanRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
/**
 * ScanRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a scan event: an elevated rounded row with
 * a soft shadow, a decorative token-bar "barcode" placeholder (no scan
 * dependency, hidden from a11y), the code headline, a labelled glyph + word scan
 * kind (never color alone), a location line, and the time / operator at the
 * trailing edge. Clickable when `onClick` is set. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that drops the location /
 * operator meta) — identical props/behavior to {@link ScanRowProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
exports.ScanRowV4 = React.forwardRef(function ScanRowV4({ code, kind, location, time, operator, variant = 'full', onClick, className, ...rest }, ref) {
    const meta = internal_1.SCAN_META[kind] ?? internal_1.SCAN_META.inbound;
    const interactive = (0, internal_1.pressableProps)(onClick);
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const a11y = `${meta.label} scan ${code}${location ? ` at ${location}` : ''}`;
    // Deterministic pseudo-barcode widths from the code (decorative placeholder).
    const bars = React.useMemo(() => {
        const out = [];
        for (let i = 0; i < 14; i += 1) {
            const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
            out.push((ch % 3) + 1);
        }
        return out;
    }, [code]);
    const barcode = (h, w) => ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center gap-px overflow-hidden rounded-[var(--xen-radius-sm)] bg-primary/10 px-[3px]', h, w), children: bars.map((bw, i) => ((0, jsx_runtime_1.jsx)("span", { className: "h-[70%] bg-on-surface", style: { width: `${bw}px` } }, i))) }));
    const statusBadge = ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }));
    // ── compact: denser single line ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-scan-row": "", "aria-label": interactive ? a11y : undefined, className: (0, cn_1.cn)(shell, 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
                'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [barcode('h-6', 'w-8'), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold tabular-nums text-on-surface", children: code }), (0, jsx_runtime_1.jsxs)("span", { className: "ml-auto flex items-center gap-[var(--xen-space-sm)]", children: [statusBadge, time ? (0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs tabular-nums text-muted", children: time }) : null] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-scan-row": "", "aria-label": interactive ? a11y : undefined, className: (0, cn_1.cn)(shell, 'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [barcode('h-9', 'w-12'), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold tabular-nums text-on-surface", children: code }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [statusBadge, location ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: location }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-0.5", children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold tabular-nums text-on-surface", children: time }) : null, operator ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: operator }) : null] })] }));
});
//# sourceMappingURL=ScanRowV4.js.map