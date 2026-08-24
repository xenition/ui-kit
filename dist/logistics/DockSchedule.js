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
exports.DockSchedule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * A dock-door appointment board: a door headline over a list of time-window
 * slots, each with a glyph + word status chip and an optional `CarrierBadge`.
 * Empty (no slots) and loading states are handled. Slots are clickable when
 * `onSelectSlot` is set (button role + label). All colors are theme tokens. Web
 * parity of the native `DockSchedule`.
 */
exports.DockSchedule = React.forwardRef(function DockSchedule({ dock, slots, onSelectSlot, loading = false, className, ...rest }, ref) {
    const list = Array.isArray(slots) ? slots : [];
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "outlined", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: dock }), !loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${list.length} ${list.length === 1 ? 'slot' : 'slots'}` })) : null] }), loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": "Loading dock schedule", className: "flex flex-col gap-[var(--xen-space-xs)]", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-10 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" }, i))) })) : list.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "No slots scheduled", className: "flex flex-col items-center gap-[var(--xen-space-xs)] py-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl text-muted", children: "\uD83C\uDD7F" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No slots scheduled" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: list.map((slot) => {
                    const meta = internal_1.DOCK_META[slot.status] ?? internal_1.DOCK_META.open;
                    const interactive = (0, internal_1.pressableProps)(onSelectSlot ? () => onSelectSlot(slot) : undefined);
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": interactive ? `${slot.window}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border-l-[3px] bg-neutral-100 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', internal_1.TONE_BORDER[meta.tone], interactive &&
                            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...interactive, children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-[92px] shrink-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: slot.window }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT[meta.tone]), children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-0.5", children: [slot.carrier ? (0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: slot.carrier, size: "sm" }) : null, slot.reference ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: slot.reference })) : null] })] }, slot.id));
                }) }))] }));
});
//# sourceMappingURL=DockSchedule.js.map