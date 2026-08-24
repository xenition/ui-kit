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
exports.ApplicationRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const StatusPipeline_1 = require("./StatusPipeline");
const format_1 = require("./format");
/**
 * A single row in the "my applications" list: company avatar, job title,
 * applied age, and a compact {@link StatusPipeline} showing where it sits in the
 * funnel (with rejection called out as text). Data + `onClick` only; tokens only.
 */
exports.ApplicationRow = React.forwardRef(function ApplicationRow({ application, onClick, accessory, className, ...rest }, ref) {
    const applied = (0, format_1.formatRelative)(application.appliedAt);
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-application-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${application.jobTitle} at ${application.companyName}`, onClick: interactive ? () => onClick(application) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(application);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-md border-b border-border bg-surface px-md py-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: application.companyName, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-sm font-semibold text-on-surface", children: application.jobTitle }), applied ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: applied }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: application.companyName }), (0, jsx_runtime_1.jsx)(StatusPipeline_1.StatusPipeline, { stage: application.stage, rejected: application.rejected, variant: "compact" })] }), accessory ? (0, jsx_runtime_1.jsx)("div", { children: accessory }) : null] }));
});
//# sourceMappingURL=ApplicationRow.js.map