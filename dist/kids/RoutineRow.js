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
exports.RoutineRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const SLOT_GLYPH = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌆',
    bedtime: '🌙',
    anytime: '⏰',
};
/**
 * A single routine step row: an icon, label + time, and a tappable done/not-done
 * checkbox. Done state is shown by a check glyph, strike-through, and the a11y
 * `aria-checked` state — never color alone. When `onToggle` is set the whole row
 * is a real `<button role="checkbox">`. Token-bound throughout — no literal
 * colors.
 */
exports.RoutineRow = React.forwardRef(function RoutineRow({ label, slot = 'anytime', icon, time, done = false, disabled = false, onToggle, className, ...rest }, ref) {
    const glyph = icon ?? SLOT_GLYPH[slot] ?? '⏰';
    const a11yLabel = `${label}${time ? `, ${time}` : ''}, ${done ? 'done' : 'not done'}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg" }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block truncate text-base font-semibold text-on-surface', done && 'line-through'), children: label }), time ? (0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: time }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border', done ? 'border-success bg-success' : 'border-border bg-transparent'), children: done ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "xs", color: "onSuccess", "aria-label": "done" }) : null })] }));
    const rowClass = (0, cn_1.cn)('flex w-full items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2', disabled && 'opacity-50', className);
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-routine-row": "", "aria-label": a11yLabel, className: rowClass, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-routine-row": "", role: "checkbox", "aria-checked": done, "aria-disabled": disabled || undefined, "aria-label": a11yLabel, disabled: disabled, onClick: () => onToggle(!done), className: (0, cn_1.cn)(rowClass, 'transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none'), ...rest, children: body }));
});
//# sourceMappingURL=RoutineRow.js.map