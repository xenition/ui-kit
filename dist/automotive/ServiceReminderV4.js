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
exports.ServiceReminderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const fleet_v4_1 = require("./internal/fleet-v4");
const URGENCY_META = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    due: { label: 'Due now', tone: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger' },
};
/**
 * **V4 service reminder** — the web twin of the native `ServiceReminderV4`,
 * same props as {@link ServiceReminder} plus `urgencyLabels` and
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Urgency survives greyscale** — a badge word and a leading rail beside
 *    the tint, which was the only signal.
 * 2. **`overdue` announces itself**, and the other two do not: a component
 *    that announces every state as an alert teaches the user to ignore it.
 * 3. **The dismiss control is a 44px target with a name.**
 * 4. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    correctly in dark mode.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
exports.ServiceReminderV4 = React.forwardRef(function ServiceReminderV4({ service, urgency = 'upcoming', glyph = '🔧', dueLabel, mileageLabel, detail, variant = 'card', urgencyLabels, dismissLabel = 'Dismiss reminder', actionLabel, onAction, onDismiss, className, style, ...rest }, ref) {
    if (!service)
        return null;
    const meta = URGENCY_META[urgency];
    const word = urgencyLabels?.[urgency] ?? meta.label;
    const caption = (0, fleet_v4_1.metaLine)([dueLabel, mileageLabel, detail]);
    const card = variant === 'card';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: urgency === 'overdue' ? 'alert' : 'status', "data-xen-service-reminder": urgency, "aria-label": (0, fleet_v4_1.metaLine)([word, service, caption]), className: (0, cn_1.cn)('flex gap-md overflow-hidden', card
            ? 'rounded-[var(--xen-radius-lg)] border border-border p-md'
            : 'p-sm', className), style: card ? { background: (0, fleet_v4_1.toneGround)(meta.tone), ...style } : style, ...rest, children: [card ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "w-[3px] shrink-0 self-stretch rounded-full", style: { background: fleet_v4_1.TONE_VAR[meta.tone] } })) : null, (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "lg", className: fleet_v4_1.TONE_INK[meta.tone] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate font-heading text-base font-bold text-on-card", children: service }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] }), caption ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: caption })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onClick: onAction, "aria-label": actionLabel, className: "self-start", children: actionLabel })) : null] }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": dismissLabel, onClick: onDismiss, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('-my-sm -mr-sm flex w-11 shrink-0 items-center justify-center rounded-full text-muted-text', chrome_v4_1.MIN_TAP_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "base" }) })) : null] }));
});
//# sourceMappingURL=ServiceReminderV4.js.map