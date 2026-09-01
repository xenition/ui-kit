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
exports.LightboxV4 = LightboxV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const surface_v4_1 = require("../primitives/internal/surface-v4");
/**
 * The overlay's own sheet.
 *
 * The scrim comes from `SCRIM_ALPHA` — the number every V4 overlay in the kit
 * uses — instead of this component's own `88%`, and it is mixed against the
 * shadow colour rather than `--xen-neutral-950`, because a scrim must be dark
 * in **both** schemes and a neutral ramp step read as a colour is the thing
 * that is not guaranteed to be.
 */
const LIGHTBOX_V4_CSS = `
@keyframes xen-lightbox-v4-in { from { opacity: 0; } to { opacity: 1; } }
[data-xen-lightbox-v4] {
  background-color: color-mix(in srgb, var(--xen-elevation-color) ${Math.round(surface_v4_1.SCRIM_ALPHA * 100)}%, transparent);
  animation: xen-lightbox-v4-in 180ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-lightbox-v4] { animation: none; }
}
`;
const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
/**
 * The ink on the overlay.
 *
 * The one place reading a **ramp** directly is correct rather than a defect:
 * everywhere else in this pass a ramp step was wrong *because* it does not
 * invert with the scheme, and here the ground underneath is a scrim that is
 * dark in both schemes by construction — so the ink on it must be light in
 * both, which is exactly the property the ramp has and `--xen-surface` does not.
 */
const OVERLAY_INK = 'text-neutral-50';
/**
 * **V4 lightbox** — the web twin of the native `LightboxV4`, same props as
 * {@link Lightbox} plus `onPlay`, `playLabel` and `formatCounter`.
 *
 * The focus trap, the Escape/arrow keys and the focus restore are the base's
 * and are kept whole — they are the best thing about this component.
 *
 * ## Four changes
 *
 * 1. **Playback can be handed to the host.** See `onPlay`.
 * 2. **The controls clear 44.** They were `h-10 w-10`, on the three buttons a
 *    user reaches for while holding a phone one-handed.
 * 3. **The controls are `IconV4`**, not three hand-drawn inline `<svg>` paths
 *    with a literal stroke width, and they hover with the shared state layer
 *    rather than `hover:bg-neutral-100`.
 * 4. **The scrim is the kit's scrim** — see {@link LIGHTBOX_V4_CSS}.
 *
 * The overlay also pays `env(safe-area-inset-*)`, so on a notched phone in
 * landscape the close button is not under the sensor housing.
 */
function LightboxV4({ items, index, onClose, onPrev, onNext, onPlay, loop = false, label = 'Media viewer', closeLabel = 'Close', prevLabel = 'Previous', nextLabel = 'Next', playLabel = 'Play video', formatCounter, }) {
    (0, inject_1.injectStyleOnce)('xen-lightbox-v4-styles', LIGHTBOX_V4_CSS);
    const open = index !== null && index >= 0 && index < items.length;
    const dialogRef = React.useRef(null);
    const restoreRef = React.useRef(null);
    const hasPrev = open && (loop || index > 0);
    const hasNext = open && (loop || index < items.length - 1);
    // Callbacks read the latest handlers without re-subscribing the key listener.
    const handlers = React.useRef({ onClose, onPrev, onNext, hasPrev, hasNext });
    handlers.current = { onClose, onPrev, onNext, hasPrev, hasNext };
    React.useEffect(() => {
        if (!open || typeof document === 'undefined')
            return undefined;
        restoreRef.current = document.activeElement;
        const dialog = dialogRef.current;
        const focusables = dialog?.querySelectorAll(FOCUSABLE);
        (focusables && focusables.length ? focusables[0] : dialog)?.focus();
        const onKeyDown = (e) => {
            const h = handlers.current;
            if (e.key === 'Escape') {
                e.preventDefault();
                h.onClose();
            }
            else if (e.key === 'ArrowLeft') {
                if (h.hasPrev) {
                    e.preventDefault();
                    h.onPrev?.();
                }
            }
            else if (e.key === 'ArrowRight') {
                if (h.hasNext) {
                    e.preventDefault();
                    h.onNext?.();
                }
            }
            else if (e.key === 'Tab') {
                const nodes = dialog?.querySelectorAll(FOCUSABLE);
                if (!nodes || nodes.length === 0)
                    return;
                const list = Array.from(nodes);
                const first = list[0];
                const last = list[list.length - 1];
                const active = document.activeElement;
                if (e.shiftKey && active === first) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', onKeyDown, true);
        return () => {
            document.removeEventListener('keydown', onKeyDown, true);
            restoreRef.current?.focus?.();
        };
        // Re-run when the overlay opens/closes; `index` changes keep the same trap.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    if (!open)
        return null;
    const position = index;
    const item = items[position];
    const video = item.kind === 'video';
    const poster = video ? item.poster : item.url;
    const counter = (formatCounter ?? ((n, of) => `${n} / ${of}`))(position + 1, items.length);
    const control = (name, controlLabel, onClick, place) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": controlLabel, onClick: onClick, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('absolute inline-flex w-11 items-center justify-center rounded-full bg-surface text-on-surface', chrome_v4_1.MIN_TAP_CLASS, place), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: name, size: "lg" }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-label": label, "data-xen-lightbox-v4": "", onMouseDown: (e) => {
            if (e.target === e.currentTarget)
                onClose();
        }, className: "fixed inset-0 z-[100] flex items-center justify-center p-[calc(var(--xen-space-lg)_+_env(safe-area-inset-top))]", children: [control('close', closeLabel, onClose, 'right-[var(--xen-space-lg)] top-[calc(var(--xen-space-lg)_+_env(safe-area-inset-top))]'), hasPrev
                ? control('chevron-left', prevLabel, onPrev, 'left-[var(--xen-space-lg)] top-1/2 -translate-y-1/2')
                : null, (0, jsx_runtime_1.jsxs)("figure", { "data-xen-lightbox-figure": "", className: "flex max-h-full max-w-3xl flex-col items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex max-h-[80vh] items-center justify-center", children: [video && !onPlay ? ((0, jsx_runtime_1.jsx)("video", { src: item.url, poster: item.poster, controls: true, autoPlay: true, className: "max-h-[80vh] max-w-full rounded-[var(--xen-radius-md)]" })) : poster ? ((0, jsx_runtime_1.jsx)("img", { src: poster, alt: item.alt ?? item.caption ?? '', className: "max-h-[80vh] max-w-full rounded-[var(--xen-radius-md)] object-contain" })) : null, video && onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playLabel, onClick: () => onPlay(position), "data-xen-v4-chrome": "on-surface", className: "absolute inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface/90 text-on-surface", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u25B6", size: "2xl" }) })) : null] }), item.caption ? ((0, jsx_runtime_1.jsx)("figcaption", { className: (0, cn_1.cn)('text-center text-sm', OVERLAY_INK), children: item.caption })) : null, (0, jsx_runtime_1.jsx)("div", { "data-xen-lightbox-counter": "", className: (0, cn_1.cn)('text-xs [font-variant-numeric:tabular-nums]', OVERLAY_INK), children: counter })] }), hasNext
                ? control('chevron-right', nextLabel, onNext, 'right-[var(--xen-space-lg)] top-1/2 -translate-y-1/2')
                : null] }));
}
//# sourceMappingURL=LightboxV4.js.map