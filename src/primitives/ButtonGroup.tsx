import * as React from 'react';
import { cn } from './cn';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `Button` (or compatible) children to join into a single control. */
  children: React.ReactNode;
  /** Stretch children to equal width. Default `false`. */
  fill?: boolean;
}

/**
 * Button group — joins a row of `Button` children into one segmented control
 * with a single shared outer radius and hairline dividers in the `border`
 * token. The container clips inner corners (`overflow-hidden`) so each child
 * button's own radius is neutralised at the seams; pass `fill` for equal-width
 * children. Purely structural — buttons keep their own token-bound colors, and
 * the only color added (the divider) is the `border` token. No literal colors.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { children, fill = false, className, ...rest },
  ref
) {
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
        fill && 'flex w-full',
        className
      )}
      {...rest}
    >
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden className="w-px self-stretch bg-border" />}
          <div className={cn('[&>*]:rounded-none', fill && 'flex-1 [&>*]:w-full')}>{child}</div>
        </React.Fragment>
      ))}
    </div>
  );
});
