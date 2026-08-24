"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStartedButton = GetStartedButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const primitives_1 = require("../primitives");
/**
 * The primary onboarding call-to-action — a thin, opinionated wrapper over the
 * {@link Button} primitive that defaults to a large, full-width, outcome-worded
 * hero button. Exists so every entry screen (welcome, paywall, profile) ships
 * the same affordance without re-specifying size/width. All color and radius
 * come from the button primitive's tokens. No literal colors.
 */
function GetStartedButton({ onPress, label = 'Get started', variant = 'primary', size = 'lg', loading = false, disabled = false, fullWidth = true, style, }) {
    return ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: variant, size: size, loading: loading, disabled: disabled, onPress: onPress, accessibilityLabel: label, style: [fullWidth ? { alignSelf: 'stretch' } : null, style], children: label }));
}
//# sourceMappingURL=GetStartedButton.js.map