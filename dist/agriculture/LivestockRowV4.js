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
exports.LivestockRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** Health → tone and default label. Genuinely a status, so the tones stay. */
const HEALTH_META = {
    healthy: { label: 'Healthy', tone: 'success' },
    monitor: { label: 'Monitor', tone: 'warn' },
    sick: { label: 'Sick', tone: 'danger' },
};
/**
 * **V4 livestock row** — the web twin of the native `LivestockRowV4`, same
 * props as {@link LivestockRow} plus `healthLabels`, `unknownCountLabel` and
 * `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding, hover
 *    fill and separator inset are the decisions every other row in the kit
 *    makes rather than this component's own.
 * 2. **The head count is tabular and formattable.** A column of pen counts
 *    that does not line up is a column nobody can scan, and `1,240` is not
 *    `1.240` everywhere.
 * 3. **Captions take `muted-text`**, the slot with a contrast promise.
 * 4. **Health is a badge word beside the tone**, never colour alone.
 *
 * **Renders nothing without a `species`** (§4.5).
 */
exports.LivestockRowV4 = React.forwardRef(function LivestockRowV4({ species, count, icon = '🐄', location, health = 'healthy', detail, healthLabels, unknownCountLabel = '—', formatCount, last = false, onClick, className, ...rest }, ref) {
    if (!species)
        return null;
    const meta = HEALTH_META[health];
    const label = healthLabels?.[health] ?? meta.label;
    const shownCount = typeof count === 'number' ? (formatCount ?? String)(count) : unknownCountLabel;
    const caption = (0, farm_v4_1.metaLine)([location, detail]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-livestock-row": "", "data-xen-v4-chrome": onClick ? 'on-surface' : undefined, role: onClick ? 'button' : undefined, onClick: onClick, "aria-label": onClick ? [species, shownCount, caption, label].filter(Boolean).join(', ') : undefined, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(caption)), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: species }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: shownCount }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] })] }));
});
//# sourceMappingURL=LivestockRowV4.js.map