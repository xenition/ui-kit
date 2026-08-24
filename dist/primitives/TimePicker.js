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
exports.TimePicker = TimePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
const pad = (n) => String(n).padStart(2, '0');
/**
 * Zero-asset time field — a token-bound trigger showing `HH:MM` that opens a
 * popover with side-by-side hour (0–23) and minute (stepped by `minuteStep`)
 * columns. Web parity of the native `TimePicker`; `invalid` swaps the border to
 * `danger`. No literal colors (kit lint rule).
 */
function TimePicker({ value, onChange, minuteStep = 5, placeholder = 'Select a time', invalid = false, disabled = false, accessibilityLabel, className, }) {
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
    const minutes = React.useMemo(() => {
        const step = Math.max(1, Math.min(60, Math.round(minuteStep)));
        const out = [];
        for (let m = 0; m < 60; m += step)
            out.push(m);
        return out;
    }, [minuteStep]);
    const current = value ?? { h: 0, m: 0 };
    const pick = (next) => onChange?.(next);
    const column = (label, items, active, onPick) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "pb-xs text-center text-xs font-semibold text-muted", children: label }), (0, jsx_runtime_1.jsx)("div", { className: "max-h-[200px] overflow-auto", children: items.map((n) => {
                    const isActive = n === active;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${label} ${n}`, "aria-pressed": isActive, onClick: () => onPick(n), className: (0, cn_1.cn)('block w-full rounded-[var(--xen-radius-md)] py-sm text-center text-base transition-colors', isActive
                            ? 'bg-primary font-bold text-on-primary'
                            : 'text-on-surface hover:bg-neutral-100'), children: pad(n) }, n));
                }) })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": accessibilityLabel, "aria-haspopup": "dialog", "aria-expanded": open, "aria-invalid": invalid || undefined, disabled: disabled, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)('flex w-full items-center justify-between bg-surface', 'border rounded-[var(--xen-radius-sm)] px-md py-sm text-base transition-colors', 'focus:outline-none focus:ring-1', invalid
                    ? 'border-danger focus:border-danger focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-primary', 'disabled:pointer-events-none disabled:opacity-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: value ? 'text-on-surface' : 'text-muted', children: value ? `${pad(current.h)}:${pad(current.m)}` : placeholder }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm text-muted", children: "\u25BE" })] }), open ? ((0, jsx_runtime_1.jsxs)("div", { className: "absolute z-50 mt-1 w-60 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md shadow-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-md", children: [column('Hour', hours, current.h, (h) => pick({ h, m: current.m })), column('Min', minutes, current.m, (m) => pick({ h: current.h, m }))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Done", onClick: () => setOpen(false), className: "mt-md w-full rounded-[var(--xen-radius-md)] bg-primary py-sm text-center text-base font-semibold text-on-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Done" })] })) : null] }));
}
//# sourceMappingURL=TimePicker.js.map