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
exports.CourtDateCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * CourtDateCard — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a court date / filing deadline: an elevated
 * rounded card with a soft shadow, a leading soft-primary event-glyph block, the
 * date + time, event-type and urgency pills (each a glyph + word so nothing rests
 * on color alone), an optional toned countdown, and venue / judge / case
 * metadata. A `today` / `soon` urgency tints the countdown for triage. When
 * `onClick` is set the card is a keyboard-activable `role="button"`. Reuses the
 * base `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
exports.CourtDateCardV4 = React.forwardRef(function CourtDateCardV4({ type, date, time, court, judge, caseNumber, urgency = 'upcoming', countdown, variant = 'default', onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const typeMeta = internal_1.COURT_EVENT_META[type];
    const urgencyMeta = internal_1.COURT_URGENCY_META[urgency];
    const highlighted = urgency === 'today' || urgency === 'soon';
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-court-date-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${typeMeta.label} on ${date}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]', compact && 'p-[var(--xen-space-md)]', urgency === 'past' && 'opacity-70', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 min-w-[52px] items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl leading-none", children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: date }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: time }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: urgencyMeta, variant: "soft", size: "sm" })] })] }), countdown ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-bold', highlighted ? (0, internal_1.toneTextClass)(urgencyMeta.tone) : 'text-muted'), children: countdown })) : null] }), !compact && (court || judge || caseNumber) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [court ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-on-surface", children: ["\uD83C\uDFDB ", court] }) : null, judge ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Before ", judge] }) : null, caseNumber ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: caseNumber }) : null] })) : null] }));
});
//# sourceMappingURL=CourtDateCardV4.js.map