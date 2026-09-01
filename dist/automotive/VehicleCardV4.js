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
exports.VehicleCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const fleet_v4_1 = require("./internal/fleet-v4");
const STATUS_META = {
    available: { label: 'Available', tone: 'success' },
    'in-use': { label: 'In use', tone: 'primary' },
    maintenance: { label: 'Maintenance', tone: 'warn' },
    offline: { label: 'Offline', tone: 'neutral' },
};
/**
 * **V4 vehicle card** — the web twin of the native `VehicleCardV4`, same props
 * as {@link VehicleCard} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The plate is boxed and tabular.** A registration is an identifier a
 *    user matches against a real car in a car park; the base set it as
 *    ordinary caption text among the other specs.
 * 2. **The spec list is a real `<dl>`**, announced as label/value pairs.
 * 3. **An interactive card is a `<button>`**, not a div with `role="button"`.
 * 4. **The skeleton is opaque** and the ground is `card`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.VehicleCardV4 = React.forwardRef(function VehicleCardV4({ name, plate, vehicleClass, color, year, status = 'available', specs = [], variant = 'default', statusLabels, onClick, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [55, 35].map((w) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-4', fleet_v4_1.SKELETON_CLASS), style: { width: `${w}%` } }, w))) }));
    }
    if (!name)
        return null;
    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const compact = variant === 'compact';
    const caption = (0, fleet_v4_1.metaLine)([vehicleClass, color, year]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] }), plate ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-sm self-start rounded-[var(--xen-radius-sm)] border border-border px-sm py-xs text-sm font-bold text-on-card [font-variant-numeric:tabular-nums]", children: plate })) : null, !compact && specs.length > 0 ? ((0, jsx_runtime_1.jsx)("dl", { className: "mt-md flex flex-wrap gap-md", children: specs.map((spec) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs text-muted-text", children: spec.label }), (0, jsx_runtime_1.jsx)("dd", { className: "text-sm font-semibold text-on-card [font-variant-numeric:tabular-nums]", children: spec.value })] }, spec.label))) })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-vehicle-card": status, className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-vehicle-card": status, className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, fleet_v4_1.metaLine)([name, plate, word, caption]), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=VehicleCardV4.js.map