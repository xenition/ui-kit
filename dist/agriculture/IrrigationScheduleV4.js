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
exports.IrrigationScheduleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const SwitchV4_1 = require("../primitives/SwitchV4");
const farm_v4_1 = require("./internal/farm-v4");
/** Run state → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META = {
    scheduled: { label: 'Scheduled', tone: 'neutral' },
    running: { label: 'Running', tone: 'primary' },
    done: { label: 'Done', tone: 'success' },
    skipped: { label: 'Skipped', tone: 'warn' },
};
/**
 * **V4 irrigation schedule** — the web twin of the native
 * `IrrigationScheduleV4`, same props as {@link IrrigationSchedule} plus
 * `stateLabels` and `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The per-zone toggle is `SwitchV4`.** The base drew its own, so the one
 *    control on this card a user actually operates did not match the switches
 *    anywhere else in the product — different size, different travel, no focus
 *    ring.
 * 2. **A disabled zone dims at M3's 0.38** and carries `aria-disabled`, rather
 *    than only losing colour.
 * 3. **The empty state gets a description**, not just a title, so a schedule
 *    with nothing in it explains itself.
 * 4. **The rows are a real `<ul>`**, and captions take `muted-text`.
 *
 * Still fully controlled: `onToggle` reports, the component stores nothing.
 */
exports.IrrigationScheduleV4 = React.forwardRef(function IrrigationScheduleV4({ slots, title = 'Irrigation', onToggle, emptyTitle = 'No runs scheduled', emptyDescription = 'Zones you schedule will appear here.', stateLabels, className, ...rest }, ref) {
    const list = Array.isArray(slots) ? slots : [];
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-irrigation-schedule": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCA6", size: "base" }), (0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 text-base font-semibold text-on-card", children: title })] }), list.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs py-md text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-card", children: emptyTitle }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: emptyDescription })] })) : ((0, jsx_runtime_1.jsx)("ul", { children: list.map((slot, i) => {
                    const state = slot.state ?? 'scheduled';
                    const meta = STATE_META[state];
                    const label = stateLabels?.[state] ?? meta.label;
                    const enabled = slot.enabled ?? true;
                    const caption = (0, farm_v4_1.metaLine)([slot.time, slot.duration]);
                    const last = i === list.length - 1;
                    return ((0, jsx_runtime_1.jsxs)("li", { "aria-disabled": !enabled || undefined, className: (0, cn_1.cn)('flex items-center gap-sm py-sm', !last && 'border-b border-border', 
                        // A disabled zone keeps its box and loses its ink.
                        !enabled && 'opacity-[0.38]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-card", children: slot.zone }), caption ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: caption })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label }), onToggle ? ((0, jsx_runtime_1.jsx)(SwitchV4_1.SwitchV4, { checked: enabled, onCheckedChange: (next) => onToggle(slot.id, next), "aria-label": slot.zone })) : null] }, slot.id));
                }) }))] }));
});
//# sourceMappingURL=IrrigationScheduleV4.js.map