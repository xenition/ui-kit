import * as React from 'react';
import { cn } from '../primitives/cn';
import { Accordion } from '../primitives';
import { LessonRow, type LessonStatus } from './LessonRow';

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
export function ModuleAccordion({
  modules,
  type = 'single',
  defaultOpenIds,
  onLessonSelect,
  emptyLabel = 'No modules yet',
  className,
}: ModuleAccordionProps): React.ReactElement {
  if (modules.length === 0) {
    return (
      <div
        aria-label={emptyLabel}
        className={cn('rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-lg)]', className)}
      >
        <p className="text-sm text-muted">{emptyLabel}</p>
      </div>
    );
  }

  const items = modules.map((mod) => {
    const done = mod.lessons.filter((l) => l.status === 'completed').length;
    return {
      value: mod.id,
      title: (
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{mod.title}</span>
          <span className="text-xs text-muted">
            {done}/{mod.lessons.length} lessons
          </span>
        </div>
      ),
      content: (
        <div className="flex flex-col gap-1">
          {mod.lessons.length === 0 ? (
            <p className="text-sm text-muted">No lessons</p>
          ) : (
            mod.lessons.map((lesson, i) => (
              <LessonRow
                key={lesson.id}
                index={i + 1}
                title={lesson.title}
                durationLabel={lesson.durationLabel}
                status={lesson.status}
                kind={lesson.kind}
                onSelect={onLessonSelect ? () => onLessonSelect(mod.id, lesson.id) : undefined}
              />
            ))
          )}
        </div>
      ),
    };
  });

  return <Accordion items={items} type={type} defaultValue={defaultOpenIds} className={className} />;
}
