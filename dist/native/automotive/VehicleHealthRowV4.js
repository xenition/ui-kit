"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleHealthRowV4 = VehicleHealthRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
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
 * **V4 vehicle health row** — same props as {@link VehicleHealthRow} plus
 * `statusLabels` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding and
 *    separator inset match every other row in the kit.
 * 2. **Status is a word and a glyph, not a tint.** A row of coloured dots down
 *    a diagnostics list is unreadable to a colour-blind driver, which is the
 *    one user this screen exists for.
 * 3. **`unknown` stops borrowing a status colour** — see {@link HEALTH_META}.
 * 4. **The reading is tabular** and the ink is the contrast-corrected slot.
 *
 * **Renders nothing without a `system`** (§4.5).
 */
function VehicleHealthRowV4({ system, status = 'ok', reading, glyph, percent, variant = 'default', statusLabels, last = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!system)
        return null;
    const meta = HEALTH_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const pct = (0, fleet_v4_1.clampPercent)(percent);
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, fleet_v4_1.metaLine)([system, word, reading, pct != null ? `${pct}%` : null]), style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: !compact && pct != null }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, {}) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph ?? meta.glyph, size: "lg", style: { color: (0, fleet_v4_1.toneInk)(theme, meta.tone) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: system }), !compact && pct != null ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.meter ?? 'primary' })) : null] }), reading ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: reading })) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] }));
}
//# sourceMappingURL=VehicleHealthRowV4.js.map