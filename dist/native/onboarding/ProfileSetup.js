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
exports.ProfileSetup = ProfileSetup;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 — the height every field stands at (§6) and the height the sticky
  CTA matches (§5) — and 44, the minimum tap target for a header control or a
  text link (§7). Every colour, radius, gap and font size on this screen comes
  from the theme.
*/
const FIELD_HEIGHT = 56;
const TAP_TARGET = 44;
/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;
/**
 * Profile setup step — the "What should we call you?" screen, rebuilt to the
 * anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress ·
 * dismiss), the avatar editor sitting in the hero panel, a centred headline
 * block, the §6 field stack, and the sticky CTA footer.
 *
 * The old screen was a bare 40px box under a small left-aligned label with a
 * short flat button floating mid-page. Per §6 each field is now **56 tall** with
 * `radius.lg`, a 1px `border` that rises to `primary` on focus and to `danger`
 * on error, and a leading icon; per §5 the save action is a full-width button in
 * a footer band with a hairline divider above it and a muted "skip" link
 * beneath — never beside — it.
 *
 * Fully controlled: the host owns `values` and gets `(id, text)` callbacks.
 * Field access is guarded through the `values` map so a missing key renders
 * empty, never crashes, and an empty `fields` array renders the screen without
 * a form rather than a broken one. Every new prop is optional. No literal
 * colors.
 */
function ProfileSetup({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, subtitle, illustration, avatarActionLabel = 'Add photo', progress, onBack, onDismiss, error, style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    /*
      §3 asks for a "tinted ground" and names `primary[50]`. Taken literally that
      is wrong on native in dark mode: `toNativeTokens` copies the LIGHT
      orientation of the ramps into both schemes (unlike the emitted CSS vars,
      which invert), so `primary[50]` paints a near-white panel behind a
      near-black page. Read the dark end of the same ramp instead — still a
      compiled token, still scheme-correct.
    */
    const tintedGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const { height: screenHeight } = (0, react_native_1.useWindowDimensions)();
    const [focusedId, setFocusedId] = React.useState(null);
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'stretch',
                    aspectRatio: HERO_ASPECT,
                    maxHeight: screenHeight * HERO_MAX_SCREEN_FRACTION,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: tintedGround,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: tokens.spacing.lg,
                }, children: illustration ?? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Change profile photo", onPress: onEditAvatar, style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUri, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "camera", size: "sm", color: "primary" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "primary", children: avatarActionLabel })] })] })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, children: subtitle })) : null] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: fields.map((field) => {
                    const focused = focusedId === field.id;
                    const invalid = field.error != null && field.error !== '';
                    // Focus wins over nothing, error wins over focus: a field the user
                    // is fixing should still read as wrong until it is.
                    const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "onSurface", children: field.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.sm,
                                    height: FIELD_HEIGHT,
                                    paddingHorizontal: tokens.spacing.md,
                                    borderRadius: tokens.radius.lg,
                                    borderWidth: 1,
                                    borderColor,
                                    backgroundColor: colors.surface,
                                }, children: [field.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: field.icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: field.label, accessibilityState: { disabled: false }, placeholder: field.placeholder, placeholderTextColor: colors.muted, keyboardType: field.keyboard ?? 'default', value: values[field.id] ?? '', onChangeText: (t) => onChangeField?.(field.id, t), onFocus: () => setFocusedId(field.id), onBlur: () => setFocusedId((current) => (current === field.id ? null : current)), style: {
                                            flex: 1,
                                            height: FIELD_HEIGHT,
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.base,
                                        } })] }), invalid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: field.error })] })) : null] }, field.id));
                }) })) : null, error ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: 'auto',
                    alignSelf: 'stretch',
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: saveLabel, trailingArrow: false, loading: loading, onPress: onSave }), skipLabel && onSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: skipLabel, onPress: onSkip, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "medium", tone: "muted", children: skipLabel }) })) : null] })] }));
}
//# sourceMappingURL=ProfileSetup.js.map