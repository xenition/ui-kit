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
exports.StreakBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Token `text-*` class per tone. */
const TONE_CLASS = {
    primary: 'text-primary',
    accent: 'text-accent',
    warn: 'text-warn',
    success: 'text-success',
};
const SIZE_FONT = {
    sm: { count: 'text-lg', unit: 'text-xs' },
    md: { count: 'text-xl', unit: 'text-xs' },
    lg: { count: 'text-2xl', unit: 'text-sm' },
};
/**
 * A gamified streak pill: a flame glyph + the streak count and unit. A zero
 * streak degrades to a muted prompt instead of a "0" badge. The count uses a
 * semantic `tone` color. Token-only colors (`--xen-*`).
 */
exports.StreakBadge = React.forwardRef(function StreakBadge({ count, unit = 'day', tone = 'warn', glyph = '🔥', size = 'md', emptyLabel = 'Start your streak', className, ...rest }, ref) {
    const font = SIZE_FONT[size];
    if (count <= 0) {
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": emptyLabel, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-full border border-border bg-surface px-2 py-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base opacity-50", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const unitLabel = `${unit}${count === 1 ? '' : 's'}`;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": `${count} ${unitLabel} streak`, className: (0, cn_1.cn)('inline-flex items-baseline gap-1 self-start rounded-full border border-border bg-surface px-3 py-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-extrabold', font.count, TONE_CLASS[tone]), children: count }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-muted', font.unit), children: unitLabel })] }));
});
//# sourceMappingURL=StreakBadge.js.map