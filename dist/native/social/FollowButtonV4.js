"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowButtonV4 = FollowButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const Button_1 = require("../primitives/Button");
const theme_1 = require("../theme");
const DEFAULT_LABELS = {
    follow: 'Follow',
    following: 'Following',
    requested: 'Requested',
};
// V4 "feed" identity: one accent = primary. `follow` is the solid-primary CTA;
// `following` de-emphasizes to a soft-primary tint (a deliberate second tap to
// unfollow); `requested` reads muted while a private request is pending.
const VARIANT = {
    follow: 'primary',
    following: 'soft',
    requested: 'ghost',
};
/**
 * FollowButton — **V4** "feed" design. The clean pill toggle over Follow /
 * Following / Requested: `follow` is a solid-**primary** pill, `following` a
 * soft-primary tint, `requested` a muted state — one accent, big ≥44px tap
 * target, fully rounded. Stateless: the parent owns `state` and flips it in
 * `onPress`. Same props/behavior as {@link FollowButtonProps}; token-only via
 * the primitive `Button`. `accessibilityState.selected` marks the connected/
 * pending states.
 */
function FollowButtonV4({ state = 'follow', size = 'sm', loading = false, disabled = false, onPress, labels, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const label = labels?.[state] ?? DEFAULT_LABELS[state];
    const textKey = size === 'lg' ? 'lg' : size === 'md' ? 'base' : 'sm';
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: VARIANT[state], size: size, loading: loading, disabled: disabled, accessibilityLabel: label, accessibilityState: { selected: state !== 'follow' }, onPress: onPress ? () => onPress(state) : undefined, style: [
            { minHeight: 44, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.lg },
            state === 'requested' ? { borderWidth: 1, borderColor: colors.border } : null,
            style,
        ], children: state === 'requested' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }, children: label })) : (label) }));
}
//# sourceMappingURL=FollowButtonV4.js.map