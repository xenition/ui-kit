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
exports.TiltCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const reduced_motion_1 = require("./internal/reduced-motion");
/**
 * Pointer-tracked 3D tilt. The tilt resets on pointer leave and is disabled
 * for touch pointers and under `prefers-reduced-motion`. State is written
 * straight to the element style (no re-render per pointer move).
 */
exports.TiltCard = React.forwardRef(function TiltCard({ maxTilt = 8, style, children, onPointerMove, onPointerLeave, ...rest }, forwardedRef) {
    const localRef = React.useRef(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current);
    const reduced = (0, reduced_motion_1.usePrefersReducedMotion)();
    const clampedMax = Math.max(0, Math.min(15, maxTilt));
    const handlePointerMove = (event) => {
        onPointerMove?.(event);
        const el = localRef.current;
        if (el === null || reduced || event.pointerType === 'touch')
            return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0)
            return;
        const px = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateY = (px * 2 * clampedMax).toFixed(2);
        const rotateX = (-py * 2 * clampedMax).toFixed(2);
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handlePointerLeave = (event) => {
        onPointerLeave?.(event);
        const el = localRef.current;
        if (el !== null)
            el.style.transform = '';
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: localRef, "data-xen-tilt": "", onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave, style: {
            transition: reduced ? undefined : 'transform 200ms ease-out',
            willChange: reduced ? undefined : 'transform',
            ...style,
        }, ...rest, children: children }));
});
//# sourceMappingURL=TiltCard.js.map