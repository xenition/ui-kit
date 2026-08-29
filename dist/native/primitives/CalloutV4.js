"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalloutV4 = CalloutV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
/**
 * **V4 callout** — same props as {@link Callout}, a different design line.
 *
 * ## An aside is not an alert
 *
 * The base callout drew a **full 1px ring in the tone colour**. A red box around
 * a tip and a red box around a failed payment are then the same object at the
 * same volume, and the reader learns that a red edge means nothing in
 * particular. `design.md` §35.6 asks colour to build hierarchy rather than
 * noise, and a component that spends `danger` on an aside has spent a meaning
 * the product may need later for a real one (§35.4).
 *
 * So V4 sets the feedback line's loudness by **tint depth, not by hue**:
 *
 * | component  | ground          | edge            |
 * | ---------- | --------------- | --------------- |
 * | `BannerV4` | the solid tone  | none, full bleed|
 * | `AlertV4`  | tone at 10%     | tone rule, 4px  |
 * | `CalloutV4`| tone at 6%      | neutral hairline|
 *
 * Three different volumes for three different jobs, all reading as one family
 * because they are made of the same two moves.
 *
 * The edge is `colors.border` — the neutral the provider already resolved for
 * this scheme — so the box says "this is a container" and the tint says which
 * kind, instead of both saying the same thing twice.
 *
 * ## `neutral` stays neutral
 *
 * The `neutral` tone gets **no tint at all**: plain `surface`, plain hairline, a
 * `muted` title. A note with no tone is not a faint warning, and giving it a
 * grey wash would only make a colourless thing look broken.
 *
 * ## Legibility
 *
 * The title takes the compiler's contrast-safe TEXT form of the tone — never
 * the fill, which is a background colour with no promise against `surface` and
 * which this kit has measured as low as 1.32:1 when used as a label. Both the
 * title and the body are then re-measured against the tint this callout
 * actually painted.
 */
function CalloutV4({ tone = 'info', icon, title, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const slots = feedback_v4_1.TONE_SLOTS[tone];
    // A note with no tone is not a faint warning — it gets no wash.
    const bg = tone === 'neutral' ? colors.surface : (0, v4_depth_1.mixToken)(colors.surface, colors[slots.fill], feedback_v4_1.TINT_ASIDE);
    const titleColor = (0, color_1.ensureContrast)(colors[slots.text], bg, compile_1.MIN_CONTRAST);
    const bodyColor = (0, color_1.ensureContrast)(colors.onSurface, bg, compile_1.MIN_CONTRAST);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                backgroundColor: bg,
                // Neutral, always. The tint says which kind of note this is; the edge
                // only says that it is one.
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontFamily: tokens.typography.fontHeading,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            color: titleColor,
                        }, children: title })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.sm,
                            color: bodyColor,
                        }, children: children })) : (children)] })] }));
}
//# sourceMappingURL=CalloutV4.js.map