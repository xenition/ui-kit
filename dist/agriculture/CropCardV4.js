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
exports.CropCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const farm_v4_1 = require("./internal/farm-v4");
/** Stage → glyph, tone and default label. Domain knowledge, so it stays here. */
const STAGE_META = {
    seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
    growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
    flowering: { label: 'Flowering', glyph: '🌸', tone: 'accent' },
    mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
    harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};
/**
 * Health → tone. Genuinely a status — healthy is good and critical is bad — so
 * this is one of the places §5 of the brief *keeps* the status colours.
 */
const HEALTH_META = {
    healthy: { label: 'Healthy', tone: 'success' },
    stressed: { label: 'Stressed', tone: 'warn' },
    critical: { label: 'Critical', tone: 'danger' },
};
/**
 * **V4 crop card** — the web twin of the native `CropCardV4`, same props as
 * {@link CropCard} plus `progressLabel`, `stageLabels` and `healthLabels`.
 *
 * ## Five changes
 *
 * 1. **An interactive card is a `<button>`.** The base made a `<div>` into one
 *    with `role="button"`, `tabIndex` and a hand-written Enter/Space handler —
 *    three things a real button gives for free, and which that combination
 *    still gets wrong (no `:disabled`, no form semantics, no native focus
 *    behaviour on Safari).
 * 2. **The skeleton stops being a ramp step.** `bg-neutral-200` carries the
 *    light orientation in both schemes, so the loading state was a pale bar on
 *    a dark page.
 * 3. **Hover is the shared state layer**, not `hover:bg-neutral-50`.
 * 4. **The location and harvest captions carry icons**, not emoji glued into
 *    the string — `'📍 ' + fieldLabel` cannot be tinted and is read aloud by a
 *    screen reader as the emoji's name.
 * 5. **Captions take `muted-text`** and nine English strings became props.
 */
exports.CropCardV4 = React.forwardRef(function CropCardV4({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant = 'detailed', loading = false, progressLabel = 'Maturity', stageLabels, healthLabels, onClick, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-crop-card": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-4 w-3/5', farm_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('mt-2 h-3 w-2/5', farm_v4_1.SKELETON_CLASS) })] }));
    }
    if (!name)
        return null;
    const stageMeta = STAGE_META[stage];
    const stageLabel = stageLabels?.[stage] ?? stageMeta.label;
    const glyph = icon ?? stageMeta.glyph;
    const healthMeta = health ? HEALTH_META[health] : null;
    const healthLabel = health ? (healthLabels?.[health] ?? healthMeta.label) : null;
    const detailed = variant === 'detailed';
    const pct = (0, farm_v4_1.clampPercent)(progress);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: detailed ? '2xl' : 'xl' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), variety != null ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted-text", children: variety })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: stageMeta.tone, variant: "soft", size: "sm", children: stageLabel }), healthMeta ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: healthMeta.tone, variant: "soft", size: "sm", children: healthLabel })) : null] })] }), detailed && pct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: progressLabel }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold [font-variant-numeric:tabular-nums]', healthMeta ? farm_v4_1.TONE_INK[healthMeta.tone] : 'text-on-card'), children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: healthMeta ? healthMeta.tone : 'primary' })] })) : null, detailed && (fieldLabel != null || harvestLabel != null) ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex flex-wrap gap-md text-xs text-muted-text", children: [fieldLabel != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "location", size: "xs" }), fieldLabel] })) : null, harvestLabel != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "calendar", size: "xs" }), harvestLabel] })) : null] })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-crop-card": "", className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-crop-card": "", className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": [name, variety, stageLabel, healthLabel].filter(Boolean).join(', '), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=CropCardV4.js.map