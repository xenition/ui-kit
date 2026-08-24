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

export { toTailwindPreset, toTailwindPreset as default } from '../theme/outputs';
export type { TailwindPreset } from '../theme/outputs';
