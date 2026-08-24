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
exports.ResumeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * A row in the résumé / documents list: a file glyph, the file name, an
 * updated-age + size line, a "Default" badge, and optional download / set-default
 * actions. Data + callbacks only; tokens only.
 */
exports.ResumeRow = React.forwardRef(function ResumeRow({ resume, onClick, onDownload, onSetDefault, className, ...rest }, ref) {
    const meta = [(0, format_1.formatRelative)(resume.updatedAt), resume.sizeLabel].filter(Boolean).join(' · ');
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-resume-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${resume.name}${resume.isDefault ? ', default résumé' : ''}`, onClick: interactive ? () => onClick(resume) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(resume);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-md rounded-md border border-border bg-surface p-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-100 text-lg", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCC4" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-sm font-semibold text-on-surface", children: resume.name }), resume.isDefault ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Default" }) : null] }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [!resume.isDefault && onSetDefault ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onSetDefault(resume);
                        }, "aria-label": `Set ${resume.name} as default`, children: "Set default" })) : null, onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Download ${resume.name}`, onClick: (e) => {
                            e.stopPropagation();
                            onDownload(resume);
                        }, className: "text-lg leading-none text-primary", children: "\u2B07" })) : null] })] }));
});
//# sourceMappingURL=ResumeRow.js.map