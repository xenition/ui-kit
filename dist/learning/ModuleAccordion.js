"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleAccordion = ModuleAccordion;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LessonRow_1 = require("./LessonRow");
/**
 * A course outline as collapsible modules (built on the primitive `Accordion`),
 * each expanding to its {@link LessonRow} list. The module header shows a lesson
 * count and completed tally. Renders an empty-state note when there are no
 * modules. Token-only colors (`--xen-*`).
 */
function ModuleAccordion({ modules, type = 'single', defaultOpenIds, onLessonSelect, emptyLabel = 'No modules yet', className, }) {
    if (modules.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { "aria-label": emptyLabel, className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-lg)]', className), children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const items = modules.map((mod) => {
        const done = mod.lessons.filter((l) => l.status === 'completed').length;
        return {
            value: mod.id,
            title: ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: mod.title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [done, "/", mod.lessons.length, " lessons"] })] })),
            content: ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-1", children: mod.lessons.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No lessons" })) : (mod.lessons.map((lesson, i) => ((0, jsx_runtime_1.jsx)(LessonRow_1.LessonRow, { index: i + 1, title: lesson.title, durationLabel: lesson.durationLabel, status: lesson.status, kind: lesson.kind, onSelect: onLessonSelect ? () => onLessonSelect(mod.id, lesson.id) : undefined }, lesson.id)))) })),
        };
    });
    return (0, jsx_runtime_1.jsx)(primitives_1.Accordion, { items: items, type: type, defaultValue: defaultOpenIds, className: className });
}
//# sourceMappingURL=ModuleAccordion.js.map