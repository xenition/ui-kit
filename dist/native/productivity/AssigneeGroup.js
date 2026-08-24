"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssigneeGroup = AssigneeGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Overlapping avatar stack of task assignees — a thin wrapper over the primitive
 * {@link AvatarGroup} that adds a muted "Unassigned" empty state and guards a
 * missing array. Colors come from the theme tokens. No literal colors.
 */
function AssigneeGroup({ assignees, max = 3, size = 'sm', emptyLabel = 'Unassigned', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const people = Array.isArray(assignees) ? assignees : [];
    if (people.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ alignSelf: 'flex-start' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }, children: emptyLabel }) }));
    }
    return (0, jsx_runtime_1.jsx)(primitives_1.AvatarGroup, { avatars: people, max: max, size: size, style: style });
}
//# sourceMappingURL=AssigneeGroup.js.map