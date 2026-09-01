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
exports.FlightStatusBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const STATUS = {
    'on-time': { label: 'On time', glyph: '✓', tone: 'success' },
    boarding: { label: 'Boarding', glyph: '🛫', tone: 'primary', peak: true },
    delayed: { label: 'Delayed', glyph: '⏳', tone: 'warn' },
    cancelled: { label: 'Cancelled', glyph: '⛔', tone: 'danger' },
    landed: { label: 'Landed', glyph: '🛬', tone: 'success' },
};
/** Soft-tinted banner surface per non-peak tone (surface bg + colored ring/ink). */
const TINT = {
    success: 'border-success/40 bg-success/10',
    warn: 'border-warn/40 bg-warn/10',
    danger: 'border-danger/40 bg-danger/10',
};
/**
 * FlightStatusBanner — a **V4** "journey" status strip (web parity of the native
 * twin). Announces where a flight is in its lifecycle: on-time / landed read as a
 * success tint, delayed as warn, cancelled as danger, and boarding rides the
 * brand gradient (the boarding "peak" moment) in near-white ink. Severity is
 * always carried by **glyph + label + a tint that traces to a semantic token
 * slot**, never color alone; the state is pilled with a `Badge`. Gate / seat /
 * boarding surface as small fields. All colors from `--xen-*` token classes and
 * gradient utilities — no literals; dark-mode safe.
 */
exports.FlightStatusBanner = React.forwardRef(function FlightStatusBanner({ status, flightNumber, gate, seat, boardingTime, remark, className, ...rest }, ref) {
    const meta = STATUS[status];
    const peak = meta.peak === true;
    const fields = [
        gate ? { label: 'Gate', value: gate } : null,
        seat ? { label: 'Seat', value: seat } : null,
        boardingTime ? { label: 'Boarding', value: boardingTime } : null,
    ].filter((f) => f != null);
    const Field = ({ label, value }) => peak ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[64px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-primary-50", children: value })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[64px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-flight-status-banner": "", role: "status", "aria-label": `Flight ${flightNumber} ${meta.label}${remark ? `, ${remark}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-lg)]', peak
            ? 'border-transparent bg-gradient-to-br from-primary-500 to-primary-700'
            : TINT[meta.tone], className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-extrabold', peak ? 'text-primary-50' : 'text-on-surface'), children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', peak ? 'text-primary-100' : 'text-muted'), children: flightNumber }), remark ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 text-sm', peak ? 'text-primary-100' : 'text-on-surface'), children: remark })) : null] })] }), peak ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary-50/15 px-2 py-0.5 text-xs font-semibold text-primary-50", children: meta.label })) : ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", dot: true, children: meta.label }))] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: fields.map((f) => ((0, jsx_runtime_1.jsx)(Field, { label: f.label, value: f.value }, f.label))) })) : null] }));
});
//# sourceMappingURL=FlightStatusBanner.js.map