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
exports.PointerHalo = PointerHalo;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const reduced_motion_1 = require("../motion/internal/reduced-motion");
/**
 * Colors are `color-mix` over the semantic accent slot; a `(pointer: coarse)`
 * media rule hides the halo outright on touch devices as a second line of
 * defense behind the runtime fine-pointer check.
 */
const HALO_CSS = `
[data-xen-pointer-halo] {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--xen-accent) 20%, transparent);
  border: 1px solid color-mix(in srgb, var(--xen-accent) 80%, transparent);
  transition: width 320ms cubic-bezier(0.22, 1, 0.36, 1), height 320ms cubic-bezier(0.22, 1, 0.36, 1), background-color 320ms ease;
}
[data-xen-pointer-halo][data-mode="grow"] {
  background-color: color-mix(in srgb, var(--xen-accent) 92%, transparent);
  border-color: transparent;
}
[data-xen-pointer-halo] [data-xen-pointer-halo-label] {
  color: var(--xen-on-accent);
  font-family: var(--xen-font-body);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
}
@media (pointer: coarse) {
  [data-xen-pointer-halo] { display: none; }
}
`;
const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';
/**
 * Optional custom-cursor affordance generalized from the portfolio template:
 * a small accent halo trailing the pointer that tightens over interactive
 * elements and swells into a labelled disc over `[data-halo="grow"]` targets
 * (project covers, oversized CTAs).
 *
 * Safety rails: renders nothing on the server, under
 * `prefers-reduced-motion`, and on coarse/touch pointers (runtime
 * `(pointer: fine)` check + CSS fallback); non-mouse pointer events are
 * ignored; the native cursor is never suppressed. The trailing ease is a
 * rAF lerp written straight to the element style — no re-render per move,
 * no animation library.
 */
function PointerHalo({ size = 22, linkSize = 12, growSize = 72, label, className, }) {
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const [finePointer, setFinePointer] = React.useState(false);
    const [mode, setMode] = React.useState('idle');
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
            return;
        setFinePointer(window.matchMedia('(pointer: fine)').matches);
    }, []);
    const active = finePointer && !reduced;
    React.useEffect(() => {
        if (!active || typeof window === 'undefined')
            return undefined;
        const target = { x: -200, y: -200 };
        const current = { x: -200, y: -200 };
        let frame = 0;
        const step = () => {
            frame = 0;
            current.x += (target.x - current.x) * 0.22;
            current.y += (target.y - current.y) * 0.22;
            const el = ref.current;
            if (el !== null) {
                el.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
            }
            if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.5) {
                frame = window.requestAnimationFrame(step);
            }
        };
        const onMove = (event) => {
            if (event.pointerType !== 'mouse')
                return;
            target.x = event.clientX;
            target.y = event.clientY;
            const el = event.target instanceof Element ? event.target : null;
            if (el?.closest('[data-halo="grow"]') != null)
                setMode('grow');
            else if (el?.closest(INTERACTIVE) != null)
                setMode('link');
            else
                setMode('idle');
            if (frame === 0)
                frame = window.requestAnimationFrame(step);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            if (frame !== 0)
                window.cancelAnimationFrame(frame);
        };
    }, [active]);
    if (!active)
        return null;
    (0, inject_1.injectStyleOnce)('xen-pointer-halo-styles', HALO_CSS);
    const diameter = mode === 'grow' ? growSize : mode === 'link' ? linkSize : size;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-hidden": "true", "data-xen-pointer-halo": "", "data-mode": mode, className: className, style: {
            width: diameter,
            height: diameter,
            transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)',
        }, children: mode === 'grow' && label != null ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-pointer-halo-label": "", children: label })) : null }));
}
//# sourceMappingURL=PointerHalo.js.map