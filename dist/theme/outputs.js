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
];
function semanticVarLines(colors) {
    return SEMANTIC_KEYS.map((key) => `--xen-${camelToKebab(key)}: ${colors[key]};`);
}
function rampVarLines(name, ramp) {
    return types_1.RAMP_STEPS.map((step) => `--xen-${name}-${step}: ${ramp[step]};`);
}
const fontStack = (family) => `"${family}", ui-sans-serif, system-ui, sans-serif`;
/**
 * Render the theme as CSS custom properties.
 *
 * `:root` carries the base mode (dark when `seed.mode === 'dark'`, light
 * otherwise) plus ramps and scales. When `seed.mode === 'both'`, a
 * `[data-theme="dark"]` block overrides the semantic slots.
 */
function toCssVars(theme) {
    const rootColors = theme.seed.mode === 'dark' ? theme.dark : theme.light;
    const rootLines = [
        ...semanticVarLines(rootColors),
        ...rampVarLines('primary', theme.ramps.primary),
        ...rampVarLines('accent', theme.ramps.accent),
        ...rampVarLines('neutral', theme.ramps.neutral),
        ...Object.entries(theme.radius).map(([key, px]) => `--xen-radius-${key}: ${px}px;`),
        ...Object.entries(theme.spacing).map(([key, px]) => `--xen-space-${key}: ${px}px;`),
        ...Object.entries(theme.typography.scale).map(([key, px]) => `--xen-text-${key}: ${px}px;`),
        `--xen-font-heading: ${fontStack(theme.typography.fontHeading)};`,
        `--xen-font-body: ${fontStack(theme.typography.fontBody)};`,
    ];
    let css = `:root {\n  ${rootLines.join('\n  ')}\n}`;
    if (theme.seed.mode === 'both') {
        css += `\n[data-theme="dark"] {\n  ${semanticVarLines(theme.dark).join('\n  ')}\n}`;
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