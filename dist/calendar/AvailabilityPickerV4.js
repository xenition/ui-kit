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
exports.AvailabilityPickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const grid_v4_1 = require("./internal/grid-v4");
/** Whole class names — Tailwind's scanner cannot follow `grid-cols-${n}`. */
const COLS = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
};
/**
 * **V4 availability picker** — the web twin of the native
 * `AvailabilityPickerV4`, same props as {@link AvailabilityPicker} plus
 * `locale` and `unavailableLabel`.
 *
 * ## Four changes
 *
 * 1. **Every chip clears 44** — on the one control this component is.
 * 2. **A disabled slot is a `disabled` button**, not a greyed live one.
 * 3. **The times are localized and tabular.**
 * 4. **Multi-select announces itself** — the chips become checkboxes rather
 *    than buttons, so a reader hears what selecting does.
 */
exports.AvailabilityPickerV4 = React.forwardRef(function AvailabilityPickerV4({ slots = [], value, multiple = false, columns = 3, locale, unavailableLabel = 'Unavailable', onSelect, loading = false, emptyLabel = 'No times available.', className, ...rest }, ref) {
    const grid = COLS[Math.max(2, Math.min(6, Math.floor(columns)))] ?? COLS[3];
    const timeFmt = React.useMemo(() => new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }), [locale]);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('grid gap-sm', grid, className), ...rest, children: Array.from({ length: 6 }, (_, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-11', grid_v4_1.SKELETON_CLASS) }, i))) }));
    }
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)("p", { ref: ref, className: (0, cn_1.cn)('p-md text-sm text-muted-text', className), ...rest, children: emptyLabel }));
    }
    const chosen = Array.isArray(value) ? value : value ? [value] : [];
    const isChosen = (start) => chosen.some((d) => d.getTime() === start.getTime());
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: multiple ? 'group' : 'radiogroup', "data-xen-availability-picker": "", className: (0, cn_1.cn)('grid gap-sm', grid, className), ...rest, children: slots.map((slot) => {
            const selected = isChosen(slot.start);
            const blocked = slot.disabled === true;
            const label = slot.label ?? timeFmt.format(slot.start);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-checked": selected, "aria-label": [label, blocked ? unavailableLabel : null].filter(Boolean).join(', '), disabled: blocked, onClick: () => onSelect?.(slot.start, slot), "data-xen-v4-chrome": selected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-md)] border px-sm text-sm font-semibold [font-variant-numeric:tabular-nums]', chrome_v4_1.MIN_TAP_CLASS, selected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-card text-on-card', blocked && 'opacity-[0.38]'), children: label }, slot.start.toISOString()));
        }) }));
});
//# sourceMappingURL=AvailabilityPickerV4.js.map