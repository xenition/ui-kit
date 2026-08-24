"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowButton = FollowButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("../primitives/Button");
const DEFAULT_LABELS = {
    follow: 'Follow',
    following: 'Following',
    requested: 'Requested',
};
// `follow` reads as the primary CTA; once connected/pending it de-emphasizes
// to a bordered secondary so "unfollow"/"cancel" is a deliberate second tap.
const VARIANT = {
    follow: 'primary',
    following: 'secondary',
    requested: 'secondary',
};
/**
 * Follow / Following / Requested toggle built on the primitive `Button`. The
 * three states cover public follow, an already-following relationship, and a
 * pending request to a private account. Stateless — the parent owns `state`
 * and flips it in `onPress`. Token-only via `Button`.
 */
function FollowButton({ state = 'follow', size = 'sm', loading = false, disabled = false, onPress, labels, style, }) {
    const label = labels?.[state] ?? DEFAULT_LABELS[state];
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: VARIANT[state], size: size, loading: loading, disabled: disabled, accessibilityLabel: label, accessibilityState: { selected: state !== 'follow' }, onPress: onPress ? () => onPress(state) : undefined, style: style, children: label }));
}
//# sourceMappingURL=FollowButton.js.map