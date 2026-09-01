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
exports.LostPetAlertV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    lost: { label: 'Lost', tone: 'danger', slot: 'danger', glyph: '🚨' },
    sighted: { label: 'Sighted', tone: 'warn', slot: 'warn', glyph: '👀' },
    found: { label: 'Found', tone: 'success', slot: 'success', glyph: '🎉' },
    reunited: { label: 'Reunited', tone: 'success', slot: 'success', glyph: '🏠' },
};
/**
 * LostPetAlert — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a lost-pet alert: an elevated rounded card with a soft
 * shadow (no gradient) whose urgency is carried by a status-toned soft surface
 * accent — a token-colored left edge + reduced-alpha tint on the glyph well — plus
 * a labelled status Badge + glyph (danger for lost, etc.), never color alone.
 * Uses `role="alert"`, keeps the static map placeholder, and preserves the
 * report-sighting + share actions for active alerts. Same props/behavior as
 * {@link LostPetAlertProps}. All colors from `--xen-*` token classes (no literals).
 */
exports.LostPetAlertV4 = React.forwardRef(function LostPetAlertV4({ name, status, lastSeen, lastSeenAt, reward, description, contact, showMap = true, reportLabel = 'Report sighting', onReportSighting, onShare, className, }, ref) {
    const meta = STATUS_META[status];
    const active = status !== 'reunited' && status !== 'found';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "aria-label": `${meta.label}: ${name}${lastSeen ? `, last seen ${lastSeen}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-l-4 border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md', _tokens_1.SLOT_BORDER[meta.slot], className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl', _tokens_1.SLOT_TINT[meta.slot]), "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), lastSeenAt ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: lastSeenAt }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label })] }), lastSeen ? (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-on-surface", children: ["\uD83D\uDCCD Last seen: ", lastSeen] }) : null, showMap ? ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex h-[120px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-primary/10", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", children: "\uD83D\uDDFA\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Map preview" })] })) : null, description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-muted", children: description }) : null, reward || contact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [reward ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface", children: ["\uD83C\uDFC5 Reward ", reward] })) : null, contact ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface", children: ["\u260E ", contact] })) : null] })) : null, onReportSighting || onShare ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-sm)]", children: [active && onReportSighting ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "danger", size: "sm", className: "flex-1", onClick: onReportSighting, children: reportLabel })) : null, onShare ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", className: "flex-1", onClick: onShare, children: "Share" })) : null] })) : null] }));
});
//# sourceMappingURL=LostPetAlertV4.js.map