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
exports.ActivityLogRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * One entry in an activity feed. A tinted round badge carries the activity
 * **kind** as a glyph (📞 call, ✉ email, 👥 meeting, 📝 note, ✔ task, 💰 deal)
 * paired with a `kind`-derived tone — meaning is never color-only because the
 * glyph and the accessible label both name the kind. Optional actor + timestamp
 * meta line. The badge uses `bg-neutral-100` with the tone-colored glyph — token
 * classes only. When `onClick` is set the row is a `role="button"` div.
 */
exports.ActivityLogRow = React.forwardRef(function ActivityLogRow({ kind, title, detail, actor, timestamp, pending = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.ACTIVITY_META[kind];
    const metaLine = [actor, timestamp].filter(Boolean).join(' · ');
    const interactive = onClick ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: ${title}`, className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', pending && 'opacity-60', onClick && 'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm', (0, internal_1.toneTextClass)(meta.tone)), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: title }), detail ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: detail }) : null, metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium text-muted", children: metaLine }) : null] })] }));
});
//# sourceMappingURL=ActivityLogRow.js.map