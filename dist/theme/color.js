"use strict";
/**
 * Color math for the theme compiler: hex ↔ RGB ↔ HSL conversions and the
 * real WCAG 2.1 relative-luminance / contrast-ratio formulas
 * (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance).
 *
 * All functions are pure and deterministic.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHex = isValidHex;
exports.hexToRgb = hexToRgb;
exports.rgbToHex = rgbToHex;
exports.rgbToHsl = rgbToHsl;
exports.hslToRgb = hslToRgb;
exports.hexToHsl = hexToHsl;
exports.hslToHex = hslToHex;
exports.relativeLuminance = relativeLuminance;
exports.contrastRatio = contrastRatio;
exports.ensureContrast = ensureContrast;
const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
/** True if `value` is a `#rgb` or `#rrggbb` hex color string. */
function isValidHex(value) {
    return typeof value === 'string' && HEX_RE.test(value);
}
function hexToRgb(hex) {
    if (!isValidHex(hex)) {
        throw new Error(`Invalid hex color ${JSON.stringify(hex)} — expected "#rgb" or "#rrggbb" (e.g. "#7C3AED").`);
    }
    let raw = hex.slice(1).toLowerCase();
    if (raw.length === 3) {
        raw = raw
            .split('')
            .map((c) => c + c)
            .join('');
    }
    return {
        r: parseInt(raw.slice(0, 2), 16),
        g: parseInt(raw.slice(2, 4), 16),
        b: parseInt(raw.slice(4, 6), 16),
    };
}
function rgbToHex({ r, g, b }) {
    const channel = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${channel(r)}${channel(g)}${channel(b)}`;
}
function rgbToHsl({ r, g, b }) {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const l = (max + min) / 2;
    if (max === min) {
        return { h: 0, s: 0, l: l * 100 };
    }
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === rn) {
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
    }
    else if (max === gn) {
        h = (bn - rn) / d + 2;
    }
    else {
        h = (rn - gn) / d + 4;
    }
    return { h: h * 60, s: s * 100, l: l * 100 };
}
function hslToRgb({ h, s, l }) {
    const hn = (((h % 360) + 360) % 360) / 360;
    const sn = Math.max(0, Math.min(1, s / 100));
    const ln = Math.max(0, Math.min(1, l / 100));
    if (sn === 0) {
        const v = Math.round(ln * 255);
        return { r: v, g: v, b: v };
    }
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    const hueToChannel = (t) => {
        let tt = t;
        if (tt < 0)
            tt += 1;
        if (tt > 1)
            tt -= 1;
        if (tt < 1 / 6)
            return p + (q - p) * 6 * tt;
        if (tt < 1 / 2)
            return q;
        if (tt < 2 / 3)
            return p + (q - p) * (2 / 3 - tt) * 6;
        return p;
    };
    return {
        r: Math.round(hueToChannel(hn + 1 / 3) * 255),
        g: Math.round(hueToChannel(hn) * 255),
        b: Math.round(hueToChannel(hn - 1 / 3) * 255),
    };
}
function hexToHsl(hex) {
    return rgbToHsl(hexToRgb(hex));
}
function hslToHex(hsl) {
    return rgbToHex(hslToRgb(hsl));
}
/**
 * WCAG 2.1 relative luminance of a color, 0 (black) to 1 (white).
 * Channels are linearized with the sRGB piecewise transfer function before
 * the luminance weights are applied.
 */
function relativeLuminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    const linearize = (channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
/**
 * WCAG 2.1 contrast ratio between two colors: (L1 + 0.05) / (L2 + 0.05),
 * where L1 is the lighter color's relative luminance. Range 1–21; symmetric.
 */
function contrastRatio(a, b) {
    const la = relativeLuminance(a);
    const lb = relativeLuminance(b);
    const lighter = Math.max(la, lb);
    const darker = Math.min(la, lb);
    return (lighter + 0.05) / (darker + 0.05);
}
/**
 * Luminance at which a background contrasts equally with pure black and pure
 * white: solve (1.05)/(x+0.05) = (x+0.05)/0.05 → x ≈ 0.1791. Backgrounds
 * lighter than this get dark foregrounds first, and vice versa.
 */
const BLACK_WHITE_PIVOT = Math.sqrt(1.05 * 0.05) - 0.05;
/**
 * Returns `fg` adjusted in lightness (hue and saturation preserved) until
 * `contrastRatio(result, bg) >= min`.
 *
 * Guaranteed to terminate: both lightness sweeps are bounded (0–100 in
 * integer steps), and if neither passes, the fallback picks pure black or
 * pure white — whichever contrasts more with `bg`, which for any background
 * is at least ≈4.58:1 (the black/white equal-contrast minimum), above the
 * 4.5:1 default.
 */
function ensureContrast(fg, bg, min = 4.5) {
    if (contrastRatio(fg, bg) >= min)
        return fg;
    const { h, s, l } = hexToHsl(fg);
    const preferDark = relativeLuminance(bg) >= BLACK_WHITE_PIVOT;
    const directions = preferDark ? [-1, 1] : [1, -1];
    for (const dir of directions) {
        for (let candidate = l + dir; candidate >= 0 && candidate <= 100; candidate += dir) {
            const adjusted = hslToHex({ h, s, l: candidate });
            if (contrastRatio(adjusted, bg) >= min)
                return adjusted;
        }
    }
    return contrastRatio('#000000', bg) >= contrastRatio('#ffffff', bg) ? '#000000' : '#ffffff';
}
//# sourceMappingURL=color.js.map