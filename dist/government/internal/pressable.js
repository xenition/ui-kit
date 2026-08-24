"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pressableProps = pressableProps;
/**
 * The web analog of a native `Pressable` wrapper: given an optional `onClick`,
 * returns the props that turn a plain element into a keyboard-operable button
 * (click + Enter/Space), or `undefined` when the element is non-interactive.
 * Keeps the DOM root a single element so refs and layout stay stable. Mirror of
 * the insurance module's helper.
 */
function pressableProps(onClick) {
    if (!onClick)
        return undefined;
    return {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
            }
        },
    };
}
//# sourceMappingURL=pressable.js.map