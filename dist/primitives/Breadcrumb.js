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
exports.Breadcrumb = Breadcrumb;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Breadcrumb trail bound to the theme tokens. The last item is the current page. */
function Breadcrumb({ items, separator = '/', className }) {
    return ((0, jsx_runtime_1.jsx)("nav", { "aria-label": "Breadcrumb", className: (0, cn_1.cn)('flex items-center gap-2 text-sm', className), children: items.map((it, i) => {
            const last = i === items.length - 1;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(it.href || it.onClick) && !last ? ((0, jsx_runtime_1.jsx)("a", { href: it.href, onClick: it.onClick, className: "text-muted transition-colors hover:text-on-surface", children: it.label })) : ((0, jsx_runtime_1.jsx)("span", { "aria-current": last ? 'page' : undefined, className: last ? 'font-medium text-on-surface' : 'text-muted', children: it.label })), !last && (0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: separator })] }, i));
        }) }));
}
//# sourceMappingURL=Breadcrumb.js.map