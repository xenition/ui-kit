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
exports.TourSchedulerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * TourScheduler — **V4** "listing" design (web parity of the native V4). The
 * editorial take on the tour scheduler: an elevated, rounded card with a date
 * line, a grid (or list) of soft-primary time-slot pills — the selected pill
 * fills solid primary — sized to a ≥44px tap target, plus a request/confirm
 * button. Same props/behavior as {@link TourSchedulerProps}: works controlled
 * (`selectedId`) or uncontrolled; the confirm button stays disabled until an
 * available slot is chosen, then fires `onSchedule` with it. Empty `slots`
 * degrades to the shared `EmptyState`. Selection is conveyed via `aria-pressed`,
 * not color alone. All colors come from the `--xen-*` tokens — no literal colors.
 */
exports.TourSchedulerV4 = React.forwardRef(function TourSchedulerV4({ title = 'Schedule a tour', dateLabel, slots, selectedId, onSelectSlot, onSchedule, confirmLabel = 'Schedule tour', variant = 'grid', loading = false, className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(undefined);
    const active = selectedId ?? internal;
    const shell = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), dateLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: dateLabel }) : null] }), children] }));
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
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, "aria-pressed": isSelected, "aria-label": `${slot.label}${disabled ? ', unavailable' : isSelected ? ', selected' : ''}`, onClick: () => handleSelect(slot), className: (0, cn_1.cn)('inline-flex min-h-[44px] items-center justify-center rounded-[var(--xen-radius-md)] border px-4 py-2 text-sm font-semibold', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', variant === 'grid' && 'min-w-[88px] text-center', disabled && 'opacity-40', isSelected
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-primary/20 bg-primary/10 text-on-surface'), children: slot.label }, slot.id));
                }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: !selectedSlot || loading, onClick: () => {
                    if (selectedSlot)
                        onSchedule?.(selectedSlot);
                }, children: confirmLabel })] }));
});
//# sourceMappingURL=TourSchedulerV4.js.map