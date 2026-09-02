import * as React from 'react';
import { cn } from '../primitives/cn';
import { Accordion } from '../primitives';
import { LessonRowV4 } from './LessonRowV4';
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
export function ModuleAccordionV4({
  modules,
  type = 'single',
  defaultOpenIds,
  onLessonSelect,
  emptyLabel = 'No modules yet',
  className,
}: ModuleAccordionV4Props): React.ReactElement {
  if (modules.length === 0) {
    return (
      <div
        data-xen-module-accordion=""
        aria-label={emptyLabel}
        className={cn('rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]', className)}
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
          <span className="text-xs tabular-nums text-muted">{done}/{mod.lessons.length} lessons</span>
        </div>
      ),
      content: (
        <div className="flex flex-col gap-2">
          {mod.lessons.length === 0 ? (
            <p className="text-sm text-muted">No lessons</p>
          ) : (
            mod.lessons.map((lesson, i) => (
              <LessonRowV4
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
