"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssigneeGroup = AssigneeGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Overlapping avatar stack of task assignees — a thin wrapper over the primitive
 * {@link AvatarGroup} that adds a muted "Unassigned" empty state and guards a
 * missing array. Web parity of the native `AssigneeGroup`. Colors come from the
 * theme tokens. No literal colors.
 */
function AssigneeGroup({ assignees, max = 3, size = 'sm', emptyLabel = 'Unassigned', className, }) {
    const people = Array.isArray(assignees) ? assignees : [];
    if (people.length === 0) {
        return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('self-start text-xs italic text-muted', className), children: emptyLabel }));
    }
    return (0, jsx_runtime_1.jsx)(primitives_1.AvatarGroup, { avatars: people, max: max, size: size, className: className });
}
//# sourceMappingURL=AssigneeGroup.js.map