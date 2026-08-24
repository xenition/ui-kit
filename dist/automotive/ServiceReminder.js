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
exports.ServiceReminder = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Urgency → badge tone + accent-bar class + spelled-out word (never color alone). */
const URGENCY = {
    upcoming: { tone: 'primary', barClass: 'bg-primary', word: 'Upcoming' },
    due: { tone: 'warn', barClass: 'bg-warn', word: 'Due now' },
    overdue: { tone: 'danger', barClass: 'bg-danger', word: 'Overdue' },
};
/**
 * A vehicle service reminder — the service name, an urgency level
 * (upcoming/due/overdue) shown as a text-labelled badge with a left accent bar
 * so meaning never rests on color, plus due-date and mileage context and an
 * optional action. An `overdue` reminder maps to the `danger` tone per contract.
 * Data + `onAction`/`onDismiss` callbacks only; nothing fetches. Colors come
 * from `--xen-*` token classes — no literal colors. `variant="row"` renders a
 * denser list line. Web parity of the native `ServiceReminder`.
 */
exports.ServiceReminder = React.forwardRef(function ServiceReminder({ service, urgency = 'upcoming', glyph = '🔧', dueLabel, mileageLabel, detail, variant = 'card', actionLabel, onAction, onDismiss, className, ...rest }, ref) {
    const u = URGENCY[urgency] ?? URGENCY.upcoming;
    const row = variant === 'row';
    const a11y = `${service}, ${u.word}${dueLabel ? `, ${dueLabel}` : ''}${mileageLabel ? `, ${mileageLabel}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-reminder": "", "aria-label": a11y, className: (0, cn_1.cn)('flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-1 shrink-0', u.barClass) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col', row ? 'gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]' : 'gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 text-base", children: glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-base font-bold text-on-surface", children: service }), (0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: [dueLabel, mileageLabel].filter(Boolean).join(' · ') })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: u.tone, children: u.word })] }), detail && !row ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: detail }) : null, onAction || onDismiss ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onDismiss ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "sm", onClick: onDismiss, "aria-label": `Snooze ${service} reminder`, className: "flex-1", children: "Snooze" })) : null, onAction && actionLabel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: urgency === 'overdue' ? 'danger' : 'primary', size: "sm", onClick: onAction, "aria-label": `${actionLabel} — ${service}`, className: onDismiss ? 'flex-[2]' : 'flex-1', children: actionLabel })) : null] })) : null] })] }));
});
//# sourceMappingURL=ServiceReminder.js.map