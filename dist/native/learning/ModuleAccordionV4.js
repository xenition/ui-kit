"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleAccordionV4 = ModuleAccordionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const LessonRowV4_1 = require("./LessonRowV4");
/**
 * ModuleAccordion — **V4** "campus" design (native twin of the web V4). A course
 * outline as collapsible modules (built on the primitive `Accordion`), each
 * expanding to its {@link LessonRowV4} list on the campus design. The module
 * header shows a **tabular-nums** completed/total tally. Renders an elevated
 * empty-state card when there are no modules. Token-only colors via
 * `useXenitionTheme()`.
 */
function ModuleAccordionV4({ modules, type = 'single', defaultOpenIds, onLessonPress, emptyLabel = 'No modules yet', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (modules.length === 0) {
        const shell = {
            padding: tokens.spacing.lg,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        };
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [shell, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const items = modules.map((mod) => {
        const done = mod.lessons.filter((l) => l.status === 'completed').length;
        return {
            value: mod.id,
            title: ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: mod.title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: [done, "/", mod.lessons.length, " lessons"] })] })),
            content: ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: mod.lessons.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No lessons" })) : (mod.lessons.map((lesson, i) => ((0, jsx_runtime_1.jsx)(LessonRowV4_1.LessonRowV4, { index: i + 1, title: lesson.title, durationLabel: lesson.durationLabel, status: lesson.status, kind: lesson.kind, onPress: onLessonPress ? () => onLessonPress(mod.id, lesson.id) : undefined }, lesson.id)))) })),
        };
    });
    return (0, jsx_runtime_1.jsx)(primitives_1.Accordion, { items: items, type: type, defaultValue: defaultOpenIds, style: style });
}
//# sourceMappingURL=ModuleAccordionV4.js.map