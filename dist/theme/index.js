"use strict";
/**
 * `@xenition/ui/theme` — seed-token theme compiler.
 *
 * ```ts
 * import { compileTheme, toCssVars } from '@xenition/ui/theme';
 *
 * const theme = compileTheme({
 *   primary: '#7C3AED',
 *   neutral: 'warm',
 *   font: { heading: 'Inter', body: 'Inter' },
 *   shape: 'rounded',
 *   mode: 'both',
 * });
 * const css = toCssVars(theme);
 * ```
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitAlpha = exports.composeGlassCss = exports.composeGlass = exports.GLASS_SURFACE_MIX = exports.toNativeTokens = exports.toTailwindPreset = exports.toCssVars = exports.MIN_CONTRAST = exports.compileTheme = exports.ensureContrast = exports.contrastRatio = exports.relativeLuminance = exports.hslToHex = exports.hexToHsl = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.isValidHex = void 0;
__exportStar(require("./types"), exports);
var color_1 = require("./color");
Object.defineProperty(exports, "isValidHex", { enumerable: true, get: function () { return color_1.isValidHex; } });
Object.defineProperty(exports, "hexToRgb", { enumerable: true, get: function () { return color_1.hexToRgb; } });
Object.defineProperty(exports, "rgbToHex", { enumerable: true, get: function () { return color_1.rgbToHex; } });
Object.defineProperty(exports, "rgbToHsl", { enumerable: true, get: function () { return color_1.rgbToHsl; } });
Object.defineProperty(exports, "hslToRgb", { enumerable: true, get: function () { return color_1.hslToRgb; } });
Object.defineProperty(exports, "hexToHsl", { enumerable: true, get: function () { return color_1.hexToHsl; } });
Object.defineProperty(exports, "hslToHex", { enumerable: true, get: function () { return color_1.hslToHex; } });
Object.defineProperty(exports, "relativeLuminance", { enumerable: true, get: function () { return color_1.relativeLuminance; } });
Object.defineProperty(exports, "contrastRatio", { enumerable: true, get: function () { return color_1.contrastRatio; } });
Object.defineProperty(exports, "ensureContrast", { enumerable: true, get: function () { return color_1.ensureContrast; } });
var compile_1 = require("./compile");
Object.defineProperty(exports, "compileTheme", { enumerable: true, get: function () { return compile_1.compileTheme; } });
Object.defineProperty(exports, "MIN_CONTRAST", { enumerable: true, get: function () { return compile_1.MIN_CONTRAST; } });
var outputs_1 = require("./outputs");
Object.defineProperty(exports, "toCssVars", { enumerable: true, get: function () { return outputs_1.toCssVars; } });
Object.defineProperty(exports, "toTailwindPreset", { enumerable: true, get: function () { return outputs_1.toTailwindPreset; } });
Object.defineProperty(exports, "toNativeTokens", { enumerable: true, get: function () { return outputs_1.toNativeTokens; } });
/*
  Composing the glass token into a panel fill. `GlassIntensity` is deliberately
  NOT re-exported here: it is already public from `@xenition/ui/primitives` via
  `GlassPanel`, and two `export *` barrels offering the same name make it
  ambiguous at the package root. The type lives in `./glass`; the component
  imports it from there and re-exports it, so there is exactly one definition.
*/
var glass_1 = require("./glass");
Object.defineProperty(exports, "GLASS_SURFACE_MIX", { enumerable: true, get: function () { return glass_1.GLASS_SURFACE_MIX; } });
Object.defineProperty(exports, "composeGlass", { enumerable: true, get: function () { return glass_1.composeGlass; } });
Object.defineProperty(exports, "composeGlassCss", { enumerable: true, get: function () { return glass_1.composeGlassCss; } });
Object.defineProperty(exports, "splitAlpha", { enumerable: true, get: function () { return glass_1.splitAlpha; } });
//# sourceMappingURL=index.js.map