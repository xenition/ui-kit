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
exports.VehicleHealthRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * Status → tone, word and glyph.
 *
 * `unknown` takes `neutral`, not a status colour: "we could not read this
 * sensor" is an absence of information, and painting it amber would tell the
 * driver something the vehicle never said.
 */
const HEALTH_META = {
    ok: { label: 'OK', tone: 'success', glyph: '✓', meter: 'success' },
    attention: { label: 'Attention', tone: 'warn', glyph: '!', meter: 'warn' },
    critical: { label: 'Critical', tone: 'danger', glyph: '✕', meter: 'danger' },
    unknown: { label: 'Unknown', tone: 'neutral', glyph: '?' },
};
/**
 * **V4 vehicle health row** — the web twin of the native
 * `VehicleHealthRowV4`, same props as {@link VehicleHealthRow} plus
 * `statusLabels` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line.**
 * 2. **Status is a word and a glyph, not a tint.** A row of coloured dots down
 *    a diagnostics list is unreadable to a colour-blind driver, who is the one
 *    user this screen exists for.
 * 3. **`unknown` stops borrowing a status colour** — see {@link HEALTH_META}.
 * 4. **The reading is tabular** and the ink is the contrast-corrected slot.
 *
 * **Renders nothing without a `system`** (§4.5).
 */
exports.VehicleHealthRowV4 = React.forwardRef(function VehicleHealthRowV4({ system, status = 'ok', reading, glyph, percent, variant = 'default', statusLabels, last = false, className, ...rest }, ref) {
    if (!system)
        return null;
    const meta = HEALTH_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const pct = (0, fleet_v4_1.clampPercent)(percent);
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vehicle-health": status, "aria-label": (0, fleet_v4_1.metaLine)([system, word, reading, pct != null ? `${pct}%` : null]), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(!compact && pct != null), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph ?? meta.glyph, size: "lg", className: fleet_v4_1.TONE_INK[meta.tone] }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: system }), !compact && pct != null ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.meter ?? 'primary' })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [reading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text [font-variant-numeric:tabular-nums]", children: reading })) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] })] }));
});
//# sourceMappingURL=VehicleHealthRowV4.js.map