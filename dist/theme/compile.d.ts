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
import { CompiledTheme, ThemeSeed, StateLayerTokens, MotionTokens, RingTokens } from './types';
/** Minimum WCAG contrast enforced for every semantic on-pair. */
export declare const MIN_CONTRAST = 4.5;
/**
 * Material Design 3's state-layer opacities and motion scale, used verbatim.
 *
 * Source: `material-components/material-web`, tokens v0_192, fetched
 * 2026-08-26. These are not invented and should not be tuned — the value of
 * an industry scale is that it is the same everywhere, and a component that
 * picks its own 0.09 has thrown that away for nothing.
 */
export declare const STATE_LAYERS: StateLayerTokens;
export declare const RING: RingTokens;
export declare const MOTION: MotionTokens;
export declare function compileTheme(seed: ThemeSeed): CompiledTheme;
//# sourceMappingURL=compile.d.ts.map