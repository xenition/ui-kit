"use strict";
/**
 * `@xenition/ui/tailwind-preset` — Tailwind preset bound to the `--xen-*`
 * CSS variables injected by `XenitionUIProvider` (or a build-time
 * `toCssVars` dump).
 *
 * ```js
 * // tailwind.config.js of a generated app
 * const { compileTheme } = require('@xenition/ui/theme');
 * const { toTailwindPreset } = require('@xenition/ui/tailwind-preset');
 * const seed = require('./theme.seed.json');
 *
 * module.exports = {
 *   presets: [toTailwindPreset(compileTheme(seed))],
 *   content: ['./src/**\/*.{ts,tsx}', './node_modules/@xenition/ui/**\/*.js'],
 * };
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.toTailwindPreset = void 0;
var outputs_1 = require("../theme/outputs");
Object.defineProperty(exports, "toTailwindPreset", { enumerable: true, get: function () { return outputs_1.toTailwindPreset; } });
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return outputs_1.toTailwindPreset; } });
//# sourceMappingURL=index.js.map