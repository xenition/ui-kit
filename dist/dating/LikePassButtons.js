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
exports.LikePassButtons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SPEC = {
    rewind: { glyph: '↺', label: 'Rewind', color: 'text-warn border-warn' },
    pass: { glyph: '✕', label: 'Pass', color: 'text-danger border-danger' },
    superlike: { glyph: '★', label: 'Super like', color: 'text-accent border-accent' },
    like: { glyph: '♥', label: 'Like', color: 'text-success border-success' },
    boost: { glyph: '⚡', label: 'Boost', color: 'text-primary border-primary' },
};
const DIAMETER = {
    sm: 'h-11 w-11 text-lg',
    md: 'h-14 w-14 text-xl',
    lg: 'h-16 w-16 text-2xl',
};
const DEFAULT_ACTIONS = ['pass', 'superlike', 'like'];
/**
 * The circular action row under a swipe deck — the web parity of the native
 * like/pass controls. Each action is a round, real `<button>` carrying a glyph
 * AND an `aria-label`, so it is never identified by color alone. `onAction`
 * reports which control was clicked. Token color classes only — no literal colors.
 */
exports.LikePassButtons = React.forwardRef(function LikePassButtons({ actions = DEFAULT_ACTIONS, onAction, disabledActions, size = 'md', className, ...rest }, ref) {
    const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
    const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "toolbar", className: (0, cn_1.cn)('flex items-center justify-center gap-md', className), ...rest, children: list.map((action) => {
            const spec = SPEC[action];
            const disabled = disabledSet.has(action);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": spec.label, disabled: disabled, onClick: () => onAction?.(action), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full border-2 bg-surface font-bold transition-colors', 'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-40', DIAMETER[size], spec.color), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: spec.glyph }) }, action));
        }) }));
});
//# sourceMappingURL=LikePassButtons.js.map