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
exports.GenerativeCoverV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const cover_v4_1 = require("./internal/cover-v4");
/**
 * **V4 generative cover — the twin `commerce` never had.**
 *
 * The native `GenerativeCover` has always carried a doc comment saying its
 * `form` prop is "accepted for parity with the web `GenerativeCover`". That
 * component was real, but it lived in `marketing`, so `commerce` had a cover
 * on one platform and an import across a module boundary on the other, and
 * nothing testing that the two agreed. This file closes that.
 *
 * ## It composes the art rather than redrawing it
 *
 * The six compositions — `arc`, `bands`, `orbit`, `grid`, `wave`, `stack` —
 * are already drawn, in `marketing/GenerativeCover`, as parameterised inline
 * SVG print plates with a seeded PRNG jittering radii, rotations and phases.
 * Copying ~150 lines of geometry into `commerce` so the module could own its
 * own copy is exactly how the kit ends up with two grammars for one idea; the
 * brief's `formatMoney` rule ("`marketplace` has no `money.ts` of its own and
 * must not grow one") is the same argument about a different asset. So this
 * component is the **adapter**: it makes the seeded decisions, and hands them
 * to the renderer that already exists.
 *
 * What it adds over calling that renderer directly is the part the two twins
 * have to agree on — see `internal/cover-v4.ts`. `form`, `ink` and `paper` are
 * all resolved **here**, from the shared hash, and passed down explicitly, so
 * the marketing component's own seeding never runs and the native twin lands
 * on the same three decisions from the same seed.
 *
 * ## The initials are gone
 *
 * The native base overlaid the label's initials on the art. V4 draws no text
 * at all, on either twin, for two reasons:
 *
 * 1. **It is redundant where it is used.** This cover's job is the placeholder
 *    inside a `ProductCardV4`, which prints the product title in full,
 *    directly underneath. Two renderings of one name, one of them abbreviated.
 * 2. **It was a contrast promise nothing could keep.** Initials centred over
 *    generated geometry sit on a different colour for every seed and every
 *    form, so no pairing is checkable — and §46 does not accept "usually
 *    legible". A cover is art; the name belongs in text beside it.
 *
 * `label` therefore does the one job it can do honestly: it is the accessible
 * name, and its absence makes the cover decorative.
 *
 * ## Colour
 *
 * A saturated `primary` plate with a light `accent` mark, both ramp steps, so
 * the cover restyles with the seed and reads in light and dark. Never a
 * literal — an unrecognised role throws at render rather than painting
 * best-effort.
 */
exports.GenerativeCoverV4 = React.forwardRef(function GenerativeCoverV4({ seed, label, form, ink, paper, ...rest }, ref) {
    const plate = (0, cover_v4_1.resolveCoverPlate)(seed, form, ink, paper);
    return ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { ref: ref, "data-xen-v4-cover": plate.form, seed: seed, 
        // Resolved here, never left to the renderer: the seeded decisions are
        // the thing the two twins must make identically.
        form: plate.form, ink: plate.ink, paper: plate.paper, label: label, ...rest }));
});
//# sourceMappingURL=GenerativeCoverV4.js.map