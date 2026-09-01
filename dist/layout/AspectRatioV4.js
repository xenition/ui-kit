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
exports.AspectRatioV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Radius classes written out in full so Tailwind's content scanner reads them
 * from the library source. Every value is a `--xen-*` custom property; nothing
 * here is a px literal.
 */
const RADIUS_CLASS = {
    sm: 'rounded-[var(--xen-radius-sm)]',
    md: 'rounded-[var(--xen-radius-md)]',
    lg: 'rounded-[var(--xen-radius-lg)]',
};
/** `rounded` as a radius step. `true` is the base's `lg`, unchanged. */
function radiusOf(rounded) {
    if (rounded === false)
        return null;
    if (rounded === true)
        return 'lg';
    return rounded;
}
/**
 * **V4 aspect ratio** — the web twin of the native `AspectRatioV4`, the base's
 * props with a widened `rounded`.
 *
 * §5 calls this one "structure only, no visual change": both twins were
 * already token-pure, so nothing here moves a colour, a spacing or a default.
 *
 * ## What V4 changes
 *
 * **`rounded` is a step, not a switch.** The base hardcoded `radius.lg` behind
 * a boolean, so a 320px hero panel and a 44px thumbnail were forced to the
 * same corner — and on a thumbnail `lg` is most of the box. `rounded` now
 * takes `'sm' | 'md' | 'lg'` as well, with `true` still meaning `lg`, so the
 * default rendering is untouched (§1.4) and the caller can size the corner to
 * the frame.
 *
 * ## What it deliberately does not do
 *
 * **No shadow.** §4.6 gives a shadow to a card, a sheet and the one dominant
 * action. A ratio box is a frame around media — usually media already inside a
 * card, and §4.6 forbids nesting a shadow in a shadow. A caller that wants the
 * card treatment composes `CardV4` around this.
 *
 * **An empty frame still draws.** §4.5 says a component with nothing to show
 * renders nothing rather than a blank bordered box — but this component's
 * entire job is *reserving* the space before the media arrives, and it paints
 * no border and no ground to leave behind. Rendering `null` when the image has
 * not loaded would collapse the layout and reflow the page around it, which is
 * the defect the ratio box exists to prevent. So the empty case keeps its
 * geometry and stays invisible.
 *
 * `ratio` is the one bare number here, and it is geometric — a layout constant
 * the caller owns, not a design value (§1.1).
 */
exports.AspectRatioV4 = React.forwardRef(function AspectRatioV4({ ratio, rounded = false, className, style, ...rest }, ref) {
    const radius = radiusOf(rounded);
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-aspect": "", ref: ref, className: (0, cn_1.cn)('w-full overflow-hidden', radius ? RADIUS_CLASS[radius] : undefined, className), style: { aspectRatio: String(ratio), ...style }, ...rest }));
});
//# sourceMappingURL=AspectRatioV4.js.map