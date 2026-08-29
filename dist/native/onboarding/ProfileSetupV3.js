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
exports.ProfileSetupV3 = ProfileSetupV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 56 is the field/CTA height, 44 the minimum tap target. */
const FIELD_HEIGHT = 56;
const TAP_TARGET = 44;
/**
 * Profile setup — V3, the compact line. No hero panel: a small badge sits beside
 * a left-aligned headline, and the avatar drops to an inline row — thumbnail,
 * name, "Add photo" — the way an account settings row reads. The fields keep
 * their §6 geometry (56, `radius.lg`, leading icon, error border **and**
 * message) because shrinking a text field is how you get a form nobody can tap;
 * what gets denser is the space between things, not the things themselves.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
function ProfileSetupV3({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, subtitle, avatarActionLabel = 'Add photo', progress, onBack, onDismiss, error, style, }) {
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
    const [focusedId, setFocusedId] = React.useState(null);
    const showHeader = onBack != null || onDismiss != null || progress != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: TAP_TARGET,
                            height: TAP_TARGET,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: tintedGround,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "user", size: "lg", color: "primary" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", numberOfLines: 2, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Change profile photo", onPress: onEditAvatar, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    minHeight: TAP_TARGET,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUri, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: name ?? avatarActionLabel }) }), (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "camera", size: "base", color: "primary" })] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: fields.map((field) => {
                    const focused = focusedId === field.id;
                    const invalid = field.error != null && field.error !== '';
                    const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.sm,
                                    height: FIELD_HEIGHT,
                                    paddingHorizontal: tokens.spacing.md,
                                    borderRadius: tokens.radius.lg,
                                    borderWidth: 1,
                                    borderColor,
                                    backgroundColor: colors.surface,
                                }, children: [field.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: field.icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: field.label, placeholder: field.placeholder ?? field.label, placeholderTextColor: colors.muted, keyboardType: field.keyboard ?? 'default', value: values[field.id] ?? '', onChangeText: (t) => onChangeField?.(field.id, t), onFocus: () => setFocusedId(field.id), onBlur: () => setFocusedId((current) => (current === field.id ? null : current)), style: {
                                            flex: 1,
                                            height: FIELD_HEIGHT,
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.base,
                                        } })] }), invalid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: field.error })] })) : null] }, field.id));
                }) })) : null, error ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "error", size: "sm", color: "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "dangerText", children: error })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: 'auto',
                    alignSelf: 'stretch',
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingTop: tokens.spacing.sm,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: saveLabel, trailingArrow: false, loading: loading, onPress: onSave }), skipLabel && onSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: skipLabel, onPress: onSkip, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "medium", tone: "muted", children: skipLabel }) })) : null] })] }));
}
//# sourceMappingURL=ProfileSetupV3.js.map