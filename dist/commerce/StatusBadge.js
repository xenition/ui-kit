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
exports.StatusBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Semantic → contrast-checked slot pairs. Using the `X` / `on-X` pairs (rather
 * than a translucent tint) means the badge is guaranteed AA-readable in both
 * light and dark modes with zero configuration.
 */
const STATUS_CLASSES = {
    pending: 'bg-warn text-on-warn',
    paid: 'bg-success text-on-success',
    fulfilled: 'bg-success text-on-success',
    shipped: 'bg-primary text-on-primary',
    cancelled: 'bg-danger text-on-danger',
    refunded: 'bg-neutral-200 text-on-surface',
};
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/**
 * Small pill badge for an order's status. Token-only, contrast-guaranteed via
 * the semantic `X`/`on-X` pairs.
 */
exports.StatusBadge = React.forwardRef(function StatusBadge({ status, children, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "data-xen-status-badge": status, className: (0, cn_1.cn)('inline-flex items-center rounded-full px-[var(--xen-space-sm)] py-0.5 text-xs font-medium', STATUS_CLASSES[status], className), ...rest, children: children ?? capitalize(status) }));
});
//# sourceMappingURL=StatusBadge.js.map