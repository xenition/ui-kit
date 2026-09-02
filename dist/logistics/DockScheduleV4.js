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
exports.DockScheduleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * DockSchedule — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a dock-door appointment board: an elevated
 * rounded card with a soft shadow, a door headline with a slot count, and a list
 * of time-window slots. Each slot is a soft-primary well with a tone-toned
 * leading edge, a **tabular-nums** window, a glyph + word status (never color
 * alone), and an optional `CarrierBadge` + reference. Empty (no slots, via
 * `EmptyState`) and loading states are handled; slots are clickable when
 * `onSelectSlot` is set. Identical props/behavior to {@link DockScheduleProps}.
 * All colors from `--xen-*` token classes (no literals).
 */
exports.DockScheduleV4 = React.forwardRef(function DockScheduleV4({ dock, slots, onSelectSlot, loading = false, className, ...rest }, ref) {
    const list = Array.isArray(slots) ? slots : [];
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-dock-schedule": "", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: dock }), !loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: `${list.length} ${list.length === 1 ? 'slot' : 'slots'}` })) : null] }), loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": "Loading dock schedule", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-12 rounded-[var(--xen-radius-md)] bg-neutral-100" }, i))) })) : list.length === 0 ? ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-dock-empty": "", title: "No slots scheduled" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: list.map((slot) => {
                    const meta = internal_1.DOCK_META[slot.status] ?? internal_1.DOCK_META.open;
                    const interactive = (0, internal_1.pressableProps)(onSelectSlot ? () => onSelectSlot(slot) : undefined);
                    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-dock-slot": "", "aria-label": interactive ? `${slot.window}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border-l-[3px] bg-primary/5 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', internal_1.TONE_BORDER[meta.tone], interactive &&
                            'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...interactive, children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-[96px] shrink-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-sm font-semibold tabular-nums text-on-surface", children: slot.window }), (0, jsx_runtime_1.jsxs)("span", { className: "mt-0.5 flex items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT[meta.tone]), children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-0.5", children: [slot.carrier ? (0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: slot.carrier, size: "sm" }) : null, slot.reference ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: slot.reference }) : null] })] }, slot.id));
                }) }))] }));
});
//# sourceMappingURL=DockScheduleV4.js.map