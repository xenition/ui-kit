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
exports.SlotPickerV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
/**
 * SlotPicker, redesigned (v3): a **compact time-chip wrap**. Small rounded time
 * pills flow inline; a full slot dims, and the chosen pill fills primary — a dense
 * picker for tight layouts. The opposite of v2's big tiles. Same props,
 * token-only. (`columns` is accepted for parity.)
 */
exports.SlotPickerV3 = React.forwardRef(function SlotPickerV3({ slots, onPick, selected, formatTime, timeZone, columns, lowSpotsThreshold = 3, fullLabel = 'Full', className, ...rest }, ref) {
    void columns;
    const fmt = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selKey = selected == null ? null : typeof selected === 'string' ? selected : selected.startsAt;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-slot-picker": "", role: "group", "aria-label": "Available times", className: (0, cn_1.cn)('flex flex-wrap gap-1.5', className), ...rest, children: slots.map((slot) => {
            const full = slot.spotsLeft <= 0;
            const selectedSlot = selKey === slot.startsAt;
            const low = !full && slot.spotsLeft <= lowSpotsThreshold;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": selectedSlot, "aria-label": `${fmt(slot.startsAt)}${full ? `, ${fullLabel}` : low ? `, ${slot.spotsLeft} left` : ''}`, disabled: full, onClick: () => onPick?.(slot), className: (0, cn_1.cn)('rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors', full ? 'border-border text-muted opacity-50' : selectedSlot ? 'border-primary bg-primary text-on-primary' : 'border-border text-on-surface hover:bg-neutral-50'), children: [fmt(slot.startsAt), low && !full ? (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('ml-1 text-[10px] font-normal', selectedSlot ? 'text-on-primary' : 'text-warn'), children: ["\u00B7 ", slot.spotsLeft] }) : null] }, slot.startsAt));
        }) }));
});
//# sourceMappingURL=SlotPickerV3.js.map