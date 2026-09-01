"use strict";
/**
 * `@xenition/ui/motion` — dependency-free scroll & pointer motion for
 * marketing templates. CSS transitions + IntersectionObserver only (no
 * framer-motion). Every component is SSR-safe and honors
 * `prefers-reduced-motion` (content renders instantly, animations off).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiltCardV4 = exports.clampParallaxSpeed = exports.PARALLAX_MAX_SPEED = exports.ParallaxV4 = exports.MarqueeV4 = exports.COUNT_MS = exports.AnimatedCounterV4 = exports.STAGGER_V4_MAX_DELAY = exports.StaggerV4 = exports.RevealV4 = exports.useInView = exports.usePrefersReducedMotion = exports.TiltCard = exports.Marquee = exports.AnimatedCounter = exports.Parallax = exports.Stagger = exports.Reveal = void 0;
var Reveal_1 = require("./Reveal");
Object.defineProperty(exports, "Reveal", { enumerable: true, get: function () { return Reveal_1.Reveal; } });
var Stagger_1 = require("./Stagger");
Object.defineProperty(exports, "Stagger", { enumerable: true, get: function () { return Stagger_1.Stagger; } });
var Parallax_1 = require("./Parallax");
Object.defineProperty(exports, "Parallax", { enumerable: true, get: function () { return Parallax_1.Parallax; } });
var AnimatedCounter_1 = require("./AnimatedCounter");
Object.defineProperty(exports, "AnimatedCounter", { enumerable: true, get: function () { return AnimatedCounter_1.AnimatedCounter; } });
var Marquee_1 = require("./Marquee");
Object.defineProperty(exports, "Marquee", { enumerable: true, get: function () { return Marquee_1.Marquee; } });
var TiltCard_1 = require("./TiltCard");
Object.defineProperty(exports, "TiltCard", { enumerable: true, get: function () { return TiltCard_1.TiltCard; } });
var reduced_motion_1 = require("./internal/reduced-motion");
Object.defineProperty(exports, "usePrefersReducedMotion", { enumerable: true, get: function () { return reduced_motion_1.usePrefersReducedMotion; } });
var use_in_view_1 = require("./internal/use-in-view");
Object.defineProperty(exports, "useInView", { enumerable: true, get: function () { return use_in_view_1.useInView; } });
/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Six components on the shared M3 motion scale — `v4-motion.ts`'s `quick` 100
 * / `standard` 200 / `enter` 400, with easing chosen by direction of travel.
 * See `MOTION-V4-BRIEF.md`.
 *
 * The base line picked its own numbers: `Reveal` at 600 here and 500 on the
 * native twin for the same entrance, `TiltCard` at a hand-typed
 * `200ms ease-out`, distances of 24 / 32 / 0.92 / 8 typed inline. That is the
 * defect `v4-motion.ts` was created to fix, still live in the one module whose
 * whole subject is motion.
 *
 * Two components here are deliberately NOT on the duration scale, and say so
 * in their own files: a marquee's loop and a counter's count are **playback**,
 * timed by their content, not transitions between two states. Their easings
 * still come from the scale.
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
/**
 * Web-only, and it stays that way.
 *
 * Pointer tilt maps a **hovering** pointer's position onto two rotations, and
 * touch has no hover: the finger is either absent or pressing, and while
 * pressing it covers the card it is tilting. The accelerometer substitute is a
 * different component with a different input, a peer dependency this kit does
 * not take, and its own permission story.
 *
 * `Parallax` used to be listed beside it for the same reason. That reason was
 * wrong, and `ParallaxV4` now exists on native.
 */
var TiltCardV4_1 = require("./TiltCardV4");
Object.defineProperty(exports, "TiltCardV4", { enumerable: true, get: function () { return TiltCardV4_1.TiltCardV4; } });
//# sourceMappingURL=index.js.map