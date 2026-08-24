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
exports.NotificationItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Renders as a `<button>` when `onClick` is supplied. Token-only.
 */
exports.NotificationItem = React.forwardRef(function NotificationItem({ title, body, time, unread = false, onClick, className }, ref) {
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('mt-1.5 h-2 w-2 shrink-0 rounded-full', unread ? 'bg-primary' : 'bg-transparent') }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base text-on-surface', unread ? 'font-bold' : 'font-medium'), children: title }), body ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: body }) : null] }), time ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: time }) : null] }));
    const classes = (0, cn_1.cn)('flex w-full gap-sm rounded-[var(--xen-radius-md)] px-md py-sm', unread ? 'bg-neutral-100' : 'bg-surface', className);
    const label = `${title}${unread ? ', unread' : ''}`;
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": label, className: classes, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": label, onClick: onClick, className: (0, cn_1.cn)(classes, 'text-left transition-opacity hover:opacity-80'), children: inner }));
});
//# sourceMappingURL=NotificationItem.js.map