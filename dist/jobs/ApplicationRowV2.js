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
exports.ApplicationRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const StatusPipelineV2_1 = require("./StatusPipelineV2");
const format_1 = require("./format");
/**
 * ApplicationRow — design V2 (web). An elevated card that gives the application
 * room: a header of company avatar + job title + applied age, then the full
 * {@link StatusPipelineV2} funnel (big numbered steps with connectors) laid out
 * horizontally. Same props as {@link ApplicationRowProps} (drop-in). Token-pure,
 * with a subtle hover lift / press settle (reduced-motion aware).
 */
exports.ApplicationRowV2 = React.forwardRef(function ApplicationRowV2({ application, onClick, accessory, className, ...rest }, ref) {
    const applied = (0, format_1.formatRelative)(application.appliedAt);
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-application-row": "v2", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${application.jobTitle} at ${application.companyName}`, onClick: interactive ? () => onClick(application) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(application);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface shadow-md', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: application.companyName, size: "md", shape: "rounded" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: application.jobTitle }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: [application.companyName, applied ? ` · ${applied}` : ''] })] }), accessory ? (0, jsx_runtime_1.jsx)("div", { children: accessory }) : null] }), (0, jsx_runtime_1.jsx)(StatusPipelineV2_1.StatusPipelineV2, { stage: application.stage, rejected: application.rejected })] }));
});
//# sourceMappingURL=ApplicationRowV2.js.map