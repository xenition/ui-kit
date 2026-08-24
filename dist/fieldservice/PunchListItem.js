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
exports.PunchListItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const SEVERITY = {
    minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
    major: { label: 'Major', glyph: '▲', tone: 'warn' },
    critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};
/**
 * One punch-list defect: a leading checkbox to mark it resolved, a description
 * that strikes through when `done` (so completion reads without color alone), a
 * severity pill (text + glyph + a color that traces to a semantic token), and
 * location / assignee meta. Toggling fires `onToggle` with the next state. No
 * literal colors.
 */
exports.PunchListItem = React.forwardRef(function PunchListItem({ label, done, severity, location, assignee, onToggle, disabled = false, className, style }, ref) {
    const sd = severity ? SEVERITY[severity] : undefined;
    const meta = [location, assignee].filter((v) => v != null).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "pt-0.5", children: (0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, disabled: disabled, onChange: (e) => onToggle?.(e.target.checked), "aria-label": label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-3 text-base font-semibold', done ? 'text-muted line-through' : 'text-on-surface'), children: label }), meta !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: meta }) : null] }), sd ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` }) : null] }));
});
//# sourceMappingURL=PunchListItem.js.map