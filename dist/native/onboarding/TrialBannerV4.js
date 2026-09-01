"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialBannerV4 = TrialBannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
/** The tone's fill slot and its contrast-corrected ink. */
const TONE = {
    info: { fill: 'accent', ink: 'accentText' },
    warn: { fill: 'warn', ink: 'warnText' },
    success: { fill: 'success', ink: 'successText' },
};
/**
 * How far the tinted ground travels from `surface` toward the tone. Low, so
 * the banner stays a *note* and does not compete with the CTA below it.
 */
const GROUND_TINT = 0.12;
/** How solid the meter's unfilled track sits against the banner's ground. */
const TRACK_TINT = 0.24;
/** The meter's thickness, off the spacing scale rather than a picked number. */
const meterHeight = (xs) => xs;
/**
 * **V4 trial banner** — same props as {@link TrialBanner} plus `daysTotal`,
 * `formatDaysLeft`, `onDismiss` and `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Soft, not solid.** The base filled the whole strip with `colors.accent`
 *    (or `warn`, or `success`) at full saturation. Sat above a paywall, that is
 *    a second loud coloured block arguing with the CTA — and §5 gives the CTA
 *    that job alone. V4 tints the ground toward the tone and puts the copy in
 *    the tone's **contrast-corrected text slot**, which is how `AlertV4` and
 *    `CalloutV4` already draw the same idea.
 * 2. **The subtitle is a tone, not an opacity.** `opacity: 0.9` on ink is a
 *    contrast reduction the compiler cannot see and no measurement accounts
 *    for. `mutedText` is the slot that means "secondary" and carries a promise.
 * 3. **The countdown can show its position.** With `daysTotal`, a meter draws
 *    the fraction remaining. "2 days left" out of 3 and out of 30 are different
 *    facts and the base rendered them identically.
 * 4. **The copy is the host's.** `formatDaysLeft` replaces the hard-coded
 *    English plural, and `dismissLabel` names the new control.
 *
 * **There is still no `TrialBannerV2`/`V3` line split** — a strip this small has
 * one correct shape, and `design-line-composition` documents that from the
 * other side. This V4 is the same shape, corrected.
 */
function TrialBannerV4({ title, subtitle, daysLeft, daysTotal, tone = 'info', actionLabel, onActionPress, icon = '✨', formatDaysLeft, onDismiss, dismissLabel = 'Dismiss', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const slot = TONE[tone];
    const fill = colors[slot.fill];
    const ink = colors[slot.ink];
    const ground = (0, v4_depth_1.mixToken)(colors.surface, fill, GROUND_TINT);
    const track = (0, v4_depth_1.mixToken)(ground, fill, TRACK_TINT);
    const days = typeof daysLeft === 'number' ? Math.max(0, daysLeft) : null;
    const countdown = days === null
        ? null
        : (formatDaysLeft ?? ((n) => `${n} ${n === 1 ? 'day' : 'days'} left`))(days);
    // A meter only means something when both ends are known and the total is
    // real; `daysLeft` above `daysTotal` would draw an over-full bar.
    const total = typeof daysTotal === 'number' && daysTotal > 0 ? daysTotal : null;
    const fraction = days !== null && total !== null ? Math.min(1, days / total) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                gap: tokens.spacing.sm,
                backgroundColor: ground,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg", style: { color: ink } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: subtitle })) : null] }), countdown ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.full,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            backgroundColor: colors.surface,
                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", numeric: "tabular", style: { color: ink }, children: countdown }) })) : null, actionLabel && onActionPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, onPress: onActionPress, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: ink, textDecorationLine: 'underline' }, children: actionLabel }) })) : null, onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: dismissLabel, onPress: onDismiss, style: ({ pressed }) => ({
                            width: (0, chrome_v4_1.minTap)(tokens.spacing),
                            height: (0, chrome_v4_1.minTap)(tokens.spacing),
                            marginVertical: -tokens.spacing.sm,
                            marginRight: -tokens.spacing.sm,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "base", color: "mutedText" }) })) : null] }), fraction !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: total, now: days }, style: {
                    height: meterHeight(tokens.spacing.xs),
                    borderRadius: tokens.radius.full,
                    backgroundColor: track,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${fraction * 100}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: fill,
                    } }) })) : null] }));
}
//# sourceMappingURL=TrialBannerV4.js.map