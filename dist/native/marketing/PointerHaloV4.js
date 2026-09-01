"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerHaloV4 = PointerHaloV4;
/**
 * PointerHalo — **V4** "showcase" design (native mirror of the web V4).
 *
 * The web V4 renders a refined custom cursor halo that trails a fine (mouse)
 * pointer. Touch devices have **no cursor**, so — exactly like the native base
 * {@link PointerHalo} — this is a permanent no-op: it always renders `null`,
 * the same result the web twin produces under `prefers-reduced-motion` or a
 * coarse pointer. The component and all its props (`size`/`linkSize`/`growSize`/
 * `label`) are kept only for cross-platform API parity and are **inert** on
 * native. No motion, nothing to honor for reduced motion.
 */
function PointerHaloV4(_props) {
    return null;
}
//# sourceMappingURL=PointerHaloV4.js.map