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
exports.CarouselV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("../motion/internal/reduced-motion");
const cn_1 = require("../primitives/cn");
const ArrowIcon = ({ dir }) => ((0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "20", height: "20", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: dir === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5' }) }));
/**
 * Carousel — **V4** "showcase" design (web parity of the native V4). A refined
 * slider: the same scroll-snapping, keyboard-navigable, autoplay-honoring track
 * as the base `Carousel`, re-skinned as a rounded showcase surface with tactile
 * ≥44px round prev/next controls and clear dot indicators (active = a wide
 * primary pill, others = muted — never color alone; the active dot also carries
 * `aria-selected`). Honors `autoplay` (paused on hover/focus and under reduced
 * motion), `arrows`, `dots`, `label`, and `items`/children. Same props/behavior
 * as {@link CarouselProps}; token-only colors, no literals.
 */
exports.CarouselV4 = React.forwardRef(function CarouselV4({ items, arrows = true, dots = true, autoplay = 0, label = 'Carousel', className, children, ...rest }, ref) {
    const slides = items ?? React.Children.toArray(children);
    const count = slides.length;
    const [active, setActive] = React.useState(0);
    const [paused, setPaused] = React.useState(false);
    const scrollerRef = React.useRef(null);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const goTo = React.useCallback((index) => {
        if (count === 0)
            return;
        const nextIndex = ((index % count) + count) % count;
        setActive(nextIndex);
        const scroller = scrollerRef.current;
        const child = scroller?.children[nextIndex];
        if (scroller && child && typeof scroller.scrollTo === 'function') {
            scroller.scrollTo({
                left: child.offsetLeft - scroller.offsetLeft,
                behavior: reduced ? 'auto' : 'smooth',
            });
        }
    }, [count, reduced]);
    const prev = React.useCallback(() => goTo(active - 1), [active, goTo]);
    const next = React.useCallback(() => goTo(active + 1), [active, goTo]);
    const onScroll = React.useCallback(() => {
        const scroller = scrollerRef.current;
        if (!scroller)
            return;
        const kids = Array.from(scroller.children);
        let nearest = 0;
        let best = Infinity;
        kids.forEach((child, i) => {
            const dist = Math.abs(child.offsetLeft - scroller.offsetLeft - scroller.scrollLeft);
            if (dist < best) {
                best = dist;
                nearest = i;
            }
        });
        setActive(nearest);
    }, []);
    React.useEffect(() => {
        if (!autoplay || autoplay <= 0 || paused || reduced || count <= 1)
            return undefined;
        const id = window.setInterval(() => goTo(active + 1), autoplay);
        return () => window.clearInterval(id);
    }, [autoplay, paused, reduced, count, active, goTo]);
    const onKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            prev();
        }
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            next();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-carousel": "", role: "region", "aria-roledescription": "carousel", "aria-label": label, onKeyDown: onKeyDown, onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), onFocusCapture: () => setPaused(true), onBlurCapture: () => setPaused(false), className: (0, cn_1.cn)('relative', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { ref: scrollerRef, "data-xen-carousel-track": "", tabIndex: 0, "aria-label": `${label} slides`, onScroll: onScroll, className: (0, cn_1.cn)('flex snap-x snap-mandatory gap-[var(--xen-space-md)] overflow-x-auto scroll-smooth', 'rounded-[var(--xen-radius-lg)]', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'), children: slides.map((slide, i) => ((0, jsx_runtime_1.jsx)("div", { "data-xen-carousel-slide": "", role: "group", "aria-roledescription": "slide", "aria-label": `${i + 1} of ${count}`, "aria-hidden": i === active ? undefined : true, "data-active": i === active ? 'true' : 'false', className: "min-w-0 shrink-0 basis-full snap-start", children: slide }, i))) }), arrows && count > 1 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous slide", onClick: prev, className: (0, cn_1.cn)('absolute left-[var(--xen-space-sm)] top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center', 'rounded-[var(--xen-radius-full)] border border-border bg-surface text-on-surface shadow-md transition-colors', 'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: (0, jsx_runtime_1.jsx)(ArrowIcon, { dir: "left" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next slide", onClick: next, className: (0, cn_1.cn)('absolute right-[var(--xen-space-sm)] top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center', 'rounded-[var(--xen-radius-full)] border border-border bg-surface text-on-surface shadow-md transition-colors', 'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: (0, jsx_runtime_1.jsx)(ArrowIcon, { dir: "right" }) })] })) : null, dots && count > 1 ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-carousel-dots": "", role: "tablist", "aria-label": "Slides", className: "mt-[var(--xen-space-md)] flex justify-center gap-[var(--xen-space-xs)]", children: slides.map((_, i) => ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "tab", "aria-selected": i === active, "aria-label": `Go to slide ${i + 1}`, onClick: () => goTo(i), "data-active": i === active ? 'true' : 'false', className: (0, cn_1.cn)('h-2 rounded-[var(--xen-radius-full)] transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', i === active ? 'w-6 bg-primary' : 'w-2 bg-neutral-300 hover:bg-neutral-400') }, i))) })) : null] }));
});
//# sourceMappingURL=CarouselV4.js.map