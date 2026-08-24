"use strict";
/**
 * `@xenition/ui/motion` — dependency-free scroll & pointer motion for
 * marketing templates. CSS transitions + IntersectionObserver only (no
 * framer-motion). Every component is SSR-safe and honors
 * `prefers-reduced-motion` (content renders instantly, animations off).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInView = exports.usePrefersReducedMotion = exports.TiltCard = exports.Marquee = exports.AnimatedCounter = exports.Parallax = exports.Stagger = exports.Reveal = void 0;
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
//# sourceMappingURL=index.js.map