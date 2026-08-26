"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertV4 = AlertV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
/**
 * **V4 alert** — same props as {@link Alert}, a different design line.
 *
 * ## The colour IS the message
 *
 * `design.md` §35.4 is the whole brief here. An alert's red is not the alert
 * being styled red; it is the alert saying "this is dangerous". So V4 spends
 * exactly one colour decision on an alert — which tone — and refuses every
 * other one:
 *
 * - **No gradient.** Not even under a `depth` that has them. A tone that
 *   sweeps between two hues asks the reader which end was the meaning, and
 *   §35.11 keeps gradients for the hero and the one primary action anyway.
 * - **No shadow.** An alert is *in* the page, not above it. `elevation` would
 *   claim a layer the component does not occupy, and depth that lies about
 *   layer is decoration (§8).
 * - **`warn` is `warn`.** The base native alert routed `warn` to the `accent`
 *   token — a brand colour standing in for a caution, which is §35.4's exact
 *   prohibition, and which also disagreed with its own web twin. V4 uses the
 *   `warn` slot on both platforms.
 *
 * ## The tint owns its ground
 *
 * `subtle` is the default and the one people actually ship. The base painted it
 * `surface` with a coloured left rule; the web twin painted `bg-neutral-50`,
 * which is a different alert. V4 composites the tone into `surface`
 * **opaquely** at 10%, so the block carries its tone as a real colour — one
 * that does not change when the alert is dropped on a filled card, a glass
 * panel, or artwork, and one every label below can be measured against.
 *
 * The left rule survives, at full tone strength, because it is the fastest read
 * in the component: a 4px bar of colour at the start of a block is identified
 * before a single word is. It is held to 3:1, the bar WCAG sets for a non-text
 * boundary — pushing a rule to 4.5:1 would bleach the tone for no gain.
 *
 * Every piece of text is then re-measured with `ensureContrast` against the
 * fill this alert actually painted, rather than against the page it was
 * designed on.
 */
function AlertV4({ tone = 'info', variant = 'subtle', title, onClose, icon, action, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const slots = feedback_v4_1.TONE_SLOTS[tone];
    const toneFill = colors[slots.fill];
    let bg;
    let borderColor = colors.border;
    let borderWidth = 1;
    let ruleWidth = 0;
    if (variant === 'solid') {
        // The loudest form: the tone is the whole block, labelled with the pair
        // the compiler guarantees against it.
        bg = toneFill;
        borderWidth = 0;
        borderColor = 'transparent';
    }
    else if (variant === 'outline') {
        // A ring in the tone, on the ground the compiler measured `*Text` against.
        bg = colors.surface;
        borderColor = (0, color_1.ensureContrast)(toneFill, bg, feedback_v4_1.MIN_NON_TEXT_CONTRAST);
    }
    else {
        bg = (0, v4_depth_1.mixToken)(colors.surface, toneFill, feedback_v4_1.TINT);
        borderColor = colors.border;
        ruleWidth = tokens.spacing.xs;
    }
    const solid = variant === 'solid';
    // Measured against the fill above, not against `surface`.
    const titleColor = (0, color_1.ensureContrast)(colors[solid ? slots.on : slots.text], bg, compile_1.MIN_CONTRAST);
    const bodyColor = (0, color_1.ensureContrast)(colors[solid ? slots.on : 'onSurface'], bg, compile_1.MIN_CONTRAST);
    const closeColor = (0, color_1.ensureContrast)(colors[solid ? slots.on : 'mutedText'], bg, compile_1.MIN_CONTRAST);
    const ruleColor = (0, color_1.ensureContrast)(toneFill, bg, feedback_v4_1.MIN_NON_TEXT_CONTRAST);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: tone === 'danger' ? 'alert' : 'summary', style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                backgroundColor: bg,
                borderColor,
                borderWidth,
                borderLeftWidth: ruleWidth > 0 ? ruleWidth : borderWidth,
                borderLeftColor: ruleWidth > 0 ? ruleColor : borderColor,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontFamily: tokens.typography.fontHeading,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            color: titleColor,
                        }, children: title })) : (title)) : null, children != null ? (typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontFamily: tokens.typography.fontBody,
                            fontSize: tokens.typography.scale.sm,
                            color: bodyColor,
                        }, children: children })) : (children)) : null, action != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: action }) : null] }), onClose ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onClose, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: closeColor }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=AlertV4.js.map