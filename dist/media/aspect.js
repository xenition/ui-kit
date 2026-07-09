"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectStyle = aspectStyle;
/**
 * Reserve an item's intrinsic aspect ratio (no layout shift). The ratio is
 * carried on a custom property and consumed by `aspect-ratio: var(...)`, so it
 * survives environments that don't recognize the shorthand while still being
 * fully live in the browser.
 */
function aspectStyle(width, height) {
    if (!width || !height)
        return undefined;
    return {
        ['--xen-aspect']: `${width} / ${height}`,
        aspectRatio: 'var(--xen-aspect)',
    };
}
//# sourceMappingURL=aspect.js.map