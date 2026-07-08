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
exports.FeatureCard = exports.FeatureGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const COLUMN_CLASSES = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
};
/** Responsive grid of `FeatureCard`s. */
exports.FeatureGrid = React.forwardRef(function FeatureGrid({ columns = 3, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-feature-grid": "", className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-lg)]', COLUMN_CLASSES[columns], className), ...rest }));
});
/** One feature: icon slot, title, and body copy (children). */
exports.FeatureCard = React.forwardRef(function FeatureCard({ icon, title, hoverLift = true, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-feature-card": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] border border-border bg-surface text-on-surface', 'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', hoverLift && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg', className), ...rest, children: [icon !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-100 text-primary-700", children: icon })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-semibold", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted", children: children })] }));
});
//# sourceMappingURL=FeatureGrid.js.map