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
exports.AvailabilityPickerV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const format_1 = require("./format");
/**
 * AvailabilityPicker, redesigned (v2): **big time tiles**. Each slot is a large
 * rounded button; disabled slots dim, and the chosen slot(s) fill primary. Bolder
 * than v1. Same props, token-only.
 */
exports.AvailabilityPickerV2 = React.forwardRef(function AvailabilityPickerV2({ slots, value, multiple = false, columns = 3, onSelect, loading = false, emptyLabel = 'No times available', className, ...rest }, ref) {
    const cols = Math.max(1, Math.trunc(columns));
    const colClass = cols === 2 ? 'grid-cols-2' : cols === 4 ? 'grid-cols-4' : 'grid-cols-3';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-availability-picker": "", "aria-busy": "true", className: (0, cn_1.cn)('grid gap-2', colClass, className), ...rest, children: Array.from({ length: 6 }).map((_, i) => (0, jsx_runtime_1.jsx)("div", { className: "h-11 animate-pulse rounded-lg bg-neutral-100" }, i)) });
    }
    if (!slots || slots.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDD50" }), title: emptyLabel, className: className, ...rest });
    }
    const selectedTimes = new Set((Array.isArray(value) ? value : value ? [value] : []).map((d) => d.getTime()));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-availability-picker": "", role: "group", "aria-label": "Available times", className: (0, cn_1.cn)('grid gap-2', colClass, className), ...rest, children: slots.map((slot, i) => {
            const selected = selectedTimes.has(slot.start.getTime());
            const label = slot.label ?? (0, format_1.clockLabel)(slot.start);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-checked": selected, "aria-label": label, disabled: slot.disabled, onClick: () => onSelect?.(slot.start, slot), className: (0, cn_1.cn)('flex h-11 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors', slot.disabled ? 'border-border text-muted opacity-50' : selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: label }, `${slot.start.getTime()}-${i}`));
        }) }));
});
//# sourceMappingURL=AvailabilityPickerV2.js.map