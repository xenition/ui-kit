"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shadow = shadow;
/**
 * Elevation (drop-shadow) presets for the native layer — the missing "depth is a
 * token, not 750 judgements" scale flagged in the kit audit (Part B / E3).
 *
 * React Native shadows need a color; we derive it from the theme's neutral ramp
 * (`ramps.neutral[900]`, near-black) so no literal color is ever introduced —
 * the same token-purity discipline as `withAlpha`. Android reads `elevation`;
 * iOS/web read the `shadow*` fields, so every level sets both.
 */
const react_native_1 = require("react-native");
const SPEC = {
    none: null,
    sm: { offsetY: 1, radius: 2, opacity: 0.06, elevation: 1 },
    md: { offsetY: 3, radius: 8, opacity: 0.1, elevation: 4 },
    lg: { offsetY: 8, radius: 20, opacity: 0.14, elevation: 10 },
    xl: { offsetY: 16, radius: 32, opacity: 0.18, elevation: 18 },
};
/**
 * A token-bound RN shadow style for the given level. Spread onto a `View`'s
 * style: `style={[shadow('md', tokens), …]}`. `none` yields `{}`.
 *
 * The shadow color comes from the compiled neutral ramp so it tracks the theme
 * and stays token-pure; on Android the `elevation` field does the work.
 */
function shadow(level, tokens) {
    const spec = SPEC[level];
    if (!spec)
        return {};
    // Near-black from the neutral ramp — a real hex from the compiled theme, never a literal.
    const shadowColor = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? '#000000';
    if (react_native_1.Platform.OS === 'android') {
        return { elevation: spec.elevation };
    }
    return {
        shadowColor,
        shadowOffset: { width: 0, height: spec.offsetY },
        shadowOpacity: spec.opacity,
        shadowRadius: spec.radius,
        // Harmless on iOS; helps RN-web render a box-shadow.
        elevation: spec.elevation,
    };
}
//# sourceMappingURL=elevation.js.map