"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaggerV4 = exports.STAGGER_V4_MAX_DELAY = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Stagger_1 = require("./Stagger");
const v4_motion_1 = require("../primitives/internal/v4-motion");
/**
 * The cap on the accumulated cascade offset, in ms.
 *
 * `interval * index` is unbounded, which is the bug brief §4 asks for a guard
 * against: at the default 100ms interval a list of forty items puts the last
 * one four seconds behind the first, and a cascade that outlives the reader's
 * attention has stopped being a cascade and become a wait. Past the cap every
 * remaining child arrives together — the list still reads top-to-bottom,
 * because the first items are still staggered and they are the ones on screen.
 *
 * `enter * 2` (800ms), composed from the scale rather than picked: the last
 * child *starts* no later than twice the longest single transition the scale
 * defines, and with a default `RevealV4` on top the whole list has finished
 * arriving by 1.2s. At the default interval that means the first eight items
 * cascade and the rest land as a block, which is what a long list wants
 * anyway — nobody is watching item thirty-nine wait its turn.
 */
exports.STAGGER_V4_MAX_DELAY = v4_motion_1.V4_MOTION.enter * 2;
/**
 * **V4 stagger** — same props as {@link Stagger}, plus the guard it lacked.
 *
 * Two changes, one of them invisible.
 *
 * 1. **`interval` comes from the scale.** The base defaulted to a hand-typed
 *    `100`, which happens to be `V4_MOTION.quick` exactly — right number, wrong
 *    provenance (brief §1). Naming it means the next person who tunes the scale
 *    tunes this too.
 * 2. **The cascade is bounded.** See {@link STAGGER_V4_MAX_DELAY}.
 *
 * **How the cap is enforced, and why it is done this way.** The base handed
 * children a `{ interval, delay }` config and let each `Reveal` compute
 * `delay + index * interval` for itself — so a cap living in this component
 * could only be a *request*, and any plain `Reveal` (or any other consumer of
 * the context) would ignore it. Instead this component resolves the arithmetic
 * itself and hands each child its already-final offset as
 * `{ interval: 0, delay: <resolved> }`. Every existing consumer computes
 * `resolved + index * 0` and lands on the capped number without knowing the cap
 * exists, so `StaggerV4` bounds a subtree of plain `Reveal`s just as well as a
 * subtree of `RevealV4`s. The contexts are the base's, imported not copied, for
 * the same reason.
 *
 * Non-`Reveal` children still advance the index, keeping visual order stable in
 * a mixed list — unchanged from the base.
 *
 * Reduced motion is not this component's business: it adds delays, and a delay
 * before a fade is still a fade. `RevealV4` decides what the movement is.
 */
exports.StaggerV4 = React.forwardRef(function StaggerV4({ interval = v4_motion_1.V4_MOTION.quick, delay = 0, maxDelay = exports.STAGGER_V4_MAX_DELAY, children, ...rest }, ref) {
    const items = React.Children.toArray(children);
    const count = items.length;
    const configs = React.useMemo(() => Array.from({ length: count }, (_unused, index) => ({
        // Already resolved for this index, so the child multiplies by nothing.
        interval: 0,
        delay: delay + Math.min(index * interval, maxDelay),
    })), [count, interval, delay, maxDelay]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-stagger": "", ...rest, children: items.map((child, index) => ((0, jsx_runtime_1.jsx)(Stagger_1.StaggerConfigContext.Provider, { value: configs[index], children: (0, jsx_runtime_1.jsx)(Stagger_1.StaggerIndexContext.Provider, { value: index, children: child }) }, index))) }));
});
//# sourceMappingURL=StaggerV4.js.map