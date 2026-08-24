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
exports.SlotPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
const COLUMN_CLASSES = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
};
const startOf = (s) => s == null ? null : typeof s === 'string' ? s : s.startsAt;
/**
 * Grid of bookable times for one day. Each slot is a real `<button>`; a full
 * slot (`spotsLeft === 0`) is disabled, and low remaining capacity surfaces a
 * "{n} left" hint. The selected slot is marked `aria-pressed`. Local times come
 * from the `formatTime` prop (default: timezone-aware). Token-only.
 */
exports.SlotPicker = React.forwardRef(function SlotPicker({ slots, onPick, selected, formatTime, timeZone, columns = 3, lowSpotsThreshold = 3, fullLabel = 'Full', className, ...rest }, ref) {
    const format = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selectedStart = startOf(selected);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", "data-xen-slot-picker": "", className: (0, cn_1.cn)('grid gap-[var(--xen-space-sm)]', COLUMN_CLASSES[columns], className), ...rest, children: slots.map((slot) => {
            const full = slot.spotsLeft <= 0;
            const isSelected = selectedStart === slot.startsAt;
            const low = !full && slot.spotsLeft <= lowSpotsThreshold;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-slot": "", "data-full": full ? 'true' : 'false', "aria-pressed": isSelected, disabled: full, onClick: () => onPick?.(slot), className: (0, cn_1.cn)('flex flex-col items-center rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-sm)] text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:cursor-not-allowed disabled:opacity-50', isSelected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface text-on-surface hover:border-primary hover:bg-primary-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium tabular-nums", children: format(slot.startsAt) }), (0, jsx_runtime_1.jsx)("span", { "data-xen-slot-spots": "", className: (0, cn_1.cn)('text-xs', isSelected ? 'text-on-primary' : 'text-muted'), children: full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open` })] }, slot.startsAt));
        }) }));
});
//# sourceMappingURL=SlotPicker.js.map