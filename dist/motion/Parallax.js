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
exports.Parallax = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("./internal/reduced-motion");
const clampSpeed = (speed) => Math.max(-0.5, Math.min(0.5, speed));
/**
 * Subtle scroll parallax: translates its children on the Y axis via a
 * passive scroll listener + requestAnimationFrame. Disabled entirely under
 * `prefers-reduced-motion` and on the server.
 */
exports.Parallax = React.forwardRef(function Parallax({ speed = 0.2, style, children, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    React.useEffect(() => {
        if (reduced || typeof window === 'undefined')
            return undefined;
        const el = localRef.current;
        if (el === null)
            return undefined;
        const factor = clampSpeed(speed);
        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const offset = (viewportCenter - elementCenter) * factor;
            el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        };
        const onScroll = () => {
            if (frame === 0)
                frame = window.requestAnimationFrame(update);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame !== 0)
                window.cancelAnimationFrame(frame);
            el.style.transform = '';
        };
    }, [speed, reduced]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: localRef, "data-xen-parallax": "", style: style, ...rest, children: children }));
});
//# sourceMappingURL=Parallax.js.map