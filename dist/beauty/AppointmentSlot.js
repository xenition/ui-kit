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
exports.AppointmentSlot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_META = {
    available: { disabled: false },
    selected: { note: 'Selected', disabled: false },
    held: { note: 'On hold', disabled: true },
    booked: { note: 'Booked', disabled: true },
};
/**
 * A single bookable time slot rendered as a real `<button>`. `status` carries
 * the meaning (never color alone): `selected` fills with the primary and sets
 * `aria-pressed`; `held`/`booked` are disabled + labelled; `available` is an
 * outlined tap target. The accessible name always includes the status word.
 * Token-only colors.
 */
exports.AppointmentSlot = React.forwardRef(function AppointmentSlot({ time, status = 'available', meta, onClick, className, ...rest }, ref) {
    const info = STATUS_META[status] ?? STATUS_META.available;
    const isSelected = status === 'selected';
    const interactive = !info.disabled;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-appointment-slot": status, "aria-pressed": isSelected, "aria-disabled": info.disabled || undefined, disabled: info.disabled, onClick: interactive ? onClick : undefined, className: (0, cn_1.cn)('flex min-w-[84px] flex-col items-center justify-center gap-0.5 rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', isSelected
            ? 'border-primary bg-primary text-on-primary'
            : info.disabled
                ? 'border-border bg-neutral-100 text-muted'
                : 'border-primary bg-surface text-on-surface hover:bg-primary-50', info.disabled && 'cursor-not-allowed', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: time }), info.note ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isSelected ? 'text-on-primary' : status === 'held' ? 'text-warn' : 'text-muted'), children: info.note })) : meta ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs', isSelected ? 'text-on-primary' : 'text-muted'), children: meta })) : null] }));
});
//# sourceMappingURL=AppointmentSlot.js.map