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
exports.StarButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A star / flag toggle for a mail item. Filled (warn accent) when `starred`,
 * hollow + muted otherwise. Renders a real `<button>` whose accessible label
 * announces the state in words ("Starred" / "Not starred") — plus `aria-pressed`
 * — so the toggle is never conveyed by color alone. Controlled via
 * `starred` / `onToggle`. Token classes only — no literal colors.
 */
exports.StarButton = React.forwardRef(function StarButton({ starred = false, onToggle, size = 'lg', disabled = false, className }, ref) {
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": starred ? 'Starred' : 'Not starred', "aria-pressed": starred, disabled: disabled, onClick: () => onToggle?.(!starred), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] p-[var(--xen-space-xs)] transition-opacity', 'hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none disabled:opacity-50', className), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: starred ? '★' : '☆', size: size, color: starred ? 'warn' : 'muted' }) }));
});
//# sourceMappingURL=StarButton.js.map