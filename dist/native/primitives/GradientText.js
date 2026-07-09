"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientText = GradientText;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Ramp-driven emphasis text — the native mirror of the web `GradientText`.
 *
 * React Native has no `background-clip: text`, so true clipped-gradient text
 * requires a `MaskedView` + `expo-linear-gradient` composition. The kit does
 * **not** pull in `@react-native-masked-view/masked-view`, so native uses a
 * **tasteful solid-token fallback**: the text is painted with the ramp's mid
 * (500) step — the same hue the gradient centers on — so it reads as the
 * "energy word" and restyles from the seed alone. The `angle` prop is accepted
 * for parity but has no visual effect here. (`expo-linear-gradient` is used for
 * real gradient *surfaces* — e.g. the commerce cover placeholder.)
 */
function GradientText({ ramp = 'primary-accent', angle: _angle, style, children, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    // Center the fallback on the ramp the gradient starts from.
    const color = ramp === 'accent' || ramp === 'accent-primary'
        ? tokens.ramps.accent[500]
        : tokens.ramps.primary[500];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: [{ color, fontWeight: '700' }, style], children: children }));
}
//# sourceMappingURL=GradientText.js.map