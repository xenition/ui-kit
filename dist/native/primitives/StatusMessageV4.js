"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessageV4 = StatusMessageV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
const SpinnerV4_1 = require("./SpinnerV4");
const DEFAULTS = {
    loading: 'Loading…',
    empty: 'Nothing here yet.',
    error: 'Something went wrong.',
};
/**
 * **V4 status message** — same props as {@link StatusMessage}, a different
 * design line.
 *
 * One component covering three of the states `design.md` §14 says every screen
 * owes the user. V4 treats them as three different jobs rather than three
 * colours of the same centred line of small grey text.
 *
 * ## `loading` — say only what is known
 *
 * `SpinnerV4` replaces the platform `ActivityIndicator`, which meant the base
 * could not honour Reduce Motion (§36.10) no matter what the user had set. The
 * spinner stays indeterminate: §36.7 forbids fabricating precision, and this
 * component has a message and nothing else — no fraction, no stages. A bar
 * here would be inventing a number.
 *
 * ## `empty` — an empty state that whispers is one the eye skips
 *
 * §15 is emphatic that an empty state must help the user progress: what belongs
 * here, why it matters, what to do next. The base rendered that copy in `muted`
 * at the small step — the *quietest* type in the kit for the one screen whose
 * entire purpose is to be read. V4 promotes it to `onSurface` at the base step.
 * Nothing else changes, because nothing else can: **these props carry no
 * action.** When an empty state has a next step, `ResultV4` is the component —
 * it takes `actionLabel`, and §15 is really a demand for a button.
 *
 * ## `error` — a failure needs a body
 *
 * The base drew red text in the middle of a void. Red text alone reads as a
 * caption; §38 asks an error to help recovery and it cannot do that unnoticed.
 * V4 gives it the feedback line's tinted panel — the `danger` tone composited
 * into `surface` at 10%, opaque so it holds its colour on any ground, with the
 * neutral hairline that says "container" (the tint already says which kind).
 * The label is the compiler's contrast-safe `dangerText`, re-measured against
 * that panel rather than against the page.
 */
function StatusMessageV4({ state, message, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xl,
        },
        style,
    ];
    if (state === 'loading') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", accessibilityLabel: message ?? DEFAULTS.loading, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "md" }) }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        fontFamily: tokens.typography.fontBody,
                        fontSize: tokens.typography.scale.sm,
                        color: colors.mutedText,
                        textAlign: 'center',
                    }, children: message })) : null] }));
    }
    if (state === 'error') {
        const panel = (0, v4_depth_1.mixToken)(colors.surface, colors[feedback_v4_1.TONE_SLOTS.danger.fill], feedback_v4_1.TINT);
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "alert", accessibilityLiveRegion: "assertive", style: container, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'stretch',
                    backgroundColor: panel,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        fontFamily: tokens.typography.fontBody,
                        fontSize: tokens.typography.scale.sm,
                        color: (0, color_1.ensureContrast)(colors[feedback_v4_1.TONE_SLOTS.danger.text], panel, compile_1.MIN_CONTRAST),
                        textAlign: 'center',
                    }, children: message ?? DEFAULTS.error }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                fontFamily: tokens.typography.fontBody,
                fontSize: tokens.typography.scale.base,
                color: colors.onSurface,
                textAlign: 'center',
            }, children: message ?? DEFAULTS.empty }) }));
}
//# sourceMappingURL=StatusMessageV4.js.map