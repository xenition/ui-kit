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
exports.PriorityTag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Maps a priority level to its `[background, foreground]` token classes. Per the
 * token contract: `urgent` → danger, `high` → warn; `med`/`low` de-escalate to
 * primary/neutral. Never a literal color.
 */
const LEVEL = {
    low: { bg: 'bg-border', fg: 'text-on-surface' },
    med: { bg: 'bg-primary', fg: 'text-on-primary' },
    high: { bg: 'bg-warn', fg: 'text-on-warn' },
    urgent: { bg: 'bg-danger', fg: 'text-on-danger' },
};
const DEFAULT_LABEL = {
    low: 'Low',
    med: 'Medium',
    high: 'High',
    urgent: 'Urgent',
};
/**
 * Small priority pill — a token-bound background/foreground per level, with a
 * `dotOnly` mode that collapses to a colored dot for dense task rows. Every color
 * traces to an `--xen-*` token class. Web parity of the native `PriorityTag`
 * (`onPress` → n/a). No literal colors.
 */
exports.PriorityTag = React.forwardRef(function PriorityTag({ level, label, dotOnly = false, className, ...rest }, ref) {
    const tone = LEVEL[level] ?? LEVEL.low;
    const text = label ?? DEFAULT_LABEL[level] ?? 'Low';
    if (dotOnly) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "img", "aria-label": `${text} priority`, className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 rounded-full', tone.bg, className), ...rest }));
    }
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "aria-label": `${text} priority`, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-[var(--xen-radius-sm)] px-2 py-0.5 text-xs font-semibold', tone.bg, tone.fg, className), ...rest, children: text }));
});
//# sourceMappingURL=PriorityTag.js.map