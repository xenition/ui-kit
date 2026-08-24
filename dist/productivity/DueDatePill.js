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
exports.DueDatePill = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Maps a due tone to its `[background, foreground]` token classes: `overdue`
 * escalates to danger, `today` to warn, `upcoming` stays neutral. No literals.
 */
const TONE = {
    overdue: { bg: 'bg-danger', fg: 'text-on-danger' },
    today: { bg: 'bg-warn', fg: 'text-on-warn' },
    upcoming: { bg: 'bg-border', fg: 'text-on-surface' },
};
const GLYPH = {
    overdue: '⚠',
    today: '●',
    upcoming: '🗓',
};
/**
 * Compact due-date pill — a token-bound background/foreground keyed off the
 * urgency `tone`, with a leading glyph. For deadlines on task rows and cards.
 * Web parity of the native `DueDatePill`. Every color traces to an `--xen-*`
 * token class. No literal colors.
 */
exports.DueDatePill = React.forwardRef(function DueDatePill({ label, tone = 'upcoming', glyph, className, ...rest }, ref) {
    const t = TONE[tone] ?? TONE.upcoming;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": `Due ${label}${tone === 'overdue' ? ', overdue' : ''}`, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-full px-2 py-0.5 text-xs font-semibold', t.bg, t.fg, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: glyph ?? GLYPH[tone] ?? GLYPH.upcoming }), label] }));
});
//# sourceMappingURL=DueDatePill.js.map