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
exports.AnimatedCounter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("./internal/reduced-motion");
const use_in_view_1 = require("./internal/use-in-view");
const defaultFormat = (value) => Math.round(value).toLocaleString('en-US');
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
/**
 * Counts up (or down) once scrolled into view, driven by
 * requestAnimationFrame. Under `prefers-reduced-motion` — or without
 * `IntersectionObserver` — the final value renders immediately.
 */
exports.AnimatedCounter = React.forwardRef(function AnimatedCounter({ to, from = 0, duration = 1500, format = defaultFormat, threshold = 0.5, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const inView = (0, use_in_view_1.useInView)(localRef, { threshold, once: true, disabled: reduced });
    const [value, setValue] = React.useState(from);
    React.useEffect(() => {
        if (!inView && !reduced)
            return undefined;
        if (reduced || duration <= 0) {
            setValue(to);
            return undefined;
        }
        let frame = 0;
        let start = null;
        const tick = (now) => {
            if (start === null)
                start = now;
            const progress = Math.min((now - start) / duration, 1);
            setValue(from + (to - from) * easeOutCubic(progress));
            if (progress < 1)
                frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frame);
    }, [inView, reduced, from, to, duration]);
    return ((0, jsx_runtime_1.jsx)("span", { ref: localRef, "data-xen-counter": "", ...rest, children: format(value) }));
});
//# sourceMappingURL=AnimatedCounter.js.map