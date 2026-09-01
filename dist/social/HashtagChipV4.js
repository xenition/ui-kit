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
exports.HashtagChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SIZE_CLASS = {
    sm: 'px-sm py-1 text-xs',
    md: 'px-md py-xs text-sm',
};
/**
 * HashtagChip — **V4** "feed" design (web parity of the native V4). A rounded
 * soft-primary chip: `#tag` rendered in primary on a `bg-primary/10` tint,
 * tappable. When `active` it fills with the primary color. Same props/behavior
 * as {@link HashtagChipProps}; all colors from `--xen-*` token classes (no
 * literals). `aria-pressed` encodes the active state (not color alone).
 */
exports.HashtagChipV4 = React.forwardRef(function HashtagChipV4({ tag, active = false, count, size = 'md', onClick, className, disabled, ...rest }, ref) {
    const bare = tag.replace(/^#/, '');
    const label = `#${bare}`;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": label, "aria-pressed": active, disabled: disabled ?? !onClick, onClick: onClick ? () => onClick(bare) : undefined, className: (0, cn_1.cn)('inline-flex min-h-[44px] select-none items-center gap-xs self-start rounded-full font-semibold transition-colors', 'disabled:pointer-events-none', SIZE_CLASS[size], active ? 'bg-primary text-on-primary' : 'bg-primary/10 text-primary hover:bg-primary/20', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { children: label }), count != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-normal', active ? 'text-on-primary' : 'text-primary/70'), children: String(count) })) : null] }));
});
//# sourceMappingURL=HashtagChipV4.js.map