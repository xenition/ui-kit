"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerHalo = PointerHalo;
/**
 * Native mirror of the web `PointerHalo`. The web component renders a custom
 * cursor halo that trails a fine (mouse) pointer. Touch devices have **no
 * cursor**, so on React Native this is a permanent no-op: it always renders
 * `null` — exactly like the web version does under `prefers-reduced-motion` or
 * a coarse pointer. The component and its props are kept only for cross-platform
 * API parity; every prop is **inert** on native.
 */
function PointerHalo(_props) {
    return null;
}
//# sourceMappingURL=PointerHalo.js.map