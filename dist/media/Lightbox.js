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
exports.Lightbox = Lightbox;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
/**
 * Backdrop color is `color-mix` over the darkest neutral step (token-only, same
 * in light and dark). The fade is opacity-only and dropped under reduced
 * motion.
 */
const LIGHTBOX_CSS = `
@keyframes xen-lightbox-in { from { opacity: 0; } to { opacity: 1; } }
[data-xen-lightbox] {
  background-color: color-mix(in srgb, var(--xen-neutral-950) 88%, transparent);
  animation: xen-lightbox-in 180ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-lightbox] { animation: none; }
}
`;
const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
/**
 * Fullscreen overlay media viewer. `role="dialog" aria-modal="true"` with a
 * focus trap (focus enters on open, cycles with Tab, and is restored to the
 * trigger on close), keyboard control (Esc closes, ←/→ navigate), a
 * token-styled backdrop, and an opacity-only fade that's disabled under
 * `prefers-reduced-motion`. SSR-safe (guards `document`) and renders nothing
 * when `index` is `null` or out of range. Presentational — the parent owns
 * `index` and the prev/next handlers.
 */
function Lightbox({ items, index, onClose, onPrev, onNext, loop = false, label = 'Media viewer', closeLabel = 'Close', prevLabel = 'Previous', nextLabel = 'Next', }) {
    (0, inject_1.injectStyleOnce)('xen-lightbox-styles', LIGHTBOX_CSS);
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
        // Move focus into the dialog.
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
    const item = items[index];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-label": label, "data-xen-lightbox": "", onMouseDown: (e) => {
            if (e.target === e.currentTarget)
                onClose();
        }, className: "fixed inset-0 z-[100] flex items-center justify-center p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": closeLabel, onClick: onClose, className: "absolute right-[var(--xen-space-lg)] top-[var(--xen-space-lg)] inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 4l10 10M14 4L4 14" }) }) }), hasPrev ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": prevLabel, onClick: onPrev, className: "absolute left-[var(--xen-space-lg)] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M11 4L6 9l5 5" }) }) })) : null, (0, jsx_runtime_1.jsxs)("figure", { "data-xen-lightbox-figure": "", className: "flex max-h-full max-w-3xl flex-col items-center gap-[var(--xen-space-sm)]", children: [item.kind === 'video' ? ((0, jsx_runtime_1.jsx)("video", { src: item.url, poster: item.poster, controls: true, autoPlay: true, className: "max-h-[80vh] max-w-full rounded-[var(--xen-radius-md)]" })) : ((0, jsx_runtime_1.jsx)("img", { src: item.url, alt: item.alt ?? item.caption ?? '', className: "max-h-[80vh] max-w-full rounded-[var(--xen-radius-md)] object-contain" })), item.caption ? ((0, jsx_runtime_1.jsx)("figcaption", { className: "text-center text-sm text-neutral-50", children: item.caption })) : null, (0, jsx_runtime_1.jsxs)("div", { "data-xen-lightbox-counter": "", className: "text-xs text-neutral-50", children: [index + 1, " / ", items.length] })] }), hasNext ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": nextLabel, onClick: onNext, className: "absolute right-[var(--xen-space-lg)] top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M7 4l5 5-5 5" }) }) })) : null] }));
}
//# sourceMappingURL=Lightbox.js.map