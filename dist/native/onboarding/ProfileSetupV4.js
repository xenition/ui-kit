"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSetupV4 = ProfileSetupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AuthFieldV4_1 = require("../primitives/AuthFieldV4");
const AvatarV4_1 = require("../primitives/AvatarV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const GetStartedButtonV4_1 = require("./GetStartedButtonV4");
const flow_v4_1 = require("./internal/flow-v4");
/**
 * **V4 profile setup** — the base's props plus `fullScreen`,
 * `avatarAccessibilityLabel` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The fields are `AuthFieldV4`.** The base hand-rolled a `TextInput` with
 *    its own border, its own focus colour and its own 56 height, which is the
 *    exact drift the design-spec Addendum settled: the sign-in screen's fields
 *    and this screen's fields were two different controls in one funnel. §10.5
 *    — use the primitive.
 * 2. **An error is a message, not a red edge.** `AuthFieldV4` renders
 *    `ProfileField.error` as text under the field. The base tinted the border
 *    and stopped, which a colour-blind user cannot perceive at all.
 * 3. **The keyboard no longer sits on the CTA.** `fullScreen` puts the form in
 *    the shared shell with `keyboardShouldPersistTaps`, so the first tap after
 *    typing hits the button instead of dismissing the keyboard.
 * 4. **The avatar action takes a contrast-corrected tone** (`primaryText`) and
 *    a press layer, and its accessible name is a prop rather than a
 *    hard-coded English string.
 * 5. **The hero tint has no `scheme` branch** — `flowGrounds()` mixes it.
 *
 * The avatar editor is still this screen's own artwork in the §3 hero slot,
 * and `illustration` still replaces it. With no fields the screen is a hero, a
 * headline and a CTA, and composes fine.
 */
function ProfileSetupV4({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, subtitle, illustration, avatarActionLabel = 'Add photo', avatarAccessibilityLabel = 'Change profile photo', progress, onBack, onDismiss, error, fullScreen = false, ground = 'plain', accent = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, ground, accent);
    const avatarEditor = ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: avatarAccessibilityLabel, onPress: onEditAvatar, style: ({ pressed }) => ({
            alignItems: 'center',
            gap: tokens.spacing.sm,
            padding: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
        }), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUri, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "camera", size: "sm", style: { color: grounds.ink } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: grounds.ink }, children: avatarActionLabel })] })] }));
    const form = fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.md }, children: fields.map((field) => ((0, jsx_runtime_1.jsx)(AuthFieldV4_1.AuthFieldV4, { label: field.label, icon: field.icon, placeholder: field.placeholder, keyboardType: field.keyboard, error: field.error, value: values[field.id] ?? '', onChangeText: (text) => onChangeField?.(field.id, text) }, field.id))) })) : null;
    const formError = error ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "assertive", style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "error", size: "sm", color: "dangerText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "dangerText", style: { flexShrink: 1 }, children: error })] })) : null;
    const header = (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeaderV4, { onBack: onBack, onDismiss: onDismiss, progress: progress });
    const footer = ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowFooterV4, { secondaryLabel: onSkip ? skipLabel : undefined, onSecondary: onSkip, safeArea: fullScreen, children: (0, jsx_runtime_1.jsx)(GetStartedButtonV4_1.GetStartedButtonV4, { label: saveLabel, trailingArrow: false, loading: loading, onPress: onSave }) }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeroV4, { illustration: illustration ?? avatarEditor, grounds: grounds }), (0, jsx_runtime_1.jsx)(flow_v4_1.FlowHeadlineV4, { title: title, subtitle: subtitle }), form, formError] }));
    if (fullScreen) {
        return ((0, jsx_runtime_1.jsx)(flow_v4_1.FlowScreenV4, { grounds: grounds, center: false, keyboardAware: true, header: header, footer: footer, style: style, children: body }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [onBack != null || onDismiss != null || progress != null ? header : null, body, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 'auto', alignSelf: 'stretch' }, children: footer })] }));
}
//# sourceMappingURL=ProfileSetupV4.js.map