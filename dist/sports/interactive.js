"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOCUS_RING = void 0;
exports.activateOnKey = activateOnKey;
exports.tappableProps = tappableProps;
/** Enter / Space → invoke `handler` (with `preventDefault` so Space never scrolls). */
function activateOnKey(handler) {
    return (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            handler();
        }
    };
}
/**
 * Props that upgrade a plain `div` into a `role="button"` control: focusable,
 * click + keyboard activated, with a `focus-visible` ring from the token ramp.
 * Returns `{}` when there is no handler, so the element stays presentational.
 */
function tappableProps(onClick, label) {
    if (!onClick)
        return label ? { 'aria-label': label } : {};
    return {
        role: 'button',
        tabIndex: 0,
        'aria-label': label,
        onClick,
        onKeyDown: activateOnKey(onClick),
    };
}
/** Focus-ring classes for interactive sports surfaces (token ramp only). */
exports.FOCUS_RING = 'cursor-pointer outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-300';
//# sourceMappingURL=interactive.js.map