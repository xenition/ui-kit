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
exports.FieldCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const farm_v4_1 = require("./internal/farm-v4");
/** Status → tone and default label. Domain knowledge, so it stays here. */
const STATUS_META = {
    planted: { label: 'Planted', tone: 'success' },
    fallow: { label: 'Fallow', tone: 'neutral' },
    harvested: { label: 'Harvested', tone: 'primary' },
    preparing: { label: 'Preparing', tone: 'warn' },
};
/**
 * **V4 field card** — the web twin of the native `FieldCardV4`, same props as
 * {@link FieldCard} plus `statusLabels` and `formatArea`.
 *
 * ## Four changes
 *
 * 1. **An interactive card is a `<button>`**, not a `<div>` with
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler.
 * 2. **Hover is the shared state layer**, not a `hover:bg-neutral-50` ramp
 *    step that is near-white on a dark page.
 * 3. **Captions take `muted-text`**, the slot with a contrast promise.
 * 4. **The area is formatted, not concatenated**, and set tabular so a list of
 *    fields lines up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.FieldCardV4 = React.forwardRef(function FieldCardV4({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🗺️', variant = 'detailed', statusLabels, formatArea, onClick, className, ...rest }, ref) {
    if (!name)
        return null;
    const meta = STATUS_META[status];
    const label = statusLabels?.[status] ?? meta.label;
    const detailed = variant === 'detailed';
    const format = formatArea ?? ((a, u) => (u ? `${a} ${u}` : String(a)));
    const areaText = area != null ? format(area, areaUnit) : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: detailed ? '2xl' : 'xl' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), areaText ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted-text [font-variant-numeric:tabular-nums]", children: areaText })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), detailed && (crop != null || soilType != null || location != null) ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-sm text-xs text-muted-text", children: (0, farm_v4_1.metaLine)([crop, soilType, location]) })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-field-card": "", className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-field-card": "", className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": [name, areaText, label].filter(Boolean).join(', '), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=FieldCardV4.js.map