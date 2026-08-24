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
exports.CategoryChip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BASE_CLASSES = {
    solid: 'bg-accent text-on-accent',
    soft: 'bg-surface text-accent',
    outline: 'border border-border bg-transparent text-accent',
};
/**
 * A small category / section label for news & blog UIs — the "Technology",
 * "Opinion", "Sport" tag above a headline. Web (React DOM) mirror of the native
 * `CategoryChip`. Three token-bound variants (`solid`/`soft`/`outline`); an
 * optional `onClick` turns it into a section filter (rendered with
 * `role="button"` + keyboard activation). All colors from `--xen-*` tokens.
 */
exports.CategoryChip = React.forwardRef(function CategoryChip({ label, variant = 'solid', onClick, active = false, className, ...rest }, ref) {
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Category ${label}` : undefined, "aria-pressed": interactive ? active : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('inline-flex select-none self-start rounded-[var(--xen-radius-sm)] px-[var(--xen-space-sm)] py-[3px]', 'text-xs font-bold uppercase tracking-wide', BASE_CLASSES[variant], active && variant !== 'solid' && 'border border-accent', interactive && 'cursor-pointer', className), ...rest, children: label }));
});
//# sourceMappingURL=CategoryChip.js.map