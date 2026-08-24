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
exports.Reveal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Stagger_1 = require("./Stagger");
const reduced_motion_1 = require("./internal/reduced-motion");
const use_in_view_1 = require("./internal/use-in-view");
const HIDDEN_STYLES = {
    'fade-up': { transform: 'translate3d(0, 24px, 0)' },
    fade: {},
    'slide-left': { transform: 'translate3d(-32px, 0, 0)' },
    'slide-right': { transform: 'translate3d(32px, 0, 0)' },
    zoom: { transform: 'scale(0.92)' },
    'blur-in': { filter: 'blur(8px)' },
};
/**
 * Scroll-triggered entrance wrapper (no animation library — CSS transitions
 * plus one IntersectionObserver). Under `prefers-reduced-motion` — or when
 * `IntersectionObserver` is unavailable — children render instantly in their
 * final state.
 */
exports.Reveal = React.forwardRef(function Reveal({ effect = 'fade-up', delay = 0, duration = 600, once = true, threshold = 0.15, style, children, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const inView = (0, use_in_view_1.useInView)(localRef, { threshold, once, disabled: reduced });
    const visible = reduced || inView;
    const staggerConfig = React.useContext(Stagger_1.StaggerConfigContext);
    const staggerIndex = React.useContext(Stagger_1.StaggerIndexContext);
    const totalDelay = delay + (staggerConfig !== null ? staggerConfig.delay + staggerIndex * staggerConfig.interval : 0);
    const hidden = HIDDEN_STYLES[effect];
    const motionStyle = reduced
        ? {}
        : {
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : hidden.transform,
            filter: visible ? undefined : hidden.filter,
            transition: `opacity ${duration}ms ease, transform ${duration}ms ease, filter ${duration}ms ease`,
            transitionDelay: `${totalDelay}ms`,
            willChange: visible ? undefined : 'opacity, transform',
        };
    return ((0, jsx_runtime_1.jsx)("div", { ref: localRef, "data-xen-reveal": effect, "data-state": visible ? 'visible' : 'hidden', style: { ...motionStyle, ...style }, ...rest, children: children }));
});
//# sourceMappingURL=Reveal.js.map