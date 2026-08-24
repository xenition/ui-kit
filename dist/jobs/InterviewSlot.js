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
exports.InterviewSlot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/** Mode → [glyph, label] — a non-color signal for the interview channel. */
const MODE = {
    onsite: ['📍', 'On-site'],
    video: ['🎥', 'Video'],
    phone: ['📞', 'Phone'],
};
/**
 * A selectable interview slot chip/card: date + time range, a mode marker
 * (on-site / video / phone — glyph + label, not color alone), and the
 * interviewer. Selected state is announced via `aria-pressed` and a token
 * outline; disabled slots never fire `onSelect`. Tokens only.
 */
exports.InterviewSlot = React.forwardRef(function InterviewSlot({ interview, selected = false, disabled = false, onSelect, className, ...rest }, ref) {
    const [glyph, modeLabel] = MODE[interview.mode] ?? MODE.video;
    const start = (0, format_1.formatTime)(interview.startsAt);
    const end = interview.endsAt ? (0, format_1.formatTime)(interview.endsAt) : '';
    const timeRange = end ? `${start} – ${end}` : start;
    const dateLabel = (0, format_1.formatShortDate)(interview.startsAt);
    const a11y = `${dateLabel} ${timeRange}, ${modeLabel}${interview.interviewer ? `, with ${interview.interviewer}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-interview-slot": "", "aria-label": a11y, "aria-pressed": selected, disabled: disabled || !onSelect, onClick: onSelect ? () => onSelect(interview) : undefined, className: (0, cn_1.cn)('flex flex-col gap-xs rounded-md p-md text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:cursor-not-allowed disabled:opacity-50', selected
            ? 'border-2 border-primary bg-primary text-on-primary'
            : 'border border-border bg-surface text-on-surface hover:opacity-95', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', selected ? 'text-on-primary' : 'text-muted'), children: [dateLabel, '  ·  ', modeLabel] })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-semibold', selected ? 'text-on-primary' : 'text-on-surface'), children: timeRange }), interview.interviewer ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs', selected ? 'text-on-primary' : 'text-muted'), children: interview.interviewer })) : null] }));
});
//# sourceMappingURL=InterviewSlot.js.map