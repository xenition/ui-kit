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
exports.ApplicationRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const types_1 = require("./types");
/**
 * ApplicationRow — design V3 (web). A dense single line: a colored status dot,
 * the job title, then the stage word and applied age trailing. The stage is
 * carried by the WORD (and a ✕/✓ glyph), never the dot color alone, and the
 * full context lives in the accessible label. Same props as
 * {@link ApplicationRowProps} (drop-in). Token-pure.
 */
exports.ApplicationRowV3 = React.forwardRef(function ApplicationRowV3({ application, onClick, accessory, className, ...rest }, ref) {
    const applied = (0, format_1.formatRelative)(application.appliedAt);
    const interactive = onClick != null;
    // Guarded indexing: an unknown stage still resolves to a real label.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(application.stage));
    const label = types_1.STAGE_LABEL[application.stage] ?? types_1.STAGE_LABEL[types_1.APPLICATION_STAGES[0]];
    const rejected = !!application.rejected;
    const hired = application.stage === 'hired';
    const dotClass = rejected ? 'bg-danger' : hired ? 'bg-success' : 'bg-primary';
    const wordClass = rejected ? 'text-danger' : hired ? 'text-success' : 'text-primary';
    const stageWord = rejected ? `✕ ${label}` : hired ? `✓ ${label}` : label;
    const summary = rejected
        ? `${application.jobTitle} at ${application.companyName}, rejected at ${label}, stage ${idx + 1} of ${types_1.APPLICATION_STAGES.length}`
        : `${application.jobTitle} at ${application.companyName}, ${label}, stage ${idx + 1} of ${types_1.APPLICATION_STAGES.length}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-application-row": "v3", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": summary, onClick: interactive ? () => onClick(application) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(application);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-sm border-b border-border bg-surface px-md py-sm', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', dotClass) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-sm font-semibold text-on-surface", children: application.jobTitle }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 truncate text-xs font-semibold', wordClass), children: stageWord }), applied ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: applied }) : null, accessory ? (0, jsx_runtime_1.jsx)("div", { children: accessory }) : null] }));
});
//# sourceMappingURL=ApplicationRowV3.js.map