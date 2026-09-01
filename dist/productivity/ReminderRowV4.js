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
exports.ReminderRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ReminderRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a reminder line: a bell glyph seated in a
 * **soft-primary disc**, a bigger legible title over its time
 * {@link DueDatePill}, and an enable toggle exposing a `switch` role with a
 * stateful label. When the reminder is enabled the whole row settles into a
 * calm **soft-primary tint** so an active reminder reads at a glance. Same
 * props/behavior as {@link ReminderRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.ReminderRowV4 = React.forwardRef(function ReminderRowV4({ title, timeLabel, tone = 'upcoming', enabled = true, onToggle, onClick, className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] p-3 transition-colors', enabled ? 'bg-primary/[0.08]' : 'bg-surface', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition-colors', enabled ? 'bg-primary/[0.14] text-primary-text' : 'bg-border/[0.5] text-muted-text'), children: enabled ? '🔔' : '🔕' }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": title, onClick: onClick, disabled: !onClick, className: "flex min-w-0 flex-1 flex-col items-start gap-1 text-left disabled:cursor-default", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold leading-relaxed', enabled ? 'text-on-surface' : 'text-muted-text'), children: title }), timeLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: timeLabel, tone: tone, glyph: "\u23F0" }) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", role: "switch", "aria-checked": enabled, "aria-label": `${title} reminder`, onClick: () => onToggle?.(!enabled), className: (0, cn_1.cn)('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition-opacity hover:opacity-70', enabled ? 'text-primary-text' : 'text-muted-text'), children: enabled ? '🔔' : '🔕' })] }));
});
//# sourceMappingURL=ReminderRowV4.js.map