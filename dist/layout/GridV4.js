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
exports.GridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * **V4 grid** — the web twin of the native `GridV4`, the base `Grid`'s props
 * plus one, a different design line.
 *
 * Structurally the base: a CSS grid, `columns` equal tracks, a token-bound
 * `gap`. It paints nothing — no ground, no border, no radius — so there is no
 * state layer, no motion sheet and no depth here, and a `GridV4` full of
 * `CardV4`s is a flat container of raised things rather than a raised container
 * (§4.6: never nest a shadow in a shadow).
 *
 * ## What V4 changes
 *
 * **`minItemWidth`.** See the prop.
 *
 * ### Platform divergence — read this before changing either twin
 *
 * The props are identical on both twins; the *mechanism* cannot be, because
 * **React Native has no CSS grid and no container queries**. There is no
 * `auto-fit` and no `minmax()` to reach for, and measuring the container to
 * derive a column count would make the grid re-render on layout — a per-frame
 * cost this kit does not pay for a layout primitive.
 *
 * - **Web (this file):** `minItemWidth` switches the template to
 *   `repeat(auto-fit, minmax(<minItemWidth>px, 1fr))`. The browser fits as many
 *   tracks as the container holds and the surplus space is shared between them.
 * - **Native (`src/native/layout/GridV4.tsx`):** `minItemWidth` is accepted,
 *   documented, and **degrades to the `columns` behaviour** — the grid renders
 *   exactly as it would without it. A native caller that needs a different
 *   column count on a tablet passes a different `columns`.
 *
 * The prop is therefore a progressive enhancement, not a promise: passing it is
 * always safe and never breaks the native layout, which is why it takes
 * precedence over `columns` rather than replacing it.
 */
exports.GridV4 = React.forwardRef(function GridV4({ columns = 2, gap = 'md', minItemWidth, className, style, ...rest }, ref) {
    // A grid needs at least one track; `repeat(0, …)` is invalid CSS and a
    // negative count would drop the template entirely. Geometric, not a design
    // decision.
    const tracks = Math.max(1, Math.floor(columns));
    const gridTemplateColumns = minItemWidth === undefined
        ? `repeat(${tracks}, minmax(0, 1fr))`
        : `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-grid": "", className: (0, cn_1.cn)('grid', _tokens_1.SPACE_GAP[gap], className), style: { gridTemplateColumns, ...style }, ...rest }));
});
//# sourceMappingURL=GridV4.js.map