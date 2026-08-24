/**
 * The theme compiler: `compileTheme(seed)` — a deterministic, pure function
 * that turns a ~5-value {@link ThemeSeed} into a full {@link CompiledTheme}.
 *
 * Guarantees:
 * - Deterministic: the same seed always deep-equals the same output.
 * - Validated: malformed seeds throw descriptive errors, never "best-effort".
 * - Readable: every semantic `onX`/`X` pair passes WCAG AA (≥ 4.5:1) in both
 *   light and dark mode — enforced by `ensureContrast`, which cannot fail.
 */
import { CompiledTheme, ThemeSeed } from './types';
/** Minimum WCAG contrast enforced for every semantic on-pair. */
export declare const MIN_CONTRAST = 4.5;
/**
 * Compile a {@link ThemeSeed} into a full {@link CompiledTheme}.
 *
 * Pure and deterministic — safe to run at build time, on the server, or in
 * the browser; the same seed always produces a deep-equal theme.
 *
 * @throws {Error} with a descriptive message if the seed is malformed.
 */
export declare function compileTheme(seed: ThemeSeed): CompiledTheme;
//# sourceMappingURL=compile.d.ts.map