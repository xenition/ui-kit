"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PestAlertV4 = PestAlertV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * Severity → tone and default label.
 *
 * `critical` and `high` share `danger` deliberately: the tone scale has three
 * steps and the severity scale has four, and collapsing them at the top is
 * right — a colour that means "worse than the worst" does not exist, and the
 * **word** is what separates them.
 */
const SEVERITY_META = {
    low: { label: 'Low', tone: 'success' },
    moderate: { label: 'Moderate', tone: 'warn' },
    high: { label: 'High', tone: 'danger' },
    critical: { label: 'Critical', tone: 'danger' },
};
/** How far the alert's ground travels from the card toward its severity tone. */
const GROUND_TINT = 0.1;
/** The severity rail down the leading edge. 3px — a bar, not a hairline. */
const RAIL = 3;
/**
 * **V4 pest alert** — same props as {@link PestAlert} plus `severityLabels`,
 * `recommendationLabel` and `affectedLabel`.
 *
 * ## Four changes
 *
 * 1. **The severity reads without colour.** A tinted ground and a coloured
 *    glyph are both colour-only signals; V4 keeps them and adds the badge word
 *    and a leading rail, so severity survives greyscale and CVD.
 * 2. **The tint is mixed from resolved semantic colours**, so it lands on the
 *    correct side of the page in dark mode instead of being a pale wash.
 * 3. **The glyph and headings take the contrast-corrected ink**
 *    (`warnText`, `dangerText`) rather than the fill slots the base put on text.
 * 4. **The recommendation is labelled.** The base rendered it as a bare
 *    paragraph under the pest name, so the most actionable line on the card
 *    read as more description.
 *
 * **Renders nothing without a `pest`** (§4.5).
 */
function PestAlertV4({ pest, severity = 'moderate', affected, recommendation, detectedAt, icon = '🐛', actionLabel, onAction, severityLabels, recommendationLabel = 'Recommended action', affectedLabel = 'Affected', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!pest)
        return null;
    const meta = SEVERITY_META[severity];
    const label = severityLabels?.[severity] ?? meta.label;
    const ink = (0, farm_v4_1.toneInk)(theme, meta.tone);
    const fill = meta.tone === 'success' ? colors.success : meta.tone === 'warn' ? colors.warn : colors.danger;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: (0, v4_depth_1.mixToken)(colors.card, fill, GROUND_TINT),
                padding: tokens.spacing.md,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: RAIL,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: fill,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg", style: { color: ink } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", style: { flex: 1 }, children: pest }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), affected ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: affectedLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: affected })] })) : null, recommendation ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: recommendationLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: recommendation })] })) : null, detectedAt ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "clock", size: "xs", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: detectedAt })] })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onPress: onAction, accessibilityLabel: actionLabel, style: { alignSelf: 'flex-start' }, children: actionLabel })) : null] })] }));
}
//# sourceMappingURL=PestAlertV4.js.map