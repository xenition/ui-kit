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
exports.OpenHouseBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Per-status editorial styling. ONE accent = primary for upcoming; the live
 * state promotes to the success token so "open now" reads at a glance. Status is
 * carried by an icon + label (never color alone). All classes resolve to
 * `--xen-*` tokens — no literal colors.
 */
const STATUS = {
    upcoming: {
        glyph: '📅',
        prefix: 'Open house',
        pill: 'bg-primary/10 border-primary/20',
        text: 'text-on-surface',
    },
    live: {
        glyph: '🟢',
        prefix: 'Open now',
        pill: 'bg-success/15 border-success/30',
        text: 'text-on-surface',
    },
    ended: {
        glyph: '✓',
        prefix: 'Ended',
        pill: 'bg-on-surface/5 border-border',
        text: 'text-muted',
    },
};
/**
 * OpenHouseBadge — **V4** "listing" design (web parity of the native V4). The
 * editorial take on the open-house indicator: a calendar glyph and the
 * date/time window inside a soft-primary tinted pill, promoting to a
 * success-toned "open now" pill for the live state. Same props/behavior as
 * {@link OpenHouseBadgeProps}; still pure presentation (strings in, no
 * callbacks). The full window is rendered as one phrase so it is announced as a
 * single string, and status is conveyed by icon + label, not color alone. All
 * colors come from the `--xen-*` tokens — no literal colors.
 */
exports.OpenHouseBadgeV4 = React.forwardRef(function OpenHouseBadgeV4({ dateLabel, startTime, endTime, status = 'upcoming', className, ...rest }, ref) {
    const { glyph, prefix, pill, text } = STATUS[status];
    const window = [startTime, endTime].filter(Boolean).join('–');
    const label = `${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": label, className: (0, cn_1.cn)('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold', pill, text, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: prefix }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-muted", children: "\u00B7" }), (0, jsx_runtime_1.jsx)("span", { children: dateLabel }), window ? (0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: window }) : null] }));
});
//# sourceMappingURL=OpenHouseBadgeV4.js.map