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
exports.AppointmentSlotV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const STATUS_META = {
    available: { label: 'Available', disabled: false },
    selected: { label: 'Selected', disabled: false },
    held: { label: 'On hold', disabled: true },
    booked: { label: 'Booked', disabled: true },
};
/**
 * **V4 appointment slot** — the web twin of the native `AppointmentSlotV4`,
 * same props as {@link AppointmentSlot} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **It clears 44.** A slot grid is the densest target in a booking flow and
 *    the base sized it by its padding alone.
 * 2. **A booked or held slot is a `disabled` button**, not a live one that
 *    reports the click.
 * 3. **The time is tabular**, so a column of slots has an edge to scan.
 * 4. **Hover and press are the shared chrome layers.**
 *
 * **Renders nothing without a `time`** (§4.5).
 */
exports.AppointmentSlotV4 = React.forwardRef(function AppointmentSlotV4({ time, status = 'available', meta, statusLabels, onClick, className, ...rest }, ref) {
    if (!time)
        return null;
    const info = STATUS_META[status];
    const word = statusLabels?.[status] ?? info.label;
    const selected = status === 'selected';
    const blocked = info.disabled;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-appointment-slot": status, "aria-pressed": selected, "aria-label": [time, word, meta].filter(Boolean).join(', '), disabled: blocked, onClick: onClick, "data-xen-v4-chrome": selected ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)] border px-md py-sm', chrome_v4_1.MIN_TAP_CLASS, selected
            ? 'border-primary bg-primary text-on-primary'
            : 'border-border bg-card text-on-card', blocked && 'opacity-[0.38]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold [font-variant-numeric:tabular-nums]", children: time }), meta ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', selected ? 'text-on-primary' : 'text-muted-text'), children: meta })) : null] }));
});
//# sourceMappingURL=AppointmentSlotV4.js.map