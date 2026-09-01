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
exports.OutageAlertV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * OutageAlert — **V4** design. A cleaner elevated card that keeps the severity
 * signal (active → danger, scheduled → warn, resolved → success via
 * `outageState`) carried by glyph + heading + a semantic tint (never color
 * alone): a thin tinted top rail and a tinted status pill + ETA line. The kind
 * glyph (or the outage glyph when no `kind`) sits in the signature brand-gradient
 * disc. ETA is surfaced for active/scheduled and suppressed once resolved; the
 * details `Button` renders only when `onDetails` is supplied. Same props/behavior
 * as {@link OutageAlertProps}; token-only colors.
 */
exports.OutageAlertV4 = React.forwardRef(function OutageAlertV4({ state = 'active', kind, area, eta, message, detailsLabel = 'View details', onDetails, className, ...rest }, ref) {
    const od = (0, status_1.outageState)(state);
    const kd = kind != null ? (0, status_1.utilityKind)(kind) : null;
    const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
    const showEta = eta != null && state !== 'resolved';
    const discGlyph = kd != null ? kd.glyph : od.glyph;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", "aria-label": `${heading}${area != null ? `, ${area}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border border-t-[3px] shadow-lg p-5', format_1.BORDER_TINT[od.color], className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: discGlyph, size: "xl", color: "onPrimary", "aria-label": od.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: od.tone, variant: "soft", size: "sm", children: `${od.glyph} ${od.label}` }) }), (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 text-base font-bold text-on-surface", children: heading }), area != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: area }) : null, message != null ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-on-surface", children: message }) : null, showEta ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-0.5 text-sm font-semibold', format_1.TEXT_TINT[od.color]), children: ["Estimated restoration: ", eta] })) : null] })] }), onDetails != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onClick: onDetails, children: detailsLabel })) : null] }));
});
//# sourceMappingURL=OutageAlertV4.js.map