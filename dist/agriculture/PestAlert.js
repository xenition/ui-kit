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
exports.PestAlert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const SEVERITY_META = {
    low: { label: 'Low', iconColor: 'success', edge: 'border-success', tone: 'success', button: 'primary' },
    moderate: { label: 'Moderate', iconColor: 'warn', edge: 'border-warn', tone: 'warn', button: 'primary' },
    high: { label: 'High', iconColor: 'danger', edge: 'border-danger', tone: 'danger', button: 'danger' },
    critical: { label: 'Critical', iconColor: 'danger', edge: 'border-danger', tone: 'danger', button: 'danger' },
};
/**
 * A pest / disease alert — a token-tinted, accent-barred callout with a bug
 * glyph, the pest name, affected crop/field, an optional recommendation +
 * detection time, and an optional action {@link Button}. Severity drives the
 * accent color, but the text {@link Badge} states it too, so the alert never
 * relies on color alone. Announced via `role="alert"`. The tint and left edge
 * come from token classes (`bg-neutral-50` + `border-<tone>`) — no literal
 * colors.
 */
exports.PestAlert = React.forwardRef(function PestAlert({ pest, severity = 'moderate', affected, recommendation, detectedAt, icon = '🐛', actionLabel, onAction, className, ...rest }, ref) {
    const meta = SEVERITY_META[severity];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "data-xen-pest-alert": "", "aria-label": `${meta.label} pest alert: ${pest}${affected ? ` on ${affected}` : ''}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3', meta.edge, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: meta.iconColor }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: pest }), affected != null ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: affected })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }), recommendation != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-on-surface", children: recommendation })) : null, detectedAt != null ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: ["\uD83D\uDD53 ", detectedAt] }) : null, actionLabel != null ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: meta.button, onClick: onAction, children: actionLabel }) })) : null] }));
});
//# sourceMappingURL=PestAlert.js.map