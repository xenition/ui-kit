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
exports.ModalV4 = ModalV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * `Modal`, V4 — the same props, lifted off the page and given its own rhythm.
 *
 * ## What the depth is saying
 *
 * A dialog is the one layer with nothing underneath it: it floats in the middle
 * of the viewport, over a page that has been pushed back. So it takes
 * `--xen-elevation-sheet` — the widest, softest of the three — and the token's
 * negative offset turns out to be exactly right here. A drop shadow implies a
 * surface below to receive it; a dialog has none, so what it wants is a halo,
 * and a large radius with a near-zero offset is a halo.
 *
 * The scrim comes from `--xen-elevation-color` rather than `bg-neutral-950/50`,
 * which inverts under `[data-theme="dark"]` — the dark block re-emits the ramps
 * mirrored — and so paints a near-WHITE veil over a dark page. That is the bug
 * the base `Modal` has today.
 *
 * Glass is applied only when the seed asked for `depth: 'glass'` — the single
 * depth check, and a necessary one: `flatten()` neutralises gradients and
 * elevation and stops there, so glass is live even under `depth: 'flat'`.
 * Elevation is consumed unconditionally and flat falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base modal is one padded box: a title, then whatever you passed, with any
 * structure left to you. V4 has a header and a body, separated by a hairline
 * and each carrying its own padding — so a dialog reads as a dialog whether the
 * caller wrapped its content or not. The body scrolls at 80% of the viewport
 * height, which keeps the title pinned instead of pushing it off-screen when
 * the content is long. §11: the container earns its existence by holding a
 * structure, not by drawing a box.
 *
 * It also portals to `<body>`, which the base does not. A dialog rendered where
 * it was written is clipped by any ancestor with `overflow: hidden` or a
 * `transform` — the two most common things to find between a page and a button
 * that opens a dialog.
 *
 * ## Motion
 *
 * A dialog has no origin to fly in from — it is not a tapped card expanding
 * (§36.5) — so it scales up very slightly and fades, over 200ms, §36.2's band
 * for a small transition. Deliberately not a big travel: distance should be
 * proportional to how far the thing actually moved, and this moved nowhere.
 * Under `prefers-reduced-motion` only the fade remains (§36.10).
 */
function ModalV4({ open, onClose, title, children, className, }) {
    const panelRef = React.useRef(null);
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    (0, inject_1.injectStyleOnce)('xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS);
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        panelRef.current?.focus();
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open || typeof document === 'undefined')
        return null;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-lg", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-scrim": "", className: "absolute inset-0", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { ref: panelRef, "data-xen-v4-dialog": "", "data-xen-v4-panel": kind, tabIndex: -1, className: (0, cn_1.cn)('relative flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden outline-none', 'rounded-[var(--xen-radius-lg)] text-on-surface', className), children: [title != null && ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 border-b border-border px-lg pb-md pt-lg", children: (0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-xl font-semibold text-on-surface", children: title }) })), (0, jsx_runtime_1.jsx)("div", { className: "min-h-0 flex-1 overflow-auto p-lg", children: children })] })] }), document.body);
}
//# sourceMappingURL=ModalV4.js.map