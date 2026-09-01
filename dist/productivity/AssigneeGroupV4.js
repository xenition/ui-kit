"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssigneeGroupV4 = AssigneeGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** +N overflow-chip dimensions, keyed to the avatar `size`. */
const CHIP = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-[72px] w-[72px] text-xl',
};
/**
 * AssigneeGroup — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on assignees: an overlapping stack of **bigger, softly
 * rounded** avatars each carrying a surface ring so they read cleanly against the
 * workspace, capped by a **soft-primary "+N"** overflow chip. Preserves the base
 * `max` / overflow and the muted "Unassigned" empty state. Same props/behavior
 * as {@link AssigneeGroupProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
function AssigneeGroupV4({ assignees, max = 3, size = 'sm', emptyLabel = 'Unassigned', className, }) {
    const people = Array.isArray(assignees) ? assignees : [];
    if (people.length === 0) {
        return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('self-start text-xs italic text-muted', className), children: emptyLabel }));
    }
    const shown = people.slice(0, max);
    const extra = people.length - shown.length;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center', className), children: [shown.map((a, i) => ((0, jsx_runtime_1.jsx)("span", { className: "-ml-2 rounded-[var(--xen-radius-md)] ring-2 ring-surface first:ml-0", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: a.name, src: a.src, size: size, shape: "rounded" }) }, i))), extra > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('-ml-2 inline-flex items-center justify-center rounded-[var(--xen-radius-md)]', 'bg-primary/[0.12] font-semibold text-primary ring-2 ring-surface', CHIP[size]), children: ["+", extra] })) : null] }));
}
//# sourceMappingURL=AssigneeGroupV4.js.map