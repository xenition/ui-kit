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
exports.PriorityTagV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Per level, its `[soft-tint background, text color, glyph]`. Per the token
 * contract, priority is carried by color **and** a leading glyph — never color
 * alone: `urgent` → danger, `high` → warn, `med` → primary, `low` →
 * neutral/muted. Every color traces to an `--xen-*` token class.
 */
const LEVEL = {
    low: { bg: 'bg-border/[0.4]', fg: 'text-muted-text', dot: 'bg-muted-text', glyph: '▾' },
    med: { bg: 'bg-primary/[0.14]', fg: 'text-primary-text', dot: 'bg-primary', glyph: '◆' },
    high: { bg: 'bg-warn/[0.16]', fg: 'text-warn-text', dot: 'bg-warn', glyph: '▲' },
    urgent: { bg: 'bg-danger/[0.16]', fg: 'text-danger-text', dot: 'bg-danger', glyph: '⚑' },
};
const DEFAULT_LABEL = {
    low: 'Low',
    med: 'Medium',
    high: 'High',
    urgent: 'Urgent',
};
/**
 * PriorityTag — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a priority chip: a **soft-tint pill** colored by
 * level with a leading glyph so urgency reads by shape as well as color, keeping
 * the base levels and the `dotOnly` dense mode. Same props/behavior as
 * {@link PriorityTagProps}; all colors from `--xen-*` token classes (no literals).
 */
exports.PriorityTagV4 = React.forwardRef(function PriorityTagV4({ level, label, dotOnly = false, className, ...rest }, ref) {
    const tone = LEVEL[level] ?? LEVEL.low;
    const text = label ?? DEFAULT_LABEL[level] ?? 'Low';
    if (dotOnly) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "img", "aria-label": `${text} priority`, className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 rounded-full', tone.dot, className), ...rest }));
    }
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": `${text} priority`, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-[var(--xen-radius-full)] px-2.5 py-1 text-xs font-semibold', tone.bg, tone.fg, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-[0.85em] leading-none", children: tone.glyph }), text] }));
});
//# sourceMappingURL=PriorityTagV4.js.map