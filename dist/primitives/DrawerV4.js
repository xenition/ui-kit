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
exports.DrawerV4 = DrawerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * The panel's box per edge.
 *
 * The measure is `2xl × 7` off the spacing scale rather than the base's literal
 * `w-80`, so a seed that widens its rhythm widens the drawer with it. `85vw` /
 * `85vh` stays the cap: a drawer that covers the page is a screen, and the
 * strip of scrim left showing is what tells the reader there is something
 * behind it.
 */
const POS = {
    left: 'inset-y-0 left-0 h-full w-[calc(var(--xen-space-2xl)*7)] max-w-[85vw]',
    right: 'inset-y-0 right-0 h-full w-[calc(var(--xen-space-2xl)*7)] max-w-[85vw]',
    top: 'inset-x-0 top-0 w-full max-h-[85vh]',
    bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh]',
};
/**
 * `Drawer`, V4 — the same props, given the depth and the rhythm of a real
 * layer.
 *
 * ## What the depth is saying
 *
 * A side sheet is above the page and nothing is above it, so it takes
 * `--xen-elevation-sheet` — the same altitude as `ModalV4`, `BottomSheetV4` and
 * `MenuV4`, because all four are the same kind of object at different sizes and
 * a kit where they drift apart has four depth systems instead of one. The
 * content inside is flat: §8's "cards inside cards inside cards" is exactly
 * what a drawer becomes when every section in it gains a surface. The base's
 * `shadow-xl` is dropped with it — a Tailwind shadow is a fixed black at a
 * fixed alpha and knows nothing about the scheme it is falling in.
 *
 * The scrim is `--xen-elevation-color`, shared with every other V4 overlay. The
 * base's `bg-neutral-950/50` is the bug this fixes: the dark block re-emits the
 * ramps mirrored, so that class paints a near-WHITE veil over a dark page. The
 * native twin had the same defect and was fixed to black-at-a-fixed-alpha; this
 * is the same convention, spelled in CSS. A shadow does not invert, so a scrim
 * built from a shadow colour does not either.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. That is the one
 * depth check here and it is necessary: `flatten()` neutralises gradients and
 * elevation and stops there, so glass is live even under `depth: 'flat'`.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base drawer is one padded box with the title inside the scroll area, so a
 * long list scrolls its own heading off the screen. V4 splits a pinned header
 * from a scrolling body, separated by a hairline and each carrying its own
 * padding — §11: the container earns its existence by holding a structure, not
 * by drawing a box.
 *
 * ## Motion
 *
 * The panel travels the whole of itself, from the edge it is anchored to —
 * §36.5's spatial continuity, so the movement says where the drawer came from
 * and where dismissing it sends it back. 280ms is §36.2's band for a
 * screen-sized transition, and the easing decelerates so the sheet settles
 * rather than stopping dead (§36.3). Under `prefers-reduced-motion` the travel
 * becomes a fade rather than nothing at all, because an overlay that appears
 * with no transition reads as a glitch (§36.10).
 */
function DrawerV4({ open, onClose, side = 'right', title, children, className, }) {
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    (0, inject_1.injectStyleOnce)('xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS);
    (0, inject_1.injectStyleOnce)('xen-surface-v4-drawer-styles', surface_v4_1.SURFACE_V4_DRAWER_CSS);
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open || typeof document === 'undefined')
        return null;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-scrim": "", className: "absolute inset-0", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-drawer": side, "data-xen-v4-panel": kind, className: (0, cn_1.cn)('absolute flex flex-col overflow-hidden text-on-surface', POS[side], className), children: [title != null && ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 border-b border-border px-lg pb-md pt-lg", children: (0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-xl font-semibold text-on-surface", children: title }) })), (0, jsx_runtime_1.jsx)("div", { className: "min-h-0 flex-1 overflow-auto p-lg", children: children })] })] }), document.body);
}
//# sourceMappingURL=DrawerV4.js.map