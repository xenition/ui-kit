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
exports.CompanyCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
/**
 * CompanyCard — design V3 (web). A compact directory row: a small logo, the name
 * and `industry · location` meta stacked, and a trailing open-roles `Badge` plus
 * a small follow `Button`. Hairline-separated for dense lists. Same props as
 * {@link CompanyCardProps} (drop-in). Token-pure.
 */
exports.CompanyCardV3 = React.forwardRef(function CompanyCardV3({ company, following, onToggleFollow, onClick, className, ...rest }, ref) {
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-company-card": "v3", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${company.name}${company.industry ? `, ${company.industry}` : ''}`, onClick: interactive ? () => onClick(company) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(company);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-md border-b border-border bg-surface px-md py-md text-on-surface', interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: company.logoUrl, name: company.name, size: "md", shape: "rounded" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: company.name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null] }), typeof company.openRoles === 'number' && company.openRoles > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: `${company.openRoles} open` })) : null, showFollow ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onClick: onToggleFollow
                    ? (e) => {
                        e.stopPropagation();
                        onToggleFollow(company);
                    }
                    : undefined, "aria-label": following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`, children: following ? 'Following' : 'Follow' })) : null] }));
});
//# sourceMappingURL=CompanyCardV3.js.map