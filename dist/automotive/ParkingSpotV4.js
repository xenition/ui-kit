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
exports.ParkingSpotV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
const STATUS_META = {
    available: { label: 'Available', tone: 'success', glyph: 'P' },
    occupied: { label: 'Occupied', tone: 'danger', glyph: '✕' },
    reserved: { label: 'Reserved', tone: 'warn', glyph: '★' },
    disabled: { label: 'Out of service', tone: 'neutral', glyph: '—' },
};
/**
 * **V4 parking spot** — the web twin of the native `ParkingSpotV4`, same props
 * as {@link ParkingSpot} plus `statusLabels`, `formatRate` and `evLabel`.
 *
 * ## Four changes
 *
 * 1. **The disc's glyph uses its *paired* ink** (`TONE_ON`). The base painted
 *    the disc `bg-[tone]` and its glyph `text-on-primary` regardless, and the
 *    compiler guarantees nothing about that pairing.
 * 2. **An unavailable spot is a `disabled` button**, not a live one. The base
 *    left `occupied` and `disabled` fully clickable.
 * 3. **Status is a word beside the colour.**
 * 4. **The rate is tabular** and the EV marker is announced.
 *
 * **Renders nothing without a `spotId`** (§4.5).
 */
exports.ParkingSpotV4 = React.forwardRef(function ParkingSpotV4({ spotId, level, status = 'available', priceCentsPerHour, currency = 'USD', distanceLabel, evCharging = false, variant = 'tile', statusLabels, formatRate, evLabel = 'EV charging', onSelect, className, ...rest }, ref) {
    if (!spotId)
        return null;
    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const tile = variant === 'tile';
    const unavailable = status === 'occupied' || status === 'disabled';
    const selectable = status === 'available' && Boolean(onSelect);
    const rate = typeof priceCentsPerHour === 'number'
        ? (formatRate ?? ((p) => `${p}/hr`))((0, money_1.formatMoney)(priceCentsPerHour, currency))
        : null;
    const caption = (0, fleet_v4_1.metaLine)([level, distanceLabel, evCharging ? evLabel : null]);
    const name = (0, fleet_v4_1.metaLine)([spotId, word, caption, rate]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-base font-bold', chrome_v4_1.MIN_TAP_CLASS, fleet_v4_1.TONE_BG[meta.tone], 
                        // `TONE_ON`, not `text-on-primary`. The compiler guarantees
                        // `on-success` against `success` and nothing about the other.
                        fleet_v4_1.TONE_ON[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-card", children: spotId }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), evCharging ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "bolt", size: "sm", className: "text-primary-text" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word }), rate ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card [font-variant-numeric:tabular-nums]", children: rate })) : null] })] }));
    const shell = (0, cn_1.cn)('flex gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-left', tile ? 'flex-col items-start' : 'flex-row items-center', unavailable && 'opacity-[0.38]');
    if (!selectable) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-parking-spot": status, "aria-label": name, "aria-disabled": unavailable || undefined, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-parking-spot": status, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onSelect, "aria-label": name, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)(shell, 'w-full'), children: body }) }));
});
//# sourceMappingURL=ParkingSpotV4.js.map