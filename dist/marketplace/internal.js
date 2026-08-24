"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateOnKey = activateOnKey;
/**
 * Keyboard activation for a `role="button"` div. On Enter / Space it prevents
 * the default scroll/submit and dispatches a real `click` on the element, so the
 * div's own `onClick` fires exactly as a pointer press would — no separate
 * handler wiring, no synthetic-event casts.
 */
function activateOnKey(event) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        event.currentTarget.click();
    }
}
//# sourceMappingURL=internal.js.map