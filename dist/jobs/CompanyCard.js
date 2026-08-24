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
exports.CompanyCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
/**
 * An employer summary card — logo (`Avatar`), name, industry / location, a
 * headcount `Badge`, an open-roles count, and an optional follow `Button`.
 * Data + callbacks only; the follow button flips between primary "Follow" and
 * secondary "Following" while keeping an explicit accessible label. Tokens only.
 */
exports.CompanyCard = React.forwardRef(function CompanyCard({ company, following, onToggleFollow, onClick, className, ...rest }, ref) {
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-company-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${company.name}${company.industry ? `, ${company.industry}` : ''}`, onClick: interactive ? () => onClick(company) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(company);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-md rounded-lg border border-border bg-surface p-lg text-on-surface', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: company.logoUrl, name: company.name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-semibold text-on-surface", children: company.name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: meta }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [company.size ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: `${company.size} employees` }) : null, typeof company.openRoles === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: company.openRoles > 0 ? 'primary' : 'neutral', children: company.openRoles > 0 ? `${company.openRoles} open roles` : 'No open roles' })) : null] }), showFollow ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", className: "self-start", onClick: onToggleFollow
                    ? (e) => {
                        e.stopPropagation();
                        onToggleFollow(company);
                    }
                    : undefined, "aria-label": following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`, children: following ? 'Following' : 'Follow' })) : null] }));
});
//# sourceMappingURL=CompanyCard.js.map