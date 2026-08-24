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
exports.SettingsSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Groups {@link SettingsRow}s into a titled, bordered card with hairline
 * dividers between rows — the grouped-list section. Token-only.
 */
exports.SettingsSection = React.forwardRef(function SettingsSection({ title, footnote, children, className, ...rest }, ref) {
    const rows = React.Children.toArray(children).filter(Boolean);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("span", { className: "px-sm text-xs font-semibold uppercase text-muted", children: title })) : null, (0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface", children: rows.map((row, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-border" }) : null, row] }, i))) }), footnote ? (0, jsx_runtime_1.jsx)("span", { className: "px-sm text-xs text-muted", children: footnote }) : null] }));
});
//# sourceMappingURL=SettingsSection.js.map