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
exports.JobFilterBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const ButtonV4_1 = require("../primitives/ButtonV4");
const SearchInputV4_1 = require("../primitives/SearchInputV4");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const types_1 = require("./types");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 job filter bar** — same props as {@link JobFilterBar} plus
 * `searchPlaceholder`, `formatResultCount` and `emptyLabel`.
 *
 * ## Five changes
 *
 * 1. **"Clear" stops being a red alarm.** The base built it out of
 *    `SkillTag variant="missing"` — the variant that means *this skill is
 *    required and you do not have it* — so the one control on the bar that
 *    undoes a mistake rendered as a solid danger-red chip labelled "! Clear",
 *    the loudest thing on the screen. It is a quiet outline action now, and
 *    the chips no longer borrow `matched`/`missing` to express selection
 *    either: a filter being on is not a fact about your résumé.
 * 2. **The chips are tappable.** They were `SkillTag`s at `py-[3px]` around a
 *    12px label — about 20 CSS pixels tall — and they are the most-tapped
 *    control in the whole module. They clear 44 now, which is also what makes
 *    them look like the rest of the V4 line's chips.
 * 3. **`resultCount={0}` is finally announced.** The base tested
 *    `typeof resultCount === 'number'` and rendered `'0 results'` — true, but
 *    silently, in `text-muted` at the end of a row nobody is looking at, and
 *    with no live region, so a screen-reader user who narrowed a filter to
 *    nothing got no feedback at all. Zero now says `emptyLabel` in a polite
 *    live region: the count changes because of something the user just did,
 *    and it is the answer to what they did.
 * 4. **The counts are translatable and correctly plural.** `${n} result${n
 *    === 1 ? '' : 's'}` was hard-coded in a component with no formatter prop,
 *    as was the search placeholder.
 * 5. **The chips press with a state layer** against the fill they actually
 *    wear, rather than `hover:opacity-90`, and the count line takes
 *    `muted-text` rather than the `muted` fill slot.
 */
exports.JobFilterBarV4 = React.forwardRef(function JobFilterBarV4({ types = types_1.EMPLOYMENT_TYPES, active = [], onToggleType, query, onQueryChange, onClear, resultCount, searchPlaceholder = 'Search jobs, companies, skills…', formatResultCount, emptyLabel = 'No matching jobs', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const activeSet = new Set(active);
    const showSearch = query != null || onQueryChange != null;
    const count = typeof resultCount === 'number' && Number.isFinite(resultCount)
        ? Math.max(0, Math.floor(resultCount))
        : undefined;
    const countText = count === undefined
        ? undefined
        : count === 0
            ? emptyLabel
            : (formatResultCount ?? ((n) => `${n} result${n === 1 ? '' : 's'}`))(count);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-job-filter-bar": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [showSearch ? ((0, jsx_runtime_1.jsx)(SearchInputV4_1.SearchInputV4, { value: query ?? '', onChangeText: onQueryChange, placeholder: searchPlaceholder, accessibilityLabel: "Search jobs" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-label": "Filter by employment type", className: "flex flex-1 flex-wrap items-center gap-xs", children: [types.map((t) => {
                                const on = activeSet.has(t);
                                const skin = (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center px-md', 'rounded-[var(--xen-radius-full)] border text-xs', on
                                    ? 'border-primary bg-primary font-semibold text-on-primary'
                                    : 'border-border bg-card font-medium text-on-card');
                                // No handler means the bar is showing a filter, not offering
                                // one. A focusable control that does nothing when pressed is
                                // the defect `CompanyCard` shipped; a `disabled` one announces
                                // "unavailable", which is not true either. So: not a control.
                                if (onToggleType == null) {
                                    return ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(skin, 'py-xs'), children: [types_1.EMPLOYMENT_LABEL[t], on ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: ', selected' }) : null] }, t));
                                }
                                return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": on, onClick: () => onToggleType(t), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(on ? 'var(--xen-primary)' : 'var(--xen-card)', on ? 'var(--xen-on-primary)' : 'var(--xen-on-card)'), className: (0, cn_1.cn)(skin, tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: types_1.EMPLOYMENT_LABEL[t] }, t));
                            }), activeSet.size > 0 && onClear ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "sm", onClick: onClear, className: tone_v4_1.MIN_TAP_CLASS, children: "Clear" })) : null] }), countText !== undefined ? ((0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: (0, cn_1.cn)('whitespace-nowrap text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: countText })) : null] })] }));
});
//# sourceMappingURL=JobFilterBarV4.js.map