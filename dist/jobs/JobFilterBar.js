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
exports.JobFilterBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const SkillTag_1 = require("./SkillTag");
/**
 * A filter bar for a job list: an optional search field plus a wrapping row of
 * employment-type chips (`SkillTag`s) that toggle on/off, and a "Clear" chip
 * once anything is active. Controlled — the app owns `active` and `query` and
 * reacts to the callbacks. Selected chips carry a token outline + a ✓ marker
 * (not color alone). Tokens only.
 */
exports.JobFilterBar = React.forwardRef(function JobFilterBar({ types = types_1.EMPLOYMENT_TYPES, active = [], onToggleType, query, onQueryChange, onClear, resultCount, className, ...rest }, ref) {
    const activeSet = new Set(active);
    const showSearch = query != null || onQueryChange != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-job-filter-bar": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [showSearch ? ((0, jsx_runtime_1.jsx)(primitives_1.SearchInput, { value: query ?? '', onChangeText: onQueryChange, placeholder: "Search jobs, companies, skills\u2026", accessibilityLabel: "Search jobs" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-label": "Filter by employment type", className: "flex flex-1 flex-wrap items-center gap-xs", children: [types.map((t) => {
                                const on = activeSet.has(t);
                                return ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: types_1.EMPLOYMENT_LABEL[t], variant: on ? 'matched' : 'default', selected: on, onClick: onToggleType ? () => onToggleType(t) : undefined }, t));
                            }), activeSet.size > 0 && onClear ? ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: "Clear", variant: "missing", onClick: onClear })) : null] }), typeof resultCount === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs text-muted", children: `${resultCount} result${resultCount === 1 ? '' : 's'}` })) : null] })] }));
});
//# sourceMappingURL=JobFilterBar.js.map