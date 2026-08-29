"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInScreenV3 = SignInScreenV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SignInScreen_1 = require("./SignInScreen");
/**
 * Sign-in / register — **V3, compact** (§11).
 *
 * No hero panel and no `3xl` display headline. The brand tile moves onto the
 * **same row** as an `xl` headline, so the identity and the ask occupy one
 * band instead of three, and the rows below tighten to `sm`/`md` rhythm. This
 * is the line for a bottom sheet, a modal, or a second-visit screen where the
 * user already knows what app they are in and wants the field, not the pitch.
 *
 * One deliberate difference from §5: the CTA sits **in flow** at the end of
 * the form rather than in a sticky footer. A sheet is sized to its content —
 * there is no scroll for the action to hide under, and pinning it would draw a
 * hairline across the bottom of a card that already has an edge. Everything
 * else about the button is unchanged: full width, 56 tall, `radius.full`,
 * trailing `→`.
 *
 * Same parts, same props, same 56px controls as the base line.
 */
function SignInScreenV3(props) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const parts = (0, SignInScreen_1.useSignInParts)(props, { headingSize: 'xl' });
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, props.style], children: (0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", contentContainerStyle: {
                flexGrow: 1,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [parts.brand, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: parts.heading })] }), parts.alert, parts.fields, parts.cta, parts.providers, parts.switchFooter] }) }));
}
//# sourceMappingURL=SignInScreenV3.js.map