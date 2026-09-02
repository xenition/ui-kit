"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleAccordionV4 = ModuleAccordionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LessonRowV4_1 = require("./LessonRowV4");
/**
 * ModuleAccordion — **V4** "campus" design (web parity of the native V4). A
 * course outline as collapsible modules (built on the primitive `Accordion`),
 * each expanding to its {@link LessonRowV4} list on the campus design. The module
 * header shows a **tabular-nums** completed/total tally. Renders an elevated
 * empty-state card when there are no modules. Identical props/behavior to
 * {@link ModuleAccordionProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
function ModuleAccordionV4({ modules, type = 'single', defaultOpenIds, onLessonSelect, emptyLabel = 'No modules yet', className, }) {
    if (modules.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { "data-xen-module-accordion": "", "aria-label": emptyLabel, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]', className), children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const items = modules.map((mod) => {
        const done = mod.lessons.filter((l) => l.status === 'completed').length;
        return {
            value: mod.id,
            title: ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: mod.title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: [done, "/", mod.lessons.length, " lessons"] })] })),
            content: ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: mod.lessons.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No lessons" })) : (mod.lessons.map((lesson, i) => ((0, jsx_runtime_1.jsx)(LessonRowV4_1.LessonRowV4, { index: i + 1, title: lesson.title, durationLabel: lesson.durationLabel, status: lesson.status, kind: lesson.kind, onSelect: onLessonSelect ? () => onLessonSelect(mod.id, lesson.id) : undefined }, lesson.id)))) })),
        };
    });
    return (0, jsx_runtime_1.jsx)(primitives_1.Accordion, { items: items, type: type, defaultValue: defaultOpenIds, className: className });
}
//# sourceMappingURL=ModuleAccordionV4.js.map