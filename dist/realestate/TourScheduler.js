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
exports.TourScheduler = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * Web parity of the native `TourScheduler`: a grid (or list) of selectable time
 * slots plus a confirm button. Works controlled (`selectedId`) or uncontrolled;
 * the confirm button stays disabled until an available slot is chosen, then fires
 * `onSchedule` with it. Presentational: slots in, callbacks out, nothing fetches.
 * Empty `slots` degrades to the shared `EmptyState`. Selection is conveyed via
 * `aria-pressed`, not color alone. All colors come from the `--xen-*` tokens —
 * no literal colors.
 */
exports.TourScheduler = React.forwardRef(function TourScheduler({ title = 'Schedule a tour', dateLabel, slots, selectedId, onSelectSlot, onSchedule, confirmLabel = 'Schedule tour', variant = 'grid', loading = false, className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(undefined);
    const active = selectedId ?? internal;
    const shell = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 border border-border bg-surface p-[var(--xen-space-lg)]', 'rounded-[var(--xen-radius-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: title }), dateLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: dateLabel }) : null] }), children] }));
    if (slots.length === 0) {
        return shell((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "No tour times available", description: "Check back soon or request a custom time." }));
    }
    const selectedSlot = slots.find((s) => s.id === active);
    const handleSelect = (slot) => {
        if (slot.available === false)
            return;
        setInternal(slot.id);
        onSelectSlot?.(slot);
    };
    return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-2', variant === 'grid' ? 'flex-wrap' : 'flex-col'), children: slots.map((slot) => {
                    const disabled = slot.available === false;
                    const isSelected = slot.id === active;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, "aria-pressed": isSelected, "aria-label": `${slot.label}${disabled ? ', unavailable' : isSelected ? ', selected' : ''}`, onClick: () => handleSelect(slot), className: (0, cn_1.cn)('border px-3 py-2 text-sm font-semibold rounded-[var(--xen-radius-md)]', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', variant === 'grid' && 'min-w-[88px] text-center', disabled && 'opacity-40', isSelected
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-border bg-surface text-on-surface'), children: slot.label }, slot.id));
                }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: !selectedSlot || loading, onClick: () => {
                    if (selectedSlot)
                        onSchedule?.(selectedSlot);
                }, children: confirmLabel })] }));
});
//# sourceMappingURL=TourScheduler.js.map