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
exports.clampParallaxSpeed = exports.PARALLAX_MAX_SPEED = exports.ParallaxV4 = exports.MarqueeV4 = exports.COUNT_MS = exports.AnimatedCounterV4 = exports.STAGGER_V4_MAX_DELAY = exports.StaggerV4 = exports.RevealV4 = exports.useReducedMotion = exports.AnimatedCounter = exports.Marquee = exports.Stagger = exports.Reveal = void 0;
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
/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Five components on the shared M3 motion scale — `motion-v4.ts`'s adapter
 * over `quick` 100 / `standard` 200 / `enter` 400, with easing chosen by
 * direction of travel. See `MOTION-V4-BRIEF.md`.
 *
 * **The web-only note above is out of date and is corrected here.** It claimed
 * `Parallax` and `TiltCard` both depend on input with "no direct React Native
 * analogue". That is true of `TiltCard` and false of `Parallax`: an
 * `Animated.ScrollView` with `onScroll` through `useNativeDriver` is the
 * canonical RN parallax and the most common scroll effect on mobile.
 * `ParallaxV4` exists below, and it takes the scroll offset as an
 * `Animated.Value` prop so the CALLER keeps ownership of the `ScrollView` — a
 * component must not try to own the scroll container it lives inside.
 *
 * `TiltCardV4` really is web-only: pointer tilt maps a **hovering** pointer
 * onto two rotations, and touch has no hover — the finger is either absent or
 * pressing, and while pressing it covers the card. The accelerometer
 * substitute is a different component with a different input, a peer
 * dependency this kit does not take, and its own permission story.
 * ------------------------------------------------------------------------ */
var RevealV4_1 = require("./RevealV4");
Object.defineProperty(exports, "RevealV4", { enumerable: true, get: function () { return RevealV4_1.RevealV4; } });
var StaggerV4_1 = require("./StaggerV4");
Object.defineProperty(exports, "StaggerV4", { enumerable: true, get: function () { return StaggerV4_1.StaggerV4; } });
Object.defineProperty(exports, "STAGGER_V4_MAX_DELAY", { enumerable: true, get: function () { return StaggerV4_1.STAGGER_V4_MAX_DELAY; } });
var AnimatedCounterV4_1 = require("./AnimatedCounterV4");
Object.defineProperty(exports, "AnimatedCounterV4", { enumerable: true, get: function () { return AnimatedCounterV4_1.AnimatedCounterV4; } });
Object.defineProperty(exports, "COUNT_MS", { enumerable: true, get: function () { return AnimatedCounterV4_1.COUNT_MS; } });
var MarqueeV4_1 = require("./MarqueeV4");
Object.defineProperty(exports, "MarqueeV4", { enumerable: true, get: function () { return MarqueeV4_1.MarqueeV4; } });
var ParallaxV4_1 = require("./ParallaxV4");
Object.defineProperty(exports, "ParallaxV4", { enumerable: true, get: function () { return ParallaxV4_1.ParallaxV4; } });
Object.defineProperty(exports, "PARALLAX_MAX_SPEED", { enumerable: true, get: function () { return ParallaxV4_1.PARALLAX_MAX_SPEED; } });
Object.defineProperty(exports, "clampParallaxSpeed", { enumerable: true, get: function () { return ParallaxV4_1.clampParallaxSpeed; } });
//# sourceMappingURL=index.js.map