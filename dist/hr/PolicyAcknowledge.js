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
exports.PolicyAcknowledge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A policy-acknowledgement card: title, version, effective date and a summary,
 * with a consent checkbox and an acknowledge action. Status is a glyph + word
 * pill (acknowledged → success, overdue → danger, never color alone). Once
 * acknowledged the control collapses to a confirmation line with the date. The
 * acknowledge button stays disabled until consent is checked. `compact` drops
 * the summary. All colors are `--xen-*` token classes — no literals. `forwardRef`
 * to the root `<div>`.
 */
exports.PolicyAcknowledge = React.forwardRef(function PolicyAcknowledge({ title, version, effectiveDate, summary, status, acknowledged = false, acknowledgedDate, consentLabel = 'I have read and agree to this policy', variant = 'default', onToggle, onAcknowledge, className, }, ref) {
    const compact = variant === 'compact';
    const derivedStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
    const [consented, setConsented] = React.useState(false);
    const meta = [version, effectiveDate ? `Effective ${effectiveDate}` : null].filter(Boolean).join('  ·  ');
    const handleToggle = (next) => {
        setConsented(next);
        onToggle?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-bold text-on-surface", children: title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.POLICY_STATUS_META[derivedStatus], size: "sm" })] }), !compact && summary ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-4 text-sm text-muted", children: summary }) : null, acknowledged ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs font-semibold text-success", children: ["\u2713 Acknowledged", acknowledgedDate ? ` on ${acknowledgedDate}` : ''] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: consented, onChange: (e) => handleToggle(e.target.checked), "aria-label": consentLabel }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-xs text-on-surface", children: consentLabel })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", disabled: !consented, onClick: onAcknowledge, children: "Acknowledge" })] }))] }));
});
//# sourceMappingURL=PolicyAcknowledge.js.map