"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssigneeGroupV4 = AssigneeGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** +N overflow-chip diameter, mirroring the native `Avatar` size ramp. */
const DIAMETER = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const FONT = { xs: 'xs', sm: 'xs', md: 'sm', lg: 'lg', xl: 'xl' };
/**
 * AssigneeGroup — **V4** "flow" design. The focused-workspace take on assignees:
 * an overlapping stack of **bigger, softly rounded** avatars each carrying a
 * surface ring so they read cleanly against the workspace, capped by a
 * **soft-primary "+N"** overflow chip. Preserves the base `max` / overflow and
 * the muted "Unassigned" empty state. Same props/behavior as
 * {@link AssigneeGroupProps}; token-only colors via `useXenitionTheme()`.
 */
function AssigneeGroupV4({ assignees, max = 3, size = 'sm', emptyLabel = 'Unassigned', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const people = Array.isArray(assignees) ? assignees : [];
    if (people.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ alignSelf: 'flex-start' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }, children: emptyLabel }) }));
    }
    const shown = people.slice(0, max);
    const extra = people.length - shown.length;
    const d = DIAMETER[size];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center' }, style], children: [shown.map((a, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginLeft: i === 0 ? 0 : -8,
                    borderRadius: tokens.radius.md + 2,
                    borderWidth: 2,
                    borderColor: colors.surface,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: a.name, src: a.src, size: size, shape: "rounded" }) }, i))), extra > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginLeft: -8,
                    width: d,
                    height: d,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                    borderWidth: 2,
                    borderColor: colors.surface,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                        color: colors.primaryText,
                        fontSize: tokens.typography.scale[FONT[size]],
                        fontWeight: '600',
                    }, children: ["+", extra] }) })) : null] }));
}
//# sourceMappingURL=AssigneeGroupV4.js.map