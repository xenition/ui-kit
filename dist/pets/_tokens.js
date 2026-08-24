"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLOT_TINT = exports.SLOT_BORDER_T = exports.SLOT_BORDER_L = exports.SLOT_BORDER = exports.SLOT_BG = exports.SLOT_TEXT = void 0;
exports.toBadgeTone = toBadgeTone;
exports.activateOnKey = activateOnKey;
/** `text-*` token class per slot. */
exports.SLOT_TEXT = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    muted: 'text-muted',
};
/** `bg-*` token class per slot. */
exports.SLOT_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-muted',
};
/** Full `border-*` token class per slot. */
exports.SLOT_BORDER = {
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
    muted: 'border-muted',
};
/** Left-edge accent `border-l-*` token class per slot. */
exports.SLOT_BORDER_L = {
    primary: 'border-l-primary',
    accent: 'border-l-accent',
    success: 'border-l-success',
    warn: 'border-l-warn',
    danger: 'border-l-danger',
    muted: 'border-l-muted',
};
/** Top-edge accent `border-t-*` token class per slot. */
exports.SLOT_BORDER_T = {
    primary: 'border-t-primary',
    accent: 'border-t-accent',
    success: 'border-t-success',
    warn: 'border-t-warn',
    danger: 'border-t-danger',
    muted: 'border-t-muted',
};
/** Reduced-alpha `bg-<slot>/10` tint token class per slot (translucent banner fills). */
exports.SLOT_TINT = {
    primary: 'bg-primary/10',
    accent: 'bg-accent/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
    muted: 'bg-muted/10',
};
/**
 * Map a native badge tone to a web {@link BadgeTone}. The web `Badge` has no
 * `accent` tone, so `accent` folds into `primary`.
 */
function toBadgeTone(tone) {
    return tone === 'accent' ? 'primary' : tone;
}
/**
 * Keyboard activation for a `role="button"` div — fires the handler on
 * Enter/Space and swallows the default scroll on Space.
 */
function activateOnKey(onActivate) {
    return (e) => {
        if (onActivate && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onActivate();
        }
    };
}
//# sourceMappingURL=_tokens.js.map