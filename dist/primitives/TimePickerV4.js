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
exports.TimePickerV4 = TimePickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const v4_state_1 = require("./internal/v4-state");
const cn_1 = require("./cn");
const picker_v4_1 = require("./internal/picker-v4");
const useDismiss_1 = require("./useDismiss");
const pad = (n) => String(n).padStart(2, '0');
/**
 * **V4 time field** — the web twin of `TimePickerV4`, the same props as
 * {@link TimePicker}, a different design line.
 *
 * ## Two columns, because that is what a time picker is
 *
 * §31: hours on the left, minutes on the right, scroll and click. Every
 * platform's time picker is some version of this, and inventing a dial or a
 * text mask here would only mean the user has to learn our one. What changes is
 * the size of the things being clicked and how obviously the current time is
 * marked.
 *
 * ## The changes
 *
 * 1. **Rows you can hit.** The base row is `py-sm` around a line of text —
 *    roughly 30px, well under the 44px floor, in a list where the neighbouring
 *    row is a different minute. Every row here is `--xen-space-2xl` tall. That
 *    is the single change that makes the control stop feeling like a lottery.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment: the same
 *    minimum height, the same `md` radius, and the same `box-shadow` halo, so
 *    focusing costs no layout (§36.11). The field stays ringed while its
 *    popover is open.
 * 3. **A selection that survives dark mode.** The active hour and minute are
 *    filled `primary` with `on-primary` ink — the pair the compiler
 *    contrast-checks. Hover is a `color-mix` against `--xen-surface`, never
 *    `hover:bg-neutral-100`, which is a light-oriented ramp step in both
 *    schemes and flashes near-white on a dark page.
 * 4. **A confirm button that says what it does.** `Done` is `primary`, at the
 *    same tap-target height as everything else.
 *
 * The popover floats on `--xen-elevation-card` with its hairline, takes glass
 * only when the seed asked for `depth: 'glass'`, and drops its entrance under
 * `prefers-reduced-motion` (§36.10).
 */
function TimePickerV4({ value, onChange, minuteStep = 5, placeholder = 'Select a time', invalid = false, disabled = false, accessibilityLabel, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const glass = (0, picker_v4_1.useDepth)() === 'glass';
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
    const column = (label, items, active, onPick) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "pb-xs text-center text-xs font-semibold text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("div", { className: "max-h-[calc(var(--xen-space-2xl)_*_5)] overflow-auto", children: items.map((n) => {
                    const isActive = n === active;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${label} ${n}`, "aria-pressed": isActive, onClick: () => onPick(n), "data-xen-v4-hover": isActive ? undefined : '', className: (0, cn_1.cn)('flex w-full items-center justify-center rounded-[var(--xen-radius-md)] text-base', 'h-[var(--xen-space-2xl)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', isActive ? 'bg-primary font-bold text-on-primary' : 'text-on-surface'), children: pad(n) }, n));
                }) })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-v4-field": invalid ? 'invalid' : '', "data-open": open ? 'true' : undefined, "aria-label": accessibilityLabel, "aria-haspopup": "dialog", "aria-expanded": open, "aria-invalid": invalid || undefined, disabled: disabled, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)(picker_v4_1.FIELD_CLASS, 'justify-between text-left disabled:pointer-events-none disabled:opacity-[0.38]'), style: {
                    '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
                }, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate', value ? 'text-on-surface' : 'text-muted-text'), children: value ? `${pad(current.h)}:${pad(current.m)}` : placeholder }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted-text", children: "\u25BE" })] }), open ? ((0, jsx_runtime_1.jsxs)("div", { role: "dialog", "aria-label": "Choose a time", "data-xen-v4-pop": "card", "data-glass": glass ? 'true' : undefined, className: "absolute z-50 mt-xs w-[calc(var(--xen-space-2xl)_*_5)] p-md text-on-surface", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-md", children: [column('Hour', hours, current.h, (h) => onChange?.({ h, m: current.m })), column('Min', minutes, current.m, (m) => onChange?.({ h: current.h, m }))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Done", "data-xen-v4-state": "", onClick: () => setOpen(false), className: (0, cn_1.cn)('mt-md flex w-full items-center justify-center rounded-[var(--xen-radius-md)]', 'h-[var(--xen-space-2xl)] bg-primary text-base font-semibold text-on-primary', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: "Done" })] })) : null] }));
}
//# sourceMappingURL=TimePickerV4.js.map