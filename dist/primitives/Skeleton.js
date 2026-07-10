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
exports.Skeleton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Shimmering loading placeholder bound to the theme tokens. */
exports.Skeleton = React.forwardRef(function Skeleton({ className, variant = 'text', width, height, lines = 1, style, ...rest }, ref) {
    const base = 'animate-pulse bg-neutral-200';
    const shape = variant === 'circle'
        ? 'rounded-full'
        : variant === 'rect'
            ? 'rounded-[var(--xen-radius-md)]'
            : 'rounded';
    if (variant === 'text' && lines > 1) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: Array.from({ length: lines }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(base, shape, 'h-3.5'), style: { width: i === lines - 1 ? '60%' : '100%' } }, i))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(base, shape, variant === 'text' && 'h-3.5', className), style: { width, height, ...style }, ...rest }));
});
//# sourceMappingURL=Skeleton.js.map