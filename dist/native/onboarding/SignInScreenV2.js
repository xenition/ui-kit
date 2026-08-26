"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInScreenV2 = SignInScreenV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthCard_1 = require("../primitives/AuthCard");
const SignInScreen_1 = require("./SignInScreen");
/**
 * Sign-in / register — **V2, editorial** (§11).
 *
 * The base line stacks brand, headline and form down one column. V2 turns the
 * top of the screen into a full-bleed tinted panel that runs to the very edge
 * and carries the brand tile and headline, then lets the form sheet **rise
 * over it** — `radius.lg` on its top corners, `surface` fill, pulled up so it
 * overlaps the panel. The overlap is the whole idea: it reads as a card handed
 * to you rather than a form printed on a page, and it gives the headline
 * somewhere to sit that is not the same plane as the inputs.
 *
 * Same parts as the base line, same props, same 56px controls, same sticky
 * CTA (§5) — only the arrangement differs.
 */
function SignInScreenV2(props) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    const parts = (0, SignInScreen_1.useSignInParts)(props);
    /*
      §3's tinted ground. `ramps` are compiled in light orientation, so a dark
      scheme takes the mirrored step — the same swap WelcomeScreen makes — or the
      panel would glare white behind a dark headline.
    */
    const panelGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    // The sheet's overlap, in the same rhythm as everything else on the screen.
    const overlap = tokens.spacing.lg;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: panelGround }, props.style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { keyboardShouldPersistTaps: "handled", contentContainerStyle: { flexGrow: 1 }, style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            backgroundColor: panelGround,
                            paddingHorizontal: tokens.spacing.xl,
                            paddingTop: tokens.spacing['2xl'],
                            paddingBottom: tokens.spacing.xl + overlap,
                            gap: tokens.spacing.lg,
                        }, children: [parts.brand, parts.heading] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexGrow: 1,
                            marginTop: -overlap,
                            padding: tokens.spacing.xl,
                            gap: tokens.spacing.lg,
                            backgroundColor: colors.surface,
                            borderTopLeftRadius: tokens.radius.lg,
                            borderTopRightRadius: tokens.radius.lg,
                        }, children: [parts.alert, parts.fields, parts.providers, parts.switchFooter] })] }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthStickyFooter, { children: parts.cta })] }));
}
//# sourceMappingURL=SignInScreenV2.js.map