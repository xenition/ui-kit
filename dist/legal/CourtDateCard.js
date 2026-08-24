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
exports.CourtDateCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A court date / filing deadline card: a leading urgency-tinted date block, the
 * event type and urgency pills (each glyph + word so nothing rests on color
 * alone), and venue / judge / case metadata. A `today` or `soon` urgency tints
 * the date block and countdown for at-a-glance triage. When `onClick` is set the
 * card is an accessible `role="button"`. All colors are `--xen-*` token classes.
 */
exports.CourtDateCard = React.forwardRef(function CourtDateCard({ type, date, time, court, judge, caseNumber, urgency = 'upcoming', countdown, variant = 'default', onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const typeMeta = internal_1.COURT_EVENT_META[type];
    const urgencyMeta = internal_1.COURT_URGENCY_META[urgency];
    const highlighted = urgency === 'today' || urgency === 'soon';
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${typeMeta.label} on ${date}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', compact && 'p-[var(--xen-space-md)]', urgency === 'past' && 'opacity-70', interactive && 'cursor-pointer', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex min-w-[52px] items-center justify-center rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] py-[var(--xen-space-xs)]', (0, internal_1.toneSoftBgClass)(highlighted ? urgencyMeta.tone : typeMeta.tone)), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: date }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: time }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: urgencyMeta, size: "sm" })] })] }), countdown ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', highlighted ? (0, internal_1.toneTextClass)(urgencyMeta.tone) : 'text-muted'), children: countdown })) : null] }), !compact && (court || judge || caseNumber) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [court ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-on-surface", children: ["\uD83C\uDFDB ", court] })) : null, judge ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Before ", judge] }) : null, caseNumber ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: caseNumber }) : null] })) : null] }));
});
//# sourceMappingURL=CourtDateCard.js.map