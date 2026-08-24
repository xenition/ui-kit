"use strict";
/**
 * The three output targets of a compiled theme:
 *
 * 1. `toCssVars(theme)`      → CSS custom properties (web runtime).
 * 2. `toTailwindPreset(theme)` → a Tailwind preset whose values reference the
 *    CSS vars, so `bg-primary` / `text-on-surface` restyle live when the vars
 *    change — no rebuild.
 * 3. `toNativeTokens(theme)` → a plain nested object with **resolved** hex /
 *    numeric values for React Native (RN cannot read CSS vars).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCssVars = toCssVars;
exports.toTailwindPreset = toTailwindPreset;
exports.toNativeTokens = toNativeTokens;
const types_1 = require("./types");
const camelToKebab = (key) => key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const SEMANTIC_KEYS = [
    'surface',
    'onSurface',
    'primary',
    'onPrimary',
    'accent',
    'onAccent',
    'muted',
    'border',
    'success',
    'onSuccess',
    'warn',
    'onWarn',
    'danger',
    'onDanger',
    // The contrast-safe text forms. Emitted as --xen-primary-text and friends, so
    // the web side gets exactly what native gets — the list is hand-maintained, so
    // a token added to SemanticColors and not added here silently exists on native
    // and not on web, which is the parity break this kit's rules forbid.
    'primaryText',
    'accentText',
    'successText',
    'warnText',
    'dangerText',
];
function semanticVarLines(colors) {
    return SEMANTIC_KEYS.map((key) => `--xen-${camelToKebab(key)}: ${colors[key]};`);
}
function rampVarLines(name, ramp) {
    return types_1.RAMP_STEPS.map((step) => `--xen-${name}-${step}: ${ramp[step]};`);
}
/**
 * Mirror a ramp end-for-end (50 ↔ 950, 100 ↔ 900, …) — the dark-scheme
 * orientation. This is the same inversion the compiler applies before deriving
 * the dark semantic slots, so emitting inverted ramps keeps utility classes
 * (`bg-neutral-50`, `text-neutral-900`, …) in step with `surface`/`on-surface`
 * under `[data-theme="dark"]` instead of leaving them at their light values.
 */
function invertRamp(ramp) {
    const inverted = {};
    types_1.RAMP_STEPS.forEach((step, i) => {
        const mirror = types_1.RAMP_STEPS[types_1.RAMP_STEPS.length - 1 - i];
        inverted[step] = ramp[mirror];
    });
    return inverted;
}
/** The full ramp set in dark-scheme orientation (every ramp mirrored). */
function invertRamps(ramps) {
    return {
        primary: invertRamp(ramps.primary),
        accent: invertRamp(ramps.accent),
        neutral: invertRamp(ramps.neutral),
    };
}
const fontStack = (family) => `"${family}", ui-sans-serif, system-ui, sans-serif`;
/**
 * Render the theme as CSS custom properties.
 *
 * `:root` carries the base mode (dark when `seed.mode === 'dark'`, light
 * otherwise) plus ramps and scales. When `seed.mode === 'both'`, a
 * `[data-theme="dark"]` block overrides the semantic slots.
 *
 * Ramps are emitted in the scheme's orientation: light schemes use the ramps
 * as compiled, dark schemes emit the inverted ramps (`neutral-50` → the darkest
 * step, `neutral-900` → a light step) — matching how the dark semantic slots
 * are derived, so utility classes like `bg-neutral-50` track the dark surface.
 */
function toCssVars(theme) {
    const darkRoot = theme.seed.mode === 'dark';
    const rootColors = darkRoot ? theme.dark : theme.light;
    const rootRamps = darkRoot ? invertRamps(theme.ramps) : theme.ramps;
    const rootLines = [
        ...semanticVarLines(rootColors),
        ...rampVarLines('primary', rootRamps.primary),
        ...rampVarLines('accent', rootRamps.accent),
        ...rampVarLines('neutral', rootRamps.neutral),
        ...Object.entries(theme.radius).map(([key, px]) => `--xen-radius-${key}: ${px}px;`),
        ...Object.entries(theme.spacing).map(([key, px]) => `--xen-space-${key}: ${px}px;`),
        ...Object.entries(theme.typography.scale).map(([key, px]) => `--xen-text-${key}: ${px}px;`),
        `--xen-font-heading: ${fontStack(theme.typography.fontHeading)};`,
        `--xen-font-body: ${fontStack(theme.typography.fontBody)};`,
    ];
    let css = `:root {\n  ${rootLines.join('\n  ')}\n}`;
    if (theme.seed.mode === 'both') {
        const darkRamps = invertRamps(theme.ramps);
        const darkLines = [
            ...semanticVarLines(theme.dark),
            ...rampVarLines('primary', darkRamps.primary),
            ...rampVarLines('accent', darkRamps.accent),
            ...rampVarLines('neutral', darkRamps.neutral),
        ];
        css += `\n[data-theme="dark"] {\n  ${darkLines.join('\n  ')}\n}`;
    }
    return css;
}
function rampVarObject(name) {
    const out = {};
    for (const step of types_1.RAMP_STEPS) {
        out[String(step)] = `var(--xen-${name}-${step})`;
    }
    return out;
}
/**
 * Build a Tailwind preset bound to the theme's CSS variables. Because every
 * value is a `var(--xen-*)` reference, the preset itself is theme-agnostic at
 * build time — swapping the injected vars restyles the app without a rebuild.
 *
 * Usage in a generated app's `tailwind.config.js`:
 * `presets: [require('@xenition/ui/tailwind-preset').toTailwindPreset(theme)]`
 */
