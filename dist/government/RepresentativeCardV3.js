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
exports.RepresentativeCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const PARTY_LABEL = { democratic: 'Democratic', republican: 'Republican', independent: 'Independent', green: 'Green', other: 'Other', nonpartisan: 'Nonpartisan' };
/**
 * RepresentativeCard, redesigned (v3): a **compact official row**. A small avatar,
 * the name over an office·party·district line with an in-office ✓, and a Call/Email
 * glyph pair on the right — hairline-bordered for a directory. The opposite of v2's
 * banner. Same props, token-only.
 */
exports.RepresentativeCardV3 = React.forwardRef(function RepresentativeCardV3({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, className, ...rest }, ref) {
    void termInfo;
    const sub = [office, party ? PARTY_LABEL[party] : null, district].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-representative-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: photoUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1 truncate text-sm font-semibold text-on-surface", children: [name, inOffice ? (0, jsx_runtime_1.jsx)("span", { className: "text-success", "aria-label": "In office", children: "\u2713" }) : null] }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), onCall && phone ? (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Call", onClick: onCall, className: "text-lg text-primary", children: "\uD83D\uDCDE" }) : null, onEmail && email ? (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Email", onClick: onEmail, className: "text-lg text-primary", children: "\u2709\uFE0F" }) : null] }));
});
//# sourceMappingURL=RepresentativeCardV3.js.map