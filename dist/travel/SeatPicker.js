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
exports.SeatPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** [background, foreground, border] token classes per resolved status. */
const STATUS_CLASS = {
    available: 'bg-surface text-on-surface border-border',
    occupied: 'bg-border text-muted border-border',
    selected: 'bg-primary text-on-primary border-primary',
};
/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH = {
    available: '',
    occupied: '✕',
    selected: '✓',
};
/**
 * Web parity of the native `SeatPicker`: a cabin seat map — a grid of `<button>`
 * seats. Each seat announces its label and status via `aria-label`,
 * `aria-pressed` (selected) and `aria-disabled` (occupied) and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone. Occupied
 * seats are disabled and never fire `onSelect`. Selection is controlled via
 * `selectedIds`. Token-only colors.
 */
exports.SeatPicker = React.forwardRef(function SeatPicker({ rows, selectedIds = [], rowLabels, onSelect, maxSelectable, className, ...rest }, ref) {
    const selected = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const statusOf = (seat) => {
        if (seat.occupied)
            return 'occupied';
        return selected.has(seat.id) ? 'selected' : 'available';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-seat-picker": "", className: (0, cn_1.cn)('inline-flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [rows.map((seats, r) => {
                const rowLabel = rowLabels && r < rowLabels.length ? rowLabels[r] : String(r + 1);
                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 text-center text-xs text-muted", children: rowLabel }), seats.map((seat, c) => {
                            const status = statusOf(seat);
                            const label = seat.label ?? seat.id;
                            const disabled = status === 'occupied';
                            const glyph = STATUS_GLYPH[status];
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Seat ${label}, ${status === 'selected' ? 'selected' : status}`, "aria-pressed": status === 'selected', "aria-disabled": disabled, disabled: disabled, onClick: disabled ? undefined : () => onSelect?.(seat), className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-sm)] border text-xs font-semibold', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', STATUS_CLASS[status], disabled ? 'cursor-not-allowed opacity-60' : 'hover:opacity-90'), children: glyph || label }, seat.id || `seat-${r}-${c}`));
                        })] }, `row-${r}`));
            }), typeof maxSelectable === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `Selected ${selected.size} of ${maxSelectable}` })) : null] }));
});
//# sourceMappingURL=SeatPicker.js.map