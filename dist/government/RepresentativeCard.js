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
exports.RepresentativeCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const PARTY_LABEL = {
    democratic: 'Democratic',
    republican: 'Republican',
    independent: 'Independent',
    green: 'Green',
    other: 'Other',
    nonpartisan: 'Nonpartisan',
};
/**
 * An elected-official / representative contact card: avatar, name, office, a
 * neutral party label, jurisdiction, and gated Call / Email actions (real
 * `<button>`s). Party is a plain label (never encoded by color alone), and an
 * in-office flag reads as a text + glyph badge. Token-bound throughout — no
 * literal colors. Web parity of the native `RepresentativeCard`.
 */
exports.RepresentativeCard = React.forwardRef(function RepresentativeCard({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, className, ...rest }, ref) {
    const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    const officeTone = inOffice ? 'success' : 'neutral';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: office }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [partyLabel != null ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: partyLabel }) : null, inOffice != null ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: officeTone, children: inOffice ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2713" }), " In office"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2014" }), " Former"] })) })) : null] })] })] }), district != null || termInfo != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex flex-col gap-0.5", children: [district != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCCD" }), " ", district] })) : null, termInfo != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDDF3\uFE0F" }), " ", termInfo] })) : null] })) : null, showCall || showEmail ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]", children: [showCall ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onClick: onCall, children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: onEmail, children: "Email" })) : null] })) : null] }));
});
//# sourceMappingURL=RepresentativeCard.js.map