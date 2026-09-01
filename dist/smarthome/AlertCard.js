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
exports.AlertCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/** info→primary, warning→warn, critical→danger — accent by icon + label, not color alone. */
const SEVERITY_META = {
    info: {
        glyph: 'ℹ️',
        word: 'Info',
        bar: 'bg-primary',
        disc: 'border-primary/40 bg-primary/15',
        iconColor: 'primary',
        tint: 'bg-primary/[0.06]',
        border: 'border-primary/40',
    },
    warning: {
        glyph: '⚠️',
        word: 'Warning',
        bar: 'bg-warn',
        disc: 'border-warn/40 bg-warn/15',
        iconColor: 'warn',
        tint: 'bg-warn/10',
        border: 'border-warn/40',
    },
    critical: {
        glyph: '🚨',
        word: 'Critical',
        bar: 'bg-danger',
        disc: 'border-danger/40 bg-danger/15',
        iconColor: 'danger',
        tint: 'bg-danger/10',
        border: 'border-danger/40',
    },
};
/**
 * AlertCard — **V4** "ambient" home alert. A calm notification card with a
 * **left severity-accent bar**, a severity glyph in a soft-tint disc, and a
 * soft (not saturated) severity-tinted background — `info`→primary,
 * `warning`→warn, `critical`→danger. Severity is spelled out as a word in the
 * accessible label so it never rides on color alone. Optional dismiss (✕) and
 * view actions are ≥44px targets. Exposed as `role="status"` (or `alert` when
 * critical). Presentational only; all colors from `--xen-*` token classes
 * (no literals), dark-mode safe.
 */
exports.AlertCard = React.forwardRef(function AlertCard({ severity, title, message, time, deviceName, icon, onDismiss, onView, viewLabel = 'View', className, style, ...rest }, ref) {
    const meta = SEVERITY_META[severity] ?? SEVERITY_META.info;
    const hasActions = typeof onView === 'function' || typeof onDismiss === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: severity === 'critical' ? 'alert' : 'status', "aria-label": `${meta.word} alert: ${title}`, style: style, className: (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-lg)] border shadow-sm', meta.border, meta.tint, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute inset-y-0 left-0 w-1', meta.bar) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)] p-[var(--xen-space-md)] pl-[calc(var(--xen-space-md)+4px)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border', meta.disc), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon ?? meta.glyph, color: meta.iconColor, size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onDismiss, "aria-label": "Dismiss alert", className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-muted hover:bg-on-surface/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2715", color: "muted", size: "base" }) })) : null] }), message != null ? (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] text-sm text-on-surface/80", children: message }) : null, deviceName != null || time != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-[var(--xen-space-xs)] text-xs text-muted", children: [deviceName != null ? deviceName : null, deviceName != null && time != null ? ' · ' : null, time != null ? time : null] })) : null, hasActions && onView ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)] flex items-center gap-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onView, className: "inline-flex min-h-[44px] items-center justify-center rounded-[var(--xen-radius-md)] border border-primary bg-primary px-[var(--xen-space-md)] text-sm font-semibold text-on-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: viewLabel }) })) : null] })] })] }));
});
//# sourceMappingURL=AlertCard.js.map