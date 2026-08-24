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
exports.Avatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIZE = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
};
function initials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}
/** User avatar — image with an initials fallback, bound to the theme tokens. */
exports.Avatar = React.forwardRef(function Avatar({ className, src, alt, name, size = 'md', ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full', 'bg-primary-50 font-medium text-primary', SIZE[size], className), ...rest, children: src ? ((0, jsx_runtime_1.jsx)("img", { src: src, alt: alt ?? name ?? '', className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { children: initials(name) })) }));
});
//# sourceMappingURL=Avatar.js.map