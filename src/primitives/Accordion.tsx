import * as React from 'react';
import { cn } from './cn';

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** `single` keeps one panel open; `multiple` allows many (default single). */
  type?: 'single' | 'multiple';
  /** Values open on first render. */
  defaultValue?: string[];
  className?: string;
}

/** Collapsible sections bound to the theme tokens. */
export function Accordion({
  items,
  type = 'single',
  defaultValue = [],
  className,
}: AccordionProps): React.ReactElement {
  const [open, setOpen] = React.useState<string[]>(defaultValue);
  const toggle = (v: string) =>
    setOpen((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]
    );
  return (
    <div
      className={cn(
        'divide-y divide-border overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
        className
      )}
    >
      {items.map((it) => {
        const isOpen = open.includes(it.value);
        return (
          <div key={it.value}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(it.value)}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-on-surface"
            >
              {it.title}
              <span className={cn('ml-2 shrink-0 text-muted transition-transform', isOpen && 'rotate-180')}>
                ▾
              </span>
            </button>
            {isOpen && <div className="px-4 pb-3 text-sm text-muted">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