function toTailwindPreset(_theme) {
    const colors = {
        primary: { DEFAULT: 'var(--xen-primary)', ...rampVarObject('primary') },
        'on-primary': 'var(--xen-on-primary)',
        accent: { DEFAULT: 'var(--xen-accent)', ...rampVarObject('accent') },
        'on-accent': 'var(--xen-on-accent)',
        neutral: rampVarObject('neutral'),
        surface: 'var(--xen-surface)',
        'on-surface': 'var(--xen-on-surface)',
        // Aliases for the most common Tailwind naming (shadcn-style). Generated code and hand authors
        // reach for `bg-background`/`text-foreground`; map them to the kit's surface/on-surface so those
        // classes resolve instead of rendering unstyled.
        background: 'var(--xen-surface)',
        foreground: 'var(--xen-on-surface)',
        muted: 'var(--xen-muted)',
        border: 'var(--xen-border)',
        success: 'var(--xen-success)',
        'on-success': 'var(--xen-on-success)',
        warn: 'var(--xen-warn)',
        'on-warn': 'var(--xen-on-warn)',
        danger: 'var(--xen-danger)',
        'on-danger': 'var(--xen-on-danger)',
        // Contrast-safe TEXT forms: `text-primary-text`, `text-danger-text`, ...
        // `text-primary` still resolves to the fill, because that is what it has
        // always meant and changing it under existing markup would be worse than the
        // bug. New work colouring text with a brand or status colour wants these.
        'primary-text': 'var(--xen-primary-text)',
        'accent-text': 'var(--xen-accent-text)',
        'success-text': 'var(--xen-success-text)',
        'warn-text': 'var(--xen-warn-text)',
        'danger-text': 'var(--xen-danger-text)',
    };
    return {
        theme: {
            extend: {
                colors,
                borderRadius: {
                    sm: 'var(--xen-radius-sm)',
                    DEFAULT: 'var(--xen-radius-md)',
                    md: 'var(--xen-radius-md)',
                    lg: 'var(--xen-radius-lg)',
                    full: 'var(--xen-radius-full)',
                },
                spacing: {
                    xs: 'var(--xen-space-xs)',
                    sm: 'var(--xen-space-sm)',
                    md: 'var(--xen-space-md)',
                    lg: 'var(--xen-space-lg)',
                    xl: 'var(--xen-space-xl)',
                    '2xl': 'var(--xen-space-2xl)',
                },
                fontSize: {
                    xs: 'var(--xen-text-xs)',
                    sm: 'var(--xen-text-sm)',
                    base: 'var(--xen-text-base)',
                    lg: 'var(--xen-text-lg)',
                    xl: 'var(--xen-text-xl)',
                    '2xl': 'var(--xen-text-2xl)',
                    '3xl': 'var(--xen-text-3xl)',
                },
                fontFamily: {
                    heading: ['var(--xen-font-heading)'],
                    body: ['var(--xen-font-body)'],
                },
            },
        },
    };
}
/**
 * Flatten a compiled theme into plain resolved values (hex strings and px
 * numbers) for React Native `StyleSheet` consumption.
 */
function toNativeTokens(theme) {
    return {
        colors: {
            light: { ...theme.light },
            dark: { ...theme.dark },
        },
        ramps: {
            primary: { ...theme.ramps.primary },
            accent: { ...theme.ramps.accent },
            neutral: { ...theme.ramps.neutral },
        },
        radius: { ...theme.radius },
        spacing: { ...theme.spacing },
        typography: { ...theme.typography, scale: { ...theme.typography.scale } },
    };
}
//# sourceMappingURL=outputs.js.map