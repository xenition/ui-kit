"use strict";
/**
 * Theme-layer types for `@xenition/ui`.
 *
 * A theme is authored as a tiny {@link ThemeSeed} (~5 values — the only thing
 * the LLM or a settings form ever writes) and compiled by `compileTheme()`
 * into a full {@link CompiledTheme}: 11-step color ramps, WCAG-AA-checked
 * semantic slots for light + dark, and radius/spacing/typography scales.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMP_STEPS = void 0;
/** The 11 ramp steps, lightest (50) to darkest (950). */
exports.RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
//# sourceMappingURL=types.js.map