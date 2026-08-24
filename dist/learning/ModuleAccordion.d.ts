import * as React from 'react';
import { type LessonStatus } from './LessonRow';
/** A lesson entry inside a module. */
export interface ModuleLesson {
    id: string;
    title: string;
    durationLabel?: string;
    status?: LessonStatus;
    kind?: string;
}
/** A course module (section) with its lessons. */
export interface CourseModule {
    id: string;
    title: string;
    lessons: ModuleLesson[];
}
export interface ModuleAccordionProps {
    /** Course modules, each collapsible to reveal its lessons. */
    modules: CourseModule[];
    /** `single` keeps one module open, `multiple` allows many (default single). */
    type?: 'single' | 'multiple';
    /** Module ids expanded on first render. */
    defaultOpenIds?: string[];
    /** Fires when a lesson row is clicked. */
    onLessonSelect?: (moduleId: string, lessonId: string) => void;
    /** Copy shown when there are no modules. */
    emptyLabel?: string;
    className?: string;
}
/**
 * A course outline as collapsible modules (built on the primitive `Accordion`),
 * each expanding to its {@link LessonRow} list. The module header shows a lesson
 * count and completed tally. Renders an empty-state note when there are no
 * modules. Token-only colors (`--xen-*`).
 */
export declare function ModuleAccordion({ modules, type, defaultOpenIds, onLessonSelect, emptyLabel, className, }: ModuleAccordionProps): React.ReactElement;
//# sourceMappingURL=ModuleAccordion.d.ts.map