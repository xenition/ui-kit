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
exports.GridV4 = GridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * **V4 grid** — the native twin of the web `GridV4`, the base `Grid`'s props
 * plus one, a different design line.
 *
 * Structurally the base: children wrap into equal-width cells using the classic
 * gutter technique (a negative margin on the container, half the gutter as
 * padding on every cell), so the token-bound `gap` traces to the compiled
 * spacing scale. It paints nothing — no ground, no border, no radius — so there
 * is no state layer, no motion and no elevation here, and a `GridV4` full of
 * `CardV4`s is a flat container of raised things rather than a raised container
 * (§4.6: never nest a shadow in a shadow).
 *
 * ## What V4 changes
 *
 * 1. **`minItemWidth`** is accepted, for prop parity with the web twin. See the
 *    divergence note below for what it does here, which is nothing.
 * 2. **An empty grid costs nothing.** The base applies its negative margins
 *    unconditionally, so a `Grid` with no children pulled its siblings a half
 *    gutter closer on every side — an empty component leaving a visible dent in
 *    the page, which §4.5 rules out. With no cells there is nothing to gutter,
 *    so the margins come off.
 *
 * ### Platform divergence — read this before changing either twin
 *
 * The props are identical on both twins; the *mechanism* cannot be, because
 * **React Native has no CSS grid and no container queries**. There is no
 * `auto-fit` and no `minmax()` to reach for, and measuring the container with
 * `onLayout` to derive a column count would make the grid re-render on layout —
 * a per-frame cost this kit does not pay for a layout primitive.
 *
 * - **Web (`src/layout/GridV4.tsx`):** `minItemWidth` switches the template to
 *   `repeat(auto-fit, minmax(<minItemWidth>px, 1fr))`; the browser fits as many
 *   tracks as the container holds.
 * - **Native (this file):** `minItemWidth` **degrades to the `columns`
 *   behaviour**. A native caller that needs a different column count on a
 *   tablet passes a different `columns`.
 *
 * The prop is therefore a progressive enhancement, not a promise: passing it is
 * always safe and never breaks this layout.
 */
function GridV4({ columns = 2, gap = 'md', 
// Accepted for parity with the web twin and deliberately unused here — see
// the platform-divergence note above. Destructured so it never lands on the
// `View` as an unknown prop.
minItemWidth: _minItemWidth, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const gutter = tokens.spacing[gap];
    // Half on the container, half on each cell — the classic gutter technique the
    // base uses. `2` is the geometry of "split it between the two sides".
    const half = gutter / 2;
    // A grid needs at least one track; a zero or negative count would make the
    // cell width `Infinity` or negative. Geometric, not a design decision.
    const tracks = Math.max(1, Math.floor(columns));
    const cells = React.Children.toArray(children);
    const empty = cells.length === 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                // No cells, no gutter to cancel — an empty grid must not pull its
                // siblings in by a half gutter.
                marginHorizontal: empty ? undefined : -half,
                marginVertical: empty ? undefined : -half,
            },
            style,
        ], ...rest, children: cells.map((child, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: `${100 / tracks}%`,
                paddingHorizontal: half,
                paddingVertical: half,
            }, children: child }, i))) }));
}
//# sourceMappingURL=GridV4.js.map