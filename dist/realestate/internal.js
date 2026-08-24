"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp01 = void 0;
exports.clickableProps = clickableProps;
/** Clamp a fraction into the `0`–`1` range (shared by the map/floor-plan placeholders). */
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
exports.clamp01 = clamp01;
/**
 * DOM props that make a non-button element behave like a button when an
 * `onClick` is supplied: `role`, keyboard activation (Enter / Space), a tab
 * stop, and an accessible label. Returns `undefined` when there is no handler,
 * so callers can spread it unconditionally.
 */
function clickableProps(onClick, label) {
    if (!onClick)
        return undefined;
    return {
        role: 'button',
        tabIndex: 0,
        'aria-label': label,
        onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
            }
        },
    };
}
//# sourceMappingURL=internal.js.map