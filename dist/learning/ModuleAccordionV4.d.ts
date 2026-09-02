import * as React from 'react';
import type { ModuleAccordionProps } from './ModuleAccordion';
/** Drop-in for {@link ModuleAccordionProps} — same props, the V4 "campus" design. */
export type ModuleAccordionV4Props = ModuleAccordionProps;
/**
 * ModuleAccordion — **V4** "campus" design (web parity of the native V4). A
 * course outline as collapsible modules (built on the primitive `Accordion`),
 * each expanding to its {@link LessonRowV4} list on the campus design. The module
 * header shows a **tabular-nums** completed/total tally. Renders an elevated
 * empty-state card when there are no modules. Identical props/behavior to
 * {@link ModuleAccordionProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export declare function ModuleAccordionV4({ modules, type, defaultOpenIds, onLessonSelect, emptyLabel, className, }: ModuleAccordionV4Props): React.ReactElement;
//# sourceMappingURL=ModuleAccordionV4.d.ts.map