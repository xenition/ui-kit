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
exports.AvailabilityPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const format_1 = require("./format");
function isSelected(value, start) {
    if (value == null)
        return false;
    const list = Array.isArray(value) ? value : [value];
    return list.some((d) => d.getTime() === start.getTime());
}
/**
 * A tap-to-book availability grid — bookable time slots laid out in a wrapping
 * grid, with disabled (blocked) slots rendered but not selectable. Each slot is
 * a real `<button>`; selection is exposed via `aria-checked` and a filled tile
 * (never color-alone). Includes empty + loading states. Token colors only.
 */
exports.AvailabilityPicker = React.forwardRef(function AvailabilityPicker({ slots = [], value = null, multiple = false, columns = 3, onSelect, loading = false, emptyLabel = 'No times available', className, ...rest }, ref) {
    const cols = Math.max(1, Math.floor(columns));
    const gridStyle = {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading times", className: (0, cn_1.cn)('grid gap-1', className), style: gridStyle, ...rest, children: Array.from({ length: cols * 2 }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-9 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }, i))) }));
    }
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", className: (0, cn_1.cn)('grid gap-1', className), style: gridStyle, ...rest, children: slots.map((slot, i) => {
            const selected = isSelected(value, slot.start);
            const disabled = slot.disabled === true;
            const text = slot.label ?? (0, format_1.clockLabel)(slot.start);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-label": text, "aria-checked": selected, disabled: disabled, onClick: () => onSelect?.(slot.start, slot), className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-sm)] border px-2 py-2 text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected
                    ? 'border-primary bg-primary text-on-primary font-bold'
                    : 'border-border bg-surface text-on-surface font-medium enabled:hover:bg-primary-50', disabled ? 'cursor-not-allowed bg-neutral-100 text-muted line-through opacity-60' : ''), children: text }, slot.start.toISOString() + i));
        }) }));
});
//# sourceMappingURL=AvailabilityPicker.js.map