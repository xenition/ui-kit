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
exports.STAGGER_V4_MAX_DELAY = void 0;
exports.StaggerV4 = StaggerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const Stagger_1 = require("./Stagger");
/**
 * The cap on the accumulated cascade offset, in ms.
 *
 * `interval * index` is unbounded, which is the guard brief §4 asks for: at the
 * default 100ms interval a list of forty rows puts the last one four seconds
 * behind the first, and a cascade that outlives the reader's attention has
 * stopped being a cascade and become a wait. On a phone this is the more likely
 * of the two twins to hit it — a `FlatList`-sized list is the normal case here,
 * not the long one.
 *
 * `enter * 2` (800ms), composed from the scale rather than picked, and the same
 * number as the web twin: the last child *starts* no later than twice the
 * longest single transition the scale defines. Past the cap the remaining
 * children arrive together; the first eight still cascade, and they are the
 * ones on screen.
 */
exports.STAGGER_V4_MAX_DELAY = motion_v4_1.V4_MOTION.enter * 2;
/**
 * **V4 stagger (native)** — the twin of the web `StaggerV4`, same props, same
 * defaults, same cap.
 *
 * 1. **`interval` comes from the scale.** The base defaulted to a hand-typed
 *    `100`, which is `V4_MOTION.quick` exactly — right number, wrong provenance
 *    (brief §1).
 * 2. **The cascade is bounded.** See {@link STAGGER_V4_MAX_DELAY}.
 *
 * **How the cap is enforced.** The base handed children a
 * `{ interval, delay }` config and let each `Reveal` compute
 * `delay + index * interval` itself, so a cap living here could only be a
 * request that a plain `Reveal` would ignore. This component resolves the
 * arithmetic instead and hands each child its final offset as
 * `{ interval: 0, delay: <resolved> }` — every existing consumer computes
 * `resolved + index * 0` and lands on the capped number without knowing the cap
 * exists. So `StaggerV4` bounds a subtree of plain `Reveal`s as well as one of
 * `RevealV4`s, and the contexts are the base's, imported not copied, for the
 * same reason.
 *
 * Non-`Reveal` children still advance the index, keeping visual order stable in
 * a mixed list — unchanged from the base. Reduced motion is not this
 * component's business: it adds delays, and a delay before a fade is still a
 * fade. `RevealV4` decides what the movement is.
 */
function StaggerV4({ interval = motion_v4_1.V4_MOTION.quick, delay = 0, maxDelay = exports.STAGGER_V4_MAX_DELAY, children, style, }) {
    const items = React.Children.toArray(children);
    const count = items.length;
    const configs = React.useMemo(() => Array.from({ length: count }, (_unused, index) => ({
        // Already resolved for this index, so the child multiplies by nothing.
        interval: 0,
        delay: delay + Math.min(index * interval, maxDelay),
    })), [count, interval, delay, maxDelay]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-stagger", style: style, children: items.map((child, index) => ((0, jsx_runtime_1.jsx)(Stagger_1.StaggerConfigContext.Provider, { value: configs[index], children: (0, jsx_runtime_1.jsx)(Stagger_1.StaggerIndexContext.Provider, { value: index, children: child }) }, index))) }));
}
//# sourceMappingURL=StaggerV4.js.map