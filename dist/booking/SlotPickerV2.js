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
exports.SlotPickerV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
/**
 * SlotPicker, redesigned (v2): **big time tiles**. Each slot is a large rounded
 * button showing the time and a low-spots hint; a full slot is disabled with a
 * "Full" note, and the chosen tile fills primary. Bolder than v1. Same props,
 * token-only.
 */
exports.SlotPickerV2 = React.forwardRef(function SlotPickerV2({ slots, onPick, selected, formatTime, timeZone, columns = 3, lowSpotsThreshold = 3, fullLabel = 'Full', className, ...rest }, ref) {
    const fmt = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selKey = selected == null ? null : typeof selected === 'string' ? selected : selected.startsAt;
    const colClass = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-4' : 'grid-cols-3';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-slot-picker": "", role: "group", "aria-label": "Available times", className: (0, cn_1.cn)('grid gap-2', colClass, className), ...rest, children: slots.map((slot) => {
            const full = slot.spotsLeft <= 0;
            const selectedSlot = selKey === slot.startsAt;
            const low = !full && slot.spotsLeft <= lowSpotsThreshold;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": selectedSlot, "aria-label": `${fmt(slot.startsAt)}${full ? `, ${fullLabel}` : low ? `, ${slot.spotsLeft} left` : ''}`, disabled: full, onClick: () => onPick?.(slot), className: (0, cn_1.cn)('flex flex-col items-center justify-center rounded-lg border-2 py-3 text-sm font-semibold transition-colors', full ? 'border-border text-muted opacity-50' : selectedSlot ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: [(0, jsx_runtime_1.jsx)("span", { children: fmt(slot.startsAt) }), full ? (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-normal", children: fullLabel }) : low ? (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-[10px] font-normal', selectedSlot ? 'text-on-primary' : 'text-warn'), children: [slot.spotsLeft, " left"] }) : null] }, slot.startsAt));
        }) }));
});
//# sourceMappingURL=SlotPickerV2.js.map