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
exports.IrrigationSchedule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATE_META = {
    scheduled: { label: 'Scheduled', tone: 'neutral' },
    running: { label: 'Running', tone: 'primary' },
    done: { label: 'Done', tone: 'success' },
    skipped: { label: 'Skipped', tone: 'warn' },
};
/**
 * An irrigation schedule — a titled {@link Card} listing zone runs (zone, time,
 * duration) each with a run-state {@link Badge} and an enable {@link Switch}.
 * The enabled state rides the switch's a11y `checked` state (not color), and the
 * run state is stated as text. Toggling fires `onToggle(id, next)`. When `slots`
 * is empty an {@link EmptyState} stands in. Rows are keyed + indexed defensively.
 * Token-bound throughout — no literal colors.
 */
exports.IrrigationSchedule = React.forwardRef(function IrrigationSchedule({ slots, title = 'Irrigation', onToggle, emptyTitle = 'No irrigation scheduled', className, ...rest }, ref) {
    const list = Array.isArray(slots) ? slots : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-irrigation-schedule": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDEBF", color: "primary", size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: title })] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA7", size: "2xl", color: "muted" }), title: emptyTitle, description: "Add a zone run to get started." }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: list.map((slot, i) => {
                    const meta = STATE_META[slot.state ?? 'scheduled'];
                    const enabled = slot.enabled ?? true;
                    const isLast = i === list.length - 1;
                    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-irrigation-slot": "", className: (0, cn_1.cn)('flex items-center gap-2 py-2', !isLast && 'border-b border-border', !enabled && 'opacity-60'), children: [slot.time != null ? ((0, jsx_runtime_1.jsx)("span", { className: "w-[52px] font-heading text-sm font-bold text-on-surface", children: slot.time })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: slot.zone }), slot.duration != null ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: slot.duration })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onCheckedChange: (next) => onToggle?.(slot.id, next), "aria-label": `${slot.zone} irrigation` })] }, slot.id ?? `slot-${i}`));
                }) }))] }));
});
//# sourceMappingURL=IrrigationSchedule.js.map