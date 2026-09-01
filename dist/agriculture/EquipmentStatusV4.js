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
exports.EquipmentStatusV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const farm_v4_1 = require("./internal/farm-v4");
/** State → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META = {
    operational: { label: 'Operational', tone: 'success' },
    idle: { label: 'Idle', tone: 'neutral' },
    maintenance: { label: 'Maintenance', tone: 'warn' },
    offline: { label: 'Offline', tone: 'danger' },
};
/**
 * **V4 equipment status** — the web twin of the native `EquipmentStatusV4`,
 * same props as {@link EquipmentStatus} plus `stateLabels` and
 * `lowFuelThreshold`.
 *
 * ## Four changes
 *
 * 1. **The low-fuel threshold is a prop.** 20% was a constant inside the
 *    component, and it is a fleet decision, not a design-system one.
 * 2. **An interactive card is a `<button>`**, with the shared hover layer.
 * 3. **The state's ink is the contrast-corrected slot** — `*-text` — where the
 *    base put the fill slots directly on text.
 * 4. **The fuel and hours figures are tabular**, so a column of machines lines
 *    up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.EquipmentStatusV4 = React.forwardRef(function EquipmentStatusV4({ name, type, icon = '🚜', state = 'operational', fuelPct, fuelLabel = 'Fuel', hours, stateLabels, lowFuelThreshold = 20, onClick, className, ...rest }, ref) {
    if (!name)
        return null;
    const meta = STATE_META[state];
    const label = stateLabels?.[state] ?? meta.label;
    const pct = (0, farm_v4_1.clampPercent)(fuelPct);
    const lowFuel = pct != null && pct < lowFuelThreshold;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), type != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted-text", children: type }) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), pct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: fuelLabel }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold [font-variant-numeric:tabular-nums]', lowFuel ? farm_v4_1.TONE_INK.warn : 'text-on-card'), children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: lowFuel ? 'warn' : 'primary' })] })) : null, hours != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-sm flex items-center gap-xs text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "clock", size: "xs" }), hours] })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-equipment-status": "", className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-equipment-status": "", className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": [name, type, label].filter(Boolean).join(', '), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=EquipmentStatusV4.js.map