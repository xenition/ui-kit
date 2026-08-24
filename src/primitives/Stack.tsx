import * as React from 'react';
import { cn } from './cn';

export type StackDirection = 'row' | 'column';
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: StackGap;
  /** Cross-axis alignment. */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Main-axis distribution. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

const GAP_CLASSES: Record<StackGap, string> = {
  xs: 'gap-[var(--xen-space-xs)]',
  sm: 'gap-[var(--xen-space-sm)]',
  md: 'gap-[var(--xen-space-md)]',
  lg: 'gap-[var(--xen-space-lg)]',
  xl: 'gap-[var(--xen-space-xl)]',
  '2xl': 'gap-[var(--xen-space-2xl)]',
};

const ALIGN_CLASSES: Record<NonNullable<StackProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const JUSTIFY_CLASSES: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

/** Flex layout helper with token-bound gaps. */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = 'column', gap = 'md', align = 'stretch', justify, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row',
        GAP_CLASSES[gap],
        ALIGN_CLASSES[align],
        justify ? JUSTIFY_CLASSES[justify] : undefined,
        className
      )}
      {...rest}
    />
  );
});
