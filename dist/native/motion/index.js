"use strict";
/**
 * `@xenition/ui/native/motion` — dependency-free mount motion for React Native,
 * mirroring `@xenition/ui/motion` where it makes sense on mobile. Built on the
 * RN `Animated` API only (no animation library). Every component honors the OS
 * "Reduce Motion" setting: content renders immediately with animations off.
 *
 * On mobile the norm is a **mount** entrance, so `Reveal` animates in on mount
 * rather than on scroll, and `AnimatedCounter` counts on mount rather than on
 * scroll-into-view. `Marquee` is a scroll-independent continuous loop, so it
 * maps directly onto the RN `Animated` clock. The genuinely pointer/scroll-
 * driven pieces (`Parallax`, `TiltCard`) remain **web-only** — they depend on
 * scroll position / pointer events that have no direct React Native analogue;
 * use them from `@xenition/ui/motion` in web templates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = exports.AnimatedCounter = exports.Marquee = exports.Stagger = exports.Reveal = void 0;
var Reveal_1 = require("./Reveal");
Object.defineProperty(exports, "Reveal", { enumerable: true, get: function () { return Reveal_1.Reveal; } });
var Stagger_1 = require("./Stagger");
Object.defineProperty(exports, "Stagger", { enumerable: true, get: function () { return Stagger_1.Stagger; } });
var Marquee_1 = require("./Marquee");
Object.defineProperty(exports, "Marquee", { enumerable: true, get: function () { return Marquee_1.Marquee; } });
var AnimatedCounter_1 = require("./AnimatedCounter");
Object.defineProperty(exports, "AnimatedCounter", { enumerable: true, get: function () { return AnimatedCounter_1.AnimatedCounter; } });
var useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
Object.defineProperty(exports, "useReducedMotion", { enumerable: true, get: function () { return useReducedMotion_1.useReducedMotion; } });
//# sourceMappingURL=index.js.map