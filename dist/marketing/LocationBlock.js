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
exports.LocationBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Contact/location section — address, hours, and links beside an embedded map. */
exports.LocationBlock = React.forwardRef(function LocationBlock({ name, address, hours, phone, email, mapSrc, directionsUrl, className, ...rest }, ref) {
    const mapTitle = name ? `Map of ${name}` : 'Location map';
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-location-block": "", "aria-label": name ? `${name} location and contact` : 'Location and contact', className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-xl)] lg:grid-cols-2', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)]", children: [name ? ((0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-2xl font-bold leading-tight text-on-surface", children: name })) : null, (0, jsx_runtime_1.jsx)("address", { className: "not-italic leading-relaxed text-muted", children: address }), hours && hours.length > 0 ? ((0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("caption", { className: "sr-only", children: "Opening hours" }), (0, jsx_runtime_1.jsx)("tbody", { children: hours.map((row, i) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-border last:border-b-0", children: [(0, jsx_runtime_1.jsx)("th", { scope: "row", className: "py-[var(--xen-space-xs)] pr-[var(--xen-space-md)] text-left font-medium text-on-surface", children: row.label }), (0, jsx_runtime_1.jsx)("td", { className: "py-[var(--xen-space-xs)] text-right text-muted", children: row.value })] }, i))) })] })) : null, phone || email ? ((0, jsx_runtime_1.jsxs)("ul", { className: "flex flex-col gap-[var(--xen-space-xs)] text-sm", children: [phone ? ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: `tel:${phone}`, className: "text-primary hover:underline", children: phone }) })) : null, email ? ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: `mailto:${email}`, className: "text-primary hover:underline", children: email }) })) : null] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "aspect-video overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-100", children: mapSrc ? ((0, jsx_runtime_1.jsx)("iframe", { src: mapSrc, title: mapTitle, loading: "lazy", className: "h-full w-full border-0" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-full w-full flex-col items-center justify-center gap-[var(--xen-space-sm)] text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: address }), directionsUrl ? ((0, jsx_runtime_1.jsx)("a", { href: directionsUrl, target: "_blank", rel: "noreferrer", className: "text-sm font-medium text-primary hover:underline", children: "Get directions" })) : null] })) })] }));
});
//# sourceMappingURL=LocationBlock.js.map