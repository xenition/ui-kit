"use strict";
/**
 * `@xenition/ui/native/motion` — dependency-free mount motion for React Native,
 * mirroring `@xenition/ui/motion` where it makes sense on mobile. Built on the
 * RN `Animated` API only (no animation library). Every component honors the OS
 * "Reduce Motion" setting: content renders immediately with animations off.
 *
 * On mobile the norm is a **mount** entrance, so `Reveal` animates in on mount
 * rather than on scroll. The scroll/pointer-driven web pieces
 * (`Parallax`, `Marquee`, `TiltCard`) and `AnimatedCounter` are **web-only** —
 * they depend on scroll position / pointer events / `IntersectionObserver` that
 * have no direct React Native analogue; use them from `@xenition/ui/motion` in
 * web templates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = exports.Stagger = exports.Reveal = void 0;
var Reveal_1 = require("./Reveal");
Object.defineProperty(exports, "Reveal", { enumerable: true, get: function () { return Reveal_1.Reveal; } });
var Stagger_1 = require("./Stagger");
Object.defineProperty(exports, "Stagger", { enumerable: true, get: function () { return Stagger_1.Stagger; } });
var useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
Object.defineProperty(exports, "useReducedMotion", { enumerable: true, get: function () { return useReducedMotion_1.useReducedMotion; } });
//# sourceMappingURL=index.js.map