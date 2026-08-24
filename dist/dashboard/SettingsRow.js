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
exports.SettingsRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A single settings/preferences row: label (+ optional description) on the left,
 * a value and/or trailing control on the right. Shows a chevron and becomes a
 * `<button>` when `onClick` is provided. Token-only.
 */
exports.SettingsRow = React.forwardRef(function SettingsRow({ label, value, description, rightSlot, onClick, className }, ref) {
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base text-on-surface", children: label }), description ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: description }) : null] }), value ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm text-muted", children: value }) : null, rightSlot ?? (onClick ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg text-muted", children: "\u203A" }) : null)] }));
    const classes = (0, cn_1.cn)('flex min-h-[48px] w-full items-center gap-md px-lg py-md', className);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label, className: classes, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": label, onClick: onClick, className: (0, cn_1.cn)(classes, 'text-left transition-colors hover:bg-neutral-100'), children: inner }));
});
//# sourceMappingURL=SettingsRow.js.map