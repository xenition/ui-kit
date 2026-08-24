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
exports.RepresentativeCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const PARTY_LABEL = { democratic: 'Democratic', republican: 'Republican', independent: 'Independent', green: 'Green', other: 'Other', nonpartisan: 'Nonpartisan' };
/**
 * RepresentativeCard, redesigned (v2): a **banner official card**. A primary-tinted
 * cover carries a large avatar; the name/office, party + in-office badges, district
 * and term info center beneath, with Call/Email actions. Elevated. Distinct from
 * v1. Same props, token-only.
 */
exports.RepresentativeCardV2 = React.forwardRef(function RepresentativeCardV2({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, className, ...rest }, ref) {
    const meta = [district, termInfo].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-representative-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-center shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 bg-primary/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 px-md pb-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "-mt-9 rounded-full border-4 border-surface", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: photoUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: office }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-wrap justify-center gap-1.5", children: [party ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: PARTY_LABEL[party] }) : null, inOffice != null ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: inOffice ? 'success' : 'neutral', children: inOffice ? '✓ In office' : 'Not in office' }) : null] }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null, (onCall && phone) || (onEmail && email) ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex w-full gap-2", children: [onCall && phone ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onCall, children: "Call" }) : null, onEmail && email ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onEmail, children: "Email" }) : null] })) : null] })] }));
});
//# sourceMappingURL=RepresentativeCardV2.js.map