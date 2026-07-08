"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_CONTRAST = void 0;
exports.compileTheme = compileTheme;
const color_1 = require("./color");
const types_1 = require("./types");
/** Minimum WCAG contrast enforced for every semantic on-pair. */
exports.MIN_CONTRAST = 4.5;
/** Hue rotation applied to `primary` when no `accent` seed is given. */
const ACCENT_HUE_ROTATION = 40;
/** Target lightness per ramp step (light-mode orientation). */
const RAMP_LIGHTNESS = {
    50: 97,
    100: 93,
    200: 85,
    300: 75,
    400: 64,
    500: 54,
    600: 46,
    700: 38,
    800: 30,
    900: 22,
    950: 13,
};
/** Small hue + saturation bias that tints the gray ramp per temperature. */
const NEUTRAL_BASE = {
    warm: { h: 35, s: 6 },
    cool: { h: 220, s: 8 },
    pure: { h: 0, s: 0 },
};
/** Fixed status hues (light-mode lightness; dark mode inverts lightness). */
const STATUS = {
    success: { h: 152, s: 60, l: 36 },
    warn: { h: 42, s: 92, l: 44 },
    danger: { h: 4, s: 72, l: 44 },
};
const RADIUS = {
    sharp: { sm: 0, md: 0, lg: 0, full: 0 },
    rounded: { sm: 4, md: 8, lg: 16, full: 9999 },
    pill: { sm: 8, md: 16, lg: 24, full: 9999 },
};
const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 };
const TYPE_SCALE = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30 };
const NEUTRALS = ['warm', 'cool', 'pure'];
const SHAPES = ['sharp', 'rounded', 'pill'];
const MODES = ['light', 'dark', 'both'];
function validateSeed(seed) {
    if (typeof seed !== 'object' || seed === null) {
        throw new Error('compileTheme: seed must be an object (see ThemeSeed).');
    }
    if (!(0, color_1.isValidHex)(seed.primary)) {
        throw new Error(`compileTheme: seed.primary must be a hex color like "#7C3AED", got ${JSON.stringify(seed.primary)}.`);
    }
    if (seed.accent !== undefined && !(0, color_1.isValidHex)(seed.accent)) {
        throw new Error(`compileTheme: seed.accent must be a hex color like "#F59E0B" (or omitted), got ${JSON.stringify(seed.accent)}.`);
    }
    if (!NEUTRALS.includes(seed.neutral)) {
        throw new Error(`compileTheme: seed.neutral must be one of ${NEUTRALS.join(' | ')}, got ${JSON.stringify(seed.neutral)}.`);
    }
    if (!SHAPES.includes(seed.shape)) {
        throw new Error(`compileTheme: seed.shape must be one of ${SHAPES.join(' | ')}, got ${JSON.stringify(seed.shape)}.`);
    }
    if (!MODES.includes(seed.mode)) {
        throw new Error(`compileTheme: seed.mode must be one of ${MODES.join(' | ')}, got ${JSON.stringify(seed.mode)}.`);
    }
    if (typeof seed.font !== 'object' ||
        seed.font === null ||
        typeof seed.font.heading !== 'string' ||
        seed.font.heading.trim() === '' ||
        typeof seed.font.body !== 'string' ||
        seed.font.body.trim() === '') {
        throw new Error('compileTheme: seed.font must be { heading: string, body: string } with non-empty names.');
    }
}
/**
 * Build an 11-step ramp from a hue + saturation. Lightness follows the fixed
 * ladder; saturation is eased down at the very light end so tints stay soft.
 */
function buildRamp(h, s) {
    const ramp = {};
    for (const step of types_1.RAMP_STEPS) {
        const sat = step <= 100 ? s * 0.5 : step <= 200 ? s * 0.75 : s;
        ramp[step] = (0, color_1.hslToHex)({ h, s: sat, l: RAMP_LIGHTNESS[step] });
    }
    return ramp;
}
/** Mirror a ramp end-for-end (50 ↔ 950, 100 ↔ 900, …) — the dark-mode ramp. */
function invertRamp(ramp) {
    const inverted = {};
    types_1.RAMP_STEPS.forEach((step, i) => {
        const mirror = types_1.RAMP_STEPS[types_1.RAMP_STEPS.length - 1 - i];
        inverted[step] = ramp[mirror];
    });
    return inverted;
}
/**
 * Derive the semantic slots from a ramp set. The same formula produces both
 * modes: dark mode passes inverted ramps (and inverted status lightness), so
 * "step 50" is always "closest to the surface" and "900" is "highest ink".
 */
function deriveSemantics(ramps, mode) {
    const statusLightness = (l) => (mode === 'light' ? l : 100 - l);
    const surface = ramps.neutral[50];
    const primary = ramps.primary[600];
    const accent = ramps.accent[600];
    const success = (0, color_1.hslToHex)({ ...STATUS.success, l: statusLightness(STATUS.success.l) });
    const warn = (0, color_1.hslToHex)({ ...STATUS.warn, l: statusLightness(STATUS.warn.l) });
    const danger = (0, color_1.hslToHex)({ ...STATUS.danger, l: statusLightness(STATUS.danger.l) });
    return {
        surface,
        onSurface: (0, color_1.ensureContrast)(ramps.neutral[900], surface, exports.MIN_CONTRAST),
        primary,
        onPrimary: (0, color_1.ensureContrast)('#ffffff', primary, exports.MIN_CONTRAST),
        accent,
        onAccent: (0, color_1.ensureContrast)('#ffffff', accent, exports.MIN_CONTRAST),
        muted: ramps.neutral[600],
        border: ramps.neutral[200],
        success,
        onSuccess: (0, color_1.ensureContrast)('#ffffff', success, exports.MIN_CONTRAST),
        warn,
        onWarn: (0, color_1.ensureContrast)('#ffffff', warn, exports.MIN_CONTRAST),
        danger,
        onDanger: (0, color_1.ensureContrast)('#ffffff', danger, exports.MIN_CONTRAST),
    };
}
/**
 * Compile a {@link ThemeSeed} into a full {@link CompiledTheme}.
 *
 * Pure and deterministic — safe to run at build time, on the server, or in
 * the browser; the same seed always produces a deep-equal theme.
 *
 * @throws {Error} with a descriptive message if the seed is malformed.
 */
function compileTheme(seed) {
    validateSeed(seed);
    const primaryHsl = (0, color_1.hexToHsl)(seed.primary);
    const accentHsl = seed.accent !== undefined
        ? (0, color_1.hexToHsl)(seed.accent)
        : { ...primaryHsl, h: (primaryHsl.h + ACCENT_HUE_ROTATION) % 360 };
    const ramps = {
        primary: buildRamp(primaryHsl.h, primaryHsl.s),
        accent: buildRamp(accentHsl.h, accentHsl.s),
        neutral: buildRamp(NEUTRAL_BASE[seed.neutral].h, NEUTRAL_BASE[seed.neutral].s),
    };
    const darkRamps = {
        primary: invertRamp(ramps.primary),
        accent: invertRamp(ramps.accent),
        neutral: invertRamp(ramps.neutral),
    };
    return {
        seed: { ...seed, font: { ...seed.font } },
        ramps,
        light: deriveSemantics(ramps, 'light'),
        dark: deriveSemantics(darkRamps, 'dark'),
        radius: { ...RADIUS[seed.shape] },
        spacing: { ...SPACING },
        typography: {
            fontHeading: seed.font.heading,
            fontBody: seed.font.body,
            scale: { ...TYPE_SCALE },
        },
    };
}
//# sourceMappingURL=compile.js.map