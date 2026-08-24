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
exports.EmptyDashboard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A first-run / empty dashboard state (design.md §15): a centered headline, a
 * short guiding message, and exactly one dominant action. Illustration-less by
 * default. Token-only.
 */
exports.EmptyDashboard = React.forwardRef(function EmptyDashboard({ title, message, actionLabel, onAction, icon, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": title, className: (0, cn_1.cn)('flex flex-col items-center justify-center gap-sm px-xl py-2xl text-center', className), ...rest, children: [icon ? (0, jsx_runtime_1.jsx)("div", { className: "mb-sm", children: icon }) : null, (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-on-surface", children: title }), message ? (0, jsx_runtime_1.jsx)("p", { className: "max-w-[340px] text-base text-muted", children: message }) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-md", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: onAction, children: actionLabel }) })) : null] }));
});
//# sourceMappingURL=EmptyDashboard.js.map