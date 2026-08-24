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
exports.LogoCloud = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Row of partner/customer logos, dimmed and desaturated until hovered.
 * Children are arbitrary logo slots (img/svg/text); each is wrapped so the
 * dim/restore treatment is uniform.
 */
exports.LogoCloud = React.forwardRef(function LogoCloud({ label, className, children, ...rest }, ref) {
    const items = React.Children.toArray(children);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-logo-cloud": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-md)]', className), ...rest, children: [label !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium uppercase tracking-widest text-muted", children: label })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap items-center justify-center gap-x-[var(--xen-space-xl)] gap-y-[var(--xen-space-md)]", children: items.map((child, index) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-logo": "", className: "opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0", children: child }, index))) })] }));
});
//# sourceMappingURL=LogoCloud.js.map