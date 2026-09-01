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
exports.DueDatePillV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Maps a due tone to its **soft-tint** background + legible foreground token
 * classes: `overdue` escalates to danger, `today` warns, `upcoming` rests on a
 * calm primary wash. Urgency reads by color *and* glyph, never color alone. No
 * literals.
 */
const TONE = {
    overdue: { tint: 'bg-danger/[0.12]', fg: 'text-danger' },
    today: { tint: 'bg-warn/[0.12]', fg: 'text-warn' },
    upcoming: { tint: 'bg-primary/[0.10]', fg: 'text-primary' },
};
const GLYPH = {
    overdue: '⚠',
    today: '●',
    upcoming: '🗓',
};
/**
 * DueDatePill — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a deadline: a rounded **soft-tint** pill with a
 * leading calendar/clock glyph and the date, colored by urgency `tone`. Calm by
 * default (a gentle primary wash), escalating to danger/warn only when the date
 * demands it — and always paired with a glyph so urgency never rides on color
 * alone. Same props/behavior as {@link DueDatePillProps}; every color traces to
 * an `--xen-*` token class (no literals).
 */
exports.DueDatePillV4 = React.forwardRef(function DueDatePillV4({ label, tone = 'upcoming', glyph, className, ...rest }, ref) {
    const t = TONE[tone] ?? TONE.upcoming;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": `Due ${label}${tone === 'overdue' ? ', overdue' : ''}`, className: (0, cn_1.cn)('inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-sm font-semibold', t.tint, t.fg, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: glyph ?? GLYPH[tone] ?? GLYPH.upcoming }), label] }));
});
//# sourceMappingURL=DueDatePillV4.js.map