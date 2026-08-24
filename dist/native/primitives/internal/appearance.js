"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPEARANCES = void 0;
exports.appearanceStyle = appearanceStyle;
const color_1 = require("./color");
const elevation_1 = require("./elevation");
exports.APPEARANCES = [
    'classic',
    'elevated',
    'soft',
    'outline',
    'minimal',
    'filled',
];
/**
 * Container style for a card/row surface in the given appearance. Radius/padding
 * are intentionally NOT set here — the component owns those; this only decides
 * fill, border, and elevation, so it composes with any layout.
 */
function appearanceStyle(appearance, colors, tokens) {
    switch (appearance) {
        case 'elevated':
            return {
                backgroundColor: colors.surface,
                borderWidth: 0,
                ...(0, elevation_1.shadow)('md', tokens),
            };
        case 'soft':
            return {
                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                borderWidth: 1,
                borderColor: (0, color_1.withAlpha)(colors.primary, 0.14),
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                borderWidth: 1.5,
                borderColor: colors.border,
            };
        case 'minimal':
            return {
                backgroundColor: 'transparent',
                borderWidth: 0,
            };
        case 'filled':
            return {
                backgroundColor: tokens.ramps.neutral[100] ?? colors.surface,
                borderWidth: 0,
            };
        case 'classic':
        default:
            return {
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            };
    }
}
//# sourceMappingURL=appearance.js.map